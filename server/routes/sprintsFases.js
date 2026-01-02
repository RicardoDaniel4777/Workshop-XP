const express = require('express');
const sprintFases = require('../persistence/sprintFases');

const router = express.Router();

/**
 * GET /api/sprints-fases
 * Obtener sprints con sus fases
 */
router.get('/', (req, res) => {
  try {
    const config = sprintFases.cargarSprintsFases();
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/sprints-fases/inicializar
 * Inicializar fases para un catálogo de sprints
 */
router.post('/inicializar', (req, res) => {
  try {
    const { sprintCatalog } = req.body;
    if (!Array.isArray(sprintCatalog)) {
      return res.status(400).json({ error: 'sprintCatalog debe ser un array' });
    }
    const config = sprintFases.inicializarSprintFases(sprintCatalog);
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/sprints-fases/actualizar-progreso
 * Actualizar progreso de una fase en un sprint
 */
router.post('/actualizar-progreso', (req, res) => {
  try {
    const { sprintId, faseClave, valor } = req.body;
    const sprint = sprintFases.actualizarProgresoFaseSprint(sprintId, faseClave, valor);
    res.json(sprint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/sprints-fases/:sprintId
 * Obtener fases de un sprint específico
 */
router.get('/:sprintId', (req, res) => {
  try {
    const fases = sprintFases.obtenerFasesSprint(req.params.sprintId);
    if (!fases) {
      return res.status(404).json({ error: 'Sprint no encontrado' });
    }
    res.json(fases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
