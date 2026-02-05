# Role-Based Access Control (RBAC)

## 1. What is RBAC?

**Role-Based Access Control (RBAC)** is an authorization mechanism where access to resources is granted based on the **role** assigned to a user, rather than the user’s identity itself.

In RBAC:

* Users are assigned one or more roles
* Roles define what actions a user is allowed to perform
* Permissions are enforced at the application or API level

RBAC answers the question:

> **“What is this user allowed to do?”**

---

## 2. Authentication vs Authorization

RBAC is **authorization**, not authentication.

| Concept              | Purpose                           |
| -------------------- | --------------------------------- |
| Authentication       | Verifies who the user is          |
| Authorization (RBAC) | Controls what the user can access |

Example:

* Login success → Authentication
* Accessing admin dashboard → Authorization (RBAC)

---

## 3. Core RBAC Concepts

### 3.1 User

An individual who logs into the system.

Example:

* John
* Admin user
* Seller account

---

### 3.2 Role

A role is a **collection of permissions**.

Common examples:

* `user`
* `admin`
* `moderator`
* `seller`
* `manager`

A user typically has **one primary role**, but advanced systems may allow multiple roles.

---

### 3.3 Permission

A permission defines **what action is allowed**.

Examples:

* Read data
* Create records
* Update users
* Delete resources
* Access admin routes

Roles are built by grouping permissions together.

---

## 4. How RBAC Works (High-Level Flow)

1. User logs in successfully
2. Backend identifies the user’s role from the database
3. For every protected request:

   * Backend checks the required role or permission
4. Access is granted or denied based on role comparison

RBAC is enforced **after authentication**.

---

## 5. RBAC Enforcement Levels

RBAC can be applied at different layers:

### 5.1 Route-Level RBAC

Controls access to entire API routes.

Example:

* Only admins can access admin dashboards
* Users cannot access admin-only endpoints

---

### 5.2 Feature-Level RBAC

Controls access to specific features.

Example:

* Users can view content
* Admins can edit or delete content

---

### 5.3 Action-Level RBAC

Controls fine-grained operations.

Example:

* User can edit their own profile
* Admin can edit any profile

---

## 6. Why RBAC is Important

RBAC provides:

* **Security** – prevents unauthorized access
* **Scalability** – easy to add new roles
* **Maintainability** – permissions are centralized
* **Compliance** – meets enterprise security standards

RBAC is used in almost all real-world systems.

---

## 7. Common RBAC Role Examples

| Role      | Typical Access                |
| --------- | ----------------------------- |
| User      | View content, manage own data |
| Admin     | Full system access            |
| Moderator | Manage content and users      |
| Seller    | Manage own products           |
| Manager   | View reports and analytics    |

---

## 8. RBAC vs Hardcoded Checks

### Hardcoded Access Checks

* Scattered logic
* Difficult to maintain
* Not scalable

### RBAC

* Centralized logic
* Clean architecture
* Easy role management

RBAC is the **industry-standard approach**.

---

## 9. RBAC in Real-World Applications

RBAC is commonly used in:

* Admin panels
* SaaS platforms
* Banking systems
* E-commerce dashboards
* Enterprise software
* Government portals

---

## 10. Limitations of Basic RBAC

RBAC alone does not handle:

* Ownership-based access (user owns the resource)
* Time-based permissions
* Context-based access

These are solved using:

* Attribute-Based Access Control (ABAC)
* Policy-based authorization
* Permission-level RBAC (advanced)

---

## 11. RBAC in Auth Systems

In an authentication system:

* Authentication confirms identity
* RBAC enforces access control
* Both work together to secure APIs

RBAC is usually implemented as **middleware or guards** in backend systems.

---

## 12. Summary

* RBAC controls **what a user can do**
* Roles define access rules
* Users inherit permissions from roles
* RBAC is essential for secure backend design
* It is a foundational concept for scalable authentication systems

