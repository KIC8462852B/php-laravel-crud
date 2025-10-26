
# trivial-node-crud

A minimal, opinionated Node.js CRUD example — intentionally tiny and focused so you can quickly see how a basic REST API is structured and operated. This repository is ideal as a learning reference, a base for small experiments, or a teaching aid.

- Language: JavaScript (Node.js)
- Purpose: Demonstrate a straightforward Create / Read / Update / Delete REST API with an in-memory store
- Status: Educational / example code — not production hardened

## Features

- Simple REST endpoints for a single resource (`items`)
- In-memory storage (no external database required)
- Clear examples of request/response payloads
- Easy to run with Node/npm
- Small surface area for experimentation and extension

## Table of Contents

- [Quick Start](#quick-start)
- [API Endpoints](#api-endpoints)
- [Data Model](#data-model)
- [Examples (curl)](#examples-curl)
- [Project Structure](#project-structure)
- [Scripts](#scripts)

## Quick Start

Prerequisites:
- Node.js 14+ (recommended Node 18+)
- npm (comes with Node.js)

1. Clone the repository:
   git clone https://github.com/KIC8462852B/trivial-node-crud.git
   cd trivial-node-crud

2. Install dependencies:
   npm install

3. Start the server:
   npm start

By default the server runs on port 3000. Open http://localhost:3000/ to verify (you should get a simple message or a JSON response depending on implementation).

## API Endpoints

Base URL: http://localhost:3000

- GET /items
  - List all items
  - Response: 200 OK, JSON array

- GET /items/:id
  - Get a single item by id
  - Response: 200 OK (item) or 404 Not Found

- POST /items
  - Create a new item
  - Request body: JSON
  - Response: 201 Created (created item)

- PUT /items/:id
  - Update an existing item
  - Request body: JSON
  - Response: 200 OK (updated item) or 404 Not Found

- DELETE /items/:id
  - Delete an item
  - Response: 204 No Content or 404 Not Found

Adjust the port or routes if you fork/extend the project.

## Data Model

This project uses a tiny, example item model. Example shape:

{
  "id": "uuid-or-integer",
  "name": "My item",
  "description": "Optional description",
  "createdAt": "2025-10-26T12:00:00.000Z"
}

Because the storage is in-memory, all data is lost when the server restarts. Replace the storage layer with a database (e.g., SQLite, PostgreSQL, MongoDB) for persistence.

## Examples (curl)

Create an item:
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"First item","description":"An example item"}'

List items:
curl http://localhost:3000/items

Get an item:
curl http://localhost:3000/items/1

Update an item:
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated name"}'

Delete an item:
curl -X DELETE http://localhost:3000/items/1

(Adjust `:id` to match the ID format used by the server.)

## Project Structure

A simple example layout you might find in this repository:

- package.json        - scripts and dependencies
- src/
  - index.js          - server entrypoint and route registration
  - routes/items.js   - CRUD route handlers
  - store/inMemory.js - trivial in-memory data store
- README.md           - this file

This structure is minimal by design — feel free to refactor into controllers, services, and models as your project grows.

## Scripts

Common npm scripts (example):
- npm start      - start the server (node src/index.js)
- npm run dev    - start server in development mode (e.g., nodemon) — if configured
- npm test       - run tests (if tests are added)

Check package.json for the actual, configured scripts.



