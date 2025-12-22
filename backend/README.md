# Trenda Backend (Spring Boot)

Spring Boot 3.5 + Gradle project that exposes the future Trenda APIs backed by PostgreSQL and Java 17.

## Prerequisites

- Java 17 (e.g., `brew install openjdk@17`)
- Docker (optional, for local PostgreSQL via `docker-compose`)

The Gradle wrapper bundled in the repo means you do **not** need a global Gradle install to build or run the service.

## Quick start

```bash
cd backend
cp env.sample .env               # optional – override defaults
docker compose up -d postgres    # start PostgreSQL locally
./gradlew bootRun                # launch the API on http://localhost:8080
```

Visit `http://localhost:8080/api/health` to verify the service is running.

## Configuration

The application reads standard Spring environment variables (or `.env` values when using a launcher such as `direnv`):

| Variable | Default | Purpose |
| --- | --- | --- |
| `SERVER_PORT` | `8080` | HTTP port for the Spring Boot application |
| `POSTGRES_HOST` | `localhost` | PostgreSQL host |
| `POSTGRES_PORT` | `5432` | PostgreSQL port |
| `POSTGRES_DB` | `trenda` | Database name |
| `POSTGRES_USER` | `trenda` | Database user |
| `POSTGRES_PASSWORD` | `trenda_password` | Database password |

`docker-compose.yml` contains a ready-to-use PostgreSQL container that matches the defaults above.

## Useful Gradle commands

| Command | Description |
| --- | --- |
| `./gradlew bootRun` | Start the Spring Boot application with live reload |
| `./gradlew test` | Run the full test suite |
| `./gradlew build` | Compile, run tests, and create the runnable jar |

## Project layout

- `src/main/java` – Application code (REST controllers, domain, services)
- `src/main/resources` – Spring configuration & shared resources
- `src/test/java` – Unit and integration tests (configured for JUnit 5 / Testcontainers)

