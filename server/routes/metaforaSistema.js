const express = require('express');
const router = express.Router();
const { getMetafora, saveMetafora } = require('../persistence/metaforaSistema');

// Obtener narrativa y glosario
router.get('/', (req, res) => {
  try {
    const data = getMetafora();
    res.json(data);
  } catch (err) {
    console.error('Error al obtener metáfora del sistema:', err);
    res.status(500).json({ error: 'Error al obtener la metáfora del sistema' });
  }
});

// Guardar narrativa y glosario (reemplazo completo)
router.put('/', (req, res) => {
  try {
    const { narrativa = '', glosario = [] } = req.body || {};
    const saved = saveMetafora({ narrativa, glosario });
    res.json(saved);
  } catch (err) {
    console.error('Error al guardar metáfora del sistema:', err);
    res.status(500).json({ error: 'Error al guardar la metáfora del sistema' });
  }
});

module.exports = router;
