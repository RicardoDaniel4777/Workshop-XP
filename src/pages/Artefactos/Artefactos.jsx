import React, { useState } from 'react';
import { useXP } from '../../context/XPContext';
import './Artefactos.css';

const Artefactos = () => {
  const { artefactos, fases } = useXP();
  const [filtroFase, setFiltroFase] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');

  const artefactosFiltrados = artefactos.filter(artefacto => {
    const cumpleFase = filtroFase === 'todos' || artefacto.fase === filtroFase;
    const cumpleEstado = filtroEstado === 'todos' || artefacto.estado === filtroEstado;
    return cumpleFase && cumpleEstado;
  });

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case 'Documento': return '📄';
      case 'Diagrama': return '📊';
      case 'Código': return '💻';
      default: return '📎';
    }
  };

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case 'completado': return 'badge-success';
      case 'en-progreso': return 'badge-info';
      case 'pendiente': return 'badge-warning';
      default: return 'badge-default';
    }
  };

  const getFaseColor = (faseId) => {
    const fase = fases.find(f => f.id === faseId);
    return fase ? fase.color : '#6b7280';
  };

  const formatearFecha = (fecha) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  const contarPorTipo = () => {
    const contadores = {};
    artefactos.forEach(art => {
      contadores[art.tipo] = (contadores[art.tipo] || 0) + 1;
    });
    return contadores;
  };

  const contadoresPorTipo = contarPorTipo();

  return (
    <div className="artefactos">
      <div className="artefactos-header">
        <div>
          <h1 className="artefactos-title">Artefactos XP</h1>
          <p className="artefactos-subtitle">
            Documentos, diagramas y recursos del proyecto
          </p>
        </div>
      </div>

      <div className="artefactos-info-card">
        <h3 className="info-title">📚 Artefactos en Extreme Programming</h3>
        <p className="info-text">
          Aunque XP prefiere el código funcional sobre la documentación exhaustiva, ciertos artefactos 
          son esenciales: historias de usuario, tarjetas CRC, diagramas de diseño simple, pruebas 
          automatizadas y releases del software. Estos artefactos deben ser concisos y aportar valor real.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="artefactos-stats">
        <div className="stat-box">
          <span className="stat-number">{artefactos.length}</span>
          <span className="stat-label">Total Artefactos</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{contadoresPorTipo['Documento'] || 0}</span>
          <span className="stat-label">Documentos</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{contadoresPorTipo['Diagrama'] || 0}</span>
          <span className="stat-label">Diagramas</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{contadoresPorTipo['Código'] || 0}</span>
          <span className="stat-label">Código</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="artefactos-filtros">
        <div className="filtro-grupo">
          <h3 className="filtro-titulo">Filtrar por Fase:</h3>
          <div className="filtros-buttons">
            <button
              className={`filtro-btn ${filtroFase === 'todos' ? 'active' : ''}`}
              onClick={() => setFiltroFase('todos')}
            >
              Todas
            </button>
            {fases.map(fase => (
              <button
                key={fase.id}
                className={`filtro-btn ${filtroFase === fase.id ? 'active' : ''}`}
                onClick={() => setFiltroFase(fase.id)}
                style={filtroFase === fase.id ? { backgroundColor: fase.color, color: 'white', borderColor: fase.color } : {}}
              >
                {fase.nombre}
              </button>
            ))}
          </div>
        </div>

        <div className="filtro-grupo">
          <h3 className="filtro-titulo">Filtrar por Estado:</h3>
          <div className="filtros-buttons">
            <button
              className={`filtro-btn ${filtroEstado === 'todos' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('todos')}
            >
              Todos
            </button>
            <button
              className={`filtro-btn ${filtroEstado === 'completado' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('completado')}
            >
              Completados
            </button>
            <button
              className={`filtro-btn ${filtroEstado === 'en-progreso' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('en-progreso')}
            >
              En Progreso
            </button>
            <button
              className={`filtro-btn ${filtroEstado === 'pendiente' ? 'active' : ''}`}
              onClick={() => setFiltroEstado('pendiente')}
            >
              Pendientes
            </button>
          </div>
        </div>
      </div>

      {/* Lista de artefactos */}
      <div className="artefactos-lista">
        {artefactosFiltrados.length === 0 ? (
          <div className="no-artefactos">
            <div className="no-artefactos-icon">📭</div>
            <h3>No hay artefactos para mostrar</h3>
            <p>No se encontraron artefactos con los filtros seleccionados.</p>
          </div>
        ) : (
          <div className="artefactos-grid">
            {artefactosFiltrados.map((artefacto) => (
              <div key={artefacto.id} className="artefacto-card">
                <div 
                  className="artefacto-header"
                  style={{ borderTopColor: getFaseColor(artefacto.fase) }}
                >
                  <div className="artefacto-tipo-icon">
                    {getTipoIcon(artefacto.tipo)}
                  </div>
                  <span className={`badge ${getEstadoBadgeClass(artefacto.estado)}`}>
                    {artefacto.estado}
                  </span>
                </div>

                <div className="artefacto-content">
                  <h3 className="artefacto-titulo">{artefacto.nombre}</h3>
                  
                  <div className="artefacto-meta">
                    <div className="meta-item">
                      <span className="meta-label">Tipo:</span>
                      <span className="meta-value">{artefacto.tipo}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Fase:</span>
                      <span 
                        className="meta-value fase-tag"
                        style={{ 
                          backgroundColor: getFaseColor(artefacto.fase) + '20',
                          color: getFaseColor(artefacto.fase)
                        }}
                      >
                        {artefacto.fase.charAt(0).toUpperCase() + artefacto.fase.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="artefacto-info">
                    <div className="info-row">
                      <span className="info-icon">👤</span>
                      <span className="info-text">{artefacto.autor}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-icon">📅</span>
                      <span className="info-text">{formatearFecha(artefacto.fecha)}</span>
                    </div>
                  </div>

                  <div className="artefacto-url">
                    <span className="url-icon">🔗</span>
                    <span className="url-text">{artefacto.url}</span>
                  </div>
                </div>

                <div className="artefacto-footer">
                  <button className="artefacto-btn">
                    <span>📥</span> Descargar
                  </button>
                  <button className="artefacto-btn">
                    <span>👁️</span> Ver
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tipos de artefactos */}
      <div className="artefactos-tipos-info">
        <h2 className="tipos-info-titulo">Tipos de Artefactos en XP</h2>
        <div className="tipos-info-grid">
          <div className="tipo-info-card">
            <div className="tipo-info-icon">📄</div>
            <h3 className="tipo-info-titulo">Documentos</h3>
            <p className="tipo-info-descripcion">
              Historias de usuario, planes de releases, criterios de aceptación. Documentación 
              concisa y orientada al valor.
            </p>
            <ul className="tipo-info-ejemplos">
              <li>Historias de usuario</li>
              <li>Plan de entregas</li>
              <li>Criterios de aceptación</li>
            </ul>
          </div>

          <div className="tipo-info-card">
            <div className="tipo-info-icon">📊</div>
            <h3 className="tipo-info-titulo">Diagramas</h3>
            <p className="tipo-info-descripcion">
              Tarjetas CRC, diagramas de diseño simple, arquitectura del sistema. Visualizaciones 
              que facilitan la comprensión.
            </p>
            <ul className="tipo-info-ejemplos">
              <li>Tarjetas CRC</li>
              <li>Diagramas de diseño</li>
              <li>Gráficos de velocidad</li>
            </ul>
          </div>

          <div className="tipo-info-card">
            <div className="tipo-info-icon">💻</div>
            <h3 className="tipo-info-titulo">Código</h3>
            <p className="tipo-info-descripcion">
              Pruebas unitarias, pruebas de aceptación, código fuente. El artefacto más importante 
              en XP es el código funcional.
            </p>
            <ul className="tipo-info-ejemplos">
              <li>Pruebas unitarias</li>
              <li>Pruebas de aceptación</li>
              <li>Código fuente</li>
            </ul>
          </div>

          <div className="tipo-info-card">
            <div className="tipo-info-icon">📈</div>
            <h3 className="tipo-info-titulo">Métricas</h3>
            <p className="tipo-info-descripcion">
              Burndown charts, gráficos de velocidad, métricas de calidad. Datos que informan 
              la toma de decisiones.
            </p>
            <ul className="tipo-info-ejemplos">
              <li>Burndown charts</li>
              <li>Gráficos de velocidad</li>
              <li>Métricas de cobertura</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artefactos;
