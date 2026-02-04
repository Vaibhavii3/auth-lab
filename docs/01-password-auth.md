# Password-Based Authentication

## What is it?
Authentication using email and password.

## Flow
User -> Login -> Server -> Verify Password -> Response

## User Model
- Email + Password based user
- Password is hashed using bcrypt
- Supports future OAuth & 2FA

## Security
- Password never stored in plain text
- Salted hashing

## APIs

### Register
POST /api/auth/register  
Creates a new user with hashed password.

### Login
POST /api/auth/login  
Validates credentials using bcrypt comparison.

## Security Notes
- Passwords are hashed using bcrypt
- No sensitive data returned in responses

Password comparison logic is encapsulated inside the User model
to avoid duplication and ensure clean separation of concerns.

### Mongoose Middleware Note
When using async pre-save hooks, returning a promise is preferred over using `next()`.
This avoids middleware execution errors in newer Mongoose versions.

## Status
✅ Completed