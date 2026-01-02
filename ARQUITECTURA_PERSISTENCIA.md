# 🏛️ Arquitectura de Persistencia XP Dashboard

## Resumen Ejecutivo

Se implementó un **sistema modular de persistencia basado en archivos JSON**, con separación clara de responsabilidades por fase XP. La arquitectura es escalable, mantenible y preparada para evolucionar hacia bases de datos.

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend React/Vite                      │
│               (http://localhost:3000)                       │
│                   XPContext.jsx                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                    fetch() API
                         │
        ┌────────────────┴────────────────┐
        │                                 │
        ▼                                 ▼
┌──────────────────────────────────────────────────────┐
│          Servidor Express Node.js                    │
│         (http://localhost:3001)                      │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │          Routes (Endpoints API)                │  │
│  │  • /api/historias                             │  │
│  │  • /api/plan                                  │  │
│  │  • /api/sprints-fases                         │  │
│  │  • /api/reuniones                             │  │
│  │  • /api/rotaciones                            │  │
│  └────────────────────────────────────────────────┘  │
│                      ▲                                │
│                      │                                │
│  ┌────────────────────┴─────────────────────────┐    │
│  │    Persistence Layer (Módulos)               │    │
│  │  • historiaUsuarios.js                      │    │
│  │  • releasePlan.js                           │    │
│  │  • sprintFases.js                           │    │
│  │  • reuniones.js                             │    │
│  │  • rotaciones.js                            │    │
│  │  • filePersistence.js (helper)              │    │
│  └────────────────────┬─────────────────────────┘    │
└───────────────────────┼──────────────────────────────┘
                        │
            Lectura/Escritura de archivos
                        │
        ┌───────────────┴──────────────┐
        │                              │
        ▼                              ▼
┌──────────────────────┐    ┌──────────────────────┐
│   XP/1_Planning/     │    │ Backups Automáticos  │
│ (Archivos JSON)      │    │ (.json.backup)       │
│                      │    │                      │
│ • historias_        │    │ • Antes de cada      │
│   usuarios.json     │    │   modificación       │
│ • release_plan.json │    │ • Permite recuperar  │
│ • sprints_fases.json│    │   datos en caso de   │
│ • reuniones_        │    │   error              │
│   standups.json     │    │                      │
│ • rotaciones_       │    └──────────────────────┘
│   pair_programming  │
│   .json             │
└──────────────────────┘
```

## Flujo de Datos Detallado

### 1️⃣ Cargar Datos (Inicialización)

```
[App monta]
    ↓
[XPProvider monta en useEffect]
    ↓
[Fetch GET /api/historias]
    ↓
[Servidor lee XP/1_Planning/historias_usuarios.json]
    ↓
[Retorna datos al contexto]
    ↓
[React renderiza UI con datos cargados]
```

### 2️⃣ Guardar Datos (Actualización)

```
[Usuario interactúa con UI]
    ↓ (ej: asigna historia a sprint)
    ↓
[Llama asignarHistoriaASprint(codigo, sprintId)]
    ↓
[Fetch POST /api/plan/asignar-historia]
    ↓
[Servidor: releasePlan.asignarHistoriaASprint()]
    ↓
[Lee JSON actual]
    ↓
[Modifica datos en memoria]
    ↓
[Crea backup (.backup)]
    ↓
[Escribe a temporal (.tmp)]
    ↓
[Renombra temporal a .json (atomic write)]
    ↓
[Retorna datos actualizados]
    ↓
[Contexto actualiza estado]
    ↓
[UI re-renderiza]
```

## Componentes Principales

### A. Backend - Módulos de Persistencia

#### `filePersistence.js` (Helper Base)
Proporciona primitivas seguras:
```javascript
readJSON(filePath)           // Lee con manejo de errores
writeJSON(filePath, data)    // Escribe con backup automático
mergeJSON(filePath, newData) // Merge de objetos
ensureDirectoryExists()      // Crea directorios necesarios
```

**Garantías de seguridad:**
- ✅ Backup antes de sobrescribir
- ✅ Escritura atómica (tmp → rename)
- ✅ Recuperación en caso de error

#### `historiaUsuarios.js` - CRUD de HU
```javascript
cargarHistorias()              // Array de todas
crearHistoria(data)            // Nueva + auto-código
actualizarHistoria(id, data)   // Modifica
eliminarHistoria(id)           // Elimina
obtenerHistoria(id)            // Uno específico
```

Archivo: `XP/1_Planning/historias_usuarios.json`

#### `releasePlan.js` - Plan de Entregas
```javascript
cargarPlan()                   // Config actual
actualizarNumeroSprints(num)   // Crea/elimina sprints
asignarHistoriaASprint(cod, id)// Asigna HU
liberarHistoria(codigo)        // Desasigna de todos
```

Archivo: `XP/1_Planning/release_plan.json`

#### `sprintFases.js` - Progreso de Fases
```javascript
cargarSprintsFases()           // Config actual
inicializarSprintFases(catalog)// Crea estructura
actualizarProgresoFaseSprint() // Actualiza %
obtenerFasesSprint(id)         // Obtiene fases
```

Archivo: `XP/1_Planning/sprints_fases.json`

#### `reuniones.js` - Stand-ups
```javascript
cargarStandups()               // Todos
agregarStandup(data)           // Nueva + auto-id/fecha
eliminarStandup(id)            // Elimina
obtenerStandupsPorFecha()      // Filtra por rango
```

Archivo: `XP/1_Planning/reuniones_standups.json`

#### `rotaciones.js` - Pair Programming
```javascript
cargarRotaciones()             // Config actual
asignarRotacion(persona, sprint, rol)  // Asigna rol
obtenerRotacionPersona(persona)        // Del usuario
obtenerRotacionesSprint(sprintId)      // Del sprint
```

Archivo: `XP/1_Planning/rotaciones_pair_programming.json`

### B. Backend - Routes (Endpoints)

Cada ruta mapea a un módulo de persistencia:

```
routes/historias.js
├─ GET    /              → cargarHistorias()
├─ GET    /:id           → obtenerHistoria()
├─ POST   /              → crearHistoria()
├─ PUT    /:id           → actualizarHistoria()
└─ DELETE /:id           → eliminarHistoria()

routes/plan.js
├─ GET    /              → cargarPlan()
├─ POST   /numero-sprints         → actualizarNumeroSprints()
├─ POST   /asignar-historia       → asignarHistoriaASprint()
└─ POST   /liberar-historia       → liberarHistoria()

routes/sprintsFases.js
├─ GET    /                       → cargarSprintsFases()
├─ POST   /inicializar            → inicializarSprintFases()
├─ POST   /actualizar-progreso    → actualizarProgresoFaseSprint()
└─ GET    /:sprintId              → obtenerFasesSprint()

routes/reuniones.js
├─ GET    /                       → cargarStandups()
├─ POST   /                       → agregarStandup()
├─ DELETE /:id                    → eliminarStandup()
└─ GET    /rango-fechas           → obtenerStandupsPorFecha()

routes/rotaciones.js
├─ GET    /                       → cargarRotaciones()
├─ POST   /asignar                → asignarRotacion()
├─ GET    /persona/:persona       → obtenerRotacionPersona()
└─ GET    /sprint/:sprintId       → obtenerRotacionesSprint()
```

### C. Frontend - XPContext.jsx

Refactorizado para consumir API:
```javascript
// Estados ahora sincronizados con servidor
const [historiasUsuario, setHistoriasUsuario] = useState([]);
const [numeroSprints, setNumeroSprints] = useState(3);
const [releasePlan, setReleasePlan] = useState({});
const [sprintFases, setSprintFases] = useState([]);
const [standups, setStandups] = useState([]);

// Cargar en useEffect
useEffect(() => {
  const historias = await fetchAPI('/historias');
  const plan = await fetchAPI('/plan');
  // ... más cargas
}, []);

// Funciones son async y persisten automáticamente
const crearHistoriaUsuario = async (historia) => {
  const nueva = await fetchAPI('/historias', {
    method: 'POST',
    body: JSON.stringify(historia)
  });
  setHistoriasUsuario(prev => [...prev, nueva]);
};
```

## Estructura de Directorios

```
WorkShopXP_Grupo3/
│
├── XP/                          ★ Datos Persistentes
│   ├── 1_Planning/              ✓ Implementado
│   │   ├── historias_usuarios.json
│   │   ├── release_plan.json
│   │   ├── sprints_fases.json
│   │   ├── reuniones_standups.json
│   │   └── rotaciones_pair_programming.json
│   ├── 2_Design/                📋 Para futuros módulos
│   ├── 3_Coding/
│   └── 4_Testing/
│
├── server/                      ★ Backend API
│   ├── app.js                   (Express app)
│   ├── package.json             (express, cors)
│   │
│   ├── persistence/             (Módulos de persistencia)
│   │   ├── filePersistence.js   (Helper base)
│   │   ├── historiaUsuarios.js
│   │   ├── releasePlan.js
│   │   ├── sprintFases.js
│   │   ├── reuniones.js
│   │   ├── rotaciones.js
│   │   └── index.js             (Exportación centralizada)
│   │
│   └── routes/                  (Endpoints API)
│       ├── historias.js
│       ├── plan.js
│       ├── sprintsFases.js
│       ├── reuniones.js
│       └── rotaciones.js
│
├── src/                         ★ Frontend React
│   ├── context/
│   │   └── XPContext.jsx        (REFACTORIZADO: usa API)
│   └── pages/
│       └── ActivityDetail/
│           └── ActivityDetail.jsx
│
├── PERSISTENCIA_README.md       📖 Documentación técnica
├── INICIO_RAPIDO_PERSISTENCIA.md 🚀 Guía de uso
├── start-all.ps1                🔧 Script de inicio
├── vite.config.js
├── package.json
└── README.md
```

## Garantías de Persistencia

### ✅ Durabilidad
- Todos los cambios se escriben a disco inmediatamente
- Escritura atómica previene corrupción de datos
- Backup automático permite recuperación

### ✅ Consistencia
- Un solo proceso escribiendo a la vez
- Estados sincronizados entre frontend y disco
- Inicialización completa en montaje de app

### ✅ Disponibilidad
- API recupera datos de disco al reiniciar
- Archivos recuperables incluso con fallas
- Sin base de datos externa = sin dependencias

### ✅ Escalabilidad
- Modular: fácil agregar nuevos módulos
- Preparado para migración a BD futura
- Datos separados por fase XP

## Migración Futura

La arquitectura está diseñada para evolucionar sin cambios en la interfaz:

### Opción 1: Base de Datos (sin cambios en API)
```javascript
// Antes (archivo):
const cargarHistorias = () => readJSON(HISTORIAS_FILE);

// Después (DB - misma interfaz):
const cargarHistorias = () => db.historias.find({});
```

### Opción 2: Agregar Módulos Nuevos
```
// Fácil agregar módulos para Design, Coding, Testing:
├── persistence/diseño.js
├── persistence/codigo.js
├── persistence/tests.js
└── routes/diseño.js, routes/codigo.js, routes/tests.js
```

## Validación de Funcionamiento

### Test 1: Persistencia Básica
```bash
# 1. Crear historia
curl -X POST http://localhost:3001/api/historias \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Test",...}'

# 2. Reiniciar servidor
# 3. Verificar que está
curl http://localhost:3001/api/historias
```

### Test 2: Sincronización Frontend
```
1. Abre http://localhost:3000
2. Asigna historia a sprint
3. Verifica que apareció en XP/1_Planning/release_plan.json
4. Reinicia servidor (Ctrl+C y node app.js)
5. Datos deberían cargar automáticamente
```

### Test 3: Recuperación de Fallos
```
1. Elimina un archivo .json
2. El servidor lo recreará con estructura vacía
3. Historial está en .backup
```

## Monitoreo

### Logs del Servidor
```bash
# Terminal del servidor muestra:
# ✓ Servidor iniciado
# GET /api/historias    (requests)
# Errores (si existen)
```

### Archivos de Datos
```bash
# Ver contenido de datos
cat XP/1_Planning/historias_usuarios.json | more

# Ver backups
ls XP/1_Planning/*.backup
```

### Health Check
```bash
curl http://localhost:3001/api/health
{
  "status": "ok",
  "timestamp": "2026-01-01T...",
  "uptime": 123.45
}
```

## Resumen de Cambios

| Componente | Antes | Después |
|------------|-------|---------|
| Historias | State local | Persistidas en disco |
| Plan | State local | Persistido en disco |
| Fases | State local | Persistidas en disco |
| Reuniones | State local + mock | Persistidas en disco |
| Rotaciones | State local | Persistidas en disco |
| Reinicio servidor | Todo se pierde | Todo se recupera ✅ |

## Conclusión

Se implementó un **sistema de persistencia modular, seguro y escalable** que:
- ✅ Guarda todos los datos en disco
- ✅ Recupera datos al reiniciar
- ✅ Organiza por fases XP
- ✅ Separación clara de responsabilidades
- ✅ Preparado para evolucionar

**Resultado:** El XP Dashboard ahora tiene persistencia completa y confiable.

---

**Versión:** 1.0.0 | **Fecha:** 2026-01-01 | **Estado:** ✅ Completo
