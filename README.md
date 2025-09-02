# 🎨 Frontend - TucuGym Web App

**Frontend del sistema de gestión de gimnasio TucuGym** - Aplicación web desarrollada en React con diseño moderno y responsive.

## 📋 Descripción

Interfaz de usuario completa para el sistema TucuGym que permite a los usuarios contratar planes, reservar clases y a los administradores gestionar todo el sistema. Desarrollada con React y diseño dark mode minimalista.

## 🛠️ Tecnologías Utilizadas

- **React.js** - Framework de interfaz de usuario
- **React Bootstrap** - Componentes de UI responsivos
- **Axios** - Cliente HTTP para comunicación con el backend
- **React Router** - Navegación entre páginas
- **SweetAlert2** - Alertas y notificaciones
- **Font Awesome** - Iconos dinámicos
- **CSS3** - Estilos personalizados y animaciones

## 📁 Estructura del Proyecto

```
front-gym/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── admin/           # Componentes del panel admin
│   │   │   ├── AdminHomePage.jsx
│   │   │   ├── AdminUsersPage.jsx
│   │   │   ├── AdminClasesPage.jsx
│   │   │   ├── TodasLasReservasAdmin.jsx
│   │   │   └── TableC.jsx
│   │   ├── forms/           # Formularios
│   │   │   ├── FormularioReserva.jsx
│   │   │   ├── ListaReservas.jsx
│   │   │   ├── FormUsuario.jsx
│   │   │   ├── FormularioClase.jsx
│   │   │   └── Contacto.jsx
│   │   ├── home/            # Componentes de la página principal
│   │   │   ├── Planes.jsx
│   │   │   └── Hero.jsx
│   │   ├── clima/           # Widget del clima
│   │   │   └── ClimaC.jsx
│   │   ├── planes/          # Componentes de planes
│   │   │   └── DetallesPlanC.jsx
│   │   └── layout/          # Componentes de layout
│   │       ├── Navbar.jsx
│   │       └── Footer.jsx
│   ├── pages/               # Páginas principales
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegistroPage.jsx
│   │   ├── ReservaPage.jsx
│   │   ├── AdminHomePage.jsx
│   │   ├── AdminUsersPage.jsx
│   │   └── AdminClasesPage.jsx
│   ├── helpers/             # Funciones auxiliares
│   │   ├── apiReservas.js
│   │   ├── usuarios.helper.js
│   │   └── planes.helper.js
│   ├── App.jsx              # Componente principal
│   ├── index.js             # Punto de entrada
│   ├── App.css              # Estilos del componente App
│   └── index.css            # Estilos globales
├── package.json
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- Backend TucuGym funcionando

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env`:

```env
REACT_APP_API_URL=http://localhost:3005/api
REACT_APP_WEATHER_API_KEY=tu_api_key_clima
```

### 3. Ejecutar la aplicación

```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## 🎨 Características de Diseño

### Dark Mode

- Tema oscuro por defecto
- Colores suaves y profesionales
- Contraste optimizado para lectura

### Responsive Design

- Mobile-first approach
- Breakpoints: SM (576px), MD (768px), LG (992px), XL (1200px)
- Componentes adaptativos

### Componentes Principales

- **Navbar**: Navegación principal con autenticación
- **Hero**: Sección principal con llamada a la acción
- **Planes**: Cards interactivas para contratación
- **Formularios**: Validación en tiempo real
- **Tablas**: Datos organizados para administración

## 🔌 Integración con APIs

### Backend API

- **Base URL**: `http://localhost:3005/api`
- **Autenticación**: JWT tokens
- **Endpoints**: Usuarios, clases, reservas, pagos

### APIs Externas

- **OpenWeatherMap**: Datos del clima en tiempo real
- **MercadoPago**: Procesamiento de pagos

## 📱 Funcionalidades por Rol

### 👤 Usuario Común

- ✅ Registro e inicio de sesión
- ✅ Contratación de planes (Musculación, Funcional, Completo)
- ✅ Reserva de clases (Spinning, Funcional, Crossfit)
- ✅ Visualización de reservas activas
- ✅ Cancelación de reservas
- ✅ Información del clima

### 👨‍💼 Administrador

- ✅ Panel de administración completo
- ✅ Gestión de usuarios (CRUD completo)
- ✅ Asignación de planes a usuarios
- ✅ Administración de clases (CRUD completo)
- ✅ Visualización de todas las reservas activas
- ✅ Control de estados de usuarios y clases

## 🎯 Componentes Destacados

### Planes.jsx

```javascript
// Cards interactivas para contratación de planes
// Integración directa con MercadoPago
// Diseño responsive con animaciones
```

### ClimaC.jsx

```javascript
// Widget dinámico del clima
// Iconos según condiciones meteorológicas
// Actualización automática cada 30 minutos
```

### FormularioReserva.jsx

```javascript
// Formulario de reserva con validación
// Verificación de plan activo
// Integración con calendario de clases
```

### ListaReservas.jsx

```javascript
// Lista de reservas del usuario
// Funcionalidad de cancelación
// Estados de carga y error
```

## 🎨 Sistema de Estilos

### CSS Variables

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --dark-bg: #1a1a1a;
  --card-bg: #2d2d2d;
  --text-color: #ffffff;
}
```

### Clases Utilitarias

- `.glass-effect`: Efecto de cristal
- `.gradient-bg`: Fondos con gradientes
- `.hover-scale`: Animación de escala en hover
- `.text-gradient`: Texto con gradiente

### Responsive Utilities

- `.d-sm-none`: Ocultar en pantallas pequeñas
- `.d-md-block`: Mostrar en pantallas medianas
- `.text-center-sm`: Centrar texto en móviles

## 🔐 Autenticación y Estado

### Gestión de Sesión

- **sessionStorage**: Almacenamiento de tokens
- **Context API**: Estado global de autenticación
- **Redirección automática**: Login/logout

### Protección de Rutas

- **Rutas privadas**: Requieren autenticación
- **Rutas admin**: Requieren rol de administrador
- **Middleware de navegación**: Verificación automática

## 📊 Manejo de Datos

### Estado Local

- **useState**: Estado de componentes
- **useEffect**: Efectos secundarios
- **useCallback**: Optimización de funciones

### Comunicación con Backend

- **Axios**: Cliente HTTP configurado
- **Interceptors**: Manejo automático de errores
- **Loading states**: Estados de carga

## 🚀 Optimización

### Performance

- **Lazy loading**: Carga diferida de componentes
- **Memoización**: React.memo para componentes
- **Bundle splitting**: División de código

### SEO

- **Meta tags**: Configuración para motores de búsqueda
- **Semantic HTML**: Estructura semántica
- **Accessibility**: Accesibilidad web

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests en modo watch
npm run test:watch

# Coverage
npm run test:coverage
```

## 📦 Scripts Disponibles

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

## 🚀 Despliegue

### Vercel/Netlify

```bash
npm run build
# Subir carpeta dist/ a la plataforma
```

### GitHub Pages

```bash
npm run build
# Configurar GitHub Actions para deploy automático
```

## 🔧 Configuración de Desarrollo

### ESLint

```json
{
  "extends": ["react-app", "react-app/jest"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn"
  }
}
```

### Prettier

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

## 🤝 Contribuciones

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Contacto

- **Desarrollador**: Francisco Díaz
- **Email**: contacto@tucugym.com
- **GitHub**: [@FranciscoADiaz](https://github.com/FranciscoADiaz)

---

⭐ Si este frontend te fue útil, ¡no olvides darle una estrella en GitHub!
