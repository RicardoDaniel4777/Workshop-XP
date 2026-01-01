import React from 'react';
import { useXP } from '../../context/XPContext';
import { Link } from 'react-router-dom';
import PhaseCard from '../../components/PhaseCard/PhaseCard';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import './Dashboard.css';

const Dashboard = () => {
  const { fases, proyecto, obtenerEstadisticas } = useXP();
  const stats = obtenerEstadisticas();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard General XP</h1>
          <p className="dashboard-subtitle">{proyecto.nombre} - {proyecto.equipo}</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/fases" className="btn btn-primary">
            Ver Fases XP
          </Link>
        </div>
      </div>

      {/* Métricas generales */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#dbeafe' }}>📈</div>
          <div className="metric-content">
            <p className="metric-label">Progreso General</p>
            <p className="metric-value">{stats.progresoGeneral}%</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#dcfce7' }}>✅</div>
          <div className="metric-content">
            <p className="metric-label">Actividades Completadas</p>
            <p className="metric-value">{stats.actividadesCompletadas}/{stats.totalActividades}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#fef3c7' }}>🔄</div>
          <div className="metric-content">
            <p className="metric-label">En Progreso</p>
            <p className="metric-value">{stats.actividadesEnProgreso}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ backgroundColor: '#f3e8ff' }}>⚡</div>
          <div className="metric-content">
            <p className="metric-label">Velocidad</p>
            <p className="metric-value">{stats.velocidad} pts</p>
          </div>
        </div>
      </div>

      {/* Progreso del proyecto */}
      <div className="dashboard-section">
        <h2 className="section-title">Progreso del Proyecto</h2>
        <div className="project-progress-card">
          <div className="progress-info">
            <div>
              <p className="progress-label">Story Points Completados</p>
              <p className="progress-stats">
                {stats.storyPointsCompletados} / {stats.storyPointsTotal} puntos
              </p>
            </div>
          </div>
          <ProgressBar 
            progreso={Math.round((stats.storyPointsCompletados / stats.storyPointsTotal) * 100)} 
            height="12px"
          />
        </div>
      </div>

      {/* Fases en resumen */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Fases XP - Resumen</h2>
          <Link to="/fases" className="section-link">
            Ver todas las fases →
          </Link>
        </div>
        <div className="phases-grid">
          {fases.map(fase => (
            <PhaseCard key={fase.id} fase={fase} />
          ))}
        </div>
      </div>

      {/* Acceso rápido */}
      <div className="dashboard-section">
        <h2 className="section-title">Acceso Rápido</h2>
        <div className="quick-links-grid">
          <Link to="/iteraciones" className="quick-link-card">
            <div className="quick-link-icon">🔁</div>
            <h3 className="quick-link-title">Iteraciones</h3>
            <p className="quick-link-desc">Gestiona sprints y ciclos</p>
          </Link>

          <Link to="/calendario" className="quick-link-card">
            <div className="quick-link-icon">📅</div>
            <h3 className="quick-link-title">Calendario</h3>
            <p className="quick-link-desc">Eventos y reuniones XP</p>
          </Link>

          <Link to="/artefactos" className="quick-link-card">
            <div className="quick-link-icon">📄</div>
            <h3 className="quick-link-title">Artefactos</h3>
            <p className="quick-link-desc">Documentos y diagramas</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
