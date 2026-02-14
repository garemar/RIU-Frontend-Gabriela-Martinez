# SuperHeroes App - Angular Challenge

Aplicación SPA para gestión de súper héroes desarrollada con Angular 21 y Material Design.

## 🚀 Características

- ✅ CRUD completo de súper héroes
- ✅ Lista paginada con diseño de cards
- ✅ Búsqueda por nombre en tiempo real
- ✅ Vista detallada de cada personaje con estadísticas de poder
- ✅ Formulario de creación/edición con validaciones
- ✅ Confirmación de eliminación con diálogo modal
- ✅ Integración con API pública de súper héroes
- ✅ Directiva custom para transformar texto a mayúsculas
- ✅ Interceptor de loading
- ✅ Tests unitarios con Vitest
- ✅ Diseño responsivo con tema oscuro

## 🛠️ Tecnologías

- **Angular 21** (última versión LTS)
- **Angular Material** - Componentes UI
- **RxJS** - Programación reactiva
- **TypeScript** - Tipado estático
- **Vitest** - Testing framework
- **SCSS** - Estilos
- **API Externa** - [SuperHero API](https://akabab.github.io/superhero-api)

## 📋 Prerequisitos

- Node.js v20.19+ o v22.12+
- npm v10+

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/garemar/RIU-Frontend-Gabriela-Martinez.git
cd RIU-Frontend-Gabriela-Martinez

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm start              # Inicia servidor de desarrollo

# Build
npm run build          # Compila para producción

# Testing
npm test              # Ejecuta tests unitarios
npm run test:coverage # Tests con coverage

# Linting
npm run lint          # Verifica código
```

## 🏗️ Estructura del Proyecto

```
src/app/
├── core/                    # Módulos core
│   ├── models/             # Interfaces y tipos
│   ├── services/           # Servicios (Hero, Loading)
│   └── interceptors/       # HTTP Interceptors
├── features/               # Módulos de funcionalidades
│   └── heroes/
│       ├── hero-list/      # Lista de héroes
│       ├── hero-detail/    # Detalle del héroe
│       └── hero-form/      # Formulario crear/editar
├── shared/                 # Componentes y utilidades compartidas
│   ├── components/         # Componentes reutilizables
│   └── directives/         # Directivas custom
└── app.routes.ts          # Configuración de rutas
```

## ✨ Funcionalidades Principales

### Gestión de Héroes

- **Listar**: Grid de cards con paginación (12/24/48/96 items)
- **Buscar**: Filtrado en tiempo real por nombre
- **Ver Detalle**: Información completa + estadísticas de poder
- **Crear**: Formulario con validaciones
- **Editar**: Modificación de datos biográficos y laborales
- **Eliminar**: Con confirmación modal

### Características Técnicas

- **Programación Reactiva**: Uso de Observables y Signals
- **Lazy Loading**: Optimización de carga
- **Directiva Custom**: Transformación automática a mayúsculas en inputs
- **Interceptor**: Indicador de carga global
- **Validaciones**: Formularios reactivos con validación
- **Confirmaciones**: Diálogos modales para acciones destructivas

## 🧪 Testing

Tests implementados para:

- ✅ HeroService (8 tests)
- ✅ HeroListComponent (7 tests)

```bash
npm test
```

Coverage objetivo: 80%+

## 🎨 Diseño

- Tema oscuro con gradiente violeta
- Paleta de colores: Deep Purple (#9c27b0) y Grey
- Componentes Material Design personalizados
- Diseño responsivo adaptable

## 📝 Notas de Desarrollo

### Decisiones Técnicas

- **Sin provideAnimations**: Deprecado en Angular 20.2+, se usa CSS nativo
- **Modelo híbrido**: API externa + gestión local en memoria
- **Signals**: Uso de la nueva API de reactividad de Angular
- **Standalone Components**: Arquitectura modular sin NgModules

### Mejoras Futuras

- Filtros por universo/publisher
- Edición de estadísticas de poder
- Persistencia con LocalStorage
- Más tests (objetivo 100% coverage)

## 👤 Autor

**Gabriela Martinez**

- GitHub: [@garemar](https://github.com/garemar)

---
