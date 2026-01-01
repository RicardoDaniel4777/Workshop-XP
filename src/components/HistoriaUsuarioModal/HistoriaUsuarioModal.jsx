import React, { useState, useEffect } from 'react';
import './HistoriaUsuarioModal.css';

const HistoriaUsuarioModal = ({ isOpen, onClose, onSave, historiaInicial = null }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    rol: '',
    accion: '',
    beneficio: '',
    prioridad: 'Media',
    storyPoints: 0,
    criteriosAceptacion: [''],
    estado: 'pendiente',
    iteracion: ''
  });

  useEffect(() => {
    if (historiaInicial) {
      setFormData({
        ...historiaInicial,
        criteriosAceptacion: historiaInicial.criteriosAceptacion || ['']
      });
    } else {
      setFormData({
        titulo: '',
        rol: '',
        accion: '',
        beneficio: '',
        prioridad: 'Media',
        storyPoints: 0,
        criteriosAceptacion: [''],
        estado: 'pendiente',
        iteracion: ''
      });
    }
  }, [historiaInicial, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCriterioChange = (index, value) => {
    const nuevosCriterios = [...formData.criteriosAceptacion];
    nuevosCriterios[index] = value;
    setFormData(prev => ({
      ...prev,
      criteriosAceptacion: nuevosCriterios
    }));
  };

  const agregarCriterio = () => {
    setFormData(prev => ({
      ...prev,
      criteriosAceptacion: [...prev.criteriosAceptacion, '']
    }));
  };

  const eliminarCriterio = (index) => {
    if (formData.criteriosAceptacion.length > 1) {
      const nuevosCriterios = formData.criteriosAceptacion.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        criteriosAceptacion: nuevosCriterios
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.titulo || !formData.rol || !formData.accion || !formData.beneficio) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Filtrar criterios vacíos
    const criteriosFiltrados = formData.criteriosAceptacion.filter(c => c.trim() !== '');
    
    onSave({
      ...formData,
      criteriosAceptacion: criteriosFiltrados.length > 0 ? criteriosFiltrados : ['Sin criterios definidos'],
      storyPoints: parseInt(formData.storyPoints) || 0
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content historia-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{historiaInicial ? 'Editar Historia de Usuario' : 'Nueva Historia de Usuario'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="historia-form">
          <div className="form-section">
            <h3>📝 Información Básica</h3>
            
            <div className="form-group">
              <label htmlFor="titulo">Título *</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ej: Búsqueda de productos por categoría"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rol">Rol del Usuario *</label>
                <input
                  type="text"
                  id="rol"
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  placeholder="Ej: Cliente, Administrador, Usuario"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="prioridad">Prioridad</label>
                <select
                  id="prioridad"
                  name="prioridad"
                  value={formData.prioridad}
                  onChange={handleChange}
                >
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>🎯 Historia de Usuario</h3>
            <p className="historia-template">
              <strong>Como</strong> <span className="highlight">{formData.rol || '[rol]'}</span>,{' '}
              <strong>quiero</strong> <span className="highlight">{formData.accion || '[acción]'}</span>,{' '}
              <strong>para</strong> <span className="highlight">{formData.beneficio || '[beneficio]'}</span>
            </p>

            <div className="form-group">
              <label htmlFor="accion">Acción (¿Qué quiero hacer?) *</label>
              <input
                type="text"
                id="accion"
                name="accion"
                value={formData.accion}
                onChange={handleChange}
                placeholder="Ej: buscar productos por categoría"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="beneficio">Beneficio (¿Para qué?) *</label>
              <input
                type="text"
                id="beneficio"
                name="beneficio"
                value={formData.beneficio}
                onChange={handleChange}
                placeholder="Ej: encontrar rápidamente lo que necesito"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>✅ Criterios de Aceptación</h3>
            {formData.criteriosAceptacion.map((criterio, index) => (
              <div key={index} className="criterio-group">
                <input
                  type="text"
                  value={criterio}
                  onChange={(e) => handleCriterioChange(index, e.target.value)}
                  placeholder={`Criterio ${index + 1}`}
                  className="criterio-input"
                />
                {formData.criteriosAceptacion.length > 1 && (
                  <button
                    type="button"
                    onClick={() => eliminarCriterio(index)}
                    className="btn-remove-criterio"
                    title="Eliminar criterio"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={agregarCriterio}
              className="btn-add-criterio"
            >
              + Agregar Criterio
            </button>
          </div>

          <div className="form-section">
            <h3>📊 Detalles de Gestión</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="storyPoints">Story Points</label>
                <input
                  type="number"
                  id="storyPoints"
                  name="storyPoints"
                  value={formData.storyPoints}
                  onChange={handleChange}
                  min="0"
                  max="21"
                />
              </div>

              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en-progreso">En Progreso</option>
                  <option value="completada">Completada</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="iteracion">Iteración</label>
                <input
                  type="text"
                  id="iteracion"
                  name="iteracion"
                  value={formData.iteracion}
                  onChange={handleChange}
                  placeholder="Ej: Iteración 1"
                />
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {historiaInicial ? 'Actualizar' : 'Crear'} Historia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HistoriaUsuarioModal;
