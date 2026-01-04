import React, { useEffect, useMemo, useState } from 'react';
import './RefactorLog.css';

const API_URL = '/api/refactorizaciones';
const CLASS_OPTIONS = ['AntiCiberDron', 'Hormiga', 'BBA', 'Sistema', 'ArchivoCSV'];
const STATUS_OPTIONS = ['Pendiente', 'Completada'];

const initialForm = {
  fecha: '',
  clase: CLASS_OPTIONS[0],
  descripcion: '',
  beneficio: ''
};

const RefactorLog = () => {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Cargar datos persistidos
  useEffect(() => {
    const load = async () => {
      try {
        const resp = await fetch(API_URL);
        if (!resp.ok) throw new Error('No se pudo cargar el registro');
        const data = await resp.json();
        setEntries(Array.isArray(data.items) ? data.items : []);
        setLoaded(true);
      } catch (e) {
        setError(e.message);
        setLoaded(true);
      }
    };
    load();
  }, []);

  // Guardar con debounce ligero cuando cambian las entradas
  useEffect(() => {
    if (!loaded) return undefined;
    const timer = setTimeout(() => {
      save(entries);
    }, 600);
    return () => clearTimeout(timer);
  }, [entries, loaded]);

  const save = async (itemsToSave) => {
    try {
      setSaving(true);
      setError(null);
      const payload = { items: itemsToSave };
      const resp = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) throw new Error('No se pudo guardar el registro');
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.fecha || !form.descripcion.trim() || !form.beneficio.trim()) {
      setError('Completa Fecha, Descripción y Beneficio antes de registrar.');
      return;
    }
    setError(null);
    const nuevo = {
      id: Date.now(),
      fecha: form.fecha,
      clase: form.clase,
      descripcion: form.descripcion.trim(),
      beneficio: form.beneficio.trim(),
      estado: 'Pendiente'
    };
    setEntries((prev) => [nuevo, ...prev]);
    setForm({ ...initialForm, clase: form.clase || CLASS_OPTIONS[0] });
  };

  const updateEstado = (id, estado) => {
    setEntries((prev) => prev.map((item) => item.id === id ? { ...item, estado } : item));
  };

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => {
      const da = new Date(a.fecha || 0).getTime();
      const db = new Date(b.fecha || 0).getTime();
      return db - da;
    });
  }, [entries]);

  const statusPill = (estado) => {
    const isDone = estado === 'Completada';
    return (
      <span className={`status-pill ${isDone ? 'done' : 'pending'}`}>
        {estado}
      </span>
    );
  };

  return (
    <div className="refactor-log">
      <div className="refactor-head">
        <div>
          <h2>Refactorización Continua</h2>
          <p>Documenta cada cambio y su beneficio; mantén trazabilidad técnica.</p>
        </div>
        <div className="refactor-status">{saving ? 'Guardando…' : 'Sin cambios pendientes'}</div>
      </div>

      {error && <div className="refactor-error">⚠️ {error}</div>}

      <form className="refactor-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="field">
            <span>Fecha</span>
            <input
              type="date"
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            />
          </label>
          <label className="field">
            <span>Clase Afectada</span>
            <select
              value={form.clase}
              onChange={(e) => setForm({ ...form, clase: e.target.value })}
            >
              {CLASS_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="field">
          <span>Descripción del Cambio</span>
          <textarea
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            placeholder="Ej.: Extraer método para validar credenciales y reducir duplicidad"
          />
        </div>

        <div className="field">
          <span>Beneficio Obtenido</span>
          <textarea
            value={form.beneficio}
            onChange={(e) => setForm({ ...form, beneficio: e.target.value })}
            placeholder="Ej.: Menor acoplamiento, cobertura de pruebas más simple, menor deuda técnica"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn">Registrar cambio</button>
        </div>
      </form>

      <div className="refactor-table-card">
        <div className="table-head">
          <h3>Bitácora Cronológica</h3>
          <span className="table-meta">{sortedEntries.length} registros</span>
        </div>
        <div className="table-wrapper">
          <div className="table-grid table-header">
            <span>Fecha</span>
            <span>Clase</span>
            <span>Descripción del Cambio</span>
            <span>Beneficio</span>
            <span>Estado</span>
          </div>
          {sortedEntries.map((item) => (
            <div key={item.id} className="table-grid table-row">
              <span className="mono">{item.fecha || '—'}</span>
              <span>{item.clase || '—'}</span>
              <span>{item.descripcion || '—'}</span>
              <span>{item.beneficio || '—'}</span>
              <span className="estado-cell">
                {statusPill(item.estado)}
                <select
                  value={item.estado || 'Pendiente'}
                  onChange={(e) => updateEstado(item.id, e.target.value)}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </span>
            </div>
          ))}
          {sortedEntries.length === 0 && (
            <div className="empty-row">Aún no hay refactorizaciones registradas.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RefactorLog;
