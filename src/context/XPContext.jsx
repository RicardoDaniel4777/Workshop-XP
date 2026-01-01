import React, { createContext, useContext, useState } from 'react';
import { mockData, calcularProgresoGeneral, obtenerActividad, obtenerEstadisticas } from '../data/mockData';

const XPContext = createContext();

export const useXP = () => {
  const context = useContext(XPContext);
  if (!context) {
    throw new Error('useXP debe ser usado dentro de un XPProvider');
  }
  return context;
};

export const XPProvider = ({ children }) => {
  const [data, setData] = useState(mockData);
  const [historiasUsuario, setHistoriasUsuario] = useState([
    {
      id: 1,
      codigo: "HU-001",
      titulo: "Búsqueda de productos por categoría",
      rol: "Cliente",
      accion: "buscar productos por categoría",
      beneficio: "encontrar rápidamente lo que necesito",
      prioridad: "Alta",
      storyPoints: 5,
      criteriosAceptacion: [
        "El sistema debe mostrar todas las categorías disponibles",
        "Los resultados deben filtrarse en tiempo real",
        "Debe mostrar al menos 10 productos por categoría"
      ],
      estado: "completada",
      iteracion: "Iteración 1"
    },
    {
      id: 2,
      codigo: "HU-002",
      titulo: "Reportes de ventas para administradores",
      rol: "Administrador",
      accion: "ver reportes de ventas mensuales",
      beneficio: "tomar decisiones informadas sobre el negocio",
      prioridad: "Alta",
      storyPoints: 8,
      criteriosAceptacion: [
        "El reporte debe incluir gráficos de ventas",
        "Debe permitir filtrar por fecha",
        "Debe poder exportarse en PDF"
      ],
      estado: "en-progreso",
      iteracion: "Iteración 2"
    },
    {
      id: 3,
      codigo: "HU-003",
      titulo: "Guardar preferencias del usuario",
      rol: "Usuario",
      accion: "guardar mis preferencias de visualización",
      beneficio: "no tener que configurar cada vez que ingreso",
      prioridad: "Media",
      storyPoints: 3,
      criteriosAceptacion: [
        "Las preferencias deben persistir entre sesiones",
        "Debe incluir tema (claro/oscuro)",
        "Debe recordar el idioma seleccionado"
      ],
      estado: "completada",
      iteracion: "Iteración 1"
    }
  ]);

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
          // Recalcular progreso de la fase
          const totalActividades = fase.actividades.length;
          const sumaProgresos = fase.actividades.reduce((sum, a) => sum + a.progreso, 0);
          fase.progreso = Math.round(sumaProgresos / totalActividades);
          
          // Actualizar estado de la fase
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

  // Función para marcar una actividad como completada
  const completarActividad = (faseId, activityId) => {
    actualizarProgresoActividad(faseId, activityId, 100);
  };

  // CRUD de Historias de Usuario
  const crearHistoriaUsuario = (historia) => {
    const nuevaHistoria = {
      ...historia,
      id: historiasUsuario.length > 0 ? Math.max(...historiasUsuario.map(h => h.id)) + 1 : 1,
      codigo: `HU-${String(historiasUsuario.length + 1).padStart(3, '0')}`
    };
    setHistoriasUsuario([...historiasUsuario, nuevaHistoria]);
    return nuevaHistoria;
  };

  const actualizarHistoriaUsuario = (id, historiaActualizada) => {
    setHistoriasUsuario(historiasUsuario.map(h => 
      h.id === id ? { ...h, ...historiaActualizada } : h
    ));
  };

  const eliminarHistoriaUsuario = (id) => {
    setHistoriasUsuario(historiasUsuario.filter(h => h.id !== id));
  };

  const obtenerHistoriaUsuario = (id) => {
    return historiasUsuario.find(h => h.id === id);
  };

  const value = {
    data,
    proyecto: data.proyecto,
    fases: data.fases,
    iteraciones: data.iteraciones,
    artefactos: data.artefactos,
    eventos: data.eventos,
    roles: data.roles,
    historiasUsuario,
    calcularProgresoGeneral,
    obtenerActividad,
    obtenerEstadisticas,
    actualizarProgresoActividad,
    completarActividad,
    crearHistoriaUsuario,
    actualizarHistoriaUsuario,
    eliminarHistoriaUsuario,
    obtenerHistoriaUsuario
  };

  return <XPContext.Provider value={value}>{children}</XPContext.Provider>;
};
