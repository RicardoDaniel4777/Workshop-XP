# 🚀 Guía de Inicio Rápido - Sistema de Persistencia

## Prerrequisitos

- Node.js 14+ instalado
- npm instalado
- Terminal PowerShell (en Windows)

## ⚡ Opción 1: Iniciar Todo con un Script (Recomendado)

### Windows PowerShell:
```powershell
# Navega a la raíz del proyecto
cd "ruta\a\WorkShopXP_Grupo3"

# Ejecuta el script
.\start-all.ps1
```

Esto abrirá:
- ✅ Servidor API en puerto 3001
- ✅ Frontend en puerto 3000
- ✅ Navegador automáticamente

## 🔧 Opción 2: Iniciar Manualmente (en 2 terminales)

### Terminal 1 - Servidor API:
```bash
cd "ruta\a\WorkShopXP_Grupo3\server"
npm start
```

Deberías ver:
```
╔════════════════════════════════════════════════════════════╗
║         API XP Dashboard - Persistencia Activa             ║
╠════════════════════════════════════════════════════════════╣
║  Servidor corriendo en: http://localhost:3001             ║
║  Directorio de datos: ./XP/                                ║
```

### Terminal 2 - Frontend:
```bash
cd "ruta\a\WorkShopXP_Grupo3"
npm run dev
```

Deberías ver:
```
VITE v5.4.21 ready in XXX ms

  ➜  Local:   http://localhost:3000/
```

## ✅ Verificar que Todo Funciona

### 1. Frontend cargado
Abre http://localhost:3000 en el navegador
- Deberías ver el dashboard XP

### 2. API respondiendo
```bash
curl http://localhost:3001/api/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "timestamp": "2026-01-01T...",
  "uptime": 12.345
}
```

### 3. Datos cargados
```bash
curl http://localhost:3001/api/historias
```

Debería retornar un array con historias (o array vacío si es primera vez)

## 📊 Verificar Persistencia

### Paso 1: Crear datos
1. Ve a http://localhost:3000/fases
2. Navega a "Planificación" → "Plan de Entregas"
3. Asigna una historia a un sprint (arrastra o dropdown)
4. Ve a "Iteraciones Cortas" y cambia el número de sprints a 5

### Paso 2: Reiniciar servidor API
```bash
# En la terminal del servidor:
# Presiona Ctrl+C para detener
# Ejecuta: node app.js
```

### Paso 3: Verificar persistencia
1. El frontend se reconectará automáticamente
2. Los datos deberían estar intactos:
   - La historia debería seguir asignada
   - El número de sprints debería ser 5

✅ **Si todo está igual = Persistencia funciona!**

## 📂 Estructura de Datos Persistentes

Los datos se almacenan en archivos JSON en `XP/1_Planning/`:

```
XP/1_Planning/
├── historias_usuarios.json          # 3 historias de ejemplo
├── release_plan.json                # Asignaciones de HU a sprints
├── sprints_fases.json               # Progreso de fases (%, diseño, etc)
├── reuniones_standups.json          # Notas de reuniones diarias
└── rotaciones_pair_programming.json # Asignación de roles
```

Puedes:
- ✏️ Editar estos archivos manualmente
- 🔄 Hacer backup antes de cambios
- 🗑️ Eliminarlos para empezar desde cero

## 🛠️ Troubleshooting

### Error: "Cannot find module 'express'"
```bash
# En la carpeta server, instala dependencias:
cd server
npm install
```

### Error: "Address already in use 3001"
```bash
# El servidor anterior no cerró. Opción 1:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Opción 2: Usa otro puerto:
set API_PORT=3002
npm start
```

### Error: "Cannot read historias_usuarios.json"
```bash
# Los archivos no existen. El servidor los crea automáticamente.
# Si no funciona, crea la carpeta manualmente:
mkdir XP\1_Planning
# Luego reinicia el servidor
```

### Frontend no carga datos
```bash
# Verifica en la consola del navegador (F12)
# Debería ver logs sobre carga de API
# Si ve CORS error, verifica que ambos servidores están corriendo
```

## 🎯 Tareas para Verificar Persistencia

### 1. Historias de Usuario
- Crear nueva historia
- Reiniciar servidor
- Verificar que la nueva historia está ahí

### 2. Plan de Entregas
- Asignar historia a Sprint 1
- Cambiar número de sprints a 4
- Reiniciar servidor
- Verificar asignaciones y número de sprints

### 3. Progreso de Fases
- Cambiar "Diseño" en Sprint 2 a 60%
- Reiniciar servidor
- Verificar que el progreso se guardó

### 4. Reuniones
- Agregar una reunión/standup
- Reiniciar servidor
- Verificar que aparece en la lista

### 5. Rotaciones
- Cambiar rol de una persona
- Reiniciar servidor
- Verificar cambio guardado

## 📝 Notas Importantes

- **Puertos**: API usa 3001, Frontend usa 3000. Ambos necesarios.
- **Carpeta XP**: Se crea automáticamente si no existe
- **Backup**: Se crea automáticamente antes de cambios (`.backup`)
- **Escritura**: Todos los cambios se guardan instantáneamente
- **Escalabilidad**: Estructura preparada para agregar más módulos

## 🔗 URLs Importantes

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend | http://localhost:3000 | Dashboard XP |
| API | http://localhost:3001/api | Base de endpoints |
| Health Check | http://localhost:3001/api/health | Estado del servidor |
| Historias | http://localhost:3001/api/historias | CRUD de HU |
| Plan | http://localhost:3001/api/plan | Plan de entregas |
| Fases | http://localhost:3001/api/sprints-fases | Progreso por sprint |
| Reuniones | http://localhost:3001/api/reuniones | Standups |
| Rotaciones | http://localhost:3001/api/rotaciones | Pair programming |

## 📞 Soporte

Si algo no funciona:

1. Verifica que ambos servidores están corriendo
2. Revisa la consola de errores (F12 en navegador)
3. Revisa logs en terminal del servidor
4. Intenta limpieza: cierra todo y reinicia

¡Disfruta del XP Dashboard con persistencia! 🎉
