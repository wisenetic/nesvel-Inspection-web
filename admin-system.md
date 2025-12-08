# IMS — Admin System (Web) — Owner, PM, Supervisor, Auditor
Specification source: Inspection Management System v4.0. See full specification: fileciteturn0file0


## Stack: React (Vite) + Refine + shadcn UI
## Overview
Admin System is the web application for Owner, PM, Supervisor, and Auditor roles. Built with React + Vite, using Refine for data layer & RBAC, and shadcn components for consistent UI. Map views powered by Mapbox GL JS.

## High-level Pages & Components
- Login / 2FA
- Dashboard (Owner / PM / Supervisor / Auditor variants)
- GIS Map (facilities, incidents, inspectors)
- Users Management (PM-only full CRUD)
- Facilities Management
- Visits & Scheduling (Create, Bulk Assign, Calendar)
- Checklists & Templates editor
- Incident Review queue (Supervisor / Auditor)
- Pre-Visit Issue queue
- Licenses & Alerts
- Settings & Configuration (PM-only)
- Reports & Export (PDF, CSV)

## PHASE: Core UI Infrastructure (P0)
- [P0] Project scaffolding (Vite + React + Typescript)
- [P0] Integrate Refine as data provider with NestJS endpoints
- [P0] Implement auth provider with JWT, 2FA flow
- [P0] RBAC integration per role permissions; route guards
- [P0] Global layouts: header, sidebar, responsive breakpoints, shadcn theme tokens

## PHASE: Dashboards & GIS (P0/P1)
- [P0] Owner dashboard: system-wide KPIs, map overview
- [P1] PM dashboard: supervisor performance widgets, license expiry
- [P0] Supervisor dashboard: pending reviews, team schedule (calendar)
- [P1] Auditor dashboard: pending audits queue
- [P0] GIS Map:
  - Mapbox integration, layers for facilities, incidents, inspector positions
  - Filters: date range, service area, severity, priority

## PHASE: Visit & Review Workflows (P0)
- [P0] Visit create/edit UI with Service Area scope filter
- [P0] Bulk reassign & bulk actions UI
- [P0] Review flow UI:
  - Display checklist responses with per-question timing
  - Play media attachments (images, video, audio)
  - Link incidents to ComplianceRule via search modal
  - Approve / Request Clarification / Reject buttons with audit comment

## PHASE: Facilities & Indoor Positioning (P1)
- [P1] Facility editor with floor plan uploads and floor-level tagging
- [P1] Floor plan viewer to visualize incidents on floor maps

## PHASE: Settings & Reports (P1)
- [P1] SystemConfiguration editor (key-value UI)
- [P1] Pre-built reports & custom report builder (export)

## PHASE: UX & Accessibility (P1)
- [P1] Keyboard navigation, aria labels, color contrast checks
- [P2] Multi-language readiness (i18n scaffolding)

## Deliverables
- Component library (shadcn-based)
- Page flows and Figma-ready component list (optional)
- End-to-end test suites for critical workflows (Cypress)
