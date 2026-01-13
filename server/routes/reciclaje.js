const express = require('express');
const router = express.Router();
const { getReciclajes, saveReciclajes } = require('../persistence/reciclaje');

// Obtener registro de reciclajes
router.get('/', (req, res) => {
  try {
    const data = getReciclajes();
    res.json(data);
  } catch (err) {
    console.error('Error al obtener reciclajes:', err);
    res.status(500).json({ error: 'Error al obtener el registro de reciclajes' });
  }
});

// Guardar registro completo
router.put('/', (req, res) => {
  try {
    const { items = [] } = req.body || {};
    const saved = saveReciclajes({ items });
    res.json(saved);
  } catch (err) {
    console.error('Error al guardar reciclajes:', err);
    res.status(500).json({ error: 'Error al guardar el registro de reciclajes' });
  }
});

module.exports = router;
