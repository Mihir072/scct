# Frontend Development Notes & API Mapping

This document serves as the endpoint/DTO verification index compiled by scanning the `backend/` source package code.

---

## 1. Mapped Controller Endpoints & Shapes

### Public Services API

#### Courses Resource
* **`GET /api/courses`**
  - **Query Param:** `stream` (optional String: `Commerce`, `Science`, `Arts`)
  - **Response:** `List<CourseDto>`
* **`GET /api/courses/{slug}`**
  - **Path Variable:** `slug` (String)
  - **Response:** `CourseDto`

#### Faculty Resource
* **`GET /api/faculty`**
  - **Query Params:** `courseId` (optional UUID), `departmentId` (optional String)
  - **Response:** `List<FacultyDto>`

#### Placements Resource
* **`GET /api/placements`**
  - **Query Params:** `year` (optional String), `courseId` (optional UUID)
  - **Response:** `List<PlacementDto>`
* **`GET /api/placements/summary`**
  - **Response:** `PlacementSummaryDto` `{ totalPlaced, avgPackage, topRecruiters }`

#### Leads Submission & Silent Tracking
* **`POST /api/leads`**
  - **Payload:** `LeadCreateRequest` `{ fullName, email, phone, courseId, message, source, utmSource, utmMedium, utmCampaign, utmTerm, utmContent }`
  - **Response:** `LeadCreateResponse` `{ leadId, status, isDuplicate }`
* **`POST /api/track/pageview`**
  - **Payload:** `PageViewTrackRequest` `{ pagePath, sessionId, utmSource }`
  - **Response:** `202 Accepted`

---

### Admin Dashboard API (Secure JWT)

#### Authentication Gate
* **`POST /api/auth/login`**
  - **Payload:** `LoginRequest` `{ username, password }`
  - **Response:** `LoginResponse` `{ token }`

#### Leads Management Console
* **`GET /api/admin/leads`**
  - **Query Params:** `page` (default 0), `size` (default 10), `status` (String), `courseId` (UUID), `source` (String), `isDuplicate` (Boolean), `search` (String), `sortBy` (default `createdAt`), `sortDir` (default `desc`)
  - **Response:** Spring Page wrapper containing `List<LeadDto>`
* **`GET /api/admin/leads/summary`**
  - **Response:** `LeadSummaryDto` `{ totalLeads, statusBreakdown, sourceBreakdown }`
* **`PATCH /api/admin/leads/{id}/status`**
  - **Path Variable:** `id` (UUID)
  - **Payload:** `LeadStatusUpdateRequest` `{ newStatus }`
  - **Response:** `LeadDto`
* **`GET /api/admin/leads/export`**
  - **Query Params:** Filters (`status`, `courseId`, `source`, `isDuplicate`, `search`)
  - **Response:** File stream with content type `text/csv`

#### Analytics Summary
* **`GET /api/admin/dashboard/site-health`**
  - **Query Params:** `from` (ISO datetime), `to` (ISO datetime)
  - **Response:** `SiteHealthDto` `{ formSubmissionSuccessRate, pageTraffic, uptimeIndicator }`
* **`GET /api/admin/dashboard/funnel`**
  - **Query Params:** `courseId` (UUID), `source` (String)
  - **Response:** `FunnelDto` `{ funnelStages: List<{ stage, count, dropOffPercentage }> }`
* **`GET /api/admin/dashboard/conversion`**
  - **Response:** `ConversionDto` `{ courseConversion, sourceConversion }`
* **`GET /api/admin/dashboard/funnel/export`**
  - **Query Params:** `courseId` (UUID), `source` (String)
  - **Response:** CSV File download

---

## 2. Rule Validation Matching

### Lead Submission Constraints
- `fullName`: Required, length `2 - 100` characters.
- `email`: Required, valid email format.
- `phone`: Required, matches pattern `^(\+91)?[6-9]\d{9}$` (Indian cell numbers with optional country prefix).
- `courseId`: Required, must be a valid UUID.

### Admin Status State Machine Transitions
Determined from `LeadServiceImpl.java` around line 256:
- If current state is `ADMITTED`, `REJECTED`, or `LOST`, transitions are **prohibited** (terminal states).
- Transition to `REJECTED` or `LOST` is **allowed from any active state**.
- Sequential pipeline transitions:
  - `NEW` -> `CONTACTED`
  - `CONTACTED` -> `APPLICATION_STARTED`
  - `APPLICATION_STARTED` -> `APPLICATION_SUBMITTED`
  - `APPLICATION_SUBMITTED` -> `ADMITTED`

---

## 3. Gaps & Discrepancies Flagged

1. **Contact settings API**: The backend does *not* expose settings/configuration endpoints for institutional contacts (address, support phone numbers). Therefore, the Contact page content uses verified static institutional metadata of CBD Belapur Mumbai.
2. **Platform health logs**: No system metrics details or logs are directly exposed, so the site health panel focuses on the returned `formSubmissionSuccessRate`, traffic view list, and `uptimeIndicator`.
