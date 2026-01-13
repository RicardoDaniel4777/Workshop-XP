# XP Dashboard - Extreme Programming Framework

Framework interactivo para la gestión y visualización de proyectos con metodología Extreme Programming (XP).

## 🚀 Características

- **Dashboard General**: Vista panorámica del progreso del proyecto
- **Fases XP**: Visualización detallada de las 4 fases (Planificación, Diseño, Desarrollo, Pruebas)
- **Actividades Interactivas**: Cada actividad XP con detalles, roles y artefactos
- **Iteraciones**: Gestión de sprints de 1-2 semanas
- **Calendario**: Eventos, reuniones y actividades del proyecto
- **Artefactos**: Documentos, diagramas y recursos del proyecto
- **Progreso en Tiempo Real**: Actualización dinámica de métricas
- **Interfaz Moderna**: Diseño responsivo y visualmente atractivo

## 📋 Requisitos Previos

- Node.js 18+ (para desarrollo local)
- Docker y Docker Compose (para deployment)

## 🐳 Inicio Rápido con Docker

La forma más rápida de ejecutar el proyecto es con Docker:

```bash
# Clonar o navegar al directorio del proyecto
cd "C:\Users\anthony\Desktop\Universidad\Deberes\Sexto Semestre\Metodologías ágiles\V3"

# Construir y levantar el contenedor
docker-compose up --build -d

# El dashboard estará disponible en http://localhost:3000
```

### Comandos Docker útiles

```bash
# Ver logs
docker-compose logs -f

# Detener el contenedor
docker-compose down

# Reconstruir después de cambios
docker-compose up -d --build
```

## 💻 Desarrollo Local

Si prefieres ejecutar el proyecto sin Docker:

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# El dashboard estará disponible en http://localhost:3000
```

### Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Preview de la build de producción

## 📁 Estructura del Proyecto

```
V3/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Layout/         # Layout principal
│   │   ├── PhaseCard/      # Tarjeta de fase
│   │   ├── ProgressBar/    # Barra de progreso
│   │   └── Modal/          # Modal genérico
│   ├── pages/              # Páginas/vistas principales
│   │   ├── Dashboard/      # Vista dashboard general
│   │   ├── FasesXP/        # Vista de fases XP
│   │   ├── ActivityDetail/ # Detalle de actividad
│   │   ├── Iteraciones/    # Gestión de iteraciones
│   │   ├── Calendario/     # Calendario de eventos
│   │   └── Artefactos/     # Gestión de artefactos
│   ├── context/            # Estado global (React Context)
│   ├── data/               # Datos mock
│   ├── App.jsx             # Componente principal
│   └── main.jsx            # Punto de entrada
├── public/                 # Assets estáticos
├── Dockerfile              # Configuración Docker
├── docker-compose.yml      # Orquestación Docker
├── nginx.conf              # Configuración Nginx
└── package.json            # Dependencias y scripts
```

## 🎯 Funcionalidades Principales

### 1. Dashboard General
- Métricas clave del proyecto
- Progreso general
- Acceso rápido a todas las secciones
- Resumen de fases

### 2. Fases XP
- **Planificación**: Historias de Usuario, Plan de Entregas, Planning Game
- **Diseño**: Diseño Simple, Metáfora del Sistema, Tarjetas CRC
- **Desarrollo**: Pair Programming, TDD, Integración Continua
- **Pruebas**: Pruebas de Aceptación, Cliente On-Site, Releases

### 3. Actividades Detalladas
- Descripción completa de cada práctica XP
- Roles asignados (siempre 2 personas)
- Artefactos asociados
- Control de progreso interactivo
- Ejemplos y mejores prácticas

### 4. Iteraciones
- Gestión de sprints
- Velocidad del equipo
- Story points completados
- Historias de usuario por iteración

### 5. Calendario
- Eventos del proyecto
- Reuniones XP
- Sesiones de trabajo
- Filtros por tipo de evento

### 6. Artefactos
- Documentos del proyecto
- Diagramas de diseño
- Código y pruebas
- Filtros por fase y estado

## 🛠️ Tecnologías Utilizadas

- **React 18** - Librería UI
- **React Router 6** - Navegación
- **Context API** - Gestión de estado
- **Vite** - Build tool
- **CSS Modules** - Estilos
- **Docker** - Containerización
- **Nginx** - Servidor web

## 📊 Datos Mock

El sistema incluye datos mock completos:
- 4 fases con 17 actividades totales
- 3 iteraciones con diferentes estados
- 6 eventos del calendario
- 5 artefactos de diferentes tipos
- 4 roles con 2 personas cada uno

## 🎨 Diseño y UX

- **Responsivo**: Adaptado a desktop, tablet y móvil
- **Navegación Clara**: Sin vistas vacías
- **Feedback Visual**: Estados, progresos y acciones claras
- **Accesibilidad**: Colores contrastados y textos legibles
- **Animaciones Suaves**: Transiciones y efectos visuales

## 📝 Licencia

Este proyecto es parte de un trabajo académico para la Universidad.

## 👥 Equipo

Desarrollado como framework educativo y de gestión para proyectos XP.

## 🔗 Recursos Adicionales

- [Extreme Programming Explained - Kent Beck](http://www.extremeprogramming.org/)
- [Agile Alliance - XP](https://www.agilealliance.org/glossary/xp/)
- [React Documentation](https://react.dev/)

---

**Nota**: Este es un proyecto académico con fines educativos y de demostración de la metodología XP.
