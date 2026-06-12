# Schedula - Role-Based Authentication System
=======
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

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
