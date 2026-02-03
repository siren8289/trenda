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

### Render 배포 (Build / Start Command)

**Build Command**

```text
./gradlew build -x test
```

(테스트 제외 시 빌드만 빠르게. 테스트 포함하려면 `./gradlew build`)

**Start Command** (비워두면 안 됨)

```text
java -jar build/libs/app.jar
```

이 프로젝트는 `bootJar { archiveFileName = 'app.jar' }` 로 jar 이름을 고정해 두었으므로 위 명령 그대로 사용하면 됨.

**환경 변수**

- `DATABASE_URL`: Neon 등 PostgreSQL 연결 문자열 (필수)
- `PORT`: Render가 자동 주입. `application.yml` 에서 `server.port: ${PORT:8080}` 로 사용 중.

**포트**

`application.yml` 에 `server.port: ${PORT:8080}` 가 있어서 Render 의 `PORT` 에 바인딩됨. 없으면 "No open ports detected" 로 종료됨.

**Exited with status 1 이 뜰 때**

- Render **Logs** 맨 위부터 **처음 나온 에러 5~10줄** 확인.
- `Could not resolve placeholder 'XXX'` → Environment 에 해당 변수 추가하거나 `application.yml` 에 `${XXX:기본값}` 처리.
- Start Command 가 비어 있거나 `./gradlew bootRun` 이면 → 위 **Start Command** 로 변경 (`java -jar build/libs/app.jar`).
- 로컬에서 `./gradlew build && ls build/libs` 로 `app.jar` 생성 여부 확인.

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

