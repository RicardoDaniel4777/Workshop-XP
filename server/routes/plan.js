const express = require('express');
const releasePlan = require('../persistence/releasePlan');

const router = express.Router();

/**
 * GET /api/plan
 * Obtener plan de entregas actual
 */
router.get('/', (req, res) => {
  try {
    const plan = releasePlan.cargarPlan();
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/plan/numero-sprints
 * Actualizar número de sprints
 */
router.post('/numero-sprints', (req, res) => {
  try {
    const { numero } = req.body;
    if (!numero || numero < 1) {
      return res.status(400).json({ error: 'Número debe ser mayor a 0' });
    }
    const plan = releasePlan.actualizarNumeroSprints(numero);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/plan/asignar-historia
 * Asignar historia a sprint
 */
router.post('/asignar-historia', (req, res) => {
  try {
    const { codigoHistoria, sprintId } = req.body;
    const plan = releasePlan.asignarHistoriaASprint(codigoHistoria, sprintId);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/plan/liberar-historia
 * Liberar historia de todos los sprints
 */
router.post('/liberar-historia', (req, res) => {
  try {
    const { codigoHistoria } = req.body;
    const plan = releasePlan.liberarHistoria(codigoHistoria);
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
