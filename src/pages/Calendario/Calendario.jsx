import React, { useState } from 'react';
import { useXP } from '../../context/XPContext';
import './Calendario.css';

const Calendario = () => {
  const { eventos } = useXP();
  const [filtroTipo, setFiltroTipo] = useState('todos');

  const eventosFiltrados = filtroTipo === 'todos' 
    ? eventos 
    : eventos.filter(e => e.tipo === filtroTipo);

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case 'reunion': return '👥';
      case 'trabajo': return '💻';
      case 'prueba': return '🧪';
      default: return '📅';
    }
  };

  const getTipoBadgeClass = (tipo) => {
    switch (tipo) {
      case 'reunion': return 'badge-blue';
      case 'trabajo': return 'badge-green';
      case 'prueba': return 'badge-orange';
      default: return 'badge-gray';
    }
  };

  const getFaseColor = (fase) => {
    switch (fase) {
      case 'planificacion': return '#3b82f6';
      case 'diseno': return '#8b5cf6';
      case 'desarrollo': return '#10b981';
      case 'pruebas': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const formatearFecha = (fecha) => {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  const agruparEventosPorMes = () => {
    const grupos = {};
    eventosFiltrados.forEach(evento => {
      const fecha = new Date(evento.fecha);
      const mes = fecha.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
      if (!grupos[mes]) {
        grupos[mes] = [];
      }
      grupos[mes].push(evento);
    });
    return grupos;
  };

  const eventosAgrupados = agruparEventosPorMes();

  return (
    <div className="calendario">
      <div className="calendario-header">
        <div>
          <h1 className="calendario-title">Calendario XP</h1>
          <p className="calendario-subtitle">
            Eventos, reuniones y actividades del proyecto
          </p>
        </div>
      </div>

      <div className="calendario-info-card">
        <h3 className="info-title">📅 Eventos en Extreme Programming</h3>
        <p className="info-text">
          XP enfatiza la comunicación constante y las reuniones regulares. Los eventos clave incluyen 
          el Planning Game, Daily Stand-ups, reuniones de iteración y retrospectivas. Mantener un 
          calendario organizado es fundamental para el éxito del proyecto.
        </p>
      </div>

      {/* Filtros */}
      <div className="calendario-filtros">
        <h3 className="filtros-titulo">Filtrar por tipo:</h3>
        <div className="filtros-buttons">
          <button
            className={`filtro-btn ${filtroTipo === 'todos' ? 'active' : ''}`}
            onClick={() => setFiltroTipo('todos')}
          >
            📅 Todos ({eventos.length})
          </button>
          <button
            className={`filtro-btn ${filtroTipo === 'reunion' ? 'active' : ''}`}
            onClick={() => setFiltroTipo('reunion')}
          >
            👥 Reuniones ({eventos.filter(e => e.tipo === 'reunion').length})
          </button>
          <button
            className={`filtro-btn ${filtroTipo === 'trabajo' ? 'active' : ''}`}
            onClick={() => setFiltroTipo('trabajo')}
          >
            💻 Trabajo ({eventos.filter(e => e.tipo === 'trabajo').length})
          </button>
          <button
            className={`filtro-btn ${filtroTipo === 'prueba' ? 'active' : ''}`}
            onClick={() => setFiltroTipo('prueba')}
          >
            🧪 Pruebas ({eventos.filter(e => e.tipo === 'prueba').length})
          </button>
        </div>
      </div>

      {/* Eventos agrupados por mes */}
      <div className="calendario-eventos">
        {Object.keys(eventosAgrupados).length === 0 ? (
          <div className="no-eventos">
            <div className="no-eventos-icon">📭</div>
            <h3>No hay eventos para mostrar</h3>
            <p>No se encontraron eventos con el filtro seleccionado.</p>
          </div>
        ) : (
          Object.entries(eventosAgrupados).map(([mes, eventosDelMes]) => (
            <div key={mes} className="mes-grupo">
              <h2 className="mes-titulo">
                <span className="mes-icon">📆</span>
                {mes.charAt(0).toUpperCase() + mes.slice(1)}
              </h2>
              <div className="eventos-lista">
                {eventosDelMes.map((evento) => (
                  <div key={evento.id} className="evento-card">
                    <div 
                      className="evento-indicator"
                      style={{ backgroundColor: getFaseColor(evento.fase) }}
                    ></div>
                    <div className="evento-content">
                      <div className="evento-header">
                        <div className="evento-header-left">
                          <span className="evento-icon">{getTipoIcon(evento.tipo)}</span>
                          <h3 className="evento-titulo">{evento.titulo}</h3>
                        </div>
                        <span className={`badge ${getTipoBadgeClass(evento.tipo)}`}>
                          {evento.tipo}
                        </span>
                      </div>

                      <div className="evento-fecha">
                        <span className="fecha-icon">📅</span>
                        <span className="fecha-text">{formatearFecha(evento.fecha)}</span>
                      </div>

                      <div className="evento-fase">
                        <span className="fase-label">Fase:</span>
                        <span 
                          className="fase-badge"
                          style={{ 
                            backgroundColor: getFaseColor(evento.fase) + '20',
                            color: getFaseColor(evento.fase)
                          }}
                        >
                          {evento.fase.charAt(0).toUpperCase() + evento.fase.slice(1)}
                        </span>
                      </div>

                      <div className="evento-participantes">
                        <h4 className="participantes-titulo">👥 Participantes:</h4>
                        <div className="participantes-lista">
                          {evento.participantes.map((participante, index) => (
                            <span key={index} className="participante-chip">
                              {participante}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tipos de eventos */}
      <div className="calendario-tipos">
        <h2 className="tipos-titulo">Tipos de Eventos en XP</h2>
        <div className="tipos-grid">
          <div className="tipo-card">
            <div className="tipo-icon">👥</div>
            <h3 className="tipo-titulo">Reuniones</h3>
            <p className="tipo-descripcion">
              Planning Game, retrospectivas, reuniones de iteración y sincronización del equipo.
            </p>
          </div>

          <div className="tipo-card">
            <div className="tipo-icon">💻</div>
            <h3 className="tipo-titulo">Sesiones de Trabajo</h3>
            <p className="tipo-descripcion">
              Pair programming, refactorización, implementación de historias de usuario.
            </p>
          </div>

          <div className="tipo-card">
            <div className="tipo-icon">🧪</div>
            <h3 className="tipo-titulo">Pruebas</h3>
            <p className="tipo-descripcion">
              Pruebas de aceptación con el cliente, validación de releases, demos.
            </p>
          </div>

          <div className="tipo-card">
            <div className="tipo-icon">🎯</div>
            <h3 className="tipo-titulo">Daily Stand-ups</h3>
            <p className="tipo-descripcion">
              Reuniones diarias de 15 minutos para sincronizar el equipo y detectar impedimentos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendario;
