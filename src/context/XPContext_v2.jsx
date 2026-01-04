import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockData, calcularProgresoGeneral, obtenerActividad, obtenerEstadisticas } from '../data/mockData';

const XPContext = createContext();

// En desarrollo usa localhost:3001, en producción usa rutas relativas (nginx proxy)
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001/api' : '/api');

export const useXP = () => {
  const context = useContext(XPContext);
  if (!context) {
    throw new Error('useXP debe ser usado dentro de un XPProvider');
  }
  return context;
};

/**
 * Helper para hacer requests a la API
 */
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error en la API');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

export const XPProvider = ({ children }) => {
  // Estados
  const [data, setData] = useState(mockData);
  const [numeroSprints, setNumeroSprints] = useState(3);
  const [releasePlan, setReleasePlan] = useState({});
  const [sprintFases, setSprintFases] = useState([]);
  const [standups, setStandups] = useState([]);
  const [historiasUsuario, setHistoriasUsuario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  /**
   * Cargar datos iniciales del servidor al montar el componente
   */
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        setApiError(null);

        // Cargar historias
        try {
          const historias = await fetchAPI('/historias');
          setHistoriasUsuario(historias);
        } catch (error) {
          console.warn('No se pudieron cargar historias, usando valores por defecto');
          setHistoriasUsuario(mockData.historiasUsuario || []);
        }

        // Cargar plan de entregas
        try {
          const plan = await fetchAPI('/plan');
          setNumeroSprints(plan.numeroSprints || 3);
          setReleasePlan(plan.sprints || {});
        } catch (error) {
          console.warn('No se pudo cargar plan, usando valores por defecto');
        }

        // Cargar sprints con fases
        try {
          const config = await fetchAPI('/sprints-fases');
          setSprintFases(config.sprints || []);
        } catch (error) {
          console.warn('No se pudieron cargar fases, usando valores por defecto');
        }

        // Cargar reuniones
        try {
          const reuniones = await fetchAPI('/reuniones');
          setStandups(reuniones);
        } catch (error) {
          console.warn('No se pudieron cargar reuniones, usando valores por defecto');
        }
      } catch (error) {
        console.error('Error cargando datos iniciales:', error);
        setApiError(error.message);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // Función para actualizar el progreso de una actividad
  const actualizarProgresoActividad = (faseId, activityId, nuevoProgreso) => {
    setData(prevData => {
      const newData = { ...prevData };
      const fase = newData.fases.find(f => f.id === faseId);
      if (fase) {
        const actividad = fase.actividades.find(a => a.id === activityId);
        if (actividad) {
          actividad.progreso = nuevoProgreso;
          if (nuevoProgreso === 100) {
            actividad.estado = 'completada';
          } else if (nuevoProgreso > 0) {
            actividad.estado = 'en-progreso';
          }
          const totalActividades = fase.actividades.length;
          const sumaProgresos = fase.actividades.reduce((sum, a) => sum + a.progreso, 0);
          fase.progreso = Math.round(sumaProgresos / totalActividades);
          
          if (fase.progreso === 100) {
            fase.estado = 'completada';
          } else if (fase.progreso > 0) {
            fase.estado = 'en-progreso';
          }
        }
      }
      return newData;
    });
  };

  const completarActividad = (faseId, activityId) => {
    actualizarProgresoActividad(faseId, activityId, 100);
  };

  // CRUD de Historias de Usuario - Con persistencia
  const crearHistoriaUsuario = useCallback(async (historia) => {
    try {
      const nueva = await fetchAPI('/historias', {
        method: 'POST',
        body: JSON.stringify(historia)
      });
      setHistoriasUsuario(prev => [...prev, nueva]);
      return nueva;
    } catch (error) {
      console.error('Error creando historia:', error);
      throw error;
    }
  }, []);

  const actualizarHistoriaUsuario = useCallback(async (id, historiaActualizada) => {
    try {
      const actualizada = await fetchAPI(`/historias/${id}`, {
        method: 'PUT',
        body: JSON.stringify(historiaActualizada)
      });
      setHistoriasUsuario(prev =>
        prev.map(h => h.id === id ? actualizada : h)
      );
      return actualizada;
    } catch (error) {
      console.error('Error actualizando historia:', error);
      throw error;
    }
  }, []);

  const eliminarHistoriaUsuario = useCallback(async (id) => {
    try {
      await fetchAPI(`/historias/${id}`, { method: 'DELETE' });
      setHistoriasUsuario(prev => prev.filter(h => h.id !== id));
    } catch (error) {
      console.error('Error eliminando historia:', error);
      throw error;
    }
  }, []);

  const obtenerHistoriaUsuario = (id) => {
    return historiasUsuario.find(h => h.id === id);
  };

  // Funciones para gestionar planificación - Con persistencia
  const actualizarNumeroSprints = useCallback(async (num) => {
    try {
      const plan = await fetchAPI('/plan/numero-sprints', {
        method: 'POST',
        body: JSON.stringify({ numero: num })
      });
      setNumeroSprints(plan.numeroSprints);
      setReleasePlan(plan.sprints || {});
      return plan;
    } catch (error) {
      console.error('Error actualizando número de sprints:', error);
      throw error;
    }
  }, []);

  const asignarHistoriaASprint = useCallback(async (codigo, sprintId) => {
    try {
      const plan = await fetchAPI('/plan/asignar-historia', {
        method: 'POST',
        body: JSON.stringify({ codigoHistoria: codigo, sprintId })
      });
      setReleasePlan(plan.sprints || {});
      return plan;
    } catch (error) {
      console.error('Error asignando historia a sprint:', error);
      throw error;
    }
  }, []);

  const liberarHistoria = useCallback(async (codigo) => {
    try {
      const plan = await fetchAPI('/plan/liberar-historia', {
        method: 'POST',
        body: JSON.stringify({ codigoHistoria: codigo })
      });
      setReleasePlan(plan.sprints || {});
      return plan;
    } catch (error) {
      console.error('Error liberando historia:', error);
      throw error;
    }
  }, []);

  const inicializarSprintPlan = useCallback(async (sprintCatalog) => {
    try {
      const plan = await fetchAPI('/plan', {
        method: 'GET'
      });
      setReleasePlan(plan.sprints || {});
      return plan;
    } catch (error) {
      console.error('Error inicializando plan:', error);
    }
  }, []);

  const inicializarSprintFases = useCallback(async (sprintCatalog) => {
    try {
      const config = await fetchAPI('/sprints-fases/inicializar', {
        method: 'POST',
        body: JSON.stringify({ sprintCatalog })
      });
      setSprintFases(config.sprints || []);
      return config;
    } catch (error) {
      console.error('Error inicializando fases:', error);
    }
  }, []);

  const actualizarProgresoFaseSprint = useCallback(async (sprintId, faseClave, valor) => {
    try {
      const sprint = await fetchAPI('/sprints-fases/actualizar-progreso', {
        method: 'POST',
        body: JSON.stringify({ sprintId, faseClave, valor })
      });
      setSprintFases(prev =>
        prev.map(s => s.id === sprintId ? sprint : s)
      );
      return sprint;
    } catch (error) {
      console.error('Error actualizando progreso de fase:', error);
      throw error;
    }
  }, []);

  const agregarStandup = useCallback(async (standup) => {
    try {
      const nuevoStandup = await fetchAPI('/reuniones', {
        method: 'POST',
        body: JSON.stringify(standup)
      });
      setStandups(prev => [nuevoStandup, ...prev]);
      return nuevoStandup;
    } catch (error) {
      console.error('Error agregando standup:', error);
      throw error;
    }
  }, []);

  const value = {
    // Datos
    data,
    proyecto: data.proyecto,
    fases: data.fases,
    iteraciones: data.iteraciones,
    artefactos: data.artefactos,
    eventos: data.eventos,
    roles: data.roles,
    historiasUsuario,
    numeroSprints,
    releasePlan,
    sprintFases,
    standups,
    
    // Estado de carga
    loading,
    apiError,
    
    // Funciones principales
    calcularProgresoGeneral,
    obtenerActividad,
    obtenerEstadisticas,
    actualizarProgresoActividad,
    completarActividad,
    
    // CRUD Historias
    crearHistoriaUsuario,
    actualizarHistoriaUsuario,
    eliminarHistoriaUsuario,
    obtenerHistoriaUsuario,
    
    // Funciones de planificación
    actualizarNumeroSprints,
    asignarHistoriaASprint,
    liberarHistoria,
    inicializarSprintPlan,
    inicializarSprintFases,
    actualizarProgresoFaseSprint,
    agregarStandup
  };

  return <XPContext.Provider value={value}>{children}</XPContext.Provider>;
};
