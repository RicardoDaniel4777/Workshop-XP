import React, { useEffect, useState } from 'react';
import './SystemMetaphor.css';

const API_URL = '/api/metafora-sistema';

const emptyRow = () => ({ id: Date.now(), tecnico: '', metaforico: '' });

const SystemMetaphor = () => {
  const [narrativa, setNarrativa] = useState('');
  const [glosario, setGlosario] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos
  useEffect(() => {
    const load = async () => {
      try {
        const resp = await fetch(API_URL);
        if (!resp.ok) throw new Error('No se pudo cargar la metáfora');
        const data = await resp.json();
        setNarrativa(data.narrativa || '');
        setGlosario(Array.isArray(data.glosario) ? data.glosario.map((row, idx) => ({ id: row.id ?? idx + 1, ...row })) : []);
      } catch (e) {
        setError(e.message);
      }
    };
    load();
  }, []);

  // Guardar con debounce ligero
  useEffect(() => {
    const timer = setTimeout(() => {
      save();
    }, 600);
    return () => clearTimeout(timer);
  }, [narrativa, glosario]);

  const save = async () => {
    try {
      setSaving(true);
      setError(null);
      const payload = {
        narrativa,
        glosario: glosario.map(({ id, tecnico, metaforico }) => ({ id, tecnico, metaforico }))
      };
      const resp = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!resp.ok) throw new Error('No se pudo guardar');
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const updateRow = (id, field, value) => {
    setGlosario(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const addRow = () => {
    setGlosario(prev => [...prev, emptyRow()]);
  };

  return (
    <div className="metafora">
      <div className="metafora-header">
        <div>
          <h2>Metáfora del Sistema</h2>
          <p>Define la narrativa y el glosario de equivalencias para comunicar el sistema.</p>
        </div>
        <div className="metafora-status">
          {saving ? 'Guardando…' : 'Cambios guardados'}
        </div>
      </div>

      {error && <div className="metafora-error">⚠️ {error}</div>}

      <section className="metafora-card">
        <h3>Narrativa de la Metáfora</h3>
        <textarea
          value={narrativa}
          onChange={(e) => setNarrativa(e.target.value)}
          placeholder="Ejemplo: Nuestro sistema es como una red de mensajeros que reparten paquetes..."
        />
      </section>

      <section className="metafora-card">
        <div className="metafora-table-head">
          <h3>Glosario de Equivalencias</h3>
          <button className="metafora-btn" onClick={addRow}>+ Añadir fila</button>
        </div>
        <div className="metafora-table">
          <div className="metafora-table-row metafora-table-header">
            <div>Concepto Técnico</div>
            <div>Concepto Metafórico</div>
          </div>
          {glosario.map(row => (
            <div key={row.id} className="metafora-table-row">
              <input
                value={row.tecnico || ''}
                onChange={(e) => updateRow(row.id, 'tecnico', e.target.value)}
                placeholder="Ej: Autómata, BBA, HLarva"
              />
              <input
                value={row.metaforico || ''}
                onChange={(e) => updateRow(row.id, 'metaforico', e.target.value)}
                placeholder="Ej: Cartero, Biblioteca, Hive"
              />
            </div>
          ))}
          {glosario.length === 0 && (
            <div className="metafora-empty">Añade tu primera equivalencia para comenzar.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SystemMetaphor;
