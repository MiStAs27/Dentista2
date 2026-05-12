# DentaSync - Documentación de Funcionalidades

## Índice
1. [Autenticación y Perfiles](#autenticación-y-perfiles)
2. [Dashboard](#dashboard)
3. [Gestión de Pacientes](#gestión-de-pacientes)
4. [Sistema de Citas](#sistema-de-citas)
5. [Agenda Inteligente](#agenda-inteligente)
6. [Odontograma Digital](#odontograma-digital)
7. [Tratamientos](#tratamientos)
8. [Reportes y Analítica](#reportes-y-analítica)
9. [Configuración](#configuración)
10. [Asistente Virtual IA](#asistente-virtual-ia)
11. [Portal del Paciente](#portal-del-paciente)
12. [Notificaciones](#notificaciones)

---

## Autenticación y Perfiles

### Inicio de Sesión
- **Página de login profesional** con diseño moderno
- **Validación de credenciales** contra base de datos mock
- **Múltiples perfiles de usuario**: Odontólogo, Asistente, Paciente
- **Persistencia de sesión** mediante LocalStorage
- **Redirección automática** según el rol

### Roles y Permisos
- **Odontólogo**: Acceso completo a todas las funcionalidades
- **Asistente**: Gestión de citas, pacientes y agenda
- **Paciente**: Portal limitado con información personal

---

## Dashboard

### Vista General
El dashboard proporciona una vista completa del estado del consultorio:

#### Tarjetas de Métricas (KPIs)
1. **Total Pacientes**: Cantidad de pacientes registrados con tendencia
2. **Citas Hoy**: Número de citas programadas para el día actual
3. **Ingresos del Mes**: Total de ingresos generados
4. **Tasa de Asistencia**: Porcentaje de pacientes que asisten vs. ausentes

#### Gráficos Interactivos
1. **Rendimiento Semanal**: Gráfico de líneas mostrando citas e ingresos
2. **Distribución de Tratamientos**: Gráfico de torta con tipos de procedimientos
3. **Citas del Día**: Lista interactiva con estado en tiempo real
4. **Próximas Citas**: Vista de las siguientes 5 citas programadas

#### Pacientes Recientes
Grid con los últimos 6 pacientes registrados, con acceso rápido a sus expedientes.

---

## Gestión de Pacientes

### Listado de Pacientes
- **Tarjetas visuales** con foto, nombre y datos de contacto
- **Búsqueda en tiempo real** por nombre, email o teléfono
- **Filtros**: Todos, Activos, Inactivos
- **Indicador de última visita**
- **Estado del paciente** (Activo/Inactivo)

### Registro de Nuevo Paciente
Formulario completo con:
- Datos personales (nombre, apellido, fecha de nacimiento)
- Información de contacto (email, teléfono, dirección)
- Contacto de emergencia
- Género y ciudad
- Validaciones en tiempo real

### Expediente del Paciente
Vista detallada organizada en **4 tabs principales**:

#### 1. Historia Clínica
- **Alergias**: Lista de alergias con badges
- **Condiciones Médicas**: Enfermedades crónicas o relevantes
- **Medicamentos Actuales**: Lista de medicación en uso
- **Trabajos Dentales Previos**: Historial de procedimientos
- **Notas Adicionales**: Observaciones importantes

#### 2. Odontograma
- Representación visual interactiva de 32 dientes
- Click en diente para actualizar estado
- 8 estados posibles por diente
- Notas individuales por pieza dental
- Leyenda con código de colores

#### 3. Tratamientos
- Lista completa de tratamientos realizados
- Detalles: diagnóstico, procedimiento, costo
- Estado de pago (Pagado/Pendiente)
- Prescripciones médicas asociadas
- Registro de nuevo tratamiento con formulario modal

#### 4. Citas
- Historial completo de citas del paciente
- Ordenado por fecha descendente
- Estados y tipos claramente identificados
- Notas de cada cita

---

## Sistema de Citas

### Listado de Citas
- **Vista completa** de todas las citas del sistema
- **Búsqueda** por paciente o teléfono
- **Filtros por estado**: Todas, Programadas, Confirmadas, En curso, Completadas, Canceladas, No asistió
- **Información detallada**: Paciente, fecha, hora, duración, tipo
- **Cambio rápido de estado** mediante dropdown

### Crear Nueva Cita
Formulario modal con:
- Selección de paciente (dropdown con búsqueda)
- Fecha y hora
- Tipo de procedimiento (9 opciones)
- Duración estimada
- Notas adicionales
- Validaciones completas

### Estados de Cita
1. **Programada**: Cita agendada pendiente de confirmación
2. **Confirmada**: Paciente confirmó asistencia
3. **En curso**: Paciente en atención
4. **Completada**: Consulta finalizada
5. **Cancelada**: Cita cancelada por paciente o consultorio
6. **No asistió**: Paciente no se presentó

### Tipos de Citas
- Consulta general
- Limpieza dental
- Extracción
- Relleno/Obturación
- Endodoncia (tratamiento de conducto)
- Ortodoncia
- Cosmética dental
- Emergencia
- Seguimiento

---

## Agenda Inteligente

### Vista Semanal
- **Calendario grid** con 7 días
- **Horario**: 8:00 AM - 6:00 PM (horario de trabajo)
- **Día actual** resaltado con color diferente
- **Citas visuales** con código de colores por estado
- **Información compacta**: Nombre, hora, duración
- **Click en cita** para ver detalles del paciente

### Vista Diaria
- **Vista expandida** de un solo día
- **Bloques horarios** por hora completa
- **Detalles completos** de cada cita
- **Identificación visual** clara del estado
- **Espacios vacíos** identificados

### Navegación
- **Botones anterior/siguiente** para cambiar semana o día
- **Botón "Hoy"** para volver a la fecha actual
- **Toggle Vista**: Cambio rápido entre día y semana

### Código de Colores
- 🔵 **Azul**: Programada
- 🟢 **Verde**: Confirmada
- 🟡 **Amarillo**: En curso
- ⚫ **Gris**: Completada
- 🔴 **Rojo**: Cancelada/No asistió

---

## Odontograma Digital

### Características
- **Representación visual de 32 dientes**
- **Numeración FDI** (sistema internacional)
- **División clara**: Superior/Inferior, Derecho/Izquierdo
- **Interactividad**: Click para editar

### Estados de Diente
1. **Sano** (Blanco): Diente sin problemas
2. **Caries** (Rojo): Caries activa
3. **Relleno** (Azul): Obturación/composite
4. **Corona** (Amarillo): Corona dental
5. **Faltante** (Gris oscuro): Diente extraído o ausente
6. **Endodoncia** (Morado): Tratamiento de conducto
7. **Implante** (Verde): Implante dental
8. **Puente** (Naranja): Parte de un puente

### Edición
- **Modal de edición** al hacer click en diente
- **Selector de estado** con todos los estados disponibles
- **Campo de notas** para detalles adicionales
- **Actualización en tiempo real**
- **Historial de cambios** con timestamp

---

## Tratamientos

### Registro de Tratamiento
Formulario completo con:
- **Diagnóstico**: Descripción del problema encontrado
- **Tratamiento realizado**: Procedimiento ejecutado
- **Diente afectado**: Número del diente (opcional)
- **Costo**: Monto en BOB
- **Estado de pago**: Pagado/Pendiente
- **Notas**: Observaciones adicionales

### Prescripciones Médicas
Cada tratamiento puede incluir múltiples recetas con:
- Medicamento
- Dosaje
- Frecuencia
- Duración
- Instrucciones especiales

### Visualización
- **Lista cronológica** de todos los tratamientos
- **Tarjetas expandidas** con todos los detalles
- **Indicador visual** de pago (verde/rojo)
- **Recetas destacadas** en cajas especiales
- **Totales calculados** automáticamente

---

## Reportes y Analítica

### Métricas Principales
1. **Total Pacientes**: Con comparativa mensual
2. **Citas Completadas**: Rendimiento del período
3. **Ingresos Totales**: Revenue generado
4. **Tasa de Asistencia**: Porcentaje de presentismo

### Desglose Financiero
- **Ingresos Cobrados**: Monto ya recibido
- **Ingresos Pendientes**: Por cobrar
- **Ingreso Promedio**: Por cita completada
- **Gráficos de porcentaje** para visualización

### Gráficos Estadísticos

#### 1. Tendencia Mensual (Líneas)
- Evolución de citas e ingresos
- Últimos 7 meses
- Doble eje Y para diferentes escalas

#### 2. Distribución de Tratamientos (Torta)
- Porcentaje por tipo de procedimiento
- Colores distintivos
- Labels con porcentajes

#### 3. Citas por Día de Semana (Barras)
- Promedio semanal
- Identificación de días más activos
- Útil para planificación

#### 4. Distribución por Edad (Barras)
- Rangos de edad de pacientes
- 5 categorías
- Ayuda a segmentar servicios

### Top 10 Tratamientos
- **Ranking visual** de procedimientos más frecuentes
- **Barra de progreso** proporcional
- **Contador de cantidad**
- **Numeración del 1 al 10**

### Exportación
- **Botón de exportar** a PDF (simulado en demo)
- **Selector de período**: Semana, Mes, Trimestre, Año
- Preparado para integración real

---

## Configuración

### Información General del Consultorio
- Nombre del consultorio
- Teléfono y email
- Dirección completa
- Moneda (BOB)
- Duración por defecto de citas
- Buffer entre citas

### Horarios de Atención
- **Configuración por día** de la semana
- **Toggle activar/desactivar** cada día
- **Hora de inicio y fin** personalizable
- **Validación automática** de rangos

### Preferencias de Notificaciones
- **Recordatorios de citas**: Activar/desactivar
- **Confirmaciones**: Recibir cuando paciente confirma
- **Pagos pendientes**: Alertas de cobros
- **Resumen diario**: Email/push diario
- **Tiempo de anticipación**: Horas antes de enviar recordatorio

### Mi Perfil
- Nombre completo
- Especialización
- Número de licencia profesional
- Email de contacto
- Avatar (futuro)

### Seguridad
- **Cambio de contraseña** con validación
- **Autenticación de dos factores** (toggle)
- **Contraseña actual** requerida
- **Confirmación de nueva contraseña**

---

## Asistente Virtual IA

### Características
- **Widget flotante** siempre accesible
- **Interfaz de chat** intuitiva
- **Respuestas contextuales** basadas en consultas
- **Acciones rápidas** predefinidas

### Consultas Soportadas
1. **Citas del día**: "Ver citas del día"
2. **Búsqueda de pacientes**: "Buscar paciente"
3. **Estadísticas**: "Estadísticas del mes"
4. **Ayuda con odontograma**: "Ayuda con odontograma"
5. **Recordatorios**: Información sobre notificaciones
6. **Pagos**: Consulta de pagos pendientes

### Interfaz
- **Burbujas de chat** diferenciadas (usuario/bot)
- **Timestamps** en cada mensaje
- **Scroll automático** a nuevo mensaje
- **Input con Enter** para enviar
- **Acciones rápidas** como botones

### Inteligencia
- **Reconocimiento de keywords** en español
- **Respuestas preparadas** por categoría
- **Datos en tiempo real** del sistema
- **Sugerencias contextuales**

---

## Portal del Paciente

### Vista Simplificada
Interfaz dedicada para pacientes con:

### Información Personal
- **Datos de contacto** visibles
- **Fecha de registro** en el consultorio
- **Estado de cuenta**: Activo/Inactivo
- **Próximas citas** en destacado

### Mis Citas
- **Lista de próximas citas** cronológica
- **Detalles completos**: Fecha, hora, tipo
- **Estados claros**: Programada, Confirmada
- **Acciones**: Confirmar, Reprogramar, Cancelar
- **Notas del odontólogo** visibles

### Mi Historial de Tratamientos
- **Todos los tratamientos** realizados
- **Diagnósticos y procedimientos**
- **Costos y estado de pago**
- **Recetas médicas** descargables
- **Diente tratado** identificado

### Acciones Rápidas
- **Agendar nueva cita**
- **Ver historial completo**
- **Contactar consultorio**
- Botones de acceso rápido

### Información del Consultorio
- Nombre y dirección
- Teléfono y email
- Horarios de atención
- Ubicación en mapa (futuro)

---

## Notificaciones

### Sistema de Notificaciones
- **Badge en sidebar** con contador
- **Dropdown en header** con lista
- **Tipos diferenciados** por icono
- **Estado leído/no leído**
- **Timestamp relativo** ("hace 2 horas")

### Tipos de Notificación
1. 📅 **Recordatorio de Cita**: Próxima cita en 24h
2. ✅ **Cita Confirmada**: Paciente confirmó
3. ❌ **Cita Cancelada**: Paciente canceló
4. 💰 **Pago Pendiente**: Recordatorio de cobro
5. 🔔 **Sistema**: Actualizaciones del sistema

### Gestión
- **Marcar como leída** individual
- **Marcar todas como leídas** con un click
- **Navegación directa** a la sección relevante
- **Persistencia** en la sesión

---

## Arquitectura de Datos

### Almacenamiento
- **LocalStorage** para sesión de usuario
- **Context API** para estado global
- **Mock data** completo para demostración
- **Preparado para Supabase** u otra DB

### Estructura de Contextos
1. **AuthContext**: Autenticación y usuario actual
2. **DataContext**: Pacientes, citas, tratamientos, etc.

### Tipos TypeScript
Todos los tipos están definidos en `/src/app/types/index.ts`:
- User
- Patient
- Appointment
- Treatment
- MedicalHistory
- Odontogram
- Notification
- ClinicSettings
- DashboardStats

---

## Características Técnicas

### Responsive Design
- **Mobile-first** approach
- **Breakpoints**: sm, md, lg, xl
- **Menu hamburguesa** en móvil
- **Sidebar colapsable**
- **Grids adaptables**

### Performance
- **Lazy loading** de componentes
- **Optimización de re-renders**
- **Memoización** donde corresponde
- **Imágenes optimizadas**

### Accesibilidad
- **Radix UI** components (WAI-ARIA compliant)
- **Keyboard navigation** completa
- **Focus management**
- **Screen reader friendly**

### UX Features
- **Loading states**
- **Empty states** informativos
- **Error handling** con toasts
- **Confirmaciones** para acciones destructivas
- **Feedback visual** inmediato

---

## Próximos Pasos

Para convertir este demo en un sistema de producción:

1. **Backend Real**
   - Implementar API REST o GraphQL
   - Base de datos PostgreSQL o Supabase
   - Autenticación JWT o OAuth

2. **Seguridad**
   - Cifrado de datos médicos
   - HTTPS obligatorio
   - Cumplimiento HIPAA/GDPR
   - Auditoría de accesos

3. **Funcionalidades Adicionales**
   - Integración con hardware dental
   - Pasarela de pagos
   - App móvil nativa
   - Videoconsultas
   - Firma digital
   - Facturación electrónica

4. **Escalabilidad**
   - CDN para assets
   - Load balancing
   - Caching strategy
   - Monitoreo y logs

---

**DentaSync** - Sistema completo de gestión odontológica 🦷✨
