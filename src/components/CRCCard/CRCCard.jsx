import React from 'react';
import './CRCCard.css';

const CRCCard = ({ tarjeta, onEdit, onDelete }) => {
  const formatFecha = (fecha) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="crc-card">
      <div className="crc-card-header">
        <div className="crc-card-actions">
          <button 
            className="crc-card-btn edit" 
            onClick={() => onEdit(tarjeta)}
            title="Editar tarjeta"
          >
            ✏️ Editar
          </button>
          <button 
            className="crc-card-btn delete" 
            onClick={() => onDelete(tarjeta.id)}
            title="Eliminar tarjeta"
          >
            🗑️ Eliminar
          </button>
        </div>
        <span className="crc-card-title" title={tarjeta.nombreClase}>
          {tarjeta.nombreClase}
        </span>
      </div>
      
      <div className="crc-card-body">
        <div className="crc-card-section">
          <div className="crc-card-section-title">Responsabilidades</div>
          <div className="crc-card-section-content">
            {tarjeta.responsabilidades || ''}
          </div>
        </div>
        
        <div className="crc-card-section">
          <div className="crc-card-section-title">Colaboradores</div>
          <div className="crc-card-section-content">
            {tarjeta.colaboradores || ''}
          </div>
        </div>
      </div>
      
      <div className="crc-card-footer">
        Modificado: {formatFecha(tarjeta.fechaModificacion)}
      </div>
    </div>
  );
};

export default CRCCard;
