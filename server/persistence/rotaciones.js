const path = require('path');
const { readJSON, writeJSON } = require('./filePersistence');

const ROTACIONES_FILE = path.join(__dirname, '../../XP/1_Planning/rotaciones_pair_programming.json');

/**
 * Cargar configuración de rotaciones
 */
const cargarRotaciones = () => {
  const rotaciones = readJSON(ROTACIONES_FILE);
  return rotaciones || {};
};

/**
 * Guardar configuración de rotaciones
 */
const guardarRotaciones = (rotaciones) => {
  return writeJSON(ROTACIONES_FILE, rotaciones);
};

/**
 * Asignar rol a una persona en un sprint
 */
const asignarRotacion = (persona, sprintId, rol) => {
  const rotaciones = cargarRotaciones();
  
  if (!rotaciones[persona]) {
    rotaciones[persona] = {};
  }
  
  rotaciones[persona][sprintId] = rol;
  guardarRotaciones(rotaciones);
  
  return rotaciones;
};

/**
 * Obtener rotación de una persona
 */
const obtenerRotacionPersona = (persona) => {
  const rotaciones = cargarRotaciones();
  return rotaciones[persona] || {};
};

/**
 * Obtener todas las rotaciones de un sprint
 */
const obtenerRotacionesSprint = (sprintId) => {
  const rotaciones = cargarRotaciones();
  const resultado = {};
  
  Object.keys(rotaciones).forEach(persona => {
    if (rotaciones[persona][sprintId]) {
      resultado[persona] = rotaciones[persona][sprintId];
    }
  });
  
  return resultado;
};

module.exports = {
  cargarRotaciones,
  guardarRotaciones,
  asignarRotacion,
  obtenerRotacionPersona,
  obtenerRotacionesSprint
};
