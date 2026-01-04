import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CRCCard from '../../components/CRCCard/CRCCard';
import './TarjetasCRC.css';

const API_URL = '/api/tarjetas-crc';

const TarjetasCRC = () => {
  const [tarjetas, setTarjetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombreClase: '',
    responsabilidades: '',
    colaboradores: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Cargar tarjetas al montar el componente
  useEffect(() => {
    cargarTarjetas();
  }, []);

  const cargarTarjetas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Error al cargar las tarjetas CRC');
      }
      
      const data = await response.json();
      setTarjetas(data);
    } catch (err) {
      console.error('Error al cargar tarjetas:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombreClase.trim()) {
      alert('El nombre de la clase es obligatorio');
      return;
    }

    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Error al ${editingId ? 'actualizar' : 'crear'} la tarjeta CRC`);
      }

      // Recargar tarjetas
      await cargarTarjetas();
      
      // Limpiar formulario
      resetForm();
      
      alert(`Tarjeta CRC ${editingId ? 'actualizada' : 'creada'} exitosamente`);
    } catch (err) {
      console.error('Error al guardar tarjeta:', err);
      alert(err.message);
    }
  };

  const handleEdit = (tarjeta) => {
    setFormData({
      nombreClase: tarjeta.nombreClase,
      responsabilidades: tarjeta.responsabilidades,
      colaboradores: tarjeta.colaboradores
    });
    setEditingId(tarjeta.id);
    // Scroll al formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta tarjeta CRC?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la tarjeta CRC');
      }

      // Recargar tarjetas
      await cargarTarjetas();
      
      // Si estábamos editando esta tarjeta, limpiar formulario
      if (editingId === id) {
        resetForm();
      }
      
      alert('Tarjeta CRC eliminada exitosamente');
    } catch (err) {
      console.error('Error al eliminar tarjeta:', err);
      alert(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      nombreClase: '',
      responsabilidades: '',
      colaboradores: ''
    });
    setEditingId(null);
  };

  return (
    <div className="tarjetas-crc-page">
      <div className="crc-back-link">
        <Link to="/actividad/tarjetas-crc" className="crc-back-btn">← Volver a la actividad</Link>
      </div>

      <div className="tarjetas-crc-header">
        <h1>
          <span>🎴</span>
          Tarjetas CRC
        </h1>
        <p>Class-Responsibility-Collaboration Cards para diseño orientado a objetos</p>
      </div>

      <div className="crc-form-container">
        <h2>{editingId ? '✏️ Editar Tarjeta CRC' : '➕ Nueva Tarjeta CRC'}</h2>
        <form className="crc-form" onSubmit={handleSubmit}>
          <div className="crc-form-group">
            <label htmlFor="nombreClase">
              Nombre de la Clase
              <span className="required">*</span>
            </label>
            <input
              type="text"
              id="nombreClase"
              name="nombreClase"
              value={formData.nombreClase}
              onChange={handleInputChange}
              placeholder="Ej: Usuario, Producto, Pedido..."
              required
            />
          </div>

          <div className="crc-form-group">
            <label htmlFor="responsabilidades">
              Responsabilidades
            </label>
            <textarea
              id="responsabilidades"
              name="responsabilidades"
              value={formData.responsabilidades}
              onChange={handleInputChange}
              placeholder="Describe las responsabilidades de esta clase...&#10;Ej:&#10;- Gestionar datos del usuario&#10;- Validar credenciales&#10;- Actualizar perfil"
            />
          </div>

          <div className="crc-form-group">
            <label htmlFor="colaboradores">
              Colaboradores
            </label>
            <textarea
              id="colaboradores"
              name="colaboradores"
              value={formData.colaboradores}
              onChange={handleInputChange}
              placeholder="Lista las clases con las que colabora...&#10;Ej:&#10;- BaseDatos&#10;- Autenticacion&#10;- Email"
            />
          </div>

          <div className="crc-form-buttons">
            <button type="submit" className="crc-btn crc-btn-primary">
              {editingId ? '💾 Actualizar' : '➕ Crear Tarjeta'}
            </button>
            {editingId && (
              <button 
                type="button" 
                className="crc-btn crc-btn-secondary"
                onClick={resetForm}
              >
                ❌ Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {loading && (
        <div className="loading-message">
          ⏳ Cargando tarjetas CRC...
        </div>
      )}

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {tarjetas.length > 0 && (
            <div className="tarjetas-count">
              📊 Total de tarjetas: {tarjetas.length}
            </div>
          )}

          {tarjetas.length === 0 ? (
            <div className="no-tarjetas">
              <div className="no-tarjetas-icon">🎴</div>
              <h3>No hay tarjetas CRC registradas</h3>
              <p>Crea tu primera tarjeta CRC usando el formulario de arriba</p>
            </div>
          ) : (
            <div className="tarjetas-grid">
              {tarjetas.map(tarjeta => (
                <CRCCard
                  key={tarjeta.id}
                  tarjeta={tarjeta}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TarjetasCRC;
