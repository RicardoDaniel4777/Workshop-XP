const express = require('express');
const reuniones = require('../persistence/reuniones');

const router = express.Router();

/**
 * GET /api/reuniones
 * Obtener todos los standups
 */
router.get('/', (req, res) => {
  try {
    const standups = reuniones.cargarStandups();
    res.json(standups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/reuniones
 * Agregar nuevo standup
 */
router.post('/', (req, res) => {
  try {
    const { ayer, hoy, bloqueos } = req.body;
    
    if (!ayer || !hoy || !bloqueos) {
      return res.status(400).json({ error: 'Campos requeridos: ayer, hoy, bloqueos' });
    }
    
    const nuevoStandup = reuniones.agregarStandup({ ayer, hoy, bloqueos });
    res.status(201).json(nuevoStandup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/reuniones/:id
 * Eliminar un standup
 */
router.delete('/:id', (req, res) => {
  try {
    reuniones.eliminarStandup(req.params.id);
    res.json({ mensaje: 'Standup eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/reuniones/rango-fechas
 * Obtener standups en un rango de fechas
 */
router.get('/rango-fechas', (req, res) => {
  try {
    const { desde, hasta } = req.query;
    
    if (!desde || !hasta) {
      return res.status(400).json({ error: 'Parámetros requeridos: desde, hasta' });
    }
    
    const standups = reuniones.obtenerStandupsPorFecha(desde, hasta);
    res.json(standups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
