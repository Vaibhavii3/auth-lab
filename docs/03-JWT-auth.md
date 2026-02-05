# JWT Authentication 

## 1. What Is JWT Authentication?

JWT authentication is a **token-based authentication mechanism**. Instead of storing authentication state on the server, the server issues a signed token to the client after a successful login.

The client stores this token and sends it with every subsequent request. The server verifies the token to authenticate the user.

JWT authentication is **stateless**, meaning the server does not store session data.

---

## 2. Core Idea Behind JWT

The core idea of JWT authentication is:

* Authentication data is stored inside a signed token
* The client is responsible for sending the token on every request
* The server only verifies the token, it does not remember the user

The token itself becomes proof of authentication.

---

## 3. Authentication Flow (Step by Step)

1. The user submits login credentials
2. The server verifies the credentials
3. The server generates a JWT containing user information
4. The token is signed using a secret or private key
5. The token is sent to the client
6. The client stores the token
7. The client includes the token with every protected request
8. The server verifies the token on each request

If the token is valid, the request is authenticated.

---

## 4. What Is a JWT Made Of?

A JWT consists of three parts:

1. Header – describes the token type and signing algorithm
2. Payload – contains user-related data (claims)
3. Signature – ensures the token has not been altered

The signature guarantees the integrity and authenticity of the token.

---

## 5. What Data Goes Inside a JWT?

JWTs typically contain:

* User identifier
* Role or permissions
* Token issue time
* Token expiration time

Sensitive information such as passwords should never be stored inside a JWT.

---

## 6. Token Storage on the Client

JWTs can be stored in different ways:

* Browser storage (localStorage or sessionStorage)
* Cookies
* Mobile secure storage

Each option has different security trade-offs. The storage method should be chosen carefully based on application requirements.

---

## 7. Authorization Using JWT

Once authenticated, authorization decisions are made by reading the token payload.

The server checks:

* Whether the token is valid
* Whether the token is expired
* Whether the user has required permissions

Authorization is performed without database lookups in many cases.

---

## 8. Token Expiration and Renewal

JWTs usually have a limited lifetime.

When a token expires:

* The user must re-authenticate, or
* A new token is issued using a refresh mechanism

Short-lived access tokens improve security.

---

## 9. Logout in JWT-Based Systems

JWT-based systems do not have a natural logout mechanism.

Because the server does not store tokens:

* Tokens remain valid until they expire
* Immediate revocation is difficult

Logout is typically handled by deleting the token on the client side.

---

## 10. Security Considerations

Important security practices for JWT authentication include:

* Using strong signing secrets or private keys
* Setting reasonable expiration times
* Avoiding sensitive data in tokens
* Protecting tokens from XSS attacks
* Using HTTPS for all communication

---

## 11. Advantages of JWT Authentication

* Stateless and scalable
* Suitable for distributed systems
* No server-side session storage
* Works well with APIs and microservices
* Easy to integrate with mobile applications

---

## 12. Limitations of JWT Authentication

* Token revocation is difficult
* Larger request size due to token payload
* Security depends heavily on client storage
* Misuse can lead to serious vulnerabilities

---

## 13. JWT vs Session-Based Authentication

JWT authentication is stateless, while session-based authentication is stateful.

JWTs are better suited for APIs and distributed architectures. Sessions are often simpler and safer for traditional web applications.

---

## 14. When to Use JWT Authentication

JWT authentication is a good choice when:

* Building REST APIs
* Supporting mobile or third-party clients
* Working with microservices
* Scalability is a priority

---

## 15. Learning Outcome

By understanding JWT authentication, you learn:

* How stateless authentication works
* How tokens replace server-side sessions
* How authentication scales in distributed systems
* How modern APIs handle authentication

---

