# SCCT Admissions & Management Platform

Welcome to the **Sanpada College of Commerce & Technology (SCCT)** Admissions and Lead Management Platform. This repository houses a complete, high-performance web application designed to capture student admission enquiries, analyze marketing channel performance, track page traffic, and manage lead lifecycles in real time.

---

## 🌐 Live Production Links
*   **Production Frontend (Vercel):** [https://scct-mu.vercel.app](https://scct-mu.vercel.app)
*   **Production API Server (Render):** [https://scct.onrender.com](https://scct.onrender.com)

---

## 🛠️ Tech Stack Overview

### Backend (Spring Boot)
*   **Language & Runtime:** Java 21, Spring Boot 3.3.4
*   **Database & ORM:** PostgreSQL, Spring Data JPA, Hibernate
*   **Database Migrations:** Flyway (Schema version control)
*   **Security:** Stateless JWT Authentication, BCrypt password hashing, custom CORS configuration
*   **APIs:** RESTful endpoints, MapStruct DTO mappers, Jakarta validation annotations
*   **Documentation:** Springdoc OpenAPI v2 (Swagger UI)
*   **Testing:** JUnit 5, Mockito (covering state transitions, duplicate checks, and funnel analytics)

### Frontend (React)
*   **Framework & Build Tool:** React 19, Vite, Tailwind CSS (Vanilla CSS & custom layouts)
*   **Routing:** React Router v7
*   **API Client:** Axios (with request/response token interceptors)
*   **Forms & Validation:** React Hook Form + Zod resolvers
*   **Charts & Visualizations:** Recharts (responsive funnel, bar, and doughnut charts)
*   **Icons:** Lucide React

---

## 💻 Local Setup & Usage

### Prerequisites
*   **Node.js:** v18.0+ & npm
*   **Java Development Kit (JDK):** v21
*   **PostgreSQL:** v15+ (local database or cloud instance like Neon)

---

### Running the Backend Locally

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create or configure `src/main/resources/application-local.yaml` with your database credentials:
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/scct_db
       username: postgres
       password: yourpassword
   ```
3. Run the Spring Boot application using the Maven wrapper:
   ```bash
   ./mvnw spring-boot:run -Dspring-boot.run.profiles=local
   ```
   *Note: Flyway will automatically run the schema and seed migrations on startup.*

---

### Running the Frontend Locally

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Create a `.env` environment file:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```
3. Install dependencies and start the development server:
   ```bash
   npm install
   ```
   ```bash
   npm run dev
   ```
4. Access the public application at `http://localhost:3000`.

---

### Seed Admin Credentials
To access the Admin Dashboard, log in using:
*   **Local Login URL:** `http://localhost:3000/login`
*   **Production Login URL:** `https://scct-mu.vercel.app/login`
*   **Username:** `admin`
*   **Password:** `password123`

---

## ☁️ Production & Cloud Deployment Settings

### Backend (Render Deployment)
The backend is deployed at **[https://scct.onrender.com](https://scct.onrender.com)**. It includes a `Dockerfile` for containerized environment:
*   **Multi-Stage Build:** Packages compile assets using `maven:3.9-eclipse-temurin-21-alpine` and outputs to a lightweight `eclipse-temurin:21-jre-alpine` runtime.
*   **Dynamic Port Mapping:** Configured in `application.yaml` to dynamically bind to Render's allocated `${PORT}` environment variable.
*   **Keep-Alive Ping Scheduler:** Render's free tier automatically spins down containers after 15 minutes of inactivity. To prevent this, the backend includes [SelfPingKeepAlive.java](file:///c:/Users/admin/Downloads/scct/backend/src/main/java/com/scct/admissions/service/impl/SelfPingKeepAlive.java) which runs a scheduler every 4 seconds:
    *   It retrieves the public server URL from the `${RENDER_EXTERNAL_URL}` environment variable (defaulting to the live `https://scct.onrender.com` URL in production).
    *   It issues a self-directed `GET` request to its own public `/api/courses` endpoint.
    *   Because the traffic routes through Render's load balancer, the container **never spins down and stays constantly alive**. Successful ping summaries are throttled to log once every 5 minutes to avoid cluttering.

### Frontend (Vercel Deployment)
The frontend is deployed at **[https://scct-mu.vercel.app](https://scct-mu.vercel.app)**.
*   **Rewrites Logic:** Configured in [vercel.json](file:///c:/Users/admin/Downloads/scct/frontend/vercel.json) to rewrite all virtual routing paths to `/index.html`. This ensures direct links and refreshes on endpoints like `/admissions` or `/dashboard` do not trigger Vercel 404 errors.
*   **Build Environment:** The production build loads the API base URL from the newly created [`.env.production`](file:///c:/Users/admin/Downloads/scct/frontend/.env.production) file which is pre-configured with `VITE_API_BASE_URL=https://scct.onrender.com`. Alternatively, you can override this by setting the environment variable `VITE_API_BASE_URL` in the Vercel dashboard.

---

## 🗄️ Database Schema & Seed Script

The relational schema is configured as follows (under `backend/src/main/resources/db/migration/`):

### V1__init_schema.sql (Schema Layout)
```
  [courses] ◄──────────┐
      ▲                │ (Foreign Keys)
      │                │
  [placements]      [faculty]
                       
  [leads] ◄─────────────────────────────────┐
      │ (course_id)                         │ (duplicate_of_lead_id)
      ▼                                     │
  [courses]                                 │
      ▲                                     │
      │ (lead_id)                           │
  [lead_status_history]                     │
                                            │
  [page_views]  [form_submission_events]  [admin_users]
```

*   `courses`: Catalog of academic streams, pricing, and qualifications.
*   `faculty`: Academic instructors linked to their respective programs.
*   `placements`: Job placement packages, student counts, and years.
*   `leads`: Captured enquiries containing contact information, UTM campaign tracking parameters, and duplicate flags.
*   `lead_status_history`: Historical log tracking status updates for audit and funnel stage transitions.
*   `page_views`: Tracking record mapping hits, timestamps, sessions, and entry referrers.
*   `form_submission_events`: System logs for form submissions to trace API health and error rates.
*   `admin_users`: Authenticated personnel profiles.

### V2__seed_data.sql (Seed Distribution)
Includes a default setup of 40 leads created systematically across the admission stages:
*   **Admitted:** 4 leads
*   **Application Submitted:** 4 leads (1 is marked Rejected, 1 is Lost)
*   **Application Started:** 7 leads
*   **Contacted:** 10 leads
*   **New:** 15 leads (includes marked duplicate entries to test deduplication detection)

---

## 📊 Dashboard Features & Analytical Logic

### 1. Overview Page (Main Console)
Provides a high-level metrics dashboard showing total leads, status distribution counters, and lead acquisition channels (tracked by marketing sources like Facebook, Google Ads, or Organic).

### 2. Leads Directory
A comprehensive table console for admissions staff:
*   **Filters:** Search by Course, Lead Status, Acquisition Source, or Toggle Duplicates.
*   **Live Search:** Instant keyword lookup running on the backend across `fullName`, `email`, and `phone` attributes.
*   **Profile Detail Drawer:** Displays complete lead profiles including date captured, specific message logs, active status histories, and detailed UTM campaign attributes.
*   **CSV Exporter:** Exports current filtered lead directories to download as standard spreadsheets.

#### Lead Status Transitions
The system enforces strict state machine transitions to protect data integrity:
```
  [NEW] ──► [CONTACTED] ──► [APPLICATION_STARTED] ──► [APPLICATION_SUBMITTED] ──► [ADMITTED]
    │             │                  │                            │                   ▲
    └─────────────┴──────────────────┴────────────────────────────┴──► [LOST/REJECTED] ┘
```
Valid transitions:
*   `NEW` can transition to `CONTACTED` or `LOST`.
*   `CONTACTED` can transition to `APPLICATION_STARTED` or `LOST`.
*   `APPLICATION_STARTED` can transition to `APPLICATION_SUBMITTED` or `LOST`.
*   `APPLICATION_SUBMITTED` can transition to `ADMITTED`, `REJECTED`, or `LOST`.
*   `LOST`/`REJECTED` are terminal but can be updated back to their previous stage if needed.

### 3. Funnel Analysis
Visualizes the drop-off rates across the 5 main stages of the student recruitment pipeline.

#### Conversion Calculations
*   **Funnel Stages:** Counts leads that have *reached or surpassed* a given status historically:
    *   **New Stage:** Counts all leads that entered as `NEW`.
    *   **Contacted Stage:** Leads that have reached `CONTACTED`.
    *   **Started Stage:** Leads that have reached `APPLICATION_STARTED`.
    *   **Submitted Stage:** Leads that have reached `APPLICATION_SUBMITTED`.
    *   **Admitted Stage:** Leads that successfully completed the loop to `ADMITTED`.
*   **Drop-off Rate:** Calculated dynamically between sequential steps:
    $$\text{Drop-off} = \left( \frac{\text{Previous Stage Count} - \text{Current Stage Count}}{\text{Previous Stage Count}} \right) \times 100$$
*   **Conversion Rate:** Calculated per Course Program and Marketing Channel:
    $$\text{Conversion Rate} = \left( \frac{\text{Admitted Leads}}{\text{Total Leads}} \right) \times 100$$

### 4. Diagnostics (Site Health)
Includes backend health parameters:
*   **Database Connectivity:** A cron task pings the database every 5 minutes and returns state flags.
*   **Form Success Rate:** Aggregates `form_submission_events` logs.
*   **Top Page Traffic:** Monitors which public pages have received the most hits.

---

## ⚡ Real-Time Live Polling Engine
Data freshness is maintained using a custom React polling engine:
*   **Background Fetching:** The frontend uses a hook [usePolling.js](file:///c:/Users/admin/Downloads/scct/frontend/src/hooks/usePolling.js) to trigger background updates every 30 seconds.
*   **No UI Interruptions:** The initial load renders a spinner, but subsequent updates are done silently in the background without refreshing the page or interrupting form inputs.
*   **LIVE Indicator:** A badge appears on the top-right of dashboard pages showing a pulsing green dot + a `"LIVE · HH:MM:SS"` timestamp showing when the last background fetch completed.

---

## 🔍 UTM Parameter Capture & Parsing

UTM (Urchin Tracking Module) codes allow marketing campaigns to be analyzed:
1.  **Capture:** When a user lands on the website with UTM query variables (e.g. `?utm_source=facebook&utm_medium=cpc&utm_campaign=ad_campaign`), the hook [utmCapture.js](file:///c:/Users/admin/Downloads/scct/frontend/src/utils/utmCapture.js) extracts the values and saves them into browser `sessionStorage`.
2.  **Submission:** When the user submits the Admissions enquiry form, the saved parameters are extracted and appended to the POST request payload.
3.  **Storage:** The backend persists the parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) inside the lead entity.
4.  **Dashboard Display:** The values appear on the Lead Detail modal. If a student typed the URL directly or came organically without a campaign, these values default to `N/A`.

---

## ✉️ Email Normalization

To prevent duplicates and maintain consistent queries:
*   **Frontend Validation:** The Zod resolver in `Admissions.jsx` automatically sanitizes email values to lowercase using `.transform((val) => val.toLowerCase())` on client validation.
*   **Backend Sanitation:** The `LeadServiceImpl` builder explicitly maps the input email to lowercase before persisting:
    ```java
    .email(request.getEmail() != null ? request.getEmail().trim().toLowerCase() : null)
    ```
This dual-layer mapping guarantees all email lookups and duplicate checks are case-insensitive and consistent.
