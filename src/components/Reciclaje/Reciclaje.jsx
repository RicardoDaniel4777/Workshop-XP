import React, { useState, useEffect } from 'react';
import './Reciclaje.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001/api' : '/api');

const Reciclaje = () => {
  const [reciclajes, setReciclajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    componenteClase: '',
    proyectoOrigen: '',
    notasAdaptacion: ''
  });

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarReciclajes();
  }, []);

  const cargarReciclajes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reciclaje`);
      const data = await response.json();
      setReciclajes(data.items || []);
    } catch (error) {
      console.error('Error al cargar reciclajes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!formData.componenteClase.trim() || !formData.proyectoOrigen.trim()) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    const nuevoReciclaje = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      componenteClase: formData.componenteClase,
      proyectoOrigen: formData.proyectoOrigen,
      notasAdaptacion: formData.notasAdaptacion
    };

    try {
      const nuevosReciclajes = [...reciclajes, nuevoReciclaje];
      
      const response = await fetch(`${API_BASE_URL}/reciclaje`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: nuevosReciclajes }),
      });

      if (response.ok) {
        const data = await response.json();
        setReciclajes(data.items);
        
        // Limpiar formulario
        setFormData({
          componenteClase: '',
          proyectoOrigen: '',
          notasAdaptacion: ''
        });
      }
    } catch (error) {
      console.error('Error al guardar reciclaje:', error);
      alert('Error al guardar el reciclaje');
    }
  };

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

  if (loading) {
    return <div className="reciclaje-loading">Cargando...</div>;
  }

  return (
    <div className="reciclaje-container">
      <div className="reciclaje-header">
        <h3>♻️ Registro de Reciclaje de Código</h3>
        <p className="reciclaje-subtitle">
          Documentación de componentes y clases reutilizadas de otros proyectos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="reciclaje-form">
        <div className="form-group">
          <label htmlFor="componenteClase">
            Componente/Clase Reciclada <span className="required">*</span>
          </label>
          <input
            type="text"
            id="componenteClase"
            name="componenteClase"
            value={formData.componenteClase}
            onChange={handleChange}
            placeholder="Ej: AuthenticationService"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="proyectoOrigen">
            Proyecto de Origen <span className="required">*</span>
          </label>
          <input
            type="text"
            id="proyectoOrigen"
            name="proyectoOrigen"
            value={formData.proyectoOrigen}
            onChange={handleChange}
            placeholder="Ej: Sistema de Gestión v2.0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notasAdaptacion">Notas de Adaptación</label>
          <textarea
            id="notasAdaptacion"
            name="notasAdaptacion"
            value={formData.notasAdaptacion}
            onChange={handleChange}
            placeholder="Describe las modificaciones realizadas para adaptar el componente al proyecto actual..."
            rows="4"
          />
        </div>

        <button type="submit" className="btn-registrar">
          Registrar Reciclaje
        </button>
      </form>

      <div className="reciclaje-lista">
        <h4 className="lista-titulo">
          Componentes Reciclados ({reciclajes.length})
        </h4>
        
        {reciclajes.length === 0 ? (
          <div className="lista-vacia">
            <p>No hay reciclajes registrados aún.</p>
            <p className="hint">Completa el formulario para agregar el primer registro.</p>
          </div>
        ) : (
          <div className="reciclaje-items">
            {reciclajes.map((item) => (
              <div key={item.id} className="reciclaje-item">
                <div className="item-header">
                  <span className="item-componente">{item.componenteClase}</span>
                  <span className="item-fecha">{formatearFecha(item.fecha)}</span>
                </div>
                <div className="item-proyecto">
                  Origen: <strong>{item.proyectoOrigen}</strong>
                </div>
                {item.notasAdaptacion && (
                  <div className="item-notas">
                    <div className="notas-label">Adaptaciones:</div>
                    <div className="notas-contenido">{item.notasAdaptacion}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reciclaje;
