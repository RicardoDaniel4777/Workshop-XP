const express = require('express');
const cors = require('cors');
const path = require('path');

// Importar rutas API
const historiasRouter = require('./routes/historias');
const planRouter = require('./routes/plan');
const sprintsFasesRouter = require('./routes/sprintsFases');
const reunionesRouter = require('./routes/reuniones');
const rotacionesRouter = require('./routes/rotaciones');
const tarjetasCRCRouter = require('./routes/tarjetasCRC');
const metaforaSistemaRouter = require('./routes/metaforaSistema');
const refactorizacionesRouter = require('./routes/refactorizaciones');
const reciclajeRouter = require('./routes/reciclaje');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas API
app.use('/api/historias', historiasRouter);
app.use('/api/plan', planRouter);
app.use('/api/sprints-fases', sprintsFasesRouter);
app.use('/api/reuniones', reunionesRouter);
app.use('/api/rotaciones', rotacionesRouter);
app.use('/api/tarjetas-crc', tarjetasCRCRouter);
app.use('/api/metafora-sistema', metaforaSistemaRouter);
app.use('/api/refactorizaciones', refactorizacionesRouter);
app.use('/api/reciclaje', reciclajeRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

const PORT = process.env.API_PORT || 3001;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║         API XP Dashboard - Persistencia Activa             ║
╠════════════════════════════════════════════════════════════╣
║  Servidor corriendo en: http://localhost:${PORT}           ║
║  Directorio de datos: ./XP/                                ║
║                                                            ║
║  Endpoints disponibles:                                    ║
║  • GET/POST   /api/historias                              ║
║  • GET/POST   /api/plan                                   ║
║  • GET/POST   /api/sprints-fases                          ║
║  • GET/POST   /api/reuniones                              ║
║  • GET/POST   /api/rotaciones                             ║
║  • GET/POST   /api/tarjetas-crc                           ║
║  • GET/PUT    /api/metafora-sistema                       ║
║  • GET/PUT    /api/refactorizaciones                      ║
║  • GET/PUT    /api/reciclaje                              ║
║                                                            ║
║  Health Check: GET /api/health                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
