import React from 'react';
import { useXP } from '../../context/XPContext';
import PhaseCard from '../../components/PhaseCard/PhaseCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import './FasesXP.css';

const FasesXP = () => {
  const { fases, obtenerEstadisticas } = useXP();
  const stats = obtenerEstadisticas();

  const fasesOrdenadas = [...fases].sort((a, b) => {
    const orden = { 'planificacion': 1, 'diseno': 2, 'desarrollo': 3, 'pruebas': 4 };
    return orden[a.id] - orden[b.id];
  });

  return (
    <div className="fases-xp">
      <div className="fases-header">
        <div>
          <h1 className="fases-title">Fases XP</h1>
          <p className="fases-subtitle">
            Las 4 fases fundamentales de Extreme Programming
          </p>
        </div>
      </div>

      {/* Progreso global de todas las fases */}
      <div className="fases-progress-section">
        <div className="global-progress-card">
          <h2 className="progress-card-title">Progreso Global del Proyecto</h2>
          <div className="progress-grid">
            <div className="progress-stat">
              <span className="stat-value">{stats.actividadesCompletadas}</span>
              <span className="stat-label">Completadas</span>
            </div>
            <div className="progress-stat">
              <span className="stat-value">{stats.actividadesEnProgreso}</span>
              <span className="stat-label">En Progreso</span>
            </div>
            <div className="progress-stat">
              <span className="stat-value">{stats.actividadesPendientes}</span>
              <span className="stat-label">Pendientes</span>
            </div>
            <div className="progress-stat">
              <span className="stat-value">{stats.progresoGeneral}%</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
          <div className="global-progress-bar">
            <ProgressBar progreso={stats.progresoGeneral} height="16px" />
          </div>
        </div>
      </div>

      {/* Descripción de XP */}
      <div className="xp-description">
        <div className="description-card">
          <h3 className="description-title">🚀 ¿Qué es Extreme Programming?</h3>
          <p className="description-text">
            Extreme Programming (XP) es una metodología ágil de desarrollo de software que se centra 
            en la excelencia técnica y la satisfacción del cliente. Se basa en valores como la comunicación, 
            la simplicidad, la retroalimentación y el coraje.
          </p>
        </div>
      </div>

      {/* Las 4 fases */}
      <div className="fases-grid">
        {fasesOrdenadas.map(fase => (
          <div key={fase.id} className="fase-wrapper">
            <PhaseCard fase={fase} />
          </div>
        ))}
      </div>

      {/* Información adicional sobre las fases */}
      <div className="fases-info-section">
        <h2 className="info-section-title">Características de las Fases XP</h2>
        <div className="info-cards-grid">
          <div className="info-card" style={{ borderTopColor: '#3b82f6' }}>
            <div className="info-card-header">
              <span className="info-card-number">1</span>
              <h3 className="info-card-title">Planificación</h3>
            </div>
            <ul className="info-card-list">
              <li>Definición de historias de usuario</li>
              <li>Estimación de esfuerzo</li>
              <li>Planificación de releases</li>
              <li>Establecimiento de prioridades</li>
            </ul>
          </div>

          <div className="info-card" style={{ borderTopColor: '#8b5cf6' }}>
            <div className="info-card-header">
              <span className="info-card-number">2</span>
              <h3 className="info-card-title">Diseño</h3>
            </div>
            <ul className="info-card-list">
              <li>Diseño simple y evolutivo</li>
              <li>Uso de metáforas del sistema</li>
              <li>Tarjetas CRC</li>
              <li>Refactorización continua</li>
              <li>Reciclaje</li>
            </ul>
          </div>

          <div className="info-card" style={{ borderTopColor: '#10b981' }}>
            <div className="info-card-header">
              <span className="info-card-number">3</span>
              <h3 className="info-card-title">Desarrollo</h3>
            </div>
            <ul className="info-card-list">
              <li>Programación en parejas</li>
              <li>Integración continua</li>
              <li>Disponibilidad del Cliente</li>
              <li>Unidad de Pruebas</li>
            </ul>
          </div>

          <div className="info-card" style={{ borderTopColor: '#f59e0b' }}>
            <div className="info-card-header">
              <span className="info-card-number">4</span>
              <h3 className="info-card-title">Pruebas</h3>
            </div>
            <ul className="info-card-list">
              <li>Pruebas de aceptación</li>
              <li>Implantación</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FasesXP;
