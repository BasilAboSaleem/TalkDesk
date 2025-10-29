# TokDesk v1 - Early Prototype

## ⚠️ Important Note

This repository contains an **early prototype (~20% completed) of the TokDesk project**, originally developed under the name **TalkDesk v1**.
It was built as an initial version to explore the idea, test concepts, and validate architecture choices.
The professional, full-featured version, **TokDesk v2**, is developed in a separate repository with a complete architecture and production-ready code.

---

## 📝 Overview

TokDesk is a full-stack communication and ticketing system inspired by platforms like **Slack** and **Zendesk**, aimed at enabling companies to manage internal conversations, departments, and support workflows.

### Version 1 Highlights

* Initial models: User, Company, Department, Conversation, Invitation
* Basic authentication (register/login with JWT)
* Soft delete/restore for Users and Departments
* Early routes and controllers for testing basic CRUD
* Conceptual Socket.io setup (not fully implemented)
* Initial Docker setup for MongoDB and Redis (basic)
* Multi-language support folder added (locales)

### Limitations of v1

* Only ~20% of the project completed
* Features not fully implemented (real-time chat, notifications, queues, image upload, etc.)
* Code structure not modular or fully optimized
* Intended mainly as a proof-of-concept

---

## ⚙️ Tech Stack Used in v1

| Layer          | Technology        | Usage                                  |
| -------------- | ----------------- | -------------------------------------- |
| Backend        | Node.js + Express | Basic API endpoints                    |
| Database       | MongoDB           | Data persistence                       |
| Realtime       | Socket.io         | Conceptual setup, not production-ready |
| Authentication | JWT               | Basic login/register                   |

---

## 📂 Project Structure

```
TokDesk-v1/
├── app.js             # Express server setup
├── locales/           # Multi-language support
├── constants/         # Roles
├── config/            # DB connection and configuration
├── controllers/       # Early controllers (Auth, User, Company, etc.)
├── models/            # Mongoose models (User, Company, Department, Conversation, Invitation)
├── routes/            # Initial API routes
├── middlewares/       # Basic middleware for auth and error handling
├── public/            # Static files
├── views/             # Test pages 
├── scenario.md        # Early project scenarios
└── .env               # Environment variables
```

---

## 🔍 Purpose of v1

* Serve as a **conceptual prototype** to understand requirements.
* Test initial backend logic, models, and simple API flows.
* Validate early ideas for **real-time communication** and **soft delete patterns**.
* Lay the foundation for **TokDesk v2**, the professional full-stack system.

---

## ⚡ Next Steps (v2)

* Complete full modular architecture (Controller → Service → Repository → Model)
* Implement real-time chat and notifications fully
* Add background jobs and queue system (BullMQ + Redis)
* Improve caching strategy and indexing
* Integrate front-end professionally (React + Tailwind)
* Add Docker Compose + Nginx for production-ready deployment
* Enhance security and role-based access control (RBAC)
* Migrate project officially from TalkDesk to **TokDesk**
* Expand multi-language support across all modules

---

## 📌 Summary

**TokDesk v1** (formerly TalkDesk v1) is an early experimental version and **should not be used in production**.
It exists to document the **evolution of the project** and serve as a reference for the transition to **TokDesk v2**, the fully professional version.

---

© 2025 TokDesk - Early Prototype by Basil Abu Saleem
