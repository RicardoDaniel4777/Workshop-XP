# 🗺️ MAPA DE NAVEGACIÓN - XP DASHBOARD

## 📍 RUTAS DISPONIBLES

```
http://localhost:3000
├── /                           → Dashboard General
├── /fases                      → Fases XP (4 fases)
├── /actividad/:activityId      → Detalle de Actividad
├── /iteraciones                → Gestión de Iteraciones
├── /calendario                 → Calendario de Eventos
└── /artefactos                 → Artefactos del Proyecto
```

---

## 🎯 NAVEGACIÓN DETALLADA

### 1. DASHBOARD GENERAL (/)

**Contenido:**
- Métricas principales (4 tarjetas)
- Progreso del proyecto
- Resumen de las 4 fases XP
- Accesos rápidos

**Navegación desde aquí:**
→ Click "Ver Fases XP" → `/fases`
→ Click en cualquier fase → `/fases`
→ Click "Iteraciones" → `/iteraciones`
→ Click "Calendario" → `/calendario`
→ Click "Artefactos" → `/artefactos`

---

### 2. FASES XP (/fases)

**Contenido:**
- 4 fases de XP en tarjetas
- Progreso global del proyecto
- Descripción de XP
- Características de cada fase

**Las 4 Fases:**
1. **Planificación** (5 actividades)
2. **Diseño** (4 actividades)
3. **Desarrollo** (4 actividades)
4. **Pruebas** (4 actividades)

**Navegación desde aquí:**
→ Click en actividad → `/actividad/{id}`

**IDs de Actividades de PLANIFICACIÓN:**
- `/actividad/historias-usuario`
- `/actividad/plan-entregas`
- `/actividad/iteraciones-cortas`
- `/actividad/planning-game`
- `/actividad/velocidad-proyecto`

**IDs de Actividades de DISEÑO:**
- `/actividad/diseno-simple`
- `/actividad/metafora-sistema`
- `/actividad/tarjetas-crc`
- `/actividad/refactorizacion`

**IDs de Actividades de DESARROLLO:**
- `/actividad/programacion-parejas`
- `/actividad/tdd`
- `/actividad/integracion-continua`
- `/actividad/estandares-codigo`

**IDs de Actividades de PRUEBAS:**
- `/actividad/pruebas-aceptacion`
- `/actividad/cliente-onsite`
- `/actividad/releases-pequenos`
- `/actividad/ritmo-sostenible`

---

### 3. DETALLE DE ACTIVIDAD (/actividad/:activityId)

**Contenido por actividad:**

#### Historias de Usuario (`/actividad/historias-usuario`)
- Descripción completa
- Formato de historias
- Ejemplos (HU-001, HU-002, HU-003)
- Criterios de aceptación (6 criterios)

#### TDD (`/actividad/tdd`)
- Descripción del ciclo Rojo-Verde-Refactor
- Beneficios (5 puntos)
- **Ejemplo de código completo** con test y función

#### Pair Programming (`/actividad/programacion-parejas`)
- Roles (Conductor/Navegador)
- Beneficios (5 puntos)
- Mejores prácticas (4 puntos)

#### Integración Continua (`/actividad/integracion-continua`)
- Prácticas clave (6 puntos)
- Herramientas comunes

**Todas las actividades incluyen:**
- Slider de progreso actualizable
- Roles asignados (2 personas)
- Artefactos asociados
- Acciones disponibles

**Navegación desde aquí:**
→ Botón "Volver" → Regresa a la vista anterior
→ "Ver Artefactos" → `/artefactos`
→ "Ver Iteraciones" → `/iteraciones`
→ "Todas las Fases" → `/fases`

---

### 4. ITERACIONES (/iteraciones)

**Contenido:**
- 3 iteraciones del proyecto
- Estadísticas generales (4 métricas)
- Mejores prácticas XP (4 tips)

**Iteraciones disponibles:**
1. **Iteración 1 - Setup**
   - Estado: Completada
   - 2025-01-02 a 2025-01-16
   - 28 story points (28 completados)
   - 3 historias: HU-001, HU-002, HU-003

2. **Iteración 2 - Core Features**
   - Estado: En progreso
   - 2025-01-17 a 2025-01-31
   - 25 story points (17 completados)
   - 4 historias: HU-004, HU-005, HU-006, HU-007

3. **Iteración 3 - Advanced Features**
   - Estado: Pendiente
   - 2025-02-01 a 2025-02-14
   - 30 story points (0 completados)
   - 3 historias: HU-008, HU-009, HU-010

---

### 5. CALENDARIO (/calendario)

**Contenido:**
- 6 eventos del proyecto
- Filtros por tipo
- Agrupación por mes
- Tipos de eventos explicados

**Filtros disponibles:**
- Todos (6 eventos)
- Reuniones (4 eventos)
- Trabajo (1 evento)
- Pruebas (1 evento)

**Eventos disponibles:**
1. Planning Game - Iteración 1 (2025-01-02)
2. Daily Stand-up (2025-01-10)
3. Retrospectiva - Iteración 1 (2025-01-16)
4. Planning Game - Iteración 2 (2025-01-17)
5. Sesión de Pair Programming (2025-01-22)
6. Pruebas de Aceptación (2025-01-29)

---

### 6. ARTEFACTOS (/artefactos)

**Contenido:**
- 5 artefactos del proyecto
- Filtros por fase y estado
- Tipos de artefactos explicados (4 categorías)

**Filtros de Fase:**
- Todas
- Planificación
- Diseño
- Desarrollo
- Pruebas

**Filtros de Estado:**
- Todos
- Completados (2)
- En progreso (3)
- Pendientes (0)

**Artefactos disponibles:**
1. **Historias de Usuario** (Documento)
   - Fase: Planificación
   - Estado: Completado
   - Autor: María García

2. **Plan de Releases** (Documento)
   - Fase: Planificación
   - Estado: Completado
   - Autor: Carlos Ruiz

3. **Tarjetas CRC** (Diagrama)
   - Fase: Diseño
   - Estado: En progreso
   - Autor: Ana López

4. **Pruebas Unitarias** (Código)
   - Fase: Desarrollo
   - Estado: En progreso
   - Autor: Pedro Sánchez

5. **Pruebas de Aceptación** (Documento)
   - Fase: Pruebas
   - Estado: En progreso
   - Autor: María García

---

## 🔗 FLUJOS DE NAVEGACIÓN COMUNES

### Flujo 1: Ver estado del proyecto
```
Dashboard (/) 
→ Ver métricas generales
→ Ver resumen de fases
→ Fin
```

### Flujo 2: Actualizar progreso de actividad
```
Dashboard (/)
→ Click "Ver Fases XP"
→ Fases (/fases)
→ Click en actividad específica
→ Actividad Detalle (/actividad/:id)
→ Mover slider de progreso
→ Observar actualización automática
→ Fin
```

### Flujo 3: Aprender sobre una práctica XP
```
Fases (/fases)
→ Click en actividad (ej. TDD)
→ Actividad Detalle (/actividad/tdd)
→ Leer descripción
→ Ver ejemplos de código
→ Ver mejores prácticas
→ Fin
```

### Flujo 4: Consultar eventos del mes
```
Dashboard (/)
→ Click "Calendario"
→ Calendario (/calendario)
→ Seleccionar filtro (ej. Reuniones)
→ Ver eventos filtrados
→ Fin
```

### Flujo 5: Buscar artefacto por fase
```
Dashboard (/)
→ Click "Artefactos"
→ Artefactos (/artefactos)
→ Seleccionar filtro de fase (ej. Diseño)
→ Ver artefactos de esa fase
→ Fin
```

---

## 🎨 ELEMENTOS INTERACTIVOS

### En todas las vistas:
- **Barra de navegación superior**: Siempre visible
- **Botones de navegación**: Enlaces a otras secciones
- **Hover effects**: En tarjetas y links

### Específicos por vista:
- **Dashboard**: Links a todas las secciones
- **Fases**: 17 actividades clickeables
- **Actividad**: Slider de progreso, 3 botones de acción
- **Calendario**: 4 botones de filtro
- **Artefactos**: 8 botones de filtro, botones en cada tarjeta

---

## 📱 RESPONSIVE

Todas las vistas son responsive y se adaptan a:
- 💻 **Desktop**: Grid de múltiples columnas
- 📱 **Tablet**: Grid de 1-2 columnas
- 📱 **Móvil**: Columna única

---

## 🚀 INICIO RÁPIDO

1. Iniciar servidor: `npm run dev` o `docker-compose up -d`
2. Abrir navegador: http://localhost:3000
3. Explorar desde Dashboard
4. Click en "Fases XP" para ver el módulo principal
5. Click en cualquier actividad para ver detalles

---

## 📊 MÉTRICAS DE NAVEGACIÓN

- **Rutas totales**: 6 principales + 17 dinámicas = 23 rutas
- **Actividades clickeables**: 17
- **Filtros disponibles**: 6 (4 en Calendario + 8 en Artefactos)
- **Botones de acción**: 40+
- **Links de navegación**: 50+

---

**¡Disfruta explorando el XP Dashboard!** 🎉
