const express = require('express');
const router = express.Router();
const {
  cargarTarjetasCRC,
  crearTarjetaCRC,
  actualizarTarjetaCRC,
  eliminarTarjetaCRC,
  obtenerTarjetaCRCPorId
} = require('../persistence/tarjetasCRC');

/**
 * GET /api/tarjetas-crc
 * Obtener todas las tarjetas CRC
 */
router.get('/', (req, res) => {
  try {
    const tarjetas = cargarTarjetasCRC();
    res.json(tarjetas);
  } catch (error) {
    console.error('Error al cargar tarjetas CRC:', error);
    res.status(500).json({ 
      error: 'Error al cargar las tarjetas CRC',
      message: error.message 
    });
  }
});

/**
 * GET /api/tarjetas-crc/:id
 * Obtener una tarjeta CRC por ID
 */
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tarjeta = obtenerTarjetaCRCPorId(id);
    
    if (!tarjeta) {
      return res.status(404).json({ 
        error: 'Tarjeta CRC no encontrada' 
      });
    }
    
    res.json(tarjeta);
  } catch (error) {
    console.error('Error al obtener tarjeta CRC:', error);
    res.status(500).json({ 
      error: 'Error al obtener la tarjeta CRC',
      message: error.message 
    });
  }
});

/**
 * POST /api/tarjetas-crc
 * Crear una nueva tarjeta CRC
 */
router.post('/', (req, res) => {
  try {
    const { nombreClase, responsabilidades, colaboradores } = req.body;
    
    if (!nombreClase || !nombreClase.trim()) {
      return res.status(400).json({ 
        error: 'El nombre de la clase es obligatorio' 
      });
    }
    
    const nuevaTarjeta = crearTarjetaCRC({
      nombreClase: nombreClase.trim(),
      responsabilidades: responsabilidades || '',
      colaboradores: colaboradores || ''
    });
    
    res.status(201).json(nuevaTarjeta);
  } catch (error) {
    console.error('Error al crear tarjeta CRC:', error);
    res.status(500).json({ 
      error: 'Error al crear la tarjeta CRC',
      message: error.message 
    });
  }
});

/**
 * PUT /api/tarjetas-crc/:id
 * Actualizar una tarjeta CRC existente
 */
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nombreClase, responsabilidades, colaboradores } = req.body;
    
    if (!nombreClase || !nombreClase.trim()) {
      return res.status(400).json({ 
        error: 'El nombre de la clase es obligatorio' 
      });
    }
    
    const tarjetaActualizada = actualizarTarjetaCRC(id, {
      nombreClase: nombreClase.trim(),
      responsabilidades: responsabilidades || '',
      colaboradores: colaboradores || ''
    });
    
    res.json(tarjetaActualizada);
  } catch (error) {
    console.error('Error al actualizar tarjeta CRC:', error);
    if (error.message.includes('no encontrada')) {
      return res.status(404).json({ 
        error: error.message 
      });
    }
    res.status(500).json({ 
      error: 'Error al actualizar la tarjeta CRC',
      message: error.message 
    });
  }
});

/**
 * DELETE /api/tarjetas-crc/:id
 * Eliminar una tarjeta CRC
 */
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tarjetaEliminada = eliminarTarjetaCRC(id);
    res.json({ 
      message: 'Tarjeta CRC eliminada exitosamente',
      tarjeta: tarjetaEliminada 
    });
  } catch (error) {
    console.error('Error al eliminar tarjeta CRC:', error);
    if (error.message.includes('no encontrada')) {
      return res.status(404).json({ 
        error: error.message 
      });
    }
    res.status(500).json({ 
      error: 'Error al eliminar la tarjeta CRC',
      message: error.message 
    });
  }
});

module.exports = router;
