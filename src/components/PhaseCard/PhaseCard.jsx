import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import './PhaseCard.css';

const PhaseCard = ({ fase }) => {
  const getEstadoClase = (estado) => {
    switch (estado) {
      case 'completada': return 'estado-completada';
      case 'en-progreso': return 'estado-en-progreso';
      case 'pendiente': return 'estado-pendiente';
      default: return '';
    }
  };

  const getEstadoTexto = (estado) => {
    switch (estado) {
      case 'completada': return 'Completada';
      case 'en-progreso': return 'En Progreso';
      case 'pendiente': return 'Pendiente';
      default: return estado;
    }
  };

  return (
    <div className="phase-card" style={{ borderLeftColor: fase.color }}>
      <div className="phase-card-header">
        <h3 className="phase-card-title">{fase.nombre}</h3>
        <span className={`phase-card-estado ${getEstadoClase(fase.estado)}`}>
          {getEstadoTexto(fase.estado)}
        </span>
      </div>
      
      <p className="phase-card-descripcion">{fase.descripcion}</p>
      
      <div className="phase-card-meta">
        <div className="phase-card-semana">
          <span className="meta-label">Semana:</span>
          <span className="meta-value">{fase.semana}</span>
        </div>
      </div>

      <div className="phase-card-progress">
        <ProgressBar progreso={fase.progreso} color={fase.color} />
      </div>

      <div className="phase-card-actividades">
        <h4 className="actividades-titulo">
          Actividades ({fase.actividades.length})
        </h4>
        <div className="actividades-lista">
          {fase.actividades.length > 0 ? (
            fase.actividades.map(actividad => (
              <Link
                key={actividad.id}
                to={`/actividad/${actividad.id}`}
                className="actividad-link"
              >
                <span className={`actividad-estado-dot estado-${actividad.estado}`}></span>
                <span className="actividad-nombre">{actividad.nombre}</span>
                <span className="actividad-progreso-mini">{actividad.progreso}%</span>
              </Link>
            ))
          ) : (
            <p className="no-actividades">No hay actividades en esta fase</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhaseCard;
