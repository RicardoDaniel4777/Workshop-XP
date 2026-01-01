import React from 'react';
import { useXP } from '../../context/XPContext';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import './Iteraciones.css';

const Iteraciones = () => {
  const { iteraciones } = useXP();

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case 'completada': return 'badge-success';
      case 'en-progreso': return 'badge-info';
      case 'pendiente': return 'badge-warning';
      default: return 'badge-default';
    }
  };

  const formatearFecha = (fecha) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  return (
    <div className="iteraciones">
      <div className="iteraciones-header">
        <div>
          <h1 className="iteraciones-title">Iteraciones XP</h1>
          <p className="iteraciones-subtitle">
            Gestión de sprints y ciclos de desarrollo de 1-2 semanas
          </p>
        </div>
      </div>

      <div className="iteraciones-info-card">
        <h3 className="info-title">🔁 ¿Qué son las Iteraciones en XP?</h3>
        <p className="info-text">
          En Extreme Programming, las iteraciones son ciclos cortos de desarrollo de 1-2 semanas donde 
          el equipo implementa un conjunto específico de historias de usuario. Al final de cada iteración, 
          se entrega software funcional que puede ser revisado por el cliente.
        </p>
      </div>

      <div className="iteraciones-stats">
        <div className="stat-box">
          <span className="stat-number">{iteraciones.length}</span>
          <span className="stat-label">Total Iteraciones</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">
            {iteraciones.filter(i => i.estado === 'completada').length}
          </span>
          <span className="stat-label">Completadas</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">
            {iteraciones.filter(i => i.estado === 'en-progreso').length}
          </span>
          <span className="stat-label">En Progreso</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">
            {Math.round(
              iteraciones.reduce((sum, iter) => sum + iter.velocidad, 0) / iteraciones.length
            )}
          </span>
          <span className="stat-label">Velocidad Promedio</span>
        </div>
      </div>

      <div className="iteraciones-list">
        {iteraciones.map((iteracion) => (
          <div key={iteracion.id} className="iteracion-card">
            <div className="iteracion-header">
              <div className="iteracion-header-left">
                <h3 className="iteracion-titulo">{iteracion.nombre}</h3>
                <span className={`badge ${getEstadoBadgeClass(iteracion.estado)}`}>
                  {iteracion.estado}
                </span>
              </div>
              <div className="iteracion-numero">
                Iteración #{iteracion.numero}
              </div>
            </div>

            <div className="iteracion-fechas">
              <div className="fecha-item">
                <span className="fecha-label">Inicio:</span>
                <span className="fecha-valor">{formatearFecha(iteracion.fechaInicio)}</span>
              </div>
              <div className="fecha-separator">→</div>
              <div className="fecha-item">
                <span className="fecha-label">Fin:</span>
                <span className="fecha-valor">{formatearFecha(iteracion.fechaFin)}</span>
              </div>
            </div>

            <div className="iteracion-progreso">
              <ProgressBar progreso={iteracion.progreso} height="10px" />
            </div>

            <div className="iteracion-metrics">
              <div className="metric-item">
                <span className="metric-icon">📊</span>
                <div className="metric-info">
                  <span className="metric-label">Story Points</span>
                  <span className="metric-value">
                    {iteracion.storyPointsCompletados} / {iteracion.storyPoints}
                  </span>
                </div>
              </div>

              <div className="metric-item">
                <span className="metric-icon">⚡</span>
                <div className="metric-info">
                  <span className="metric-label">Velocidad</span>
                  <span className="metric-value">{iteracion.velocidad} pts</span>
                </div>
              </div>

              <div className="metric-item">
                <span className="metric-icon">📝</span>
                <div className="metric-info">
                  <span className="metric-label">Historias</span>
                  <span className="metric-value">{iteracion.historias.length}</span>
                </div>
              </div>
            </div>

            <div className="iteracion-historias">
              <h4 className="historias-titulo">Historias de Usuario:</h4>
              <div className="historias-tags">
                {iteracion.historias.map((historia) => (
                  <span key={historia} className="historia-tag">
                    {historia}
                  </span>
                ))}
              </div>
            </div>

            <div className="iteracion-equipo">
              <h4 className="equipo-titulo">👥 Equipo:</h4>
              <div className="equipo-members">
                {iteracion.equipo.map((miembro, index) => (
                  <span key={index} className="equipo-member">
                    {miembro}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="iteraciones-tips">
        <h3 className="tips-title">💡 Mejores Prácticas para Iteraciones XP</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">🎯</div>
            <h4>Planning Game</h4>
            <p>Inicia cada iteración con una sesión de planificación donde el cliente prioriza historias.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">📅</div>
            <h4>Daily Stand-ups</h4>
            <p>Reuniones diarias de 15 minutos para sincronizar el equipo y detectar impedimentos.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🔄</div>
            <h4>Retrospectiva</h4>
            <p>Al final de cada iteración, reflexiona sobre qué funcionó y qué mejorar.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🚀</div>
            <h4>Demo al Cliente</h4>
            <p>Muestra el software funcional al cliente al final de cada iteración.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Iteraciones;
