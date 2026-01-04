import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useXP } from '../../context/XPContext';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import HistoriaUsuarioModal from '../../components/HistoriaUsuarioModal/HistoriaUsuarioModal';
import { mockData } from '../../data/mockData';
import SystemMetaphor from '../../components/SystemMetaphor/SystemMetaphor';
import RefactorLog from '../../components/RefactorLog/RefactorLog';
import './ActivityDetail.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001/api' : '/api');

const ActivityDetail = () => {
  const { activityId } = useParams();
  const { 
    obtenerActividad, 
    actualizarProgresoActividad,
    historiasUsuario,
    iteraciones,
    crearHistoriaUsuario,
    actualizarHistoriaUsuario,
    eliminarHistoriaUsuario,
    numeroSprints,
    actualizarNumeroSprints,
    releasePlan,
    asignarHistoriaASprint,
    liberarHistoria,
    sprintFases,
    actualizarProgresoFaseSprint,
    standups,
    agregarStandup,
    inicializarSprintPlan,
    inicializarSprintFases
  } = useXP();
  const navigate = useNavigate();
  
  const [modalAbierto, setModalAbierto] = useState(false);
  const [historiaEditando, setHistoriaEditando] = useState(null);
  const [velocidadManual, setVelocidadManual] = useState(null);
  const [tiempoDisponible, setTiempoDisponible] = useState(80);
  const [rotaciones, setRotaciones] = useState({ diseno: {}, desarrollo: {}, pruebas: {} });
  const [areaSelections, setAreaSelections] = useState({
    diseno: [null, null],
    desarrollo: [null, null],
    pruebas: [null, null]
  });
  const [standupForm, setStandupForm] = useState({ ayer: '', hoy: '', bloqueos: '' });
  
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

  const sprintCatalog = useMemo(() => {
    return Array.from({ length: numeroSprints }, (_, idx) => {
      const iter = iteraciones[idx];
      const numero = idx + 1;
      return {
        id: `iter-${numero}`,
        nombre: iter?.nombre || `Sprint ${numero}`
      };
    });
  }, [iteraciones, numeroSprints]);

  // Integrantes provenientes de la actividad planning-game en mockData
  const planningGameMembers = useMemo(() => {
    const actividadPG = mockData.fases
      .flatMap(f => f.actividades || [])
      .find(act => act.id === 'planning-game');
    return Array.from(new Set(actividadPG?.roles || []));
  }, []);

  const rotacionAreas = useMemo(() => ([
    { key: 'diseno', titulo: 'Rotaciones Diseño' },
    { key: 'desarrollo', titulo: 'Rotaciones Desarrollo' },
    { key: 'pruebas', titulo: 'Rotaciones Pruebas' }
  ]), []);

  // Inicializar selección de 2 integrantes por área con los primeros del planning-game
  useEffect(() => {
    if (!planningGameMembers.length) return;
    setAreaSelections(prev => {
      const next = { ...prev };
      rotacionAreas.forEach(area => {
        const actual = prev[area.key] || [];
        if (!actual[0] || !actual[1]) {
          next[area.key] = [planningGameMembers[0] || null, planningGameMembers[1] || null].filter(Boolean);
          // Asegurar longitud 2
          if (next[area.key].length === 1) next[area.key].push(null);
          if (next[area.key].length === 0) next[area.key] = [null, null];
        }
      });
      return next;
    });
  }, [planningGameMembers, rotacionAreas]);

  const defaultFases = () => ({
    planificacion: 30,
    diseno: 25,
    desarrollo: 0,
    pruebas: 0
  });

  // Cargar rotaciones desde el backend y asegurar estructura con áreas/sprints/personas
  useEffect(() => {
    const rolesDisponibles = ['Driver', 'Navigator'];

    const mergeWithDefaults = (data) => {
      const base = {
        diseno: { personas: [null, null], rotas: {} },
        desarrollo: { personas: [null, null], rotas: {} },
        pruebas: { personas: [null, null], rotas: {} }
      };

      const merged = {
        ...base,
        ...(data || {})
      };

      rotacionAreas.forEach(area => {
        const seleccionados = (merged[area.key]?.personas?.length ? merged[area.key].personas : [null, null]).slice(0, 2);

        const areaData = merged[area.key]?.rotas || {};
        const nextAreaRotas = {};

        seleccionados.filter(Boolean).forEach(persona => {
          nextAreaRotas[persona] = { ...(areaData[persona] || {}) };
          sprintCatalog.forEach(sprint => {
            nextAreaRotas[persona][sprint.id] = nextAreaRotas[persona][sprint.id] || rolesDisponibles[0];
          });
        });

        merged[area.key] = {
          personas: [seleccionados[0] || null, seleccionados[1] || null],
          rotas: nextAreaRotas
        };
      });

      return merged;
    };

    const fetchRotaciones = async () => {
      try {
        const resp = await fetch(`${API_BASE_URL}/rotaciones`);
        if (!resp.ok) throw new Error('No se pudieron cargar rotaciones');
        const data = await resp.json();
        setRotaciones(mergeWithDefaults(data));
        // Sincronizar selección local con lo que viene del backend
        rotacionAreas.forEach(area => {
          setAreaSelections(prev => ({
            ...prev,
            [area.key]: [
              data?.[area.key]?.personas?.[0] || null,
              data?.[area.key]?.personas?.[1] || null
            ]
          }));
        });
      } catch (err) {
        // Si falla, usa estructura por defecto para no romper la UI
        setRotaciones(prev => mergeWithDefaults(prev));
      }
    };

    fetchRotaciones();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_BASE_URL, sprintCatalog]);

  useEffect(() => {
    // Inicializar releasePlan y sprintFases cuando cambia el catálogo de sprints
    if (sprintCatalog.length > 0) {
      inicializarSprintPlan(sprintCatalog);
      inicializarSprintFases(sprintCatalog);
    }
  }, [sprintCatalog, inicializarSprintPlan, inicializarSprintFases]);

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

  const handleDropHistoria = (event, sprintId) => {
    event.preventDefault();
    const codigo = event.dataTransfer.getData('text/plain');
    if (codigo) {
      asignarHistoriaASprint(codigo, sprintId);
    }
  };

  const historiasAsignadas = useMemo(
    () => Object.values(releasePlan).flatMap(sprint => sprint.historias),
    [releasePlan]
  );

  const historiasDisponibles = useMemo(
    () => historiasUsuario.filter(h => !historiasAsignadas.includes(h.codigo)),
    [historiasAsignadas, historiasUsuario]
  );

  const calcularDuracionSprint = (sprintId) => {
    const historias = releasePlan[sprintId]?.historias || [];
    return historias.reduce((sum, codigo) => {
      const historia = historiasUsuario.find(h => h.codigo === codigo);
      return sum + (historia?.storyPoints || 0);
    }, 0);
  };

  const totalStoryPoints = useMemo(
    () => historiasUsuario.reduce((sum, h) => sum + h.storyPoints, 0),
    [historiasUsuario]
  );

  const velocidadSugerida = sprintCatalog.length
    ? Math.round(totalStoryPoints / sprintCatalog.length)
    : totalStoryPoints;

  const velocidadEquipo = velocidadManual ?? velocidadSugerida;

  const persistPersonasArea = async (areaKey, personas) => {
    try {
      await fetch(`${API_BASE_URL}/rotaciones/personas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ area: areaKey, personas })
      });
    } catch (error) {
      console.error('Error guardando selección de personas', error);
    }
  };

  const actualizarSeleccionPersona = (areaKey, slotIndex, persona) => {
    setAreaSelections(prev => {
      const current = [...(prev[areaKey] || [null, null])];

      // Evitar duplicados entre los dos slots
      if (persona && current.some((p, idx) => p === persona && idx !== slotIndex)) {
        current[slotIndex] = persona;
        current[1 - slotIndex] = current[1 - slotIndex] === persona ? null : current[1 - slotIndex];
      } else {
        current[slotIndex] = persona || null;
      }

      const personasFiltradas = current.filter(Boolean).slice(0, 2);

      // Persistir selección
      persistPersonasArea(areaKey, personasFiltradas);

      // Sincronizar rotaciones en memoria para reflejar de inmediato
      setRotaciones(prevRot => {
        const next = { ...prevRot };
        const rolesDisponibles = ['Driver', 'Navigator'];

        if (!next[areaKey]) {
          next[areaKey] = { personas: [null, null], rotas: {} };
        }

        next[areaKey].personas = [personasFiltradas[0] || null, personasFiltradas[1] || null];

        const currentRotas = next[areaKey].rotas || {};
        const newRotas = {};
        personasFiltradas.forEach(p => {
          newRotas[p] = { ...(currentRotas[p] || {}) };
          sprintCatalog.forEach(s => {
            newRotas[p][s.id] = newRotas[p][s.id] || rolesDisponibles[0];
          });
        });
        next[areaKey].rotas = newRotas;

        return next;
      });

      return { ...prev, [areaKey]: current };
    });
  };

  const actualizarRotacion = async (areaKey, persona, sprintId, rol) => {
    // Optimista en UI
    setRotaciones(prev => {
      const next = { ...prev };
      const rolesDisponibles = ['Driver', 'Navigator'];

      if (!next[areaKey]) {
        next[areaKey] = { personas: [null, null], rotas: {} };
      }

      const currentRotas = next[areaKey].rotas || {};
      const newRotas = { ...currentRotas };
      newRotas[persona] = { ...(currentRotas[persona] || {}) };
      newRotas[persona][sprintId] = rol || rolesDisponibles[0];

      next[areaKey].rotas = newRotas;
      return next;
    });

    try {
      await fetch(`${API_BASE_URL}/rotaciones/asignar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ area: areaKey, persona, sprintId, rol })
      });
    } catch (error) {
      console.error('Error guardando rotación', error);
    }
  };

  const agregarStandupLocal = () => {
    if (!standupForm.ayer || !standupForm.hoy || !standupForm.bloqueos) {
      return;
    }
    agregarStandup(standupForm);
    setStandupForm({ ayer: '', hoy: '', bloqueos: '' });
  };

  const renderReleasePlan = () => (
    <div className="plan-card release-plan-card">
      <div className="plan-card-head">
        <div>
          <h3>Plan de Entregas (Release Plan)</h3>
          <p className="plan-card-subtitle">
            Arrastra o selecciona historias y asígnalas a un sprint para visualizar el esfuerzo.
          </p>
        </div>
        <div className="plan-inline-control">
          <span className="sprint-count">Total de Sprints: <strong>{numeroSprints}</strong></span>
        </div>
      </div>

      <div className="release-plan-layout">
        <div className="release-backlog">
          <div className="panel-title">Backlog de Historias</div>
          {historiasDisponibles.length === 0 ? (
            <p className="empty-hu">Todas las historias están asignadas.</p>
          ) : (
            <div className="hu-pills">
              {historiasDisponibles.map(historia => (
                <div
                  key={historia.codigo}
                  className="hu-pill"
                  draggable
                  onDragStart={(event) => event.dataTransfer.setData('text/plain', historia.codigo)}
                >
                  <div className="hu-pill-top">
                    <span className="hu-code">{historia.codigo}</span>
                    <span className="hu-points">{historia.storyPoints} pts</span>
                  </div>
                  <p className="hu-title">{historia.titulo}</p>
                  <select
                    aria-label={`Asignar ${historia.codigo}`}
                    defaultValue=""
                    onChange={(event) => asignarHistoriaASprint(historia.codigo, event.target.value)}
                  >
                    <option value="">Asignar a sprint</option>
                    {sprintCatalog.map(sprint => (
                      <option key={sprint.id} value={sprint.id}>{sprint.nombre}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sprint-drop-grid">
          {sprintCatalog.map(sprint => (
            <div
              key={sprint.id}
              className="sprint-drop"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDropHistoria(event, sprint.id)}
            >
              <div className="sprint-drop-head">
                <div>
                  <p className="sprint-name">{sprint.nombre}</p>
                  <span className="sprint-meta">{releasePlan[sprint.id]?.historias.length || 0} historias</span>
                </div>
                <span className="badge badge-info">{calcularDuracionSprint(sprint.id)} pts</span>
              </div>
              <div className="sprint-drop-body">
                {(releasePlan[sprint.id]?.historias || []).length === 0 ? (
                  <div className="drop-placeholder">Suelta una HU aquí</div>
                ) : (
                  releasePlan[sprint.id].historias.map(codigo => {
                    const historia = historiasUsuario.find(h => h.codigo === codigo);
                    return (
                      <div key={codigo} className="hu-assigned">
                        <div className="hu-assigned-main">
                          <span className="hu-code">{codigo}</span>
                          <span className="hu-assigned-title">{historia?.titulo}</span>
                        </div>
                        <div className="hu-assigned-actions">
                          <span className="hu-points">{historia?.storyPoints || 0} pts</span>
                          <button type="button" className="chip-remove" onClick={() => liberarHistoria(codigo)}>✕</button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="release-summary">
        <div className="release-summary-title">Resumen por Sprint</div>
        <table className="release-summary-table">
          <thead>
            <tr>
              <th>Sprint</th>
              <th>Historias asignadas</th>
              <th>Duración estimada</th>
            </tr>
          </thead>
          <tbody>
            {sprintCatalog.map(sprint => (
              <tr key={sprint.id}>
                <td>{sprint.nombre}</td>
                <td>{releasePlan[sprint.id]?.historias.length ? releasePlan[sprint.id].historias.join(', ') : 'Sin asignar'}</td>
                <td>{calcularDuracionSprint(sprint.id)} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderVelocidad = () => (
    <div className="plan-card velocity-card">
      <h3>Velocidad del Proyecto</h3>
      <p className="plan-card-subtitle">
        Calcula la velocidad sugerida y ajusta manualmente según la capacidad real del equipo.
      </p>
      <div className="velocity-grid">
        <div className="velocity-field">
          <label htmlFor="tiempo-disponible">Tiempo disponible (person-days)</label>
          <input
            id="tiempo-disponible"
            type="number"
            min="1"
            value={tiempoDisponible}
            onChange={(event) => setTiempoDisponible(Math.max(1, Number(event.target.value) || 1))}
          />
          <span className="helper-text">Ayuda a contrastar capacidad vs. carga</span>
        </div>
        <div className="velocity-field">
          <label>Velocidad sugerida</label>
          <div className="velocity-value">{velocidadSugerida} pts/iteración</div>
        </div>
        <div className="velocity-field">
          <label htmlFor="velocidad-manual">Ajuste manual del equipo</label>
          <input
            id="velocidad-manual"
            type="number"
            min="1"
            value={velocidadEquipo}
            onChange={(event) => setVelocidadManual(Math.max(1, Number(event.target.value) || 1))}
          />
          <span className="helper-text">Decisión consensuada del equipo</span>
        </div>
        <div className="velocity-metrics">
          <div>
            <p className="metric-label">Sprints configurados</p>
            <p className="metric-value-small">{sprintCatalog.length}</p>
          </div>
          <div>
            <p className="metric-label">Story Points totales</p>
            <p className="metric-value-small">{totalStoryPoints}</p>
          </div>
          <div>
            <p className="metric-label">Capacidad estimada</p>
            <p className="metric-value-small">{Math.round(tiempoDisponible / (sprintCatalog.length || 1))} días/sprint</p>
          </div>
          <div>
            <p className="metric-label">Velocidad acordada</p>
            <p className="metric-value-small highlight">{velocidadEquipo} pts</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGestorIteraciones = () => (
    <div className="plan-card iterations-card">
      <div className="plan-card-head">
        <div>
          <h3>Gestor de Iteraciones</h3>
          <p className="plan-card-subtitle">Controla el avance de las 4 fases XP en cada sprint.</p>
        </div>
        <div className="plan-inline-control">
          <label htmlFor="numero-sprints-iter"># Sprints</label>
          <input
            id="numero-sprints-iter"
            type="number"
            min="1"
            value={numeroSprints}
            onChange={(event) => actualizarNumeroSprints(Math.max(1, Number(event.target.value) || 1))}
          />
        </div>
      </div>
      <div className="mini-sprints-grid">
        {sprintFases.map(sprint => {
          const promedio = Math.round(
            (sprint.fases.planificacion + sprint.fases.diseno + sprint.fases.desarrollo + sprint.fases.pruebas) / 4
          );
          return (
            <div key={sprint.id} className="mini-sprint-card">
              <div className="mini-sprint-head">
                <div>
                  <p className="sprint-name">{sprint.nombre}</p>
                  <span className="sprint-meta">Promedio {promedio}%</span>
                </div>
                <div className="mini-progress">
                  <ProgressBar progreso={promedio} height="8px" />
                </div>
              </div>

              <div className="fase-rows">
                {[
                  ['planificacion', 'Planificación'],
                  ['diseno', 'Diseño'],
                  ['desarrollo', 'Desarrollo'],
                  ['pruebas', 'Pruebas']
                ].map(([clave, etiqueta]) => (
                  <div key={clave} className="fase-row">
                    <span className="fase-label">{etiqueta}</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={sprint.fases[clave]}
                      onChange={(event) => actualizarProgresoFaseSprint(sprint.id, clave, Number(event.target.value))}
                    />
                    <span className="fase-value">{sprint.fases[clave]}%</span>
                  </div>
                ))}
              </div>
             </div>
           );
         })}
       </div>
     </div>
   );

  const renderRotacionesArea = (areaKey, titulo) => {
    const areaData = rotaciones[areaKey]?.rotas || {};
    const rolesDisponibles = ['Driver', 'Navigator'];
    const seleccionados = (rotaciones[areaKey]?.personas || areaSelections[areaKey] || []).filter(Boolean);

    return (
      <div className="plan-card rotations-card" key={areaKey}>
        <h3>{titulo}</h3>
        <p className="plan-card-subtitle">Asigna Driver/Navigator por sprint sin bloquear otras áreas.</p>

        <div className="rotaciones-selectores">
          {[0, 1].map(idx => (
            <label key={idx} className="rotacion-selector">
              <span>Integrante {idx + 1}</span>
              <select
                value={(rotaciones[areaKey]?.personas || areaSelections[areaKey] || [])[idx] || ''}
                onChange={(event) => actualizarSeleccionPersona(areaKey, idx, event.target.value || null)}
              >
                <option value="">-- Seleccionar --</option>
                {planningGameMembers.map(persona => (
                  <option key={persona} value={persona}>{persona}</option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="rotaciones-table-wrapper">
          <table className="rotaciones-table">
            <thead>
              <tr>
                <th>Persona</th>
                {sprintCatalog.map(sprint => (
                  <th key={sprint.id}>{sprint.nombre}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {seleccionados.length === 0 && (
                <tr>
                  <td colSpan={sprintCatalog.length + 1} className="empty-hu">Selecciona dos integrantes para esta área.</td>
                </tr>
              )}
              {seleccionados.map(persona => (
                <tr key={persona}>
                  <td className="persona-col">{persona}</td>
                  {sprintCatalog.map(sprint => (
                    <td key={sprint.id}>
                      <select
                        value={areaData[persona]?.[sprint.id] || rolesDisponibles[0]}
                        onChange={(event) => actualizarRotacion(areaKey, persona, sprint.id, event.target.value)}
                      >
                        {rolesDisponibles.map(rol => (
                          <option key={rol} value={rol}>{rol}</option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {planningGameMembers.length === 0 && (
            <p className="empty-hu">No hay integrantes en planning-game.</p>
          )}
        </div>
      </div>
    );
  };

  // Renderiza las tres instancias independientes de rotaciones (Diseño, Desarrollo, Pruebas)
  const renderRotaciones = () => (
    <div className="rotaciones-grid">
      {rotacionAreas.map(area => renderRotacionesArea(area.key, area.titulo))}
    </div>
  );

  const renderStandup = () => (
    <div className="plan-card standup-card">
      <div className="plan-card-head">
        <div>
          <h3>Reuniones Diarias (Stand-up)</h3>
          <p className="plan-card-subtitle">Captura las cartas diarias y mantenlas visibles.</p>
        </div>
      </div>

      <div className="standup-form">
        <div className="standup-grid">
          <label>
            Qué se hizo ayer
            <textarea
              value={standupForm.ayer}
              onChange={(event) => setStandupForm({ ...standupForm, ayer: event.target.value })}
              placeholder="Resumen breve de ayer"
            />
          </label>
          <label>
            Qué se va a hacer hoy
            <textarea
              value={standupForm.hoy}
              onChange={(event) => setStandupForm({ ...standupForm, hoy: event.target.value })}
              placeholder="Objetivo principal de hoy"
            />
          </label>
          <label>
            Bloqueos / Problemas
            <textarea
              value={standupForm.bloqueos}
              onChange={(event) => setStandupForm({ ...standupForm, bloqueos: event.target.value })}
              placeholder="Riesgos, dependencias o impedimentos"
            />
          </label>
        </div>
        <button type="button" className="btn-primary standup-submit" onClick={agregarStandupLocal}>
          Guardar carta
        </button>
      </div>

      <div className="standup-list">
        {standups.map(item => (
          <div key={item.id} className="standup-card-item">
            <div className="standup-meta">
              {new Date(item.fecha).toLocaleString('es-ES', {
                day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
              })}
            </div>
            <div className="standup-fields">
              <div>
                <p className="standup-label">Ayer</p>
                <p className="standup-text">{item.ayer}</p>
              </div>
              <div>
                <p className="standup-label">Hoy</p>
                <p className="standup-text">{item.hoy}</p>
              </div>
              <div>
                <p className="standup-label">Bloqueos</p>
                <p className="standup-text">{item.bloqueos}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlanificacionTool = () => {
    switch (activityId) {
      case 'plan-entregas':
        return renderReleasePlan();
      case 'velocidad-proyecto':
        return renderVelocidad();
      case 'iteraciones-cortas':
        return renderGestorIteraciones();
      case 'planning-game':
        return renderRotaciones();
      case 'reuniones':
        return renderStandup();
      default:
        return null;
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

  const planificacionTool = faseId === 'planificacion' ? renderPlanificacionTool() : null;

  return (
    <div className="activity-detail">
      <div className="activity-header">
        <div className="header-top">
          <button
            onClick={() => {
              if (activityId === 'tarjetas-crc') {
                navigate('/');
              } else {
                navigate(-1);
              }
            }}
            className="back-button"
          >
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

        {activityId === 'metafora-sistema' && (
          <div className="content-card">
            <SystemMetaphor />
          </div>
        )}

        {activityId === 'refactorizacion' && (
          <div className="content-card">
            <RefactorLog />
          </div>
        )}

        {/* Acciones */}
        <div className="content-card">
          <h2 className="card-title">Acciones Disponibles</h2>
          <div className="actions-grid">
            {activityId === 'tarjetas-crc' && (
              <Link to="/tarjetas-crc" className="action-button">
                <span className="action-icon">🎴</span>
                <span>Abrir gestor CRC</span>
              </Link>
            )}
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

        {planificacionTool && (
          <div className="content-card planificacion-tools">
            <h2 className="card-title">Herramienta Interactiva de Planificación</h2>
            {planificacionTool}
          </div>
        )}
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
