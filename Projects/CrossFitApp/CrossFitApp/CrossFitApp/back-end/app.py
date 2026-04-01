from doLogin import app
import os

if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_ENV") == "development"
    app.run(debug=debug_mode, host="0.0.0.0", port=int(os.getenv("PORT", 5000)))

