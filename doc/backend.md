# IMS — Backend Design & Development (NestJS)
Specification source: Inspection Management System v4.0. See full specification: fileciteturn0file0


## Overview
Backend will be implemented in **NestJS** (Node.js) following a microservice-ish modular structure (services can be split later). This document lists tasks for API design, services, sync, and integrations required to satisfy IMS v4.0 requirements.

## Architecture & Principles
- RESTful APIs (NestJS controllers + services). Consider GraphQL for reporting endpoints later (P2).
- Authentication: JWT access + refresh, 2FA (TOTP).
- Authorization: RBAC middleware referencing role permissions matrix.
- File uploads: Chunked uploads to S3-compatible storage; background processing for large media.
- Async tasks: BullMQ + Redis for long-running jobs (media processing, scheduled license alerts).
- DB access: TypeORM / Prisma as ORM; raw SQL for geospatial heavy queries.

## PHASE: Core Services (P0)
- [P0] Auth Service
  - Login, refresh token, logout
  - Password reset flow (email token, 1-hour expiry)
  - TOTP setup/verify endpoints
- [P0] User Service
  - CRUD (PM-only for creation) with supervisor relationships
  - Availability toggle and delegation endpoints
- [P0] Facility Service (with geospatial validation)
  - Create/update facility; validate point inside service area using PostGIS via query
- [P0] Visit Service (visit lifecycle engine)
  - Create/assign visits (scope checks)
  - Start, submit, reassign, interrupt, cancel transitions enforcement
  - Geo-fence validation endpoint (distance calculation)
- [P0] Checklist Service
  - CRUD checklists and items
  - Save checklist responses per visit

## PHASE: Incident & Media (P0/P1)
- [P0] Incident Service
  - Create, attach multiple media
  - Location capture fields and indoor_location_data JSON handling
- [P1] Media Service
  - Chunked upload API (signed URLs + resume)
  - Background compression (images & videos) via worker
  - Virus/malware scan integration (optional)
- [P1] PreVisitIssue Service

## PHASE: Sync & Offline Support (P0)
- [P0] Sync Service endpoints:
  - /sync/pull — return assigned visits, checklists, facility data (configurable window)
  - /sync/push — accept batched visits, checklist responses, incidents, attachments
  - Conflict resolution logic (server as source of truth)
- [P0] Idempotency & dedup strategies for push

## PHASE: Scheduling & Notifications (P1)
- [P1] Scheduler worker (BullMQ) for license expiry alerts, interruption detection, data retention
- [P1] Notification Service:
  - Push (FCM), Email (SendGrid), SMS (Twilio) abstraction and queueing

## PHASE: GIS & Routing (P1)
- [P1] Integrate with Mapbox Optimization / Directions API or pluggable adapter
- [P1] Server-side endpoints to pre-calc route sequences (used by mobile when online)

## PHASE: Indoor Positioning & Beacon Data (P2)
- [P2] Positioning adapter interface; initially store raw beacon/wifi scan payloads, evaluate external provider later

## PHASE: Observability & Security (P0/P1)
- [P0] Centralized logging (structured JSON), correlation IDs
- [P1] Monitoring endpoints, metrics (Prometheus), error tracking (Sentry)
- [P0] Input validation, rate limiting, and security headers (helmet)
- [P0] Implement tests: unit + integration + contract tests for public APIs

## Dev Tasks (CI/CD)
- [P0] GitHub Actions pipeline: lint, test, build, migrations, deploy steps
- [P1] Canary deploy patterns for production

## Deliverables
- OpenAPI spec for all public endpoints
- Authentication flow documentation
- Worker & queue diagrams
- Postman collection or curl examples
