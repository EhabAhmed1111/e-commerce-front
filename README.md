# E-Commerce Platform

A modern Angular e-commerce application built with Angular 19, featuring a clean architecture and modern UI with Tailwind CSS.

## 🚀 Tech Stack

- **Angular**: v19.2.0
- **TypeScript**: v5.7.2
- **Tailwind CSS**: v3.4.18
- **PostCSS**: v8.4.47
- **RxJS**: v7.8.0
- **Font Awesome**: v7.1.0
- **PrimeIcons**: v7.0.0

## 📂 Current Project Structure

```
src/
 ├── app/
 │    ├── core/                      # Core application services and utilities
 │    │    ├── guards/               # Route guards
 │    │    ├── interceptors/         # HTTP interceptors
 │    │    ├── models/               # Core data models
 │    │    ├── services/             # Core services
 │    │    └── utils/                # Utility functions
 │    │
 │    ├── shared/                    # Shared components and utilities
 │    │    ├── components/           # Reusable components
 │    │    │    ├── header/          # Application header
 │    │    │    └── footer/          # Application footer
 │    │    └── model/                # Shared models
 │    │
 │    ├── features/                  # Feature modules
 │    │    ├── auth/                 # Authentication module
 │    │    ├── home/                 # Home page
 │    │    └── product/              # Product features
 │    │
 │    ├── app.component.*            # Root component
 │    ├── app.config.ts              # Application configuration
 │    ├── app.routes.ts              # Application routing
 │    └── route-animations.ts        # Route transition animations
 │
 ├── styles.scss                     # Global styles with Tailwind directives
 └── index.html                      # Application entry point
```

## 🎨 Styling

This project uses **Tailwind CSS v3** for styling with a custom theme configuration:

### Custom Theme Colors
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#d946ef` (Fuchsia)
- **Accent**: `#22c55e` (Green)

### Custom Animations
- **slideDown**: Smooth slide-down animation for page transitions

### Configuration Files
- `tailwind.config.js` - Tailwind theme configuration
- `postcss.config.js` - PostCSS configuration
- `src/styles.scss` - Global styles with Tailwind directives

## 🛠️ Development

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

To start a local development server:

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm run watch      # Build in watch mode
npm test           # Run unit tests
```

## 🏗️ Code Scaffolding

Generate new components, services, and more using Angular CLI:

```bash
# Generate a new component
ng generate component component-name

# Generate a new service
ng generate service service-name

# Generate a new guard
ng generate guard guard-name

# View all available schematics
ng generate --help
```

## 📦 Building

Build the project for production:

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory. The production build is optimized for performance.

## 🧪 Testing

Execute unit tests via [Karma](https://karma-runner.github.io):

```bash
ng test
```

## 📝 Naming Conventions

### Components
- **Format**: `feature-name.component.ts`
- **Selector**: `app-feature-name`
- **Example**: `product-card.component.ts` → `<app-product-card>`

### Services
- **Format**: `feature-name.service.ts`
- **Example**: `auth.service.ts`, `cart.service.ts`

### Guards
- **Format**: `feature.guard.ts`
- **Example**: `auth.guard.ts`

### Models
- **Format**: `feature.model.ts`
- **Example**: `product.model.ts`

### Styles
- **Component styles**: `component-name.component.scss`
- **Global styles**: `styles.scss`

## 🎯 Design Principles

### 1. Modular Architecture
- Feature-based organization
- Lazy-loaded routes for better performance
- Separation of concerns (core, shared, features)

### 2. Modern Angular
- Standalone components
- Signals for reactivity
- Route animations for smooth transitions

### 3. Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive utilities and breakpoints
- Custom animations and transitions

### 4. Code Quality
- TypeScript strict mode
- SCSS for component styling
- Consistent naming conventions

## 🔧 Configuration Files

- `angular.json` - Angular workspace configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS theme and plugins
- `postcss.config.js` - PostCSS plugins configuration
- `package.json` - Project dependencies and scripts

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🐛 Troubleshooting

### Styling Issues
If you encounter styling issues after updating dependencies:

1. Ensure Tailwind CSS v3 is installed (not v4)
2. Verify `postcss.config.js` uses the correct plugin syntax
3. Remove any conflicting `.postcssrc.json` file
4. Restart the development server

### Build Errors
If you encounter build errors:

1. Clear the Angular cache: `rm -rf .angular`
2. Remove node_modules: `rm -rf node_modules`
3. Reinstall dependencies: `npm install`
4. Restart the dev server: `npm start`

---

**Project Version**: 0.0.0  
**Angular CLI**: v19.2.19  
**Generated with**: Angular CLI
