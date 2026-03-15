# Auth-Lab

**An interactive authentication learning platform.** Learn how different auth strategies work by trying them live—Basic Auth, JWT, Session cookies, and API Key—with a real backend and a clean, modern UI.

---

## What is Auth-Lab?

Auth-Lab is a **full-stack demo project** that lets you:

- **Learn** — Read how each auth method works, its flow, pros, and cons.
- **Try it** — Register, login, and hit protected routes with real API calls.
- **Inspect** — See exactly what gets sent: encoded credentials, JWT payloads, session cookies, or API keys.

All four methods use the **same user store** (MongoDB), so one account works across every demo.

---

## Features

- **4 authentication methods**
  - **Basic Auth** — Base64(email:password) in `Authorization` header
  - **JWT** — Access token in `Authorization: Bearer <token>`
  - **Session** — Server-side session with httpOnly cookie (`authlab.sid`)
  - **API Key** — Secret key in `X-API-Key` header
- **Interactive demos** — Each method has **Learn** / **Try It** / **Inspect** tabs
- **Live Request Monitor** — Sidebar shows current endpoint, headers, and body for every request
- **Register & Login** — Create an account once, use it in all demos
- **Protected routes** — JWT (dashboard, profile), Session, API Key, and Basic Auth each have a protected endpoint
- **Role-based access** — Admin-only route using JWT + role check
- **Documentation** — Markdown guides in `/docs` (password auth, session, JWT, RBAC, OAuth)
