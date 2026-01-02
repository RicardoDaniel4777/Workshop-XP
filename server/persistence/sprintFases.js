const path = require('path');
const { readJSON, writeJSON } = require('./filePersistence');

const SPRINTS_FILE = path.join(__dirname, '../../XP/1_Planning/sprints_fases.json');

/**
 * Estructura inicial de sprints con fases
 */
const sprintsInicial = () => ({
  sprints: [],
  ultimaActualizacion: new Date().toISOString()
});

/**
 * Cargar configuración de sprints y sus fases
 */
const cargarSprintsFases = () => {
  const sprints = readJSON(SPRINTS_FILE);
  return sprints || sprintsInicial();
};

/**
 * Guardar sprints y fases
 */
const guardarSprintsFases = (sprints) => {
  const sprintsConFecha = {
    ...sprints,
    ultimaActualizacion: new Date().toISOString()
  };
  return writeJSON(SPRINTS_FILE, sprintsConFecha);
};

/**
 * Inicializar fases para sprints
 */
const inicializarSprintFases = (sprintCatalog) => {
  const config = cargarSprintsFases();
  
  const sprints = sprintCatalog.map(sprint => {
    const existente = config.sprints.find(s => s.id === sprint.id);
    return existente ? existente : {
      id: sprint.id,
      nombre: sprint.nombre,
      fases: {
        planificacion: 30,
        diseno: 25,
        desarrollo: 0,
        pruebas: 0
      }
    };
  });
  
  config.sprints = sprints;
  guardarSprintsFases(config);
  return config;
};

/**
 * Actualizar progreso de una fase en un sprint
 */
const actualizarProgresoFaseSprint = (sprintId, faseClave, valor) => {
  const config = cargarSprintsFases();
  const sprint = config.sprints.find(s => s.id === sprintId);
  
  if (!sprint) {
    throw new Error(`Sprint ${sprintId} no encontrado`);
  }
  
  sprint.fases[faseClave] = Math.min(100, Math.max(0, valor));
  guardarSprintsFases(config);
  
  return sprint;
};

/**
 * Obtener fases de un sprint
 */
const obtenerFasesSprint = (sprintId) => {
  const config = cargarSprintsFases();
  const sprint = config.sprints.find(s => s.id === sprintId);
  return sprint ? sprint.fases : null;
};

module.exports = {
  cargarSprintsFases,
  guardarSprintsFases,
  inicializarSprintFases,
  actualizarProgresoFaseSprint,
  obtenerFasesSprint
};
