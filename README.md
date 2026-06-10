# Schedula - Role-Based Authentication System

## Overview

This project implements a Role-Based Authentication and Authorization System for the Schedula healthcare appointment platform.

The system supports two user roles:

* Doctor
* Patient

Authentication is implemented using JWT (JSON Web Tokens), and passwords are securely hashed using bcrypt.

---

## Tech Stack

* NestJS
* TypeScript
* PostgreSQL
* TypeORM
* JWT Authentication
* bcrypt
* Postman

---

## Features

### Authentication

* User Signup
* User Login
* Password Hashing using bcrypt
* JWT Token Generation

### Authorization

* Role-Based Access Control (RBAC)
* Doctor-only routes
* Patient-only routes
* Protected APIs using JWT Guards

---

## API Endpoints

### Signup

POST /auth/signup

Request Body:

```json
{
  "name": "Doctor One",
  "email": "doctor@test.com",
  "password": "123456",
  "role": "DOCTOR"
}
```

### Login

POST /auth/login

Request Body:

```json
{
  "email": "doctor@test.com",
  "password": "123456"
}
```

Response:

```json
{
  "access_token": "JWT_TOKEN"
}
```

### Doctor Profile

GET /doctor/profile

Access:

* Doctor: Allowed
* Patient: Forbidden

### Patient Profile

GET /patient/profile

Access:

* Patient: Allowed
* Doctor: Forbidden

---

## Database

PostgreSQL is used as the primary database.

User Entity:

* id
* name
* email
* password
* role

---

## Security Features

* Password hashing with bcrypt
* JWT-based authentication
* Protected routes
* Role-based authorization

---

## Tested Scenarios

✅ Doctor Signup

✅ Doctor Login

✅ Doctor Access to Doctor Profile

✅ Doctor Restricted from Patient Profile

✅ Patient Signup

✅ Patient Login

✅ Patient Access to Patient Profile

✅ Patient Restricted from Doctor Profile

---

## Run Locally

Install dependencies:

```bash
npm install
```

Start application:

```bash
npm run start:dev
```

---

## Author

Mahendar Babu Beddala
