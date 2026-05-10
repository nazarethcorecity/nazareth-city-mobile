# City Backend

Flask API foundation for the smart city mobile app: app factory, PostgreSQL via SQLAlchemy, migrations, and CORS—no authentication layer yet.

## Requirements

- Python 3.10+
- PostgreSQL

## Setup

1. Create a virtual environment and install dependencies:

   ```bash
   cd city-backend
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. Configure environment variables:

   ```bash
   copy .env.example .env
   ```

   Set `DATABASE_URL` to your PostgreSQL connection string (SQLAlchemy format), for example:

   `postgresql://user:password@localhost:5432/city_db`

3. Initialize the database migration repository (once per project):

   ```bash
   set FLASK_APP=run.py
   flask db init
   ```

   After you add models under `app/models/`, create and apply migrations:

   ```bash
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

## Run

```bash
python run.py
```

Or:

```bash
set FLASK_APP=run.py
flask run
```

Default port is `5000` (override with `PORT` in `.env`).

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Liveness check |

Example response:

```json
{
  "status": "ok",
  "message": "City backend is running"
}
```

## Layout

- `app/` — application package (`config`, extensions, blueprints, models, services, utils)
- `migrations/` — Alembic history (created by `flask db init`)
- `seed/` — placeholder for seed scripts or data
- `run.py` — entry point that builds the app via the factory
