# 📝 Guía: Gestión de Historias de Usuario

## Descripción General

El sistema ahora incluye una interfaz completa para gestionar Historias de Usuario en la actividad "Historias de Usuario" dentro de la fase de **Planificación**.

## 🎯 Funcionalidades Implementadas

### ✅ Requisito 1: Lista Dinámica de Historias
- **Ubicación**: `/actividad/historias-usuario` → Sección "📄 Artefactos Asociados"
- **Características**:
  - Muestra todas las historias creadas en tarjetas visuales
  - Cada tarjeta incluye:
    - Código único (HU-001, HU-002, etc.)
    - Título descriptivo
    - Narrativa completa: "Como [rol], quiero [acción], para [beneficio]"
    - Badges de prioridad y estado
    - Story points asignados
    - Iteración asociada
    - Número de criterios de aceptación
  - Contador de historias totales
  - Vista de criterios de aceptación expandible (details/summary)
  - Diseño responsivo y visualmente atractivo

### ✅ Requisito 2: Botón "Crear Nueva"
- **Ubicación**: Parte superior derecha de la sección de Historias de Usuario
- **Funcionalidad**:
  - Abre un modal con formulario completo
  - Genera automáticamente el código de la historia (HU-XXX)
  - Campos del formulario:
    - **Información Básica**: Título, Rol, Prioridad
    - **Historia de Usuario**: Acción y Beneficio (con preview en tiempo real)
    - **Criterios de Aceptación**: Lista dinámica (agregar/eliminar)
    - **Gestión**: Story Points, Estado, Iteración
  - Vista previa de la narrativa mientras se escribe
  - Validación de campos obligatorios

### ✅ Requisito 3: Botón "Editar"
- **Ubicación**: Dentro de cada tarjeta de historia de usuario
- **Funcionalidad**:
  - Abre el mismo modal pero en modo edición
  - Carga todos los datos existentes de la historia
  - Permite modificar cualquier campo
  - Actualiza la historia en tiempo real
  - Mantiene el código de la historia

### 🎁 Funcionalidad Extra: Botón "Eliminar"
- Permite eliminar historias con confirmación
- Actualiza la lista automáticamente

## 🚀 Cómo Usar

### Acceder a la Gestión de Historias

1. **Navega a la actividad**:
   ```
   Dashboard → Fases XP → Planificación → Historias de Usuario
   ```
   O directamente: http://localhost:3000/actividad/historias-usuario

2. **Desplázate** hasta la sección "📄 Artefactos Asociados"

### Crear una Nueva Historia

1. Click en el botón **"+ Crear Nueva"** (azul, esquina superior derecha)

2. Completa el formulario:
   ```
   Título: Ej. "Búsqueda avanzada de productos"
   Rol: Ej. "Cliente"
   Acción: Ej. "buscar productos usando múltiples filtros"
   Beneficio: Ej. "encontrar exactamente lo que necesito"
   Prioridad: Alta / Media / Baja
   ```

3. Agrega **Criterios de Aceptación**:
   - Escribe cada criterio en un campo
   - Click en "+ Agregar Criterio" para más campos
   - Click en 🗑️ para eliminar un criterio

4. Completa **Detalles de Gestión**:
   ```
   Story Points: 0-21 (escala Fibonacci recomendada)
   Estado: Pendiente / En Progreso / Completada
   Iteración: Ej. "Iteración 1"
   ```

5. Click en **"Crear Historia"**

### Editar una Historia Existente

1. Localiza la historia en la lista

2. Click en el botón **"✏️ Editar"**

3. Modifica los campos necesarios en el modal

4. Click en **"Actualizar Historia"**

### Ver Criterios de Aceptación

1. En cada tarjeta de historia, busca el texto "Ver criterios de aceptación (X)"

2. Click para expandir/contraer la lista de criterios

### Eliminar una Historia

1. Click en el botón **"🗑️ Eliminar"**

2. Confirma la eliminación en el diálogo

## 📊 Datos de Ejemplo Incluidos

El sistema incluye 3 historias de usuario de ejemplo:

### HU-001: Búsqueda de productos por categoría
- **Rol**: Cliente
- **Prioridad**: Alta
- **Story Points**: 5
- **Estado**: Completada
- **Iteración**: Iteración 1

### HU-002: Reportes de ventas para administradores
- **Rol**: Administrador
- **Prioridad**: Alta
- **Story Points**: 8
- **Estado**: En Progreso
- **Iteración**: Iteración 2

### HU-003: Guardar preferencias del usuario
- **Rol**: Usuario
- **Prioridad**: Media
- **Story Points**: 3
- **Estado**: Completada
- **Iteración**: Iteración 1

## 🎨 Características de Diseño

### Código de Colores por Prioridad
- 🔴 **Alta**: Fondo rojo claro
- 🟡 **Media**: Fondo amarillo claro
- 🔵 **Baja**: Fondo azul claro

### Estados Visuales
- ✅ **Completada**: Verde
- 🔄 **En Progreso**: Azul
- ⏳ **Pendiente**: Amarillo

### Efectos Interactivos
- Hover en tarjetas: Borde azul + elevación
- Hover en botones: Cambio de color + escala
- Transiciones suaves en todos los elementos

## 🔧 Implementación Técnica

### Archivos Modificados/Creados

1. **Context API** (`src/context/XPContext.jsx`):
   - Estado global para historias de usuario
   - Funciones CRUD completas
   - 3 historias de ejemplo iniciales

2. **Componente Modal** (`src/components/HistoriaUsuarioModal/`):
   - `HistoriaUsuarioModal.jsx`: Lógica del formulario
   - `HistoriaUsuarioModal.css`: Estilos del modal
   - Validación de campos
   - Gestión dinámica de criterios

3. **ActivityDetail** (`src/pages/ActivityDetail/`):
   - Integración del modal
   - Sección de historias de usuario
   - Handlers para crear/editar/eliminar
   - Renderizado condicional (solo para actividad "historias-usuario")

4. **Estilos** (`src/pages/ActivityDetail/ActivityDetail.css`):
   - ~250 líneas de CSS para historias
   - Diseño responsivo
   - Animaciones y transiciones

### Persistencia de Datos
- Las historias se almacenan en el estado global (Context API)
- Los datos persisten durante la sesión actual
- Se reinician al recargar la página
- **Para persistencia permanente**: Integrar con backend o localStorage

### Auto-generación de Códigos
```javascript
codigo: `HU-${String(historiasUsuario.length + 1).padStart(3, '0')}`
// Resultado: HU-001, HU-002, HU-003, etc.
```

## 📱 Responsive Design

### Desktop (> 768px)
- Formulario en 2-3 columnas
- Tarjetas con layout completo
- Botones en fila

### Mobile (< 768px)
- Formulario en 1 columna
- Botón "Crear Nueva" ocupa ancho completo
- Tarjetas apiladas
- Metadatos en columna
- Botones en columna

## 🎓 Buenas Prácticas de XP Implementadas

1. **INVEST Principles**:
   - Independent (Independiente)
   - Negotiable (Negociable)
   - Valuable (Valiosa)
   - Estimable (Estimable)
   - Small (Pequeña)
   - Testable (Testeable)

2. **Formato Estándar**: "Como [rol], quiero [acción], para [beneficio]"

3. **Criterios de Aceptación**: Define claramente cuándo está completa

4. **Story Points**: Estimación de complejidad

5. **Priorización**: Alta, Media, Baja

## 🚦 Testing Rápido

### Prueba 1: Crear Historia
1. Ir a http://localhost:3000/actividad/historias-usuario
2. Click "Crear Nueva"
3. Llenar formulario
4. Verificar que aparezca en la lista

### Prueba 2: Editar Historia
1. Click "Editar" en HU-001
2. Cambiar prioridad a "Baja"
3. Verificar cambio en badge

### Prueba 3: Ver Criterios
1. Click en "Ver criterios de aceptación"
2. Verificar que se expanda/contraiga

### Prueba 4: Eliminar Historia
1. Click "Eliminar" en una historia
2. Confirmar
3. Verificar que desaparezca

## 💡 Extensiones Futuras Sugeridas

1. **Persistencia**: Guardar en localStorage o backend
2. **Búsqueda/Filtros**: Filtrar por estado, prioridad, iteración
3. **Drag & Drop**: Reordenar historias
4. **Importar/Exportar**: JSON, CSV, PDF
5. **Plantillas**: Historias predefinidas por tipo
6. **Comentarios**: Discusión en cada historia
7. **Historial**: Auditoría de cambios
8. **Asignación**: Vincular con desarrolladores específicos

## 📞 Soporte

Para problemas o preguntas:
- Revisar la consola del navegador (F12)
- Verificar que el servidor esté corriendo en http://localhost:3000
- Revisar la documentación del proyecto en README.md

---

**Estado**: ✅ Completamente funcional
**Versión**: 1.0
**Última actualización**: 30 de diciembre de 2025
