const path = require('path');
const { readJSON, writeJSON } = require('./filePersistence');

const ROTACIONES_FILE = path.join(__dirname, '../../XP/1_Planning/rotaciones_pair_programming.json');

const AREAS = ['diseno', 'desarrollo', 'pruebas'];

const estructuraArea = () => ({ personas: [], rotas: {} });

const estructuraBase = () => ({
  diseno: estructuraArea(),
  desarrollo: estructuraArea(),
  pruebas: estructuraArea()
});

/**
 * Cargar configuración de rotaciones
 */
const normalizar = (data) => {
  const base = estructuraBase();
  let migrated = false;

  // Si viene con la nueva forma
  if (data && typeof data === 'object' && (data.diseno || data.desarrollo || data.pruebas)) {
    AREAS.forEach(a => {
      if (data[a]) {
        const personas = Array.isArray(data[a].personas) ? data[a].personas : [];
        const rotas = data[a].rotas && typeof data[a].rotas === 'object' ? data[a].rotas : {};
        base[a] = { personas, rotas };
      }
    });
    return { base, migrated };
  }

  // Compatibilidad hacia atrás: formato antiguo plano -> lo ponemos como diseno.rotas
  if (data && typeof data === 'object') {
    base.diseno.rotas = data;
    migrated = true;
  }

  return { base, migrated };
};

const cargarRotaciones = () => {
  const rotaciones = readJSON(ROTACIONES_FILE);
  const { base, migrated } = normalizar(rotaciones);

  // Si migramos desde formato antiguo, reescribir archivo en nuevo formato
  if (migrated) {
    guardarRotaciones(base);
  }

  return base;
};

/**
 * Guardar configuración de rotaciones
 */
const guardarRotaciones = (rotaciones) => writeJSON(ROTACIONES_FILE, rotaciones);

/**
 * Asignar rol a una persona en un sprint
 */
const asignarRotacion = (area = 'diseno', persona, sprintId, rol) => {
  const rotaciones = cargarRotaciones();

  if (!rotaciones[area]) rotaciones[area] = estructuraArea();
  if (!rotaciones[area].rotas[persona]) rotaciones[area].rotas[persona] = {};

  // Asegurar que la persona está en la lista de selección del área
  if (!rotaciones[area].personas.includes(persona)) {
    rotaciones[area].personas = [...rotaciones[area].personas, persona].slice(0, 2);
  }

  rotaciones[area].rotas[persona][sprintId] = rol;
  guardarRotaciones(rotaciones);
  return rotaciones;
};

const actualizarPersonasArea = (area = 'diseno', personas = []) => {
  const rotaciones = cargarRotaciones();
  if (!rotaciones[area]) rotaciones[area] = estructuraArea();

  const personasFiltradas = personas.filter(Boolean).slice(0, 2);
  rotaciones[area].personas = personasFiltradas;

  // Limpiar rotas de quienes ya no están seleccionados
  const nuevasRotas = {};
  personasFiltradas.forEach(p => {
    nuevasRotas[p] = rotaciones[area].rotas[p] || {};
  });
  rotaciones[area].rotas = nuevasRotas;

  guardarRotaciones(rotaciones);
  return rotaciones;
};

/**
 * Obtener rotación de una persona
 */
const obtenerRotacionPersona = (area = 'diseno', persona) => {
  const rotaciones = cargarRotaciones();
  return rotaciones[area]?.rotas?.[persona] || {};
};

/**
 * Obtener todas las rotaciones de un sprint
 */
const obtenerRotacionesSprint = (area = 'diseno', sprintId) => {
  const rotaciones = cargarRotaciones();
  const resultado = {};

  Object.keys(rotaciones[area]?.rotas || {}).forEach(persona => {
    if (rotaciones[area].rotas[persona][sprintId]) {
      resultado[persona] = rotaciones[area].rotas[persona][sprintId];
    }
  });

  return resultado;
};

module.exports = {
  cargarRotaciones,
  guardarRotaciones,
  asignarRotacion,
  actualizarPersonasArea,
  obtenerRotacionPersona,
  obtenerRotacionesSprint
};
