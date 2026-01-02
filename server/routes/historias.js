const express = require('express');
const historiaUsuarios = require('../persistence/historiaUsuarios');

const router = express.Router();

/**
 * GET /api/historias
 * Obtener todas las historias de usuario
 */
router.get('/', (req, res) => {
  try {
    const historias = historiaUsuarios.cargarHistorias();
    res.json(historias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/historias/:id
 * Obtener una historia específica
 */
router.get('/:id', (req, res) => {
  try {
    const historia = historiaUsuarios.obtenerHistoria(parseInt(req.params.id));
    if (!historia) {
      return res.status(404).json({ error: 'Historia no encontrada' });
    }
    res.json(historia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/historias
 * Crear una nueva historia
 */
router.post('/', (req, res) => {
  try {
    const nueva = historiaUsuarios.crearHistoria(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/historias/:id
 * Actualizar una historia existente
 */
router.put('/:id', (req, res) => {
  try {
    const actualizada = historiaUsuarios.actualizarHistoria(parseInt(req.params.id), req.body);
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/historias/:id
 * Eliminar una historia
 */
router.delete('/:id', (req, res) => {
  try {
    historiaUsuarios.eliminarHistoria(parseInt(req.params.id));
    res.json({ mensaje: 'Historia eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
