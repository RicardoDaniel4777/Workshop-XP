import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useXP } from '../../context/XPContext';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import HistoriaUsuarioModal from '../../components/HistoriaUsuarioModal/HistoriaUsuarioModal';
import './ActivityDetail.css';

const ActivityDetail = () => {
  const { activityId } = useParams();
  const { 
    obtenerActividad, 
    actualizarProgresoActividad,
    historiasUsuario,
    crearHistoriaUsuario,
    actualizarHistoriaUsuario,
    eliminarHistoriaUsuario
  } = useXP();
  const navigate = useNavigate();
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [historiaEditando, setHistoriaEditando] = useState(null);
  
  const actividadConFase = obtenerActividad(activityId);

  if (!actividadConFase) {
    return (
      <div className="activity-detail">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h2>Actividad no encontrada</h2>
          <p>La actividad que buscas no existe en el sistema.</p>
          <Link to="/fases" className="btn btn-primary">
            Volver a Fases
          </Link>
        </div>
      </div>
    );
  }

  const { fase, faseId, ...actividad } = actividadConFase;

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case 'completada': return 'badge-success';
      case 'en-progreso': return 'badge-info';
      case 'pendiente': return 'badge-warning';
      default: return 'badge-default';
    }
  };

  const getTipoBadgeClass = (tipo) => {
    switch (tipo) {
      case 'practica': return 'badge-purple';
      case 'artefacto': return 'badge-blue';
      case 'actividad': return 'badge-green';
      case 'planificacion': return 'badge-orange';
      case 'metrica': return 'badge-pink';
      default: return 'badge-gray';
    }
  };

  const handleProgresoChange = (e) => {
    const nuevoProgreso = parseInt(e.target.value);
    actualizarProgresoActividad(faseId, activityId, nuevoProgreso);
  };

  // Funciones para el modal de historias de usuario
  const abrirModalNuevo = () => {
    setHistoriaEditando(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (historia) => {
    setHistoriaEditando(historia);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setHistoriaEditando(null);
  };

  const guardarHistoria = (historia) => {
    if (historiaEditando) {
      actualizarHistoriaUsuario(historiaEditando.id, historia);
    } else {
      crearHistoriaUsuario(historia);
    }
  };

  const handleEliminarHistoria = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta historia de usuario?')) {
      eliminarHistoriaUsuario(id);
    }
  };

  // Contenido detallado según el tipo de actividad
  const getContenidoDetallado = () => {
    switch (activityId) {
      case 'historias-usuario':
        return (
          <div className="detailed-content">
            <h3>📝 ¿Qué son las Historias de Usuario?</h3>
            <p>
              Las historias de usuario son descripciones cortas y simples de una característica 
              desde la perspectiva del usuario final. Siguen el formato: "Como [rol], quiero [acción] 
              para [beneficio]."
            </p>
            <h4>Ejemplos de Historias:</h4>
            <ul>
              <li><strong>HU-001:</strong> Como cliente, quiero buscar productos por categoría para encontrar rápidamente lo que necesito.</li>
              <li><strong>HU-002:</strong> Como administrador, quiero ver reportes de ventas para tomar decisiones informadas.</li>
              <li><strong>HU-003:</strong> Como usuario, quiero guardar mis preferencias para no configurar cada vez que ingreso.</li>
            </ul>
            <h4>Criterios de Aceptación:</h4>
            <ul>
              <li>La historia debe ser independiente</li>
              <li>Debe ser negociable con el cliente</li>
              <li>Debe aportar valor al usuario</li>
              <li>Debe ser estimable</li>
              <li>Debe ser pequeña (completable en una iteración)</li>
              <li>Debe ser testeable</li>
            </ul>
          </div>
        );

      case 'tdd':
        return (
          <div className="detailed-content">
            <h3>🧪 Test-Driven Development (TDD)</h3>
            <p>
              TDD es una práctica de desarrollo donde se escriben las pruebas antes que el código. 
              Sigue el ciclo Rojo-Verde-Refactor:
            </p>
            <ol>
              <li><strong style={{color: '#ef4444'}}>Rojo:</strong> Escribir una prueba que falle</li>
              <li><strong style={{color: '#10b981'}}>Verde:</strong> Escribir el código mínimo para que pase</li>
              <li><strong style={{color: '#3b82f6'}}>Refactor:</strong> Mejorar el código manteniendo las pruebas pasando</li>
            </ol>
            <h4>Beneficios de TDD:</h4>
            <ul>
              <li>Código más limpio y mantenible</li>
              <li>Mayor cobertura de pruebas</li>
              <li>Detección temprana de errores</li>
              <li>Diseño emergente y modular</li>
              <li>Documentación viva del código</li>
            </ul>
            <h4>Ejemplo de Ciclo TDD:</h4>
            <pre className="code-example">
{`// 1. Escribir la prueba (ROJO)
test('suma dos números correctamente', () => {
  expect(suma(2, 3)).toBe(5);
});

// 2. Implementar el código (VERDE)
function suma(a, b) {
  return a + b;
}

// 3. Refactorizar si es necesario
function suma(...numeros) {
  return numeros.reduce((acc, n) => acc + n, 0);
}`}
            </pre>
          </div>
        );

      case 'programacion-parejas':
        return (
          <div className="detailed-content">
            <h3>👥 Programación en Parejas</h3>
            <p>
              Dos programadores trabajan juntos en la misma estación de trabajo. Uno escribe el código 
              (conductor) mientras el otro revisa cada línea (navegador). Los roles se intercambian frecuentemente.
            </p>
            <h4>Roles en Pair Programming:</h4>
            <ul>
              <li><strong>Conductor (Driver):</strong> Escribe el código, se enfoca en los detalles tácticos</li>
              <li><strong>Navegador (Navigator):</strong> Revisa el código, piensa estratégicamente, sugiere mejoras</li>
            </ul>
            <h4>Beneficios:</h4>
            <ul>
              <li>Mejor calidad del código</li>
              <li>Transferencia de conocimiento inmediata</li>
              <li>Menos errores (revisión en tiempo real)</li>
              <li>Soluciones más creativas</li>
              <li>Menor interrupción individual</li>
            </ul>
            <h4>Mejores Prácticas:</h4>
            <ul>
              <li>Rotar parejas regularmente (cada 2-3 días)</li>
              <li>Cambiar roles cada 30-60 minutos</li>
              <li>Comunicación constante y respetuosa</li>
              <li>Tomar descansos juntos</li>
            </ul>
          </div>
        );

      case 'integracion-continua':
        return (
          <div className="detailed-content">
            <h3>🔄 Integración Continua</h3>
            <p>
              Los desarrolladores integran su código al repositorio principal varias veces al día. 
              Cada integración se verifica con un build automatizado y pruebas para detectar errores rápidamente.
            </p>
            <h4>Prácticas Clave:</h4>
            <ul>
              <li>Commits frecuentes (al menos una vez al día)</li>
              <li>Build automatizado</li>
              <li>Suite de pruebas automatizadas</li>
              <li>Builds rápidos (menos de 10 minutos)</li>
              <li>Todos ven los resultados del build</li>
              <li>Arreglar builds rotos inmediatamente</li>
            </ul>
            <h4>Herramientas Comunes:</h4>
            <ul>
              <li>Jenkins, GitLab CI, GitHub Actions</li>
              <li>Travis CI, CircleCI</li>
              <li>Azure DevOps, TeamCity</li>
            </ul>
          </div>
        );

      default:
        return (
          <div className="detailed-content">
            <h3>📋 Descripción Detallada</h3>
            <p>{actividad.descripcion}</p>
            <p>
              Esta actividad es fundamental en la fase de {fase} y contribuye al éxito del proyecto XP. 
              Asegúrate de seguir las mejores prácticas y mantener una comunicación constante con el equipo.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="activity-detail">
      <div className="activity-header">
        <div className="header-top">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Volver
          </button>
          <div className="header-badges">
            <span className={`badge ${getTipoBadgeClass(actividad.tipo)}`}>
              {actividad.tipo}
            </span>
            <span className={`badge ${getEstadoBadgeClass(actividad.estado)}`}>
              {actividad.estado}
            </span>
          </div>
        </div>
        
        <h1 className="activity-title">{actividad.nombre}</h1>
        <p className="activity-fase">Fase: {fase}</p>
      </div>

      <div className="activity-content">
        {/* Progreso */}
        <div className="content-card">
          <h2 className="card-title">Progreso de la Actividad</h2>
          <ProgressBar progreso={actividad.progreso} height="12px" />
          <div className="progress-controls">
            <label htmlFor="progreso-slider">Actualizar progreso:</label>
            <input
              id="progreso-slider"
              type="range"
              min="0"
              max="100"
              step="5"
              value={actividad.progreso}
              onChange={handleProgresoChange}
              className="progress-slider"
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="content-card">
          <h2 className="card-title">Descripción</h2>
          <p className="activity-description">{actividad.descripcion}</p>
        </div>

        {/* Roles asignados */}
        <div className="content-card">
          <h2 className="card-title">👥 Roles Asignados</h2>
          <div className="roles-grid">
            {actividad.roles.map((rol, index) => (
              <div key={index} className="role-chip">
                <span className="role-icon">👤</span>
                <span className="role-name">{rol}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Artefactos asociados */}
        <div className="content-card">
          <h2 className="card-title">📄 Artefactos Asociados</h2>
          
          {/* Lista de Historias de Usuario (solo para actividad historias-usuario) */}
          {activityId === 'historias-usuario' && (
            <div className="historias-usuario-section">
              <div className="historias-header">
                <p className="historias-count">
                  {historiasUsuario.length} {historiasUsuario.length === 1 ? 'Historia' : 'Historias'} de Usuario
                </p>
                <button onClick={abrirModalNuevo} className="btn btn-crear-historia">
                  + Crear Nueva
                </button>
              </div>

              {historiasUsuario.length === 0 ? (
                <div className="empty-state">
                  <p>No hay historias de usuario creadas.</p>
                  <p className="empty-hint">Haz clic en "Crear Nueva" para agregar tu primera historia.</p>
                </div>
              ) : (
                <div className="historias-list">
                  {historiasUsuario.map((historia) => (
                    <div key={historia.id} className="historia-card">
                      <div className="historia-card-header">
                        <div className="historia-codigo-titulo">
                          <span className="historia-codigo">{historia.codigo}</span>
                          <h4 className="historia-titulo">{historia.titulo}</h4>
                        </div>
                        <div className="historia-badges">
                          <span className={`badge badge-prioridad-${historia.prioridad.toLowerCase()}`}>
                            {historia.prioridad}
                          </span>
                          <span className={`badge ${getEstadoBadgeClass(historia.estado)}`}>
                            {historia.estado}
                          </span>
                        </div>
                      </div>

                      <div className="historia-narrative">
                        <p>
                          <strong>Como</strong> {historia.rol},{' '}
                          <strong>quiero</strong> {historia.accion},{' '}
                          <strong>para</strong> {historia.beneficio}
                        </p>
                      </div>

                      <div className="historia-meta">
                        <div className="meta-item">
                          <span className="meta-icon">📊</span>
                          <span>{historia.storyPoints} pts</span>
                        </div>
                        {historia.iteracion && (
                          <div className="meta-item">
                            <span className="meta-icon">🔁</span>
                            <span>{historia.iteracion}</span>
                          </div>
                        )}
                        <div className="meta-item">
                          <span className="meta-icon">✅</span>
                          <span>{historia.criteriosAceptacion.length} criterios</span>
                        </div>
                      </div>

                      <div className="historia-actions">
                        <button 
                          onClick={() => abrirModalEditar(historia)}
                          className="btn-icon btn-editar"
                          title="Editar historia"
                        >
                          ✏️ Editar
                        </button>
                        <button 
                          onClick={() => handleEliminarHistoria(historia.id)}
                          className="btn-icon btn-eliminar"
                          title="Eliminar historia"
                        >
                          🗑️ Eliminar
                        </button>
                      </div>

                      {/* Mostrar criterios de aceptación */}
                      {historia.criteriosAceptacion.length > 0 && (
                        <details className="historia-criterios">
                          <summary>Ver criterios de aceptación ({historia.criteriosAceptacion.length})</summary>
                          <ul className="criterios-list">
                            {historia.criteriosAceptacion.map((criterio, idx) => (
                              <li key={idx}>{criterio}</li>
                            ))}
                          </ul>
                        </details>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Artefactos genéricos (para otras actividades) */}
          {activityId !== 'historias-usuario' && (
            <div className="artefactos-list">
              {actividad.artefactos.map((artefacto, index) => (
                <div key={index} className="artefacto-item">
                  <span className="artefacto-icon">📎</span>
                  <span className="artefacto-name">{artefacto}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contenido detallado específico */}
        <div className="content-card">
          {getContenidoDetallado()}
        </div>

        {/* Acciones */}
        <div className="content-card">
          <h2 className="card-title">Acciones Disponibles</h2>
          <div className="actions-grid">
            <Link to="/artefactos" className="action-button">
              <span className="action-icon">📄</span>
              <span>Ver Artefactos</span>
            </Link>
            <Link to="/iteraciones" className="action-button">
              <span className="action-icon">🔁</span>
              <span>Ver Iteraciones</span>
            </Link>
            <Link to="/fases" className="action-button">
              <span className="action-icon">🔄</span>
              <span>Todas las Fases</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal de Historias de Usuario */}
      <HistoriaUsuarioModal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        onSave={guardarHistoria}
        historiaInicial={historiaEditando}
      />
    </div>
  );
};

export default ActivityDetail;
