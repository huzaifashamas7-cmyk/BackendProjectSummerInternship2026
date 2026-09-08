
# Exam Platform Public API & Developer Portal

A versioned public REST API for an exam platform, with API key authentication, rate limiting, webhooks, a sandbox environment, and a companion developer portal. Built solo as part of a Summer Internship 2026 backend module (M-14).

## Project Structure

This repository contains two separate applications:

/ → Express REST API (this project)
routes/ → API route handlers (exams, questions, enrollments, results, certificates, webhooks, keys)
middleware/ → Auth and scope-checking middleware
queues/ → BullMQ webhook delivery queue
workers/ → BullMQ webhook delivery worker
utils/ → API key generation, webhook triggering helpers
tests/ → Jest + Supertest integration tests
sdk/ → Auto-generated JavaScript client SDK
openapi.yaml → OpenAPI 3.0 specification (source of truth)

/developer-portal → Next.js developer portal
app/ → Pages: getting started, API reference (Swagger UI), guides, key management
public/sdk/ → Copy of the generated SDK, served for download

## Features

- **API key management** — generate, hash (SHA-256), scope, and revoke keys; per-key usage logs
- **Versioned API** — all endpoints under `/api/v1/`
- **Core resources** — exams, questions, enrollments, results, certificates
- **Rate limiting** — Redis-backed, per-key limits with `X-RateLimit-*` headers
- **Webhooks** — event subscriptions, BullMQ delivery, HMAC-SHA256 signing, retry with exponential backoff
- **Sandbox environment** — fully isolated database and API keys for safe testing
- **Request logging** — per-key history of the last 1,000 requests, with automated 30-day purge
- **OpenAPI validation** — all requests validated against the spec via `express-openapi-validator`
- **Developer portal** — interactive Swagger UI, MDX guides, multi-language code samples, key management UI
- **Generated SDK** — JavaScript client auto-generated from the OpenAPI spec

## Prerequisites

- Node.js (v20+)
- MySQL
- Redis (via Docker recommended)
- Java (only required for regenerating the SDK)

## Setup

### 1. Install dependencies

```bash
npm install
cd developer-portal && npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=exam_platform
DB_SANDBOX_NAME=exam_platform_sandbox
REDIS_URL=redis://localhost:6379


### 3. Set up the databases

Run the table creation scripts (see `sql/` if present, or refer to project documentation) against both `exam_platform` and `exam_platform_sandbox`.

### 4. Start Redis

```bash
docker run -d -p 6379:6379 --restart unless-stopped --name redis-server redis
```

### 5. Start the API

```bash
npx nodemon server.js
```

Runs on `http://localhost:3000`.

### 6. Start the developer portal (separate terminal)

```bash
cd developer-portal
npm run dev
```

Runs on `http://localhost:3001`.

## Running Tests

```bash
npm test
```

Runs the full integration test suite (API key lifecycle, exams resource, webhook flow) using Jest and Supertest.

## Regenerating the SDK

```bash
java -jar openapi-generator-cli-7.10.0.jar generate -i openapi.yaml -g javascript -o ./sdk
```

## Authentication

All protected endpoints require a Bearer token:

Authorization: Bearer sk_your_api_key_here


Create a key via `POST /api/v1/keys`.

## License

Educational project — Summer Internship 2026.