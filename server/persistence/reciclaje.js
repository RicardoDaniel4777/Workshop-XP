const path = require('path');
const { readJSON, writeJSON } = require('./filePersistence');

const FILE_PATH = path.join(__dirname, '../../XP/2_Design/reciclaje.json');

const normalizeItem = (item, idx) => ({
  id: item.id ?? idx + 1,
  fecha: item.fecha || new Date().toISOString(),
  componenteClase: item.componenteClase || '',
  proyectoOrigen: item.proyectoOrigen || '',
  notasAdaptacion: item.notasAdaptacion || ''
});

const getReciclajes = () => {
  const data = readJSON(FILE_PATH) || { items: [] };
  const items = Array.isArray(data.items) ? data.items.map(normalizeItem) : [];
  return { items };
};

const saveReciclajes = (payload) => {
  const items = Array.isArray(payload.items) ? payload.items.map(normalizeItem) : [];
  const next = { items };
  writeJSON(FILE_PATH, next);
  return next;
};

module.exports = {
  getReciclajes,
  saveReciclajes
};
