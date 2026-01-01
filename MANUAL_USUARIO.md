# 🎯 MANUAL DE USUARIO - XP DASHBOARD

## 📖 ÍNDICE
1. [Introducción](#introducción)
2. [Inicio del Sistema](#inicio-del-sistema)
3. [Navegación](#navegación)
4. [Módulos Principales](#módulos-principales)
5. [Casos de Uso](#casos-de-uso)
6. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## 🌟 INTRODUCCIÓN

XP Dashboard es un framework interactivo diseñado para la gestión y visualización de proyectos que utilizan la metodología Extreme Programming (XP). 

### Objetivo
- Gestionar todas las fases y actividades de XP
- Visualizar el progreso del proyecto en tiempo real
- Facilitar el aprendizaje de la metodología XP
- Proporcionar una herramienta de seguimiento para equipos ágiles

### Características Principales
✅ **Sin vistas vacías**: Todas las secciones tienen contenido significativo
✅ **Navegación intuitiva**: Click en cualquier elemento para ver detalles
✅ **Progreso dinámico**: Actualización en tiempo real
✅ **Diseño responsivo**: Funciona en desktop, tablet y móvil
✅ **Datos completos**: Mock data listo para usar

---

## 🚀 INICIO DEL SISTEMA

### Método 1: Docker (RECOMENDADO)
```bash
# Un solo comando
docker-compose up -d

# Acceder a: http://localhost:3000
```

### Método 2: Script PowerShell
```powershell
.\start.ps1
# Sigue las instrucciones en pantalla
```

### Método 3: Desarrollo Local
```bash
npm install
npm run dev
# Acceder a: http://localhost:3000
```

---

## 🧭 NAVEGACIÓN

### Barra de Navegación Principal
La barra superior incluye 5 secciones principales:

1. **📊 Dashboard**: Vista general del proyecto
2. **🔄 Fases XP**: Las 4 fases de XP detalladas
3. **🔁 Iteraciones**: Gestión de sprints
4. **📅 Calendario**: Eventos y reuniones
5. **📄 Artefactos**: Documentos y recursos

### Navegación por Click
- **Click en Fase** → Ver todas las actividades de esa fase
- **Click en Actividad** → Ver detalles completos, ejemplos, código
- **Click en Iteración** → Ver detalles del sprint
- **Click en Evento** → Información del evento
- **Botón Volver** → Regresa a la vista anterior

---

## 📦 MÓDULOS PRINCIPALES

### 1️⃣ DASHBOARD GENERAL

**¿Qué muestra?**
- Progreso general del proyecto
- Actividades completadas vs. totales
- Velocidad del equipo
- Story points completados
- Resumen visual de las 4 fases
- Accesos rápidos

**¿Cómo usarlo?**
1. Al entrar, verás el estado general
2. Observa las métricas en las tarjetas superiores
3. Revisa el progreso de cada fase
4. Usa los accesos rápidos para navegar

**Indicadores clave:**
- 🟢 Verde: Completado
- 🔵 Azul: En progreso
- 🟡 Amarillo: Pendiente

---

### 2️⃣ FASES XP

**Las 4 Fases:**

#### 📘 Planificación (Semana 1-2)
- Historias de Usuario
- Plan de Entregas
- Iteraciones Cortas
- Planning Game
- Velocidad del Proyecto

#### 🟣 Diseño (Semana 3-4)
- Diseño Simple
- Metáfora del Sistema
- Tarjetas CRC
- Refactorización

#### 🟢 Desarrollo (Semana 5-8)
- Programación en Parejas
- Test-Driven Development (TDD)
- Integración Continua
- Estándares de Código

#### 🟠 Pruebas (Semana 9-10)
- Pruebas de Aceptación
- Cliente On-Site
- Releases Pequeños
- Ritmo Sostenible

**¿Cómo usarlo?**
1. Entra a "Fases XP" desde el menú
2. Observa el progreso global en la parte superior
3. Cada fase muestra:
   - Estado actual (Pendiente/En progreso/Completada)
   - Barra de progreso
   - Lista de actividades clickeables
4. Haz click en cualquier actividad para ver detalles

---

### 3️⃣ DETALLE DE ACTIVIDAD

**¿Qué incluye cada actividad?**
- Descripción detallada
- Estado y tipo de actividad
- Progreso actualizable (slider interactivo)
- Roles asignados (siempre 2 personas)
- Artefactos asociados
- Contenido educativo específico
- Ejemplos prácticos
- Código de ejemplo (cuando aplica)

**Actividades con contenido especial:**
- **Historias de Usuario**: Formato, ejemplos, criterios de aceptación
- **TDD**: Ciclo Rojo-Verde-Refactor con código ejemplo
- **Pair Programming**: Roles, beneficios, mejores prácticas
- **Integración Continua**: Herramientas, prácticas clave

**¿Cómo actualizar el progreso?**
1. Ve a la vista de detalle de una actividad
2. Usa el slider "Actualizar progreso"
3. Mueve el slider (0-100%)
4. El progreso se actualiza automáticamente en toda la app

---

### 4️⃣ ITERACIONES

**¿Qué son las iteraciones?**
Sprints de 1-2 semanas donde se implementan historias de usuario específicas.

**Información de cada iteración:**
- Número y nombre
- Fechas de inicio y fin
- Estado (Completada/En progreso/Pendiente)
- Story points totales y completados
- Velocidad alcanzada
- Historias de usuario incluidas
- Equipo asignado

**Mejores prácticas mostradas:**
- Planning Game al inicio
- Daily Stand-ups durante la iteración
- Retrospectiva al final
- Demo al cliente

---

### 5️⃣ CALENDARIO

**Tipos de eventos:**
- 👥 **Reuniones**: Planning Game, retrospectivas, stand-ups
- 💻 **Trabajo**: Pair programming, refactorización
- 🧪 **Pruebas**: Pruebas de aceptación, validaciones

**Filtros disponibles:**
- Todos los eventos
- Solo reuniones
- Solo trabajo
- Solo pruebas

**¿Cómo usar los filtros?**
1. Ve a la sección Calendario
2. Click en el tipo de evento que quieres ver
3. Los eventos se filtran automáticamente
4. Cada evento muestra:
   - Título y fecha
   - Fase asociada
   - Participantes
   - Tipo de evento

---

### 6️⃣ ARTEFACTOS

**Tipos de artefactos:**
- 📄 **Documentos**: Historias de usuario, planes, criterios
- 📊 **Diagramas**: Tarjetas CRC, diseños, gráficos
- 💻 **Código**: Pruebas unitarias, código fuente
- 📈 **Métricas**: Burndown charts, velocidad

**Filtros disponibles:**
- Por fase (Planificación, Diseño, Desarrollo, Pruebas)
- Por estado (Completado, En progreso, Pendiente)
- Combinación de ambos

**Información de cada artefacto:**
- Nombre y tipo
- Fase asociada
- Autor
- Fecha de creación
- URL o ubicación
- Acciones (Descargar, Ver)

---

## 💡 CASOS DE USO

### Caso 1: Seguimiento del Proyecto
**Objetivo**: Ver el estado general del proyecto

1. Entra al Dashboard
2. Observa las métricas principales
3. Revisa el progreso por fase
4. Identifica actividades pendientes

### Caso 2: Actualizar Progreso de Actividad
**Objetivo**: Marcar el avance en una actividad específica

1. Dashboard → Fases XP
2. Click en la fase correspondiente (o actividad directa)
3. Click en la actividad deseada
4. Mueve el slider de progreso
5. El sistema actualiza automáticamente:
   - Progreso de la actividad
   - Progreso de la fase
   - Progreso general del proyecto

### Caso 3: Planificar Iteración
**Objetivo**: Revisar qué hacer en la próxima iteración

1. Ve a Iteraciones
2. Busca la iteración "En progreso" o "Pendiente"
3. Revisa:
   - Historias de usuario asignadas
   - Story points planificados
   - Fechas del sprint
   - Equipo asignado

### Caso 4: Aprender sobre XP
**Objetivo**: Entender una práctica específica de XP

1. Fases XP → Selecciona una fase
2. Click en la actividad que quieres aprender
3. Lee la descripción detallada
4. Revisa ejemplos y mejores prácticas
5. Observa código ejemplo (si aplica)

### Caso 5: Consultar Eventos
**Objetivo**: Ver qué reuniones o actividades hay

1. Ve a Calendario
2. Filtra por tipo si deseas
3. Revisa eventos por mes
4. Observa participantes y fase asociada

---

## ❓ PREGUNTAS FRECUENTES

### ¿Puedo modificar los datos?
Sí, a través del slider de progreso en cada actividad. El sistema incluye datos mock completos que puedes actualizar.

### ¿Las actualizaciones son persistentes?
Las actualizaciones se mantienen mientras la aplicación esté en ejecución. Al recargar la página, se restauran los datos iniciales (mock data).

### ¿Funciona offline?
Una vez cargada la aplicación, funciona completamente offline ya que todos los datos son locales.

### ¿Puedo agregar nuevas actividades?
En la versión actual se muestran las 17 actividades predefinidas de XP. Para agregar más, se debe modificar el archivo `src/data/mockData.js`.

### ¿Hay vistas vacías?
No. Todas las secciones tienen contenido significativo desde el inicio. Nunca verás una página en blanco.

### ¿Cómo se calculan los progresos?
- **Actividad**: Slider manual (0-100%)
- **Fase**: Promedio de todas sus actividades
- **General**: Proporción de actividades completadas vs. totales

### ¿Qué significan los colores?
- 🟢 **Verde**: Completado (100%)
- 🔵 **Azul**: En progreso (1-99%)
- 🟡 **Amarillo**: Pendiente (0%)

Cada fase también tiene su color distintivo:
- 🔵 Planificación: Azul
- 🟣 Diseño: Morado
- 🟢 Desarrollo: Verde
- 🟠 Pruebas: Naranja

### ¿Cómo detener el servidor?
- **Docker**: `docker-compose down`
- **NPM**: Presiona `Ctrl+C` en la terminal
- **PowerShell**: Selecciona la opción correspondiente

---

## 🎓 PARA EDUCADORES

Este dashboard es ideal para:
- **Clases de Metodologías Ágiles**: Demostración visual de XP
- **Talleres prácticos**: Framework listo para usar
- **Proyectos estudiantiles**: Plantilla de gestión
- **Aprendizaje autodirigido**: Contenido educativo integrado

---

## 🤝 SOPORTE

Para dudas o problemas:
1. Revisa el README.md
2. Consulta INICIO_RAPIDO.md
3. Verifica la consola del navegador para errores
4. Revisa logs de Docker: `docker-compose logs -f`

---

## 📚 RECURSOS ADICIONALES

- **Extreme Programming**: http://www.extremeprogramming.org/
- **React Documentation**: https://react.dev/
- **Docker Documentation**: https://docs.docker.com/

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2025  
**Licencia**: Proyecto Académico

---

¡Disfruta usando XP Dashboard! 🚀
