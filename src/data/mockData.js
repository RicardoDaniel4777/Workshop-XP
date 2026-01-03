// Datos mock completos para el dashboard XP
export const mockData = {
  // Información general del proyecto
  proyecto: {
    nombre: "Sistema de Gestión XP",
    equipo: "Equipo Alpha",
    fechaInicio: "2025-01-02",
    fechaFin: "2025-06-30",
    velocidad: 25, // story points por iteración
    storyPointsTotal: 150,
    storyPointsCompletados: 45
  },

  // Roles del equipo (siempre 2 personas por rol)
  roles: [
    { nombre: "Cliente", personas: ["Ricardo Villarreal"] },
    { nombre: "Desarrolladores", personas: ["Cristian Robles", "Anthony Chiluiza"] },
    { nombre: "Coach XP", personas: ["Ricardo Villarreal"] },
    { nombre: "Tester", personas: ["Julio Arrobo", "Ricardo Villarreal"] }
  ],

  // 4 Fases de XP con sus actividades
  fases: [
    {
      id: "planificacion",
      nombre: "Planificación",
      estado: "completada", // pendiente | en-progreso | completada
      semana: "1-2",
      progreso: 100,
      color: "#3b82f6",
      descripcion: "Fase de definición de historias de usuario, estimación y planificación de entregas.",
      actividades: [
        {
          id: "historias-usuario",
          nombre: "Historias de Usuario",
          tipo: "artefacto",
          estado: "completada",
          progreso: 100,
          descripcion: "Definición y escritura de historias de usuario desde la perspectiva del cliente.",
          roles: ["Ricardo Villarreal", "Cristian Robles", "Anthony Chiluiza", "Julio Arrobo"],
          artefactos: ["user-stories"],
          enlace: "/actividad/historias-usuario"
        },
        {
          id: "plan-entregas",
          nombre: "Plan de Entregas",
          tipo: "planificacion",
          estado: "completada",
          progreso: 100,
          descripcion: "Planificación de releases y entregas incrementales.",
          roles: ["Ricardo Villarreal", "Cristian Robles", "Anthony Chiluiza", "Julio Arrobo"],
          artefactos: ["release-plan"],
          enlace: "/actividad/plan-entregas"
        },
        {
          id: "iteraciones-cortas",
          nombre: "Iteraciones Cortas",
          tipo: "planificacion",
          estado: "completada",
          progreso: 100,
          descripcion: "Definición de iteraciones de 1-2 semanas.",
          roles: ["Ricardo Villarreal", "Cristian Robles", "Anthony Chiluiza", "Julio Arrobo"],
          artefactos: ["iteration-plan"],
          enlace: "/actividad/iteraciones-cortas"
        },
        {
          id: "planning-game",
          nombre: "Planning Game",
          tipo: "actividad",
          estado: "completada",
          progreso: 100,
          descripcion: "Juego de planificación colaborativa entre cliente y desarrolladores.",
          roles: ["Ricardo Villarreal", "Cristian Robles", "Anthony Chiluiza", "Julio Arrobo"],
          artefactos: ["planning-cards"],
          enlace: "/actividad/planning-game"
        },
        {
          id: "velocidad-proyecto",
          nombre: "Velocidad del Proyecto",
          tipo: "metrica",
          estado: "completada",
          progreso: 100,
          descripcion: "Medición de la velocidad del equipo en story points.",
          roles: ["Ricardo Villarreal", "Cristian Robles", "Anthony Chiluiza", "Julio Arrobo"],
          artefactos: ["velocity-chart"],
          enlace: "/actividad/velocidad-proyecto"
        },
        {
          id: "reuniones",
          nombre: "Reuniones Diarias (Stand-up)",
          tipo: "actividad",
          estado: "en-progreso",
          progreso: 75,
          descripcion: "Reuniones diarias de sincronización del equipo para compartir avances, planes y bloqueos.",
          roles: ["Ricardo Villarreal", "Cristian Robles", "Anthony Chiluiza", "Julio Arrobo"],
          artefactos: ["standup-cards"],
          enlace: "/actividad/reuniones"
        }
      ]
    },
    {
      id: "diseno",
      nombre: "Diseño",
      estado: "en-progreso",
      semana: "3-4",
      progreso: 60,
      color: "#8b5cf6",
      descripcion: "Fase de diseño simple, metáforas del sistema y arquitectura emergente.",
      actividades: [
        {
          id: "diseno-simple",
          nombre: "Diseño Simple",
          tipo: "practica",
          estado: "completada",
          progreso: 100,
          descripcion: "Diseño más simple que pueda funcionar (YAGNI - You Aren't Gonna Need It).",
          roles: ["Ana López", "Pedro Sánchez"],
          artefactos: ["design-docs"],
          enlace: "/actividad/diseno-simple"
        },
        {
          id: "metafora-sistema",
          nombre: "Metáfora del Sistema",
          tipo: "practica",
          estado: "en-progreso",
          progreso: 75,
          descripcion: "Uso de metáforas para describir el sistema de forma comprensible.",
          roles: ["Laura Martínez", "Carlos Ruiz"],
          artefactos: ["system-metaphor"],
          enlace: "/actividad/metafora-sistema"
        },
        {
          id: "tarjetas-crc",
          nombre: "Tarjetas CRC",
          tipo: "artefacto",
          estado: "en-progreso",
          progreso: 50,
          descripcion: "Tarjetas Clase-Responsabilidad-Colaboración para diseño orientado a objetos.",
          roles: ["Ana López", "Juan Pérez"],
          artefactos: ["crc-cards"],
          enlace: "/actividad/tarjetas-crc"
        },
        {
          id: "refactorizacion",
          nombre: "Refactorización",
          tipo: "practica",
          estado: "en-progreso",
          progreso: 40,
          descripcion: "Mejora continua del diseño del código sin cambiar su funcionalidad.",
          roles: ["Pedro Sánchez", "Ana López"],
          artefactos: ["refactoring-log"],
          enlace: "/actividad/refactorizacion"
        }
      ]
    },
    {
      id: "desarrollo",
      nombre: "Desarrollo",
      estado: "en-progreso",
      semana: "5-8",
      progreso: 45,
      color: "#10b981",
      descripcion: "Fase de codificación con prácticas XP: pair programming, TDD, integración continua.",
      actividades: [
        {
          id: "programacion-parejas",
          nombre: "Programación en Parejas",
          tipo: "practica",
          estado: "en-progreso",
          progreso: 60,
          descripcion: "Dos programadores trabajando en la misma estación de trabajo.",
          roles: ["Ana López", "Pedro Sánchez"],
          artefactos: ["pair-rotation"],
          enlace: "/actividad/programacion-parejas"
        },
        {
          id: "tdd",
          nombre: "Test-Driven Development (TDD)",
          tipo: "practica",
          estado: "en-progreso",
          progreso: 55,
          descripcion: "Escribir primero las pruebas, luego el código que las pasa.",
          roles: ["Pedro Sánchez", "Ana López"],
          artefactos: ["unit-tests"],
          enlace: "/actividad/tdd"
        },
        {
          id: "integracion-continua",
          nombre: "Integración Continua",
          tipo: "practica",
          estado: "en-progreso",
          progreso: 40,
          descripcion: "Integración del código varias veces al día.",
          roles: ["Miguel Ángel", "Juan Pérez"],
          artefactos: ["ci-pipeline"],
          enlace: "/actividad/integracion-continua"
        },
        {
          id: "estandares-codigo",
          nombre: "Estándares de Código",
          tipo: "practica",
          estado: "en-progreso",
          progreso: 30,
          descripcion: "Convenciones de codificación compartidas por el equipo.",
          roles: ["Laura Martínez", "Ana López"],
          artefactos: ["coding-standards"],
          enlace: "/actividad/estandares-codigo"
        }
      ]
    },
    {
      id: "pruebas",
      nombre: "Pruebas",
      estado: "pendiente",
      semana: "9-10",
      progreso: 15,
      color: "#f59e0b",
      descripcion: "Fase de pruebas de aceptación, validación con el cliente y releases.",
      actividades: [
        {
          id: "pruebas-aceptacion",
          nombre: "Pruebas de Aceptación",
          tipo: "practica",
          estado: "en-progreso",
          progreso: 30,
          descripcion: "Pruebas definidas por el cliente para validar historias de usuario.",
          roles: ["María García", "Carlos Ruiz"],
          artefactos: ["acceptance-tests"],
          enlace: "/actividad/pruebas-aceptacion"
        },
        {
          id: "cliente-onsite",
          nombre: "Cliente On-Site",
          tipo: "practica",
          estado: "en-progreso",
          progreso: 20,
          descripcion: "Cliente disponible todo el tiempo para resolver dudas.",
          roles: ["María García", "Ana López"],
          artefactos: ["client-feedback"],
          enlace: "/actividad/cliente-onsite"
        },
        {
          id: "releases-pequenos",
          nombre: "Releases Pequeños",
          tipo: "practica",
          estado: "pendiente",
          progreso: 0,
          descripcion: "Entregas frecuentes de versiones funcionales del software.",
          roles: ["Laura Martínez", "Miguel Ángel"],
          artefactos: ["release-notes"],
          enlace: "/actividad/releases-pequenos"
        },
        {
          id: "ritmo-sostenible",
          nombre: "Ritmo Sostenible",
          tipo: "practica",
          estado: "en-progreso",
          progreso: 10,
          descripcion: "Trabajar a un ritmo que pueda mantenerse indefinidamente.",
          roles: ["Laura Martínez", "Juan Pérez"],
          artefactos: ["burndown-chart"],
          enlace: "/actividad/ritmo-sostenible"
        }
      ]
    }
  ],

  // Iteraciones del proyecto
  iteraciones: [
    {
      id: "iter-1",
      numero: 1,
      nombre: "Iteración 1 - Setup",
      fechaInicio: "2025-01-02",
      fechaFin: "2025-01-16",
      estado: "completada",
      progreso: 100,
      velocidad: 28,
      storyPoints: 28,
      storyPointsCompletados: 28,
      historias: ["HU-001", "HU-002", "HU-003"],
      equipo: ["Ana López", "Pedro Sánchez"]
    },
    {
      id: "iter-2",
      numero: 2,
      nombre: "Iteración 2 - Core Features",
      fechaInicio: "2025-01-17",
      fechaFin: "2025-01-31",
      estado: "en-progreso",
      progreso: 65,
      velocidad: 25,
      storyPoints: 25,
      storyPointsCompletados: 17,
      historias: ["HU-004", "HU-005", "HU-006", "HU-007"],
      equipo: ["Ana López", "Pedro Sánchez"]
    },
    {
      id: "iter-3",
      numero: 3,
      nombre: "Iteración 3 - Advanced Features",
      fechaInicio: "2025-02-01",
      fechaFin: "2025-02-14",
      estado: "pendiente",
      progreso: 0,
      velocidad: 25,
      storyPoints: 30,
      storyPointsCompletados: 0,
      historias: ["HU-008", "HU-009", "HU-010"],
      equipo: ["Ana López", "Pedro Sánchez"]
    }
  ],

  // Artefactos del proyecto
  artefactos: [
    {
      id: "user-stories",
      nombre: "Historias de Usuario",
      tipo: "Documento",
      fase: "planificacion",
      fecha: "2025-01-05",
      autor: "María García",
      estado: "completado",
      url: "/artefactos/user-stories.pdf"
    },
    {
      id: "release-plan",
      nombre: "Plan de Releases",
      tipo: "Documento",
      fase: "planificacion",
      fecha: "2025-01-08",
      autor: "Carlos Ruiz",
      estado: "completado",
      url: "/artefactos/release-plan.pdf"
    },
    {
      id: "crc-cards",
      nombre: "Tarjetas CRC",
      tipo: "Diagrama",
      fase: "diseno",
      fecha: "2025-01-20",
      autor: "Ana López",
      estado: "en-progreso",
      url: "/artefactos/crc-cards.png"
    },
    {
      id: "unit-tests",
      nombre: "Pruebas Unitarias",
      tipo: "Código",
      fase: "desarrollo",
      fecha: "2025-01-25",
      autor: "Pedro Sánchez",
      estado: "en-progreso",
      url: "/src/tests/"
    },
    {
      id: "acceptance-tests",
      nombre: "Pruebas de Aceptación",
      tipo: "Documento",
      fase: "pruebas",
      fecha: "2025-01-28",
      autor: "María García",
      estado: "en-progreso",
      url: "/artefactos/acceptance-tests.pdf"
    }
  ],

  // Eventos del calendario
  eventos: [
    {
      id: "evt-1",
      titulo: "Planning Game - Iteración 1",
      fecha: "2025-01-02",
      tipo: "reunion",
      fase: "planificacion",
      participantes: ["María García", "Ana López", "Pedro Sánchez", "Laura Martínez"]
    },
    {
      id: "evt-2",
      titulo: "Daily Stand-up",
      fecha: "2025-01-10",
      tipo: "reunion",
      fase: "desarrollo",
      participantes: ["Ana López", "Pedro Sánchez", "Laura Martínez"]
    },
    {
      id: "evt-3",
      titulo: "Retrospectiva - Iteración 1",
      fecha: "2025-01-16",
      tipo: "reunion",
      fase: "planificacion",
      participantes: ["Todo el equipo"]
    },
    {
      id: "evt-4",
      titulo: "Planning Game - Iteración 2",
      fecha: "2025-01-17",
      tipo: "reunion",
      fase: "planificacion",
      participantes: ["María García", "Ana López", "Pedro Sánchez", "Laura Martínez"]
    },
    {
      id: "evt-5",
      titulo: "Sesión de Pair Programming",
      fecha: "2025-01-22",
      tipo: "trabajo",
      fase: "desarrollo",
      participantes: ["Ana López", "Pedro Sánchez"]
    },
    {
      id: "evt-6",
      titulo: "Pruebas de Aceptación",
      fecha: "2025-01-29",
      tipo: "prueba",
      fase: "pruebas",
      participantes: ["María García", "Carlos Ruiz", "Ana López"]
    }
  ]
};

// Función helper para calcular el progreso general
export const calcularProgresoGeneral = () => {
  const fases = mockData.fases;
  const totalActividades = fases.reduce((sum, fase) => sum + fase.actividades.length, 0);
  const actividadesCompletadas = fases.reduce(
    (sum, fase) => sum + fase.actividades.filter(a => a.estado === 'completada').length,
    0
  );
  return Math.round((actividadesCompletadas / totalActividades) * 100);
};

// Función helper para obtener una actividad por ID
export const obtenerActividad = (activityId) => {
  for (const fase of mockData.fases) {
    const actividad = fase.actividades.find(a => a.id === activityId);
    if (actividad) {
      return { ...actividad, fase: fase.nombre, faseId: fase.id };
    }
  }
  return null;
};

// Función helper para obtener estadísticas
export const obtenerEstadisticas = () => {
  const totalActividades = mockData.fases.reduce((sum, fase) => sum + fase.actividades.length, 0);
  const actividadesCompletadas = mockData.fases.reduce(
    (sum, fase) => sum + fase.actividades.filter(a => a.estado === 'completada').length,
    0
  );
  const actividadesEnProgreso = mockData.fases.reduce(
    (sum, fase) => sum + fase.actividades.filter(a => a.estado === 'en-progreso').length,
    0
  );
  
  return {
    totalActividades,
    actividadesCompletadas,
    actividadesEnProgreso,
    actividadesPendientes: totalActividades - actividadesCompletadas - actividadesEnProgreso,
    progresoGeneral: calcularProgresoGeneral(),
    velocidad: mockData.proyecto.velocidad,
    storyPointsTotal: mockData.proyecto.storyPointsTotal,
    storyPointsCompletados: mockData.proyecto.storyPointsCompletados
  };
};
