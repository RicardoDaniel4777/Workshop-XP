# 📦 Sistema de Persistencia XP Dashboard

## Descripción General

Este documento explica la arquitectura de persistencia implementada en el XP Dashboard. El sistema utiliza un servidor Node.js/Express con almacenamiento basado en archivos JSON, organizado por fases XP.

## 🏗️ Estructura de Directorios

```
WorkShopXP_Grupo3/
├── XP/                              # Directorio raíz de datos persistentes
│   ├── 1_Planning/                  # Fase 1: Planificación
│   │   ├── historias_usuarios.json
│   │   ├── release_plan.json
│   │   ├── sprints_fases.json
│   │   ├── reuniones_standups.json
│   │   └── rotaciones_pair_programming.json
│   ├── 2_Design/                    # Fase 2: Diseño (para futuros entregables)
│   ├── 3_Coding/                    # Fase 3: Codificación (para futuros entregables)
│   └── 4_Testing/                   # Fase 4: Pruebas (para futuros entregables)
│
├── server/                          # Backend Node.js
│   ├── app.js                       # Servidor Express principal
│   ├── package.json                 # Dependencias del servidor
│   ├── persistence/                 # Módulos de persistencia
│   │   ├── filePersistence.js       # Helper base para archivos
│   │   ├── historiaUsuarios.js      # CRUD de historias
│   │   ├── releasePlan.js           # Gestión de plan de entregas
│   │   ├── sprintFases.js           # Gestión de fases por sprint
│   │   ├── reuniones.js             # Gestión de standups
│   │   ├── rotaciones.js            # Gestión de pair programming
│   │   └── index.js                 # Exportación centralizada
│   └── routes/                      # Endpoints API
│       ├── historias.js
│       ├── plan.js
│       ├── sprintsFases.js
│       ├── reuniones.js
│       └── rotaciones.js
│
└── src/                             # Frontend React/Vite
    └── context/
        └── XPContext.jsx            # Context que consume API
```

## 🔄 Flujo de Datos

### Inicialización
```
App monta
  ↓
XPProvider monta
  ↓
useEffect carga datos
  ↓
fetchAPI a endpoints
  ↓
Servidor lee archivos JSON
  ↓
Datos cargados en context
  ↓
UI renderiza
```

### Actualización
```
Usuario cambia dato (ej: asignar historia a sprint)
  ↓
Componente llama función del context (ej: asignarHistoriaASprint)
  ↓
función llama fetchAPI POST
  ↓
Servidor procesa cambio
  ↓
Escribe JSON de forma segura (atomic write)
  ↓
Retorna datos actualizados
  ↓
Context actualiza estado
  ↓
UI re-renderiza
```

## 📄 Módulos de Persistencia

### 1. `filePersistence.js`
Helper base para todas las operaciones de archivo:
- `readJSON(filePath)` - Lee archivos de forma segura
- `writeJSON(filePath, data)` - Escribe con backup automático
- `mergeJSON(filePath, newData)` - Merge de datos
- `ensureDirectoryExists(filePath)` - Crea directorios necesarios

**Características de seguridad:**
- Backup automático antes de sobrescribir
- Escritura atómica (escribe a temporal primero)
- Manejo de errores centralizado

### 2. `historiaUsuarios.js`
Gestiona historias de usuario:
- `cargarHistorias()` - Obtiene todas
- `guardarHistorias(historias)` - Persiste todas
- `crearHistoria(historia)` - Agrega nueva
- `actualizarHistoria(id, datos)` - Modifica existente
- `eliminarHistoria(id)` - Elimina
- `obtenerHistoria(id)` - Obtiene una específica

**Archivo:** `XP/1_Planning/historias_usuarios.json`

### 3. `releasePlan.js`
Gestiona plan de entregas:
- `cargarPlan()` - Carga configuración actual
- `guardarPlan(plan)` - Persiste cambios
- `actualizarNumeroSprints(numero)` - Modifica cantidad de sprints
- `asignarHistoriaASprint(codigo, sprintId)` - Asigna HU a sprint
- `liberarHistoria(codigo)` - Desasigna HU de todos los sprints

**Archivo:** `XP/1_Planning/release_plan.json`

### 4. `sprintFases.js`
Gestiona progreso de fases por sprint:
- `cargarSprintsFases()` - Carga configuración
- `guardarSprintsFases(sprints)` - Persiste
- `inicializarSprintFases(catalog)` - Crea estructura para nuevos sprints
- `actualizarProgresoFaseSprint(sprintId, fase, valor)` - Actualiza progreso
- `obtenerFasesSprint(sprintId)` - Obtiene fases de un sprint

**Archivo:** `XP/1_Planning/sprints_fases.json`

### 5. `reuniones.js`
Gestiona reuniones/standups:
- `cargarStandups()` - Obtiene todas
- `guardarStandups(standups)` - Persiste
- `agregarStandup(standup)` - Agrega nueva (con ID y fecha automáticos)
- `eliminarStandup(id)` - Elimina
- `obtenerStandupsPorFecha(desde, hasta)` - Filtra por rango

**Archivo:** `XP/1_Planning/reuniones_standups.json`

### 6. `rotaciones.js`
Gestiona rotaciones de pair programming:
- `cargarRotaciones()` - Obtiene todas
- `guardarRotaciones(rotaciones)` - Persiste
- `asignarRotacion(persona, sprintId, rol)` - Asigna rol
- `obtenerRotacionPersona(persona)` - Obtiene rotación de persona
- `obtenerRotacionesSprint(sprintId)` - Obtiene rotaciones de sprint

**Archivo:** `XP/1_Planning/rotaciones_pair_programming.json`

## 🔌 Endpoints API

### Historias (`/api/historias`)
```
GET    /                    - Todas las historias
GET    /:id                 - Historia específica
POST   /                    - Crear nueva
PUT    /:id                 - Actualizar
DELETE /:id                 - Eliminar
```

### Plan (`/api/plan`)
```
GET    /                           - Plan actual
POST   /numero-sprints             - Actualizar # sprints
POST   /asignar-historia           - Asignar HU a sprint
POST   /liberar-historia           - Liberar HU de sprints
```

### Sprints Fases (`/api/sprints-fases`)
```
GET    /                      - Sprints con fases
POST   /inicializar           - Inicializar fases
POST   /actualizar-progreso   - Actualizar progreso de fase
GET    /:sprintId             - Fases de un sprint
```

### Reuniones (`/api/reuniones`)
```
GET    /                    - Todos los standups
POST   /                    - Agregar nuevo standup
DELETE /:id                 - Eliminar standup
GET    /rango-fechas        - Standups en rango (query: desde, hasta)
```

### Rotaciones (`/api/rotaciones`)
```
GET    /                    - Todas las rotaciones
POST   /asignar             - Asignar rol a persona
GET    /persona/:persona    - Rotación de persona
GET    /sprint/:sprintId    - Rotaciones de sprint
```

### Health Check
```
GET    /api/health          - Estado del servidor
```

## 🚀 Cómo Iniciar

### 1. Instalar dependencias del servidor
```bash
cd server
npm install
```

### 2. Iniciar servidor en terminal separada
```bash
cd server
npm start
# O: node app.js
```

Debería ver:
```
╔════════════════════════════════════════════════════════════╗
║         API XP Dashboard - Persistencia Activa             ║
╠════════════════════════════════════════════════════════════╣
║  Servidor corriendo en: http://localhost:3001             ║
║  Directorio de datos: ./XP/                               ║
...
```

### 3. En otra terminal, iniciar el frontend
```bash
npm run dev
```

## 💾 Características de Persistencia

### Cargas Automáticas
- ✅ Al reiniciar el servidor, cargan automáticamente todos los datos de archivos
- ✅ Si no existen archivos, crea estructura inicial vacía
- ✅ Frontend carga datos al montar via API

### Escritura Segura
- ✅ **Backup automático**: Antes de modificar, crea `.backup`
- ✅ **Atomic writes**: Escribe a temporal primero, luego renombra
- ✅ **Recuperación**: Si hay error, el backup permite recuperar

### Sincronización
- ✅ Cambios en UI → API → Disco → Todos los clientes
- ✅ Cada operación guarda inmediatamente
- ✅ En caso de reconexión, UI recarga datos

### Escalabilidad
- ✅ Módulos independientes, fácil agregar más
- ✅ Archivos JSON simples, legibles y editables
- ✅ Estructura preparada para base de datos futura

## 📋 Iniciando con Datos

Los archivos JSON iniciales ya incluyen datos de ejemplo:
- 3 Historias de usuario
- 3 Sprints configurados
- 1 Standup inicial
- Rotaciones de pair programming

Para limpiar y empezar desde cero, simplemente:
```bash
# Eliminar los archivos .json en XP/1_Planning/
# El servidor los recreará automáticamente
```

## 🔮 Extensión Futura

La arquitectura está preparada para:

1. **Base de datos**: Reemplazar archivos JSON con MongoDB/PostgreSQL
2. **Fases adicionales**: Agregar módulos para Design (2), Coding (3), Testing (4)
3. **Versionado**: Guardar historial de cambios
4. **Sincronización multi-usuario**: WebSockets para tiempo real
5. **Exportación**: Generar reportes desde datos persistentes

## 📞 Troubleshooting

### API no responde
```bash
# Verificar que servidor está corriendo
curl http://localhost:3001/api/health
```

### Datos no persisten
```bash
# Verificar permisos en XP/ (debe tener escritura)
# Verificar que API está escribiendo sin errores (revisar console)
```

### Archivos no se crean
```bash
# Asegurarse que XP/1_Planning/ existe
# Si no, crearla manualmente o el server la crea en primera escritura
```

---

**Versión:** 1.0.0 | **Última actualización:** 2026-01-01
