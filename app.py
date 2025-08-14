from flask import Flask
from config import Config
from models import db
from routes.classes import classes_bp
from routes.book import book_bp
from routes.bookings import bookings_bp
from routes.home import home_bp
from seed import seed
import os

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

# register blueprints
app.register_blueprint(home_bp)
app.register_blueprint(classes_bp)
app.register_blueprint(book_bp)
app.register_blueprint(bookings_bp)

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)) or ".")
    with app.app_context():
        seed() ##inititalize db with seed data
    app.run(debug=True)
