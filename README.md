# 🚀 Overview

Hello there 🧙.
This is just my little playground — a personal pet project where I get to mess around, test cool stuff, and build a hub for apps I actually use.
Tried the open project route, but... yeah, doesn’t give me a 100% perfect solution.
So here we go — time to build things my way! 🛠️💥🛠️

# 📦 Patch Notes
## v2.1.0 (2025-12-05)
- Added a new frontend for my personal video game library.

## v2.0.0 (2025-11-29)

### ⚙️ Application
- Changed project name to "Central Hub" to better reflect its purpose as a personal application hub.

### 🧩 Angular Frontend
- Transition the project to NX to take advantage of **Module Federation** for future use cases.
- Implemented a new UI theme.

### 🧬 Quarkus API
- Discord integration was replaced with the open source ntfy push notifications (https://ntfy.sh/).

## v1.1.0 (2025-05-27)

### 🧩 Angular Frontend
- Added product counters

### 🧬 Quarkus API
- Added product counters endpoint.

## v1.0.0 (2025-05-17)

### ⚙️ Application
- Deployment available via Docker Compose.

### 🧩 Angular Frontend
- Created a **groceries module** displaying a table with CRUD operations for products.
- Implemented an HTTP interceptor to attach a Basic Authentication header to all HTTP requests.
- Added internationalization support for **Portuguese (PT)** and **English (EN)**.

### 🧬 Quarkus API
- Added Basic Authorization to secure the endpoints.
- Integrated with Discord to send notifications to a personal bot.
- Created a REST API to manage grocery products.

## 🔜 TODO
### 🧬 Quarkus API
- Integrate **Keycloak** to provide advanced authorization capabilities and role management.
