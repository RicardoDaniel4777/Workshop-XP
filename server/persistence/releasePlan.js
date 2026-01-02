const path = require('path');
const { readJSON, writeJSON } = require('./filePersistence');

const PLAN_FILE = path.join(__dirname, '../../XP/1_Planning/release_plan.json');

/**
 * Estructura inicial del plan de entregas
 */
const planInicial = () => ({
  numeroSprints: 3,
  sprints: {},
  ultimaActualizacion: new Date().toISOString()
});

/**
 * Cargar el plan de entregas actual
 */
const cargarPlan = () => {
  const plan = readJSON(PLAN_FILE);
  return plan || planInicial();
};

/**
 * Guardar el plan de entregas
 */
const guardarPlan = (plan) => {
  const planConFecha = {
    ...plan,
    ultimaActualizacion: new Date().toISOString()
  };
  return writeJSON(PLAN_FILE, planConFecha);
};

/**
 * Actualizar número de sprints
 */
const actualizarNumeroSprints = (numero) => {
  const plan = cargarPlan();
  plan.numeroSprints = numero;
  
  // Asegurar que existen entradas para cada sprint
  for (let i = 1; i <= numero; i++) {
    const sprintId = `iter-${i}`;
    if (!plan.sprints[sprintId]) {
      plan.sprints[sprintId] = {
        id: sprintId,
        nombre: `Sprint ${i}`,
        historias: []
      };
    }
  }
  
  // Eliminar sprints que ya no existen
  Object.keys(plan.sprints).forEach(sprintId => {
    const sprintNum = parseInt(sprintId.split('-')[1]);
    if (sprintNum > numero) {
      delete plan.sprints[sprintId];
    }
  });
  
  guardarPlan(plan);
  return plan;
};

/**
 * Asignar historia a sprint
 */
const asignarHistoriaASprint = (codigoHistoria, sprintId) => {
  const plan = cargarPlan();
  
  // Remover historia de todos los sprints
  Object.keys(plan.sprints).forEach(id => {
    plan.sprints[id].historias = plan.sprints[id].historias.filter(h => h !== codigoHistoria);
  });
  
  // Agregar a sprint específico
  if (plan.sprints[sprintId]) {
    if (!plan.sprints[sprintId].historias.includes(codigoHistoria)) {
      plan.sprints[sprintId].historias.push(codigoHistoria);
    }
  }
  
  guardarPlan(plan);
  return plan;
};

/**
 * Liberar historia de todos los sprints
 */
const liberarHistoria = (codigoHistoria) => {
  const plan = cargarPlan();
  
  Object.keys(plan.sprints).forEach(sprintId => {
    plan.sprints[sprintId].historias = plan.sprints[sprintId].historias.filter(h => h !== codigoHistoria);
  });
  
  guardarPlan(plan);
  return plan;
};

module.exports = {
  cargarPlan,
  guardarPlan,
  actualizarNumeroSprints,
  asignarHistoriaASprint,
  liberarHistoria
};
