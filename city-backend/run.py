import os

from dotenv import load_dotenv

from app import create_app

load_dotenv()

_flask_env = os.getenv("FLASK_ENV", "development")
_config = "production" if _flask_env == "production" else "development"

app = create_app(_config)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")))
