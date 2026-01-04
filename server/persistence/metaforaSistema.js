const path = require('path');
const { readJSON, writeJSON } = require('./filePersistence');

const FILE_PATH = path.join(__dirname, '../../XP/2_Design/metafora_sistema.json');

const getMetafora = () => {
  const data = readJSON(FILE_PATH);
  if (!data) return { narrativa: '', glosario: [] };
  return {
    narrativa: data.narrativa || '',
    glosario: Array.isArray(data.glosario) ? data.glosario : []
  };
};

const saveMetafora = (payload) => {
  const current = getMetafora();
  const next = {
    narrativa: payload.narrativa ?? current.narrativa ?? '',
    glosario: Array.isArray(payload.glosario) ? payload.glosario : current.glosario
  };
  writeJSON(FILE_PATH, next);
  return next;
};

module.exports = {
  getMetafora,
  saveMetafora
};
