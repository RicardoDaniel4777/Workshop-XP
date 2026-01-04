const path = require('path');
const { readJSON, writeJSON } = require('./filePersistence');

const TARJETAS_CRC_FILE = path.join(__dirname, '../../XP/2_Design/tarjetas_crc.json');

/**
 * Cargar todas las tarjetas CRC
 */
const cargarTarjetasCRC = () => {
  const tarjetas = readJSON(TARJETAS_CRC_FILE);
  return tarjetas || [];
};

/**
 * Guardar todas las tarjetas CRC
 */
const guardarTarjetasCRC = (tarjetas) => {
  return writeJSON(TARJETAS_CRC_FILE, tarjetas);
};

/**
 * Crear una nueva tarjeta CRC
 */
const crearTarjetaCRC = (tarjeta) => {
  const tarjetas = cargarTarjetasCRC();
  const nuevaTarjeta = {
    ...tarjeta,
    id: tarjetas.length > 0 ? Math.max(...tarjetas.map(t => t.id)) + 1 : 1,
    fechaCreacion: new Date().toISOString(),
    fechaModificacion: new Date().toISOString()
  };
  tarjetas.push(nuevaTarjeta);
  guardarTarjetasCRC(tarjetas);
  return nuevaTarjeta;
};

/**
 * Actualizar una tarjeta CRC existente
 */
const actualizarTarjetaCRC = (id, datosActualizados) => {
  const tarjetas = cargarTarjetasCRC();
  const index = tarjetas.findIndex(t => t.id === id);
  
  if (index === -1) {
    throw new Error(`Tarjeta CRC con ID ${id} no encontrada`);
  }
  
  tarjetas[index] = {
    ...tarjetas[index],
    ...datosActualizados,
    id: tarjetas[index].id, // Mantener el ID original
    fechaCreacion: tarjetas[index].fechaCreacion, // Mantener fecha creación
    fechaModificacion: new Date().toISOString()
  };
  
  guardarTarjetasCRC(tarjetas);
  return tarjetas[index];
};

/**
 * Eliminar una tarjeta CRC
 */
const eliminarTarjetaCRC = (id) => {
  const tarjetas = cargarTarjetasCRC();
  const index = tarjetas.findIndex(t => t.id === id);
  
  if (index === -1) {
    throw new Error(`Tarjeta CRC con ID ${id} no encontrada`);
  }
  
  const tarjetaEliminada = tarjetas[index];
  tarjetas.splice(index, 1);
  guardarTarjetasCRC(tarjetas);
  return tarjetaEliminada;
};

/**
 * Obtener una tarjeta CRC por ID
 */
const obtenerTarjetaCRCPorId = (id) => {
  const tarjetas = cargarTarjetasCRC();
  return tarjetas.find(t => t.id === id);
};

module.exports = {
  cargarTarjetasCRC,
  guardarTarjetasCRC,
  crearTarjetaCRC,
  actualizarTarjetaCRC,
  eliminarTarjetaCRC,
  obtenerTarjetaCRCPorId
};
