# SuperHeroes App - Angular Challenge

Aplicación SPA para gestión de súper héroes desarrollada con Angular 21 y Material Design.

## 🚀 Características

- ✅ CRUD completo de súper héroes
- ✅ Lista paginada con diseño de cards responsive
- ✅ Búsqueda por nombre en tiempo real
- ✅ Vista detallada de cada personaje con estadísticas de poder
- ✅ Formulario de creación/edición con validaciones y carga de imágenes
- ✅ Confirmación de eliminación con diálogo modal personalizado
- ✅ Integración con API pública de súper héroes (563 personajes)
- ✅ Directiva custom para transformar texto a mayúsculas
- ✅ Interceptor de loading global
- ✅ Tests unitarios con 86%+ coverage
- ✅ Diseño responsivo con tema oscuro
- ✅ Dockerizado con nginx

## 🛠️ Tecnologías

- **Angular 21** (última versión LTS)
- **Angular Material** - Componentes UI
- **RxJS** - Programación reactiva
- **TypeScript** - Tipado estático
- **Vitest** - Testing framework
- **SCSS** - Estilos personalizados
- **Docker** - Containerización
- **Nginx** - Servidor web para producción
- **API Externa** - [SuperHero API](https://akabab.github.io/superhero-api)

## 📋 Prerequisitos

- Node.js v20.19+ o v22.12+
- npm v10+
- Docker (opcional, para deployment)

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

### Comandos Angular CLI (Recomendado)

```bash
# Desarrollo
ng serve              # Inicia servidor de desarrollo
ng build              # Compila para producción
ng test               # Ejecuta tests en modo watch

# Alternativas con npm
npm start             # Alias de ng serve
npm run build         # Alias de ng build
npm test              # Alias de ng test
npm run test:ci       # Tests con coverage (CI/CD)
```

### Docker

```bash
docker-compose build  # Construye imagen Docker
docker-compose up     # Inicia contenedor (puerto 8080)
```

## 🐳 Docker

### Desarrollo Local con Docker

```bash
# Construir y ejecutar
docker-compose up --build

# Acceder a la aplicación
http://localhost:8080
```

### Dockerfile Multi-Stage

La aplicación usa un build multi-stage optimizado:

1. **Stage 1**: Build de Angular con Node.js
2. **Stage 2**: Servir con Nginx Alpine

## 🏗️ Estructura del Proyecto

```
src/app/
├── core/                           # Módulos core
│   ├── models/                     # Interfaces y tipos
│   │   └── hero.interface.ts
│   ├── services/                   # Servicios
│   │   ├── hero.service.ts        # CRUD de héroes
│   │   └── loading.service.ts     # Estado de carga
│   └── interceptors/
│       └── loading.interceptor.ts # Interceptor HTTP
├── features/                      # Funcionalidades
│   └── heroes/
│       ├── hero-list/             # Lista de héroes
│       ├── hero-detail/           # Detalle del héroe
│       └── hero-form/             # Formulario crear/editar
├── shared/                        # Componentes compartidos
│   ├── components/
│   │   └── confirm-dialog/        # Modal de confirmación
│   └── directives/
│       └── uppercase-input/       # Directiva uppercase
└── app.routes.ts                  # Configuración de rutas
```

## ✨ Funcionalidades Principales

### Gestión de Héroes

- **Listar**: Grid de cards con paginación (12/24/48/96 items)
- **Buscar**: Filtrado en tiempo real por nombre
- **Ver Detalle**: Información completa + estadísticas visuales de poder
- **Crear**: Formulario con validaciones + carga de URL de imagen
- **Editar**: Modificación de datos biográficos, laborales e imagen
- **Eliminar**: Con confirmación modal estilizada

### Características Técnicas

- **Programación Reactiva**: Uso de Observables y Signals
- **Standalone Components**: Arquitectura modular sin NgModules
- **Lazy Loading**: Optimización de carga
- **Directiva Custom**: Transformación automática a mayúsculas en inputs
- **Interceptor HTTP**: Indicador de carga global automático
- **Validaciones**: Formularios reactivos con validación en tiempo real
- **Confirmaciones**: Diálogos modales Material para acciones destructivas
- **API Integration**: Carga inicial de 563 héroes + gestión local en memoria

## 🧪 Testing

**Coverage actual: 86.44%** ✅

Tests implementados:

- ✅ HeroService - 8 tests (92.3% coverage)
- ✅ HeroListComponent - 4 tests (80.67% coverage)
- ✅ UppercaseInputDirective - 1 test (100% coverage)
- ✅ ConfirmDialogComponent - 3 tests (92.85% coverage)

```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:ci
```

Ver reporte detallado: `coverage/index.html` (generado después de `npm run test:ci`)

## 🎨 Diseño

- **Tema oscuro** con gradiente violeta (`#0d0d0d` → `#1a0d2e`)
- **Paleta principal**: Deep Purple (#9c27b0) y Grey (#b0b0b0)
- **Componentes Material** personalizados
- **Diseño responsivo** adaptable a mobile/tablet/desktop
- **Cards con hover effects** y animaciones sutiles
- **Loading spinner** centralizado

## 📝 Decisiones Técnicas

### Arquitectura

- **Sin provideAnimations**: Deprecado en Angular 20.2+, se usa CSS nativo
- **Modelo híbrido**: API externa (read) + gestión local en memoria (CRUD)
- **Signals**: Uso de la nueva API de reactividad de Angular
- **Standalone Components**: Arquitectura modular sin NgModules

### Modelo de Datos

- Carga inicial desde SuperHero API (563 héroes)
- Todos los héroes son editables/eliminables una vez cargados
- Nuevos héroes se crean con ID timestamp
- Datos en memoria (no persisten al recargar - según especificación del challenge)

### Testing

- **Vitest** como framework (incluido en Angular 21)
- Tests unitarios para servicios y componentes críticos
- Mocks de HttpClient con `provideHttpClientTesting()`
- Coverage automático con v8

## 🚀 Mejoras Futuras

- [ ] Filtros avanzados por universo/publisher/alignment
- [ ] Edición de estadísticas de poder con sliders
- [ ] Persistencia con LocalStorage/IndexedDB
- [ ] Animaciones de entrada/salida de elementos
- [ ] Tests E2E con Playwright
- [ ] PWA con service workers
- [ ] Infinite scroll en lugar de paginación

## 💭 Notas del Desarrollo

Durante el desarrollo surgieron algunos desafíos interesantes:

- La integración inicial con la API externa requirió manejar el timing de carga de datos
- Decidí usar un modelo híbrido (API + memoria) para mantener la simplicidad sin backend
- Los tests de la directiva uppercase fueron particularmente complicados por el manejo del cursor

El proyecto fue desarrollado en aproximadamente 6-8 horas de trabajo distribuidas en 2 días.

## 👤 Autor

**Gabriela Martinez**

- GitHub: [@garemar](https://github.com/garemar)
- Repositorio: [RIU-Frontend-Gabriela-Martinez](https://github.com/garemar/RIU-Frontend-Gabriela-Martinez)

---

**Stack**: Angular 21 • TypeScript • RxJS • Material Design • Vitest • Docker • Nginx
