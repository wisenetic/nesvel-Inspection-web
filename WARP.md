# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This repository contains the web-based Admin System for the Inspection Management System (IMS) v4.0. It is a React + Vite + TypeScript application built on top of the Refine framework, using shadcn/ui and Radix primitives for the component system and Tailwind CSS for styling.

Additional high-level specifications for the broader system live in:
- `admin-system.md` – product and page-level spec for this admin web app
- `backend.md` – NestJS backend architecture and API/service breakdown
- `database.md` – PostgreSQL/PostGIS/TimescaleDB data model and migration plan
- `mobile-app.md` – Flutter mobile app architecture for inspectors

Only the admin web application code lives in this repo; backend, DB, and mobile app are documented here but implemented elsewhere.

## Tooling & Commands

### Package manager & tooling

- Package manager: `pnpm` (see `pnpm-lock.yaml`)
- Bundler/dev server: Vite (`vite.config.ts`)
- Frameworks: React 19, Refine, React Router, shadcn/ui, Tailwind CSS 4

### Install dependencies

```bash
pnpm install
```

### Run the development server

From the repo root:

```bash
pnpm dev
```

This runs `refine dev`, which starts the Vite dev server with Refine’s tooling.

### Build for production

```bash
pnpm build
```

This runs `tsc && refine build` to type-check and build the app for production.

### Run the production server

After a successful build:

```bash
pnpm start
```

This runs `refine start` to serve the built application.

### Refine CLI

The `refine` script is exposed via `pnpm`:

```bash
pnpm refine
```

Use this to invoke the Refine CLI (scaffolding, utilities, etc.). Refer to Refine’s own documentation for available subcommands and options.

### Linting & tests

There are currently **no** `lint` or `test` scripts defined in `package.json`, and there is no Jest/Vitest/Cypress/Playwright config in this repo. Before assuming any testing or linting commands exist, check `package.json` or add the appropriate scripts and tooling.

## High-Level Architecture

### Entry point & React root

- `src/index.tsx`
  - Creates the React root and renders `<App />` into the `#root` element.

### App shell & Refine configuration

- `src/App.tsx`
  - Wraps the application with:
    - `BrowserRouter` from `react-router`
    - Refine providers: `Refine`, `RefineKbarProvider`, `DevtoolsProvider`, `ThemeProvider`, notification provider, and Refine devtools panel
  - Configures Refine with:
    - `dataProvider`: `@refinedev/simple-rest` pointing to `https://api.fake-rest.refine.dev` (placeholder backend)
    - `authProvider`: local auth implementation from `src/authProvider.ts`
    - `routerProvider`: `@refinedev/react-router`
    - `resources`: currently `blog_posts` and `categories`, mapped to the sample CRUD pages in `src/pages/blog-posts` and `src/pages/categories`
    - `options`: enables `syncWithLocation`, `warnWhenUnsavedChanges`, and sets a `projectId` for Refine tooling
  - Renders two routing layers inside `<Refine>`:
    - `<AppRoutes />` – the custom, module-aware routing layer (see below)
    - A set of explicit `Routes` for the sample `blog_posts`/`categories` resources and auth pages (`/login`, `/register`, `/forgot-password`)

### Authentication provider

- `src/authProvider.ts`
  - Implements Refine’s `AuthProvider` interface with a simple localStorage-based token (`TOKEN_KEY = "refine-auth"`).
  - Provides `login`, `logout`, `check`, `getIdentity`, `getPermissions`, and `onError` hooks.
  - Currently uses mock data (no real backend calls). Revisit this file when wiring the app to the real NestJS backend.

### Module system & bootstrap layer

- `src/core/bootstrap/app-module.type.ts`
  - Defines the `AppModule` interface, which describes how each functional module integrates into the app:
    - `name`, `label`, `group`, and `priority` for identification and sidebar grouping
    - `hidden` to exclude a module from navigation
    - `requiredPermissions` (array or predicate) for module-level access control
    - `resource`: Refine `IResourceItem` with extended `meta` (e.g., `requiredPermissions`) and `options.hidden`
    - `icon` for sidebar display
    - `routes`: additional React Router routes the module wants to register

- `src/core/bootstrap/index.ts`
  - Uses Vite’s `import.meta.glob` to eagerly load all `*.module.tsx` files under `src/modules/*`.
  - Normalizes them into an array of `AppModule` instances, filters out hidden modules, and sorts them by `priority`.
  - Exposes:
    - `appModules`: all active modules
    - `appResources`: derived Refine `resources` from modules that define a `resource`
    - `groupedModules`: modules grouped by `module.group` for navigation
  - This is the central runtime configuration for module discovery; adding a new module is primarily done by creating a `*.module.tsx` file under `src/modules` that conforms to `AppModule`.

### Routing layer

- `src/core/routing/app-routes.tsx` (`AppRoutes`)
  - Defines the primary routing structure around the module system.
  - Wraps authenticated application routes with Refine’s `<Authenticated>` component:
    - On success: renders `<AppLayout>` (from `src/core/layout/layout.tsx`) with an `<Outlet />` for nested routes.
    - On failure: redirects unauthenticated users to `/login` via `NavigateToResource`.
  - Inside the authenticated shell:
    - Index route redirects to `resource="dashboard"` via `NavigateToResource` (ensure a `dashboard` resource is configured when building that feature).
    - `<ModuleRouteLoader modules={bootstrap.modules} />` dynamically registers all module routes.
    - A catch-all `*` route renders the shared `ErrorComponent`.
  - Public routes:
    - `/login`, `/register`, `/forgot-password` mapped to the shared auth form components.
  - Renders `<RouteController modules={modules} />` to handle overlay-style routes (modals/drawers) for create/edit/show flows.

- `src/core/routing/module-route-loader.tsx`
  - Iterates through each `AppModule`’s `routes` array and creates corresponding `<Route>` elements.
  - Also defines its own `*` route to render `ErrorComponent` if a module route is not matched.

- `src/core/routing/route-controller.tsx`
  - Watches the current location and looks for overlay routes matching `/r/:resource/*`.
  - For matching paths, locates the corresponding `AppModule` by `resource.name` and determines which presentation mode to use based on the sub-path:
    - `/r/<resource>/show/:id`
    - `/r/<resource>/edit/:id`
    - `/r/<resource>/create`
  - Supports `modal` and `drawer` views via shadcn dialogs and sheets, and falls back to module-defined routes when `renderPresentation` is not provided.
  - This is the central controller for resource overlays (e.g., showing a record in a drawer instead of full-page navigation).

### Layout & app shell

There are two related layout systems in play:

1. **Custom App shell for module-based routes**
   - `src/core/layout/layout.tsx` (`AppLayout`)
     - Composes the app shell for routes managed by `AppRoutes`.
     - Structure:
       - `SidebarWrapper` – wraps the primary navigation sidebar
       - `Header` – top navigation, user info, etc.
       - `<main>` – content area rendering either `children` or `<Outlet />`
     - Applies global layout classes (Tailwind) for a full-height, two-column admin layout.

2. **Refine UI layout for resource pages**
   - `src/core/components/refine-ui/layout/layout.tsx` (`Layout`)
     - Wraps content with `ThemeProvider`, `SidebarProvider`, and the shadcn `Sidebar`.
     - Uses `SidebarInset` to position the content area and a shared `Header` at the top.
     - Intended as the default layout for Refine resource pages using the `refine-ui` components.

When adding new pages or resources, be mindful of which layout system they use (App shell vs. Refine UI layout) and keep navigation behavior consistent.

### Navigation & sidebar system

There are two key layers for navigation and sidebars:

1. **Module-aware sidebar config builder**
   - `src/core/components/shared/sidebar/builder.ts` (`useSidebarFromModules`)
     - Builds a `SidebarConfig` from a list of `AppModule`s, applying permission checks and grouping.
     - Uses Refine’s `usePermissions` to get the current user’s permission roles.
     - Respects module-level `requiredPermissions`, resource-level `meta.requiredPermissions`, and `resource.options.hidden`.
     - Produces sidebar items grouped by `module.group` and labeled with `module.label` or the resource label/name.

   - `src/core/components/shared/sidebar/dynamic-sidebar.tsx` (`DynamicSidebar`)
     - Renders a rich sidebar UI based on a `SidebarConfig` and the current location.
     - Uses shadcn `Sidebar` primitives and `SidebarItemsRenderer` to render groups, links, sections, and footer items.
     - Integrates with React Router for navigation and tracks active routes using helper utilities.

   - `src/core/components/shared/sidebar/sidebar.types.ts` and `sidebar-utils.ts`
     - Define the shape of sidebar items (`link`, `group`, `section`, `divider`, `label`, `action`) and matching strategies.
     - Provide helpers for flattening items and marking the current item based on the path.

2. **Refine menu-driven sidebar**
   - `src/core/components/refine-ui/layout/sidebar.tsx`
     - Uses Refine’s `useMenu`, `useRefineOptions`, and `useLink` to drive the sidebar from Refine’s registered resources.
     - Renders grouped sections, collapsible menu items, and dropdowns using shadcn `Sidebar`, `Button`, `Collapsible`, and `DropdownMenu`.
     - Highlights active resources based on `selectedKey` from `useMenu`.

Future work should converge these navigation layers so that module definitions, Refine resources, and sidebar state all derive from a single source of truth (the `AppModule` + Refine `resources` configuration).

### Refine UI wrappers & shared components

- `src/core/components/refine-ui/buttons/*`
  - Wrapper components around shadcn `Button` and Refine hooks (`useCreateButton`, etc.) for CRUD actions (`create`, `edit`, `show`, `delete`, etc.).
- `src/core/components/refine-ui/data-table/*`
  - Table wrapper (`DataTable`) and supporting components (filters, pagination, sorters) built on top of `@tanstack/react-table` and shadcn table primitives.
- `src/core/components/refine-ui/views/list-view.tsx`
  - `ListView` and `ListViewHeader` components encapsulating standard list-page layout (breadcrumb, title, create button, etc.) using Refine hooks (`useResourceParams`, `useUserFriendlyName`).
- `src/core/components/refine-ui/layout/*`
  - Shared layout components like `Header`, `breadcrumb`, `user-avatar`, `user-info`, `loading-overlay`, and `error-component`.
- `src/core/components/refine-ui/notification/*`
  - Notification provider hook (`use-notification-provider`) and toaster/undoable notification components.
- `src/core/components/refine-ui/theme/*`
  - Theme provider and controls for switching themes and toggling dark mode, built on top of `next-themes` and shadcn’s tokens.

These components are the preferred building blocks for new Refine-backed pages to keep the UI consistent.

### Base UI kit & utilities

- `src/core/components/ui/*`
  - Shadcn-style headless UI components (accordion, alert, badge, button, dialog, dropdown-menu, form controls, navigation menu, pagination, sidebar, tabs, table, tooltip, etc.), all styled via Tailwind and `class-variance-authority`.
  - `button.tsx` is illustrative of this approach, using `cva` variants and a `Slot` for composition.

- `src/core/lib/utils.ts`
  - Utility helpers, including `cn` for composing class names and any other shared utilities used across the UI and layout components.

### Example module: Country

- `src/modules/country/country.module.tsx`
  - Implements an `AppModule` named `country` with:
    - `label: "Countries"`, `group: "Geography"`, `priority: 1`
    - `requiredPermissions: ["geo:read"]`
    - `resource` configuration for Refine with `name: "countries"`, pointing to CRUD pages in `src/modules/country/pages/*`
    - Optional `routes` (e.g., `/countries/manage`) that can be registered via `ModuleRouteLoader`.
  - Demonstrates how domain modules should:
    - Expose Refine resources
    - Declare side navigation metadata (`group`, `icon`)
    - Attach permission requirements in `meta.requiredPermissions`.

Use this module as a template for building additional resource modules under `src/modules` (e.g., facilities, visits, incidents), then ensure they are wired into `Refine`’s `resources` and any required backend endpoints.

### Legacy/sample pages

- `src/pages/blog-posts/*` and `src/pages/categories/*`
  - Generated Refine sample CRUD implementations using the fake REST API.
  - Useful as reference for integrating `DataTable`, CRUD buttons, and Refine hooks, but expected to be replaced by IMS-specific modules over time.

- `src/pages/login`, `src/pages/register`, `src/pages/forgot-password`
  - Wrap shared auth form components from `src/core/components/refine-ui/form/*`.

## Styling & Layout Conventions

- Tailwind CSS 4 is used throughout the app. Layout components emphasize **mobile-first** class ordering.
- When adding responsive classes, prefer `md:` and `lg:` breakpoints and **avoid using `sm:`** in new code.
- Prefer **design tokens / semantic utilities** (e.g. `bg-background`, `text-foreground`, `border-border`) instead of raw palette classes like `bg-slate-50`, `text-slate-900`, etc.
- Use the shared `cn` helper from `src/core/lib/utils.ts` to compose class names.
- Prefer using the existing shadcn-based components under `src/core/components/ui` and the higher-level wrappers under `src/core/components/refine-ui` instead of introducing ad-hoc styling or one-off components.

## Working With the IMS Specs

- When implementing new features, always cross-reference the high-level specs:
  - Admin flows and UI expectations: `admin-system.md`
  - API contracts and services: `backend.md`
  - Data model and migrations: `database.md`
  - Mobile behavior and offline flows: `mobile-app.md`
- Keep the web admin code aligned with these documents, especially around RBAC, visit workflows, incident handling, and GIS/Map features.
