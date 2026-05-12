# DentaSync - Sistema de Gestión Odontológica

DentaSync es una plataforma integral de gestión para consultorios dentales que automatiza la administración de citas, historias clínicas digitales, y la comunicación con pacientes.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias (si no están instaladas)
npm install

# Iniciar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

La aplicación estará disponible en `http://localhost:5173`

## 🔑 Acceso al Sistema

**Credenciales de prueba:**

Odontólogo:
- Email: `dr.garcia@dentasync.com`
- Contraseña: Cualquier texto (modo demo)

Asistente:
- Email: `ana.lopez@dentasync.com`
- Contraseña: Cualquier texto (modo demo)

## 🚀 Características Principales

### 📊 Dashboard Integral
- Estadísticas en tiempo real (pacientes, citas, ingresos)
- Gráficos de rendimiento semanal y mensual
- Vista rápida de citas del día
- Distribución de tratamientos
- Métricas de asistencia

### 👥 Gestión de Pacientes
- Registro completo de pacientes
- Búsqueda y filtrado avanzado
- Historias clínicas digitales detalladas
- Información de contacto y emergencia
- Seguimiento de última visita

### 🦷 Odontograma Digital Interactivo
- Representación visual de 32 dientes
- Estados: sano, caries, relleno, corona, faltante, endodoncia, implante, puente
- Actualización en tiempo real
- Notas por diente
- Historial de cambios

### 📅 Sistema de Citas
- Programación de citas con múltiples tipos
- Estados: programada, confirmada, en curso, completada, cancelada
- Vista de lista completa
- Filtrado por estado
- Búsqueda rápida

### 🗓️ Agenda Inteligente
- Vista diaria y semanal
- Calendario visual por horas (8:00 - 18:00)
- Código de colores por estado
- Click para ver detalles
- Navegación fácil entre fechas

### 💊 Registro de Tratamientos
- Diagnóstico y tratamiento detallado
- Asignación a dientes específicos
- Costos y estado de pago
- Recetas médicas
- Historial completo por paciente

### 📈 Reportes y Analítica
- Ingresos totales, cobrados y pendientes
- Tendencias mensuales
- Distribución de tratamientos
- Citas por día de semana
- Distribución por edad
- Top 10 tratamientos
- Exportación a PDF (simulado)

### ⚙️ Configuración
- Información del consultorio
- Horarios de atención por día
- Duración de citas por defecto
- Preferencias de notificaciones
- Gestión de perfil profesional
- Seguridad y contraseñas

### 🤖 Asistente Virtual IA
- Chatbot inteligente contextual
- Respuestas sobre citas, pacientes y estadísticas
- Acciones rápidas
- Ayuda con funcionalidades

### 🌐 Portal del Paciente
- Vista simplificada para pacientes
- Consulta de próximas citas
- Historial de tratamientos
- Confirmación/cancelación de citas
- Información de contacto

## 🎨 Tecnologías Utilizadas

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **React Router 7** - Navegación SPA
- **Tailwind CSS v4** - Estilos modernos
- **Recharts** - Gráficos y visualizaciones
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconografía
- **date-fns** - Manejo de fechas
- **Sonner** - Sistema de notificaciones

## 📱 Funcionalidades del Sistema

### Multi-perfil
- **Odontólogo**: Acceso completo al sistema
- **Asistente**: Gestión de citas y pacientes
- **Paciente**: Portal limitado con información personal

### Notificaciones
- Recordatorios de citas (24h antes)
- Confirmaciones de pacientes
- Pagos pendientes
- Resumen diario
- Notificaciones en tiempo real

### Datos Mock Incluidos
- 66 pacientes de ejemplo
- 7 citas programadas
- 3 tratamientos registrados
- Historias clínicas completas
- Odontogramas con estados variados

## 🔐 Credenciales de Prueba

**Odontólogo:**
- Email: `dr.garcia@dentasync.com`
- Contraseña: Cualquier texto (modo demo)

**Asistente:**
- Email: `ana.lopez@dentasync.com`
- Contraseña: Cualquier texto (modo demo)

**Nota:** En modo demo, cualquier contraseña es aceptada para facilitar las pruebas.

## 🎯 Casos de Uso

1. **Gestión diaria del consultorio**: Dashboard con vista rápida de citas del día
2. **Registro de nuevo paciente**: Formulario completo con validaciones
3. **Consulta de paciente**: Expediente completo con tabs organizados
4. **Actualización de odontograma**: Click en diente para cambiar estado
5. **Programar cita**: Selección de paciente, fecha, hora y tipo
6. **Seguimiento de tratamientos**: Registro con recetas y costos
7. **Análisis de rendimiento**: Reportes visuales con gráficos
8. **Configuración personalizada**: Horarios, notificaciones y perfil

## 📊 Módulos del Sistema

### 1. Dashboard
- KPIs principales
- Gráficos de tendencias
- Citas próximas
- Pacientes recientes

### 2. Pacientes
- Lista completa con búsqueda
- Tarjetas con información resumida
- Detalle completo por paciente
- Historia clínica digital

### 3. Citas
- Lista de todas las citas
- Cambio de estado rápido
- Búsqueda y filtros
- Creación de nuevas citas

### 4. Agenda
- Vista calendario semanal
- Vista detallada diaria
- Código de colores
- Navegación temporal

### 5. Reportes
- Métricas financieras
- Gráficos estadísticos
- Análisis de rendimiento
- Tendencias temporales

### 6. Configuración
- Datos del consultorio
- Horarios de trabajo
- Notificaciones
- Seguridad

## 🌟 Características Destacadas

- ✅ **100% Responsive**: Funciona en desktop, tablet y móvil
- ✅ **Interfaz Moderna**: Diseño limpio y profesional
- ✅ **Navegación Intuitiva**: Rutas organizadas y breadcrumbs
- ✅ **Feedback Visual**: Toasts, badges y estados claros
- ✅ **Búsqueda Rápida**: En pacientes y citas
- ✅ **Odontograma Interactivo**: Click para editar
- ✅ **Gráficos Dinámicos**: Recharts responsive
- ✅ **Asistente IA**: Chatbot contextual
- ✅ **Portal Paciente**: Vista simplificada

## 📝 Estructura de Datos

### Paciente
- Datos personales completos
- Contacto de emergencia
- Alergias y condiciones médicas
- Medicamentos actuales
- Estado activo/inactivo

### Cita
- Paciente y odontólogo
- Fecha, hora y duración
- Tipo de procedimiento
- Estado y notas
- Recordatorios

### Tratamiento
- Diagnóstico y tratamiento
- Diente(s) afectado(s)
- Costo y estado de pago
- Prescripciones médicas
- Notas adicionales

### Odontograma
- 32 dientes con estados
- Notas por diente
- Historial de cambios
- Última actualización

## 🎨 Paleta de Colores

- **Primario**: Azul (#3b82f6) - Profesional y confiable
- **Éxito**: Verde (#10b981) - Confirmaciones y pagos
- **Advertencia**: Naranja (#f59e0b) - Alertas
- **Error**: Rojo (#ef4444) - Cancelaciones y errores
- **Neutro**: Grises - Textos y fondos

## 🔮 Funcionalidades Futuras (Roadmap)

- Integración con hardware dental (cámaras, rayos X)
- Pasarela de pagos en línea
- Firma digital de consentimientos
- Videollamadas con pacientes
- App móvil nativa (iOS/Android)
- Sincronización offline
- Multi-idioma
- Facturación electrónica SIAT
- Gestión de inventario
- Sistema de calificaciones

## 📄 Licencia

Este es un proyecto de demostración educativa. Para uso en producción se requiere implementar:
- Base de datos real (Supabase, PostgreSQL, etc.)
- Autenticación segura
- Cifrado de datos médicos
- Cumplimiento normativo (HIPAA, GDPR)
- Respaldos automatizados
- Auditoría de accesos

---

**DentaSync** - Transformando la gestión odontológica digital 🦷✨