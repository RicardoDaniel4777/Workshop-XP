const express = require('express');
const rotaciones = require('../persistence/rotaciones');

const router = express.Router();

/**
 * GET /api/rotaciones
 * Obtener todas las rotaciones
 */
router.get('/', (req, res) => {
  try {
    const rotas = rotaciones.cargarRotaciones();
    res.json(rotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/rotaciones/asignar
 * Asignar rol a persona en sprint
 */
router.post('/asignar', (req, res) => {
  try {
    const { area = 'diseno', persona, sprintId, rol } = req.body;
    
    if (!persona || !sprintId || !rol) {
      return res.status(400).json({ error: 'Campos requeridos: persona, sprintId, rol' });
    }
    
    const rotas = rotaciones.asignarRotacion(area, persona, sprintId, rol);
    res.json(rotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/rotaciones/personas
 * Actualizar las dos personas seleccionadas para un área
 */
router.post('/personas', (req, res) => {
  try {
    const { area = 'diseno', personas = [] } = req.body;
    const rotas = rotaciones.actualizarPersonasArea(area, personas);
    res.json(rotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/rotaciones/persona/:persona
 * Obtener rotación de una persona
 */
router.get('/persona/:persona', (req, res) => {
  try {
    const area = req.query.area || 'diseno';
    const rota = rotaciones.obtenerRotacionPersona(area, req.params.persona);
    res.json(rota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/rotaciones/sprint/:sprintId
 * Obtener rotaciones de un sprint
 */
router.get('/sprint/:sprintId', (req, res) => {
  try {
    const area = req.query.area || 'diseno';
    const rotas = rotaciones.obtenerRotacionesSprint(area, req.params.sprintId);
    res.json(rotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
