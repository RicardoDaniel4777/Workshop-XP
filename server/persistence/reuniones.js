const path = require('path');
const { readJSON, writeJSON } = require('./filePersistence');

const STANDUPS_FILE = path.join(__dirname, '../../XP/1_Planning/reuniones_standups.json');

/**
 * Cargar todas las reuniones/standups
 */
const cargarStandups = () => {
  const standups = readJSON(STANDUPS_FILE);
  return standups || [];
};

/**
 * Guardar todas las reuniones/standups
 */
const guardarStandups = (standups) => {
  return writeJSON(STANDUPS_FILE, standups);
};

/**
 * Agregar un nuevo standup
 */
const agregarStandup = (standup) => {
  const standups = cargarStandups();
  
  const nuevoStandup = {
    id: `standup-${Date.now()}`,
    ayer: standup.ayer,
    hoy: standup.hoy,
    bloqueos: standup.bloqueos,
    fecha: new Date().toISOString()
  };
  
  standups.unshift(nuevoStandup); // Agregar al inicio
  guardarStandups(standups);
  
  return nuevoStandup;
};

/**
 * Eliminar un standup
 */
const eliminarStandup = (id) => {
  const standups = cargarStandups();
  const filtrados = standups.filter(s => s.id !== id);
  guardarStandups(filtrados);
  return true;
};

/**
 * Obtener standups de un rango de fechas
 */
const obtenerStandupsPorFecha = (desde, hasta) => {
  const standups = cargarStandups();
  const desdeDate = new Date(desde);
  const hastaDate = new Date(hasta);
  
  return standups.filter(s => {
    const fecha = new Date(s.fecha);
    return fecha >= desdeDate && fecha <= hastaDate;
  });
};

module.exports = {
  cargarStandups,
  guardarStandups,
  agregarStandup,
  eliminarStandup,
  obtenerStandupsPorFecha
};
