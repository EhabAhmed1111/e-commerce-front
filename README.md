# EcommercePlatformFe

# 📂 Project Structure

```
src/
 ├── app/
 │    ├── core/                      # Global singletons (auth, interceptors, guards, layouts)
 │    │    ├── services/             # Core services (auth, API, storage, notifications)
 │    │    ├── guards/               # Route guards (auth, roles, permissions)
 │    │    ├── interceptors/         # HTTP interceptors (auth tokens, error handling)
 │    │    ├── layouts/              # App-wide layouts (main, vendor, admin shells)
 │    │    └── core.module.ts        # Core module (imported once in root)
 │    │
 │    ├── shared/                    # Reusable UI building blocks
 │    │    ├── components/           # Shared components (buttons, modals, tables)
 │    │    ├── directives/           # Custom directives (infinite scroll, focus)
 │    │    ├── pipes/                # Reusable pipes (currency, date formatting)
 │    │    ├── models/               # TypeScript interfaces & models
 │    │    └── utils/                # Helper functions (formatters, validators)
 │    │
 │    ├── features/                  # Business-specific modules (lazy-loaded)
 │    │    ├── auth/                 # Authentication (login, register, forgot/reset password)
 │    │    ├── customer/             # Customer-facing storefront
 │    │    │    ├── home/            # Homepage (landing, banners, promotions)
 │    │    │    ├── product/         # Product listing, details, reviews
 │    │    │    ├── cart/            # Shopping cart functionality
 │    │    │    ├── checkout/        # Checkout flow & payment
 │    │    │    └── orders/          # Customer order history & tracking
 │    │    ├── vendor/               # Vendor dashboard
 │    │    │    ├── dashboard/       # Vendor overview & KPIs
 │    │    │    ├── products/        # Vendor product management
 │    │    │    ├── orders/          # Vendor order management
 │    │    │    └── analytics/       # Vendor sales analytics & reports
 │    │    ├── admin/                # Admin panel
 │    │    │    ├── dashboard/       # Admin overview & KPIs
 │    │    │    ├── vendors/         # Vendor approvals & management
 │    │    │    ├── categories/      # Category & product moderation
 │    │    │    └── reports/         # Reports & platform analytics
 │    │    └── shared-modules/       # Domain-specific reusable feature modules (charts, forms)
 │    │
 │    ├── state/                     # Global application state (Signals or NgRx)
 │    │    ├── auth/                 # Authentication state
 │    │    ├── cart/                 # Shopping cart state
 │    │    ├── vendor/               # Vendor-related global state
 │    │    └── app.store.ts          # Root store configuration
 │    │
 │    ├── app.config.ts              # Bootstrap configs (zoneless, providers, routing)
 │    └── app.component.*            # Root component & shell
 │
 ├── assets/                         # Static assets (images, icons, translations, mock data)
 ├── environments/                   # Environment configs (dev, staging, prod)
 ├── styles/                         # Global SCSS (themes, mixins, variables)
 │    ├── _variables.scss            # Theme variables (colors, spacing, fonts)
 │    ├── _mixins.scss               # SCSS mixins (responsive helpers, utilities)
 │    ├── _layout.scss               # Global layout styles
 │    └── main.scss                  # Root stylesheet (imports all partials)
 └── index.html                      # Application entry point

```

---

# 🔑 Design Principles

### 1. Zoneless + Signals-first

* No `zone.js`, rely on Angular **signals** for reactivity.
* Feature states (cart, auth, vendor dashboard) modeled with signals.

### 2. Lazy-loaded Features

* **Customer**, **vendor**, and **admin** modules load only when needed.
* Improves performance and speeds up initial load.

### 3. Domain-driven Structure

* Each business domain is self-contained.
* Each feature has its own routing, components, services, and state.

### 4. Separation of Concerns

* `core` → global singletons (auth service, interceptors).
* `shared` → reusable UI components, pipes, and directives.
* `features` → business logic and views.

### 5. SCSS Theming

* Centralize variables in `styles/_variables.scss`.
* Allows multi-theme support for **customer storefront**, **vendor dashboards**, and **admin panel**.

---

Great ✅ Consistent **naming conventions** are critical for a large Angular app like a multi-vendor e-commerce platform. Here’s a recommended guide that aligns with Angular style guide best practices and scales well with a **zoneless, signals-first architecture**.

---

# 📝 Angular Naming Conventions

## 📦 Folders & Modules

* **Feature modules**: `feature-name.module.ts`

  * Example: `auth.module.ts`, `customer.module.ts`
* **Lazy-loaded modules**: match folder name

  * Example: `vendor/ → vendor.module.ts`
* **Core & shared modules**: `core.module.ts`, `shared.module.ts`

---

## 🧩 Components

* **Naming format**: `feature-name.component.ts`
* **Selector**: `app-feature-name`
* **Folder per component** (for template + styles)

**Examples:**

* `product-card.component.ts` → selector: `<app-product-card>`
* `vendor-dashboard.component.ts` → selector: `<app-vendor-dashboard>`

---

## ⚙️ Services

* **Naming format**: `feature-name.service.ts`
* Should be suffixed with `Service`.
* Placed inside `services/` folder of feature or `core/services` if global.

**Examples:**

* `auth.service.ts`
* `cart.service.ts`
* `vendor-analytics.service.ts`

---

## 🛡️ Guards

* **Naming format**: `feature.guard.ts`
* Should be suffixed with `Guard`.

**Examples:**

* `auth.guard.ts`
* `admin.guard.ts`

---

## 🛰️ Interceptors

* **Naming format**: `feature.interceptor.ts`
* Should be suffixed with `Interceptor`.

**Examples:**

* `auth.interceptor.ts`
* `error-handler.interceptor.ts`

---

## 🔄 State Management (Signals / NgRx)

* **Signal stores**: `feature.store.ts`
* **NgRx files (if used)**:

  * `feature.actions.ts`
  * `feature.reducer.ts`
  * `feature.effects.ts`
  * `feature.selectors.ts`

**Examples:**

* `cart.store.ts`
* `auth.store.ts`

---

## 🏗️ Models & Interfaces

* **Naming format**: `feature.model.ts`
* Use PascalCase for interface names.

**Examples:**

* `product.model.ts` → `export interface Product { ... }`
* `vendor.model.ts` → `export interface Vendor { ... }`

---

## 🎨 Styles

* **Global styles**: SCSS partials prefixed with `_`
* **Feature styles**: keep next to component

**Examples:**

* `_variables.scss`, `_mixins.scss`
* `product-card.component.scss`

---

## 🌍 Routing

* **Naming format**: `feature-routing.module.ts`

**Examples:**

* `auth-routing.module.ts`
* `customer-routing.module.ts`

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
