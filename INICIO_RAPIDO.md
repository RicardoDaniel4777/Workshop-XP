# GUÍA DE INICIO RÁPIDO - XP DASHBOARD

## ⚡ INICIO MÁS RÁPIDO (1 COMANDO)

### Opción 1: Con Docker (RECOMENDADO)
```bash
docker-compose up -d
```
Luego abre: http://localhost:3000

### Opción 2: Con PowerShell Script
```powershell
.\start.ps1
```

### Opción 3: Desarrollo local
```bash
npm install
npm run dev
```

## 📂 ESTRUCTURA DEL PROYECTO

```
V3/
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── pages/          # 6 vistas principales
│   ├── context/        # Estado global
│   └── data/           # Datos mock
├── Dockerfile          # Configuración Docker
├── docker-compose.yml  # Orquestación
└── README.md          # Documentación completa
```

## 🎯 CARACTERÍSTICAS IMPLEMENTADAS

✅ Dashboard General con métricas
✅ Vista Fases XP (4 fases completas)
✅ Actividades clickeables (17 actividades)
✅ Detalles de cada actividad con contenido
✅ Iteraciones (3 iteraciones configuradas)
✅ Calendario de eventos (6 eventos)
✅ Artefactos (5 artefactos)
✅ Navegación sin vistas vacías
✅ Progreso dinámico actualizable
✅ Datos mock completos
✅ Diseño responsivo
✅ Docker con un comando

## 🔄 NAVEGACIÓN

Dashboard → Fases XP → Click en Actividad → Vista Detallada
         → Iteraciones → Gestión de sprints
         → Calendario → Eventos del proyecto
         → Artefactos → Documentos y recursos

## 📊 DATOS INCLUIDOS

- 4 Fases XP completas
- 17 Actividades con detalles
- Planificación: 5 actividades
- Diseño: 4 actividades
- Desarrollo: 4 actividades
- Pruebas: 4 actividades
- 3 Iteraciones
- 6 Eventos calendario
- 5 Artefactos
- 4 Roles (2 personas cada uno)

## 🎨 VISTAS PRINCIPALES

1. **Dashboard**: Vista general, métricas, acceso rápido
2. **Fases XP**: 4 fases con progreso y actividades
3. **Detalle Actividad**: Información completa, ejemplos, código
4. **Iteraciones**: Sprints, velocidad, story points
5. **Calendario**: Eventos, reuniones, filtros
6. **Artefactos**: Documentos, diagramas, filtros

## 🚀 COMANDOS DOCKER

```bash
# Iniciar
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Reconstruir
docker-compose up -d --build
```

## 💻 COMANDOS NPM

```bash
# Instalar
npm install

# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## ✨ INTERACTIVIDAD

- Click en actividades → Navega a detalle
- Slider de progreso → Actualiza en tiempo real
- Filtros → Calendario y Artefactos
- Navegación → Breadcrumbs y botones volver
- Estados visuales → Colores por fase

## 🎓 USO EDUCATIVO

Perfecto para:
- Aprender Extreme Programming
- Gestionar proyectos XP
- Demostración de metodologías ágiles
- Framework de trabajo en equipo

---
Desarrollado como proyecto académico de Metodologías Ágiles
