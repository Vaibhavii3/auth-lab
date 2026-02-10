# OAuth 2.0 – Concepts

## 1. What is OAuth 2.0?

OAuth 2.0 is an **authorization framework** that allows a third-party application to access a user’s resources without exposing the user’s credentials (username and password).

OAuth answers the question:
**“Can this application access this user’s data, and to what extent?”**

It is widely used for **social login** and **secure API access**.

---

## 2. Authentication vs Authorization (Very Important)

These two terms are often confused, but OAuth is built primarily for **authorization**.

### Authentication

* Confirms *who* the user is
* Example: Logging in with email and password

### Authorization

* Confirms *what* an application is allowed to do
* Example: Allowing an app to read your Google profile

OAuth 2.0 is an **authorization protocol**, but many platforms (Google, GitHub) extend it to support **authentication**.

---

## 3. Why OAuth is Needed

Without OAuth:

* Users would have to share their passwords with third-party apps
* This is insecure and unscalable

With OAuth:

* Users never share passwords
* Access is limited and revocable
* Permissions are explicit and transparent

OAuth enables **secure delegated access**.

---

## 4. Key Roles in OAuth 2.0

OAuth defines four main actors:

### 4.1 Resource Owner

The user who owns the data.

Example:

* A Google user
* A GitHub account holder

---

### 4.2 Client

The application requesting access to the user’s data.

Example:

* Your MERN application
* A mobile app using Google login

---

### 4.3 Authorization Server

The service that authenticates the user and issues tokens.

Example:

* Google OAuth server
* GitHub OAuth server

---

### 4.4 Resource Server

The API that hosts the protected data.

Example:

* Google profile API
* GitHub user API

---

## 5. OAuth Tokens Explained

OAuth works using **tokens**, not passwords.

### 5.1 Authorization Code

* Temporary code
* Exchanged for tokens
* Short-lived

Used in secure server-side flows.

---

### 5.2 Access Token

* Used to access protected resources
* Short-lived
* Scoped

This token is sent with API requests.

---

### 5.3 Refresh Token

* Used to obtain new access tokens
* Long-lived
* Stored securely by the backend

Not always issued (depends on provider and flow).

---

## 6. Scopes

Scopes define **what level of access** is being requested.

Examples:

* Read basic profile
* Access email address
* Read repositories

Scopes ensure **least-privilege access**.

---

## 7. User Consent

Before granting access, the user is shown a **consent screen**.

The consent screen displays:

* Application name
* Requested permissions (scopes)
* Data being accessed

The user can approve or deny access.

---

## 8. OAuth Authorization Flow (High-Level)

1. User clicks “Login with Google/GitHub”
2. User is redirected to the provider
3. User authenticates with the provider
4. User grants consent
5. Provider redirects back with authorization code
6. Backend exchanges code for access token
7. Backend fetches user profile
8. User session or JWT is created

---

## 9. OAuth vs Traditional Login

| Feature           | Traditional Login | OAuth Login      |
| ----------------- | ----------------- | ---------------- |
| Password sharing  | Yes               | No               |
| Third-party trust | Not needed        | Required         |
| User convenience  | Medium            | High             |
| Security          | Depends on app    | Provider-managed |

---

## 10. OAuth in Modern Applications

OAuth is used in:

* Social login systems
* SaaS platforms
* Mobile apps
* Enterprise applications

Almost all modern applications support OAuth.

---

## 11. OAuth in Auth Systems

In an authentication system:

* OAuth handles identity verification via a provider
* Backend maps OAuth users to internal users
* Access control is handled internally

OAuth does not replace authorization logic like RBAC.

---

## 12. Summary

* OAuth 2.0 is an authorization framework
* It allows secure, delegated access
* Tokens are used instead of passwords
* Scopes limit access
* Consent is explicit
* OAuth enables social login and third-party integrations

OAuth is a foundational concept for modern authentication systems.
