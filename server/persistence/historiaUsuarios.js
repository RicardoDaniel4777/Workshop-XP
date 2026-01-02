const path = require('path');
const { readJSON, writeJSON } = require('./filePersistence');

const HISTORIAS_FILE = path.join(__dirname, '../../XP/1_Planning/historias_usuarios.json');

/**
 * Cargar todas las historias de usuario
 */
const cargarHistorias = () => {
  const historias = readJSON(HISTORIAS_FILE);
  return historias || [];
};

/**
 * Guardar todas las historias de usuario
 */
const guardarHistorias = (historias) => {
  return writeJSON(HISTORIAS_FILE, historias);
};

/**
 * Crear una nueva historia de usuario
 */
const crearHistoria = (historia) => {
  const historias = cargarHistorias();
  const nuevaHistoria = {
    ...historia,
    id: historias.length > 0 ? Math.max(...historias.map(h => h.id)) + 1 : 1,
    codigo: `HU-${String(historias.length + 1).padStart(3, '0')}`,
    fechaCreacion: new Date().toISOString()
  };
  historias.push(nuevaHistoria);
  guardarHistorias(historias);
  return nuevaHistoria;
};

/**
 * Actualizar una historia existente
 */
const actualizarHistoria = (id, datosActualizados) => {
  const historias = cargarHistorias();
  const index = historias.findIndex(h => h.id === id);
  
  if (index === -1) {
    throw new Error(`Historia con ID ${id} no encontrada`);
  }
  
  historias[index] = {
    ...historias[index],
    ...datosActualizados,
    fechaModificacion: new Date().toISOString()
  };
  
  guardarHistorias(historias);
  return historias[index];
};

/**
 * Eliminar una historia
 */
const eliminarHistoria = (id) => {
  const historias = cargarHistorias();
  const historiasActualizadas = historias.filter(h => h.id !== id);
  guardarHistorias(historiasActualizadas);
  return true;
};

/**
 * Obtener una historia por ID
 */
const obtenerHistoria = (id) => {
  const historias = cargarHistorias();
  return historias.find(h => h.id === id) || null;
};

module.exports = {
  cargarHistorias,
  guardarHistorias,
  crearHistoria,
  actualizarHistoria,
  eliminarHistoria,
  obtenerHistoria
};
