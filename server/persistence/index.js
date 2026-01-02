/**
 * Index centralizado de módulos de persistencia
 * Exporta todas las funciones de persistencia para acceso fácil desde routes/API
 */

const historiaUsuarios = require('./historiaUsuarios');
const releasePlan = require('./releasePlan');
const sprintFases = require('./sprintFases');
const reuniones = require('./reuniones');
const rotaciones = require('./rotaciones');

module.exports = {
  historiaUsuarios,
  releasePlan,
  sprintFases,
  reuniones,
  rotaciones,
  
  // Export funciones individuales para acceso directo
  ...historiaUsuarios,
  ...releasePlan,
  ...sprintFases,
  ...reuniones,
  ...rotaciones
};
