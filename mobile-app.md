# IMS — Mobile Application for Inspectors (Flutter)
Specification source: Inspection Management System v4.0. See full specification: fileciteturn0file0


## Overview
Mobile app built with **Flutter**, offline-first, optimized for field inspectors. Key features: offline sync, smart route, geo-fencing, multi-media evidence capture, indoor positioning hooks.

## Architecture & Principles
- Local DB: SQLite with a small sync metadata layer
- Background sync worker for uploads (retry with exponential backoff)
- Media storage: local cache, chunked upload to backend when online
- Native device integrations: camera, microphone, GPS, BLE scanning (platform channels)
- State management: Riverpod / Provider (choose based on team preference)

## PHASE: App Foundations (P0)
- [P0] Project scaffold (Flutter + CI build config)
- [P0] Authentication (JWT + refresh + TOTP)
- [P0] Local database schema mirroring server models (visits, checklists, incidents, attachments)
- [P0] Sync manager: pull assigned visits & push local changes

## PHASE: Core Inspector Flows (P0)
- [P0] Shift start/stop flow
- [P0] Start Visit (geo-fence validation using cached facility point)
- [P0] Checklist UI with per-question start_time & end_time tracking
- [P0] Submit Visit (mark submitted locally, queue attachments)
- [P0] Pre-Visit Issue reporting with attachment support

## PHASE: Media Handling (P0/P1)
- [P0] Photo capture & local compression
- [P1] Video capture with local compression & chunked upload
- [P1] Audio recording with metadata

## PHASE: Smart Route & Navigation (P1)
- [P1] 'Plan My Route' call to backend Mapbox adapter
- [P1] Cache route sequence and integrate with device native navigation for turn-by-turn

## PHASE: Offline Robustness (P0)
- [P0] Local queuing, idempotency keys for push
- [P0] Conflict handling UI when server rejects (e.g., cancelled visit)
- [P1] Pre-download assets & tiles for offline navigation (Mapbox offline)

## PHASE: Indoor Positioning (P1)
- [P1] BLE beacon scanner plugin support (store scan payload, send to positioning service)
- [P1] Manual floor plan tagging UI as fallback

## PHASE: UX & Reliability (P1)
- [P1] Sync status UI, retry logic, and clear error messages
- [P1] Energy-efficient location tracking (configurable interval)
- [P2] Accessibility and localization hooks

## Deliverables
- Flutter app build (apk/ipa), local DB migration scripts
- Sync test suite (integration)
- Mobile CI configuration for automated builds
