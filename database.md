# IMS — Database Design & Development
Specification source: Inspection Management System v4.0. See full specification: fileciteturn0file0


## Overview
This document contains the full task breakdown for Database Design & Development for the Inspection Management System (IMS) v4.0. It maps directly to the system spec and schema design and prioritizes tasks required to deliver a production-ready, scalable data layer for the project.

## Scope
- PostgreSQL 14+ with PostGIS
- TimescaleDB for high-frequency location data
- Migrations, seed data, indexes, triggers, audit trail
- Backup/restore and monitoring
- Support for multi-tenancy (tenant_id) in future

## Priority Legend
- **P0** — Must have for v1 (blocker if missing)
- **P1** — Important for v1, can follow P0 in same release
- **P2** — Nice-to-have, for post-v1 or later iterations

---

## PHASE: Foundations (P0)
- [P0] Create ERD and canonical relationship diagrams based on spec.
- [P0] Initialize DB project repository and migration tooling (pg-migrate / Flyway / Prisma Migrate).
- [P0] Implement core schema migrations:
  - User, UserConfiguration
  - City, ServiceArea, SupervisorServiceArea
  - Facility, FacilityFloorPlan
  - License
  - Checklist, ChecklistItem, ChecklistResponse
  - Visit
  - Incident, IncidentAttachment, IncidentComplianceRule
  - PreVisitIssue, PreVisitIssueAttachment
  - InspectorLocation (prepare for TimescaleDB hypertable)
  - SystemConfiguration
  - AuditTrail
- [P0] Add core indexes (GIST on geolocation/boundary, visit_inspector_date, license expiry partial index).
- [P0] Implement soft-delete columns (deleted_at, deleted_by) on major tables.

## PHASE: Integrity & Business Logic (P0)
- [P0] Implement database-level constraints and CHECKs for enumerations (status, priority, severity).
- [P0] Implement PostGIS geometry types (POINT, POLYGON) and validate SRID=4326 usage.
- [P0] Create triggers (or use application hooks) to populate AuditTrail on CRUD for core tables.
- [P0] Create constraints and FK cascade rules matching the spec.
- [P0] Implement stored procedures or DB helper functions for common geospatial queries:
  - facility_in_service_area(facility_id) -> boolean
  - distance_between_points(lat1, lon1, lat2, lon2)

## PHASE: Time-series + Retention (P0)
- [P0] Convert InspectorLocation to TimescaleDB hypertable and configure retention policy (default 30 days).
- [P1] Add continuous aggregates for common analytics (route efficiency, hotspot counts).

## PHASE: Media & Attachments (P1)
- [P1] Prepare attachment metadata tables and file path / CDN integration strategy.
- [P1] Implement checks for file size constraints (image/video/audio/document limits) as DB validations where possible.
- [P1] Prepare audit trail entries for attachment uploads/deletions.

## PHASE: Performance & Scaling (P1)
- [P1] Benchmarked indexes and EXPLAIN plans for heavy queries (GIS searches, visits queries).
- [P1] Implement partitioning strategies for Visit or large tables if necessary.
- [P1] Configure connection pooling recommendations (pgbouncer) and vacuum/analyze maintenance jobs.

## PHASE: Security & Data Protection (P0)
- [P0] Ensure PII fields are documentated for encryption-at-rest (to be handled by DB or application).
- [P0] Define roles and limited DB users for migrations, app, read-only reporting.
- [P1] Implement row-level security (RLS) templates for multi-tenant later (scope filtering: supervisor service areas, inspector own visits).

## PHASE: DevOps & Automation (P0)
- [P0] CI migrations job (run migrations on CI & production safely).
- [P1] DB backup, restore playbooks and automated nightly backups.
- [P1] Monitoring rules for growth (tablespace, index bloat, hypertable retention).

## Deliverables
- Migration scripts (ordered)
- ERD PNG + interactive SQL diagrams
- TimescaleDB hypertable setup SQL
- Audit trigger SQL
- Backup & restore documentation

## Acceptance Criteria
- All core entities created and migrated successfully
- PostGIS functions validated with sample geodata
- Timescale hypertable working and retention policy effective
- Audit trail recorded for create/update/delete operations
