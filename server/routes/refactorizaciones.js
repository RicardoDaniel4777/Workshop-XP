const express = require('express');
const router = express.Router();
const { getRefactors, saveRefactors } = require('../persistence/refactorizaciones');

// Obtener registro de refactorización
router.get('/', (req, res) => {
  try {
    const data = getRefactors();
    res.json(data);
  } catch (err) {
    console.error('Error al obtener refactorizaciones:', err);
    res.status(500).json({ error: 'Error al obtener el registro de refactorización' });
  }
});

// Guardar registro completo
router.put('/', (req, res) => {
  try {
    const { items = [] } = req.body || {};
    const saved = saveRefactors({ items });
    res.json(saved);
  } catch (err) {
    console.error('Error al guardar refactorizaciones:', err);
    res.status(500).json({ error: 'Error al guardar el registro de refactorización' });
  }
});

module.exports = router;
