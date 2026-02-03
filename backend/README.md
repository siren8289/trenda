# Trenda Backend (Spring Boot)

Spring Boot 3.5 + Gradle 프로젝트. **PostgreSQL**을 기본 DB로 사용합니다.

## Prerequisites

- Java 17 (e.g., `brew install openjdk@17`)
- **PostgreSQL** (로컬은 Docker로 실행 권장)

## Quick start

```bash
cd backend
cp env.sample .env               # optional – override defaults
docker compose up -d postgres    # PostgreSQL 먼저 실행 (필수)
./gradlew bootRun               # API 실행 → http://localhost:8080
```

`http://localhost:8080/swagger-ui.html` 또는 `/api/health` 로 동작 확인.

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `SERVER_PORT` | `8080` | HTTP port |
| `POSTGRES_HOST` | `localhost` | PostgreSQL host |
| `POSTGRES_PORT` | `5432` | PostgreSQL port |
| `POSTGRES_DB` | `trenda` | DB name |
| `POSTGRES_USER` | `trenda` | DB user |
| `POSTGRES_PASSWORD` | `trenda_password` | DB password |

`docker-compose.yml` 에서 위 기본값에 맞는 PostgreSQL 컨테이너를 띄웁니다.

### Render / Neon 등 배포

- **Render**: PostgreSQL 인스턴스 생성 후 Web Service에서 **Connect** 하면 `DATABASE_URL` 자동 설정.
- **Neon 등**: 대시보드에서 연결 문자열(Connection string)을 복사한 뒤, 배포 환경에 `DATABASE_URL` 로 설정.  
  예: `postgresql://user:password@host/dbname?sslmode=require`  
  이 프로젝트는 `DATABASE_URL` 이 있으면 자동으로 JDBC URL로 변환해 사용함.

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

