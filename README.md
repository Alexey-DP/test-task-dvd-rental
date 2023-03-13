## Test task NodeJS app

Project description

---
Give data to the client via the endpoint:

http://localhost:3333/api/film/:title

If a movie title includes two or more words, hyphenate it.
For example:

http://localhost:3333/api/film/california-birds

The application caches data for 15 seconds in Node application memory, and 30 seconds in the Redis store.

---

#### What's shipped with this Docker Container?

- NodeJS (Express) application.
- Configured TypeORM for PostgreSQL.
- TypeScript.
- PostgreSQL.
- Redis.

---

#### 1. Project init

- Run `git clone`.

---

#### 2. Build project using Docker Compose

- To build (rebuild) `docker-compose up -d --build`
- To start without building `docker-compose up -d`
- To stop `docker-compose down`
