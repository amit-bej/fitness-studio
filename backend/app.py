from flask import Flask, Blueprint, jsonify, session, request, send_from_directory
from flask_login import LoginManager,current_user
from config import Config
from models import db, Users
from routes.classes import classes_bp
from routes.book import book_bp
from routes.bookings import bookings_bp
from routes.home import home_bp
from routes.register import register_bp
from routes.login import login_bp
from seed import seed
from flask_cors import CORS
import os

app = Flask(__name__,static_folder=".", static_url_path="")
app.config.from_object(Config)

db.init_app(app)

'''
This creates the login manager object. Think of it as the “session manager” that knows:
Who is logged in
How to log them in/out
Where to redirect if they need to log in
'''
login_manager = LoginManager()
login_manager.init_app(app)
# allow frontend React app to call backend
CORS(app, 
     supports_credentials=True, 
     origins=["http://localhost:3000"],
     allow_headers=["Content-Type", "Authorization", "X-Requested-With"])

'''
This attaches the login manager to your Flask app.
Without this, Flask-Login won't know about your app and can't manage sessions.
'''
login_manager.init_app(app)
# register blueprints
app.register_blueprint(home_bp)
app.register_blueprint(classes_bp)
app.register_blueprint(book_bp)
app.register_blueprint(bookings_bp)
app.register_blueprint(register_bp)
app.register_blueprint(login_bp)

'''
When a user logs in successfully, Flask-Login stores their user ID in the session (cookie).
Later, when a new request comes in, Flask-Login needs to rebuild the user object (Users) from just that ID.
That's what this function does: given the user_id, 
it queries the database and returns the correct Users object.
If you don't provide this function:
Flask-Login wouldn't know how to load a user back from the session.
That means current_user (the built-in object for “who is logged in”) would not work
'''
@login_manager.user_loader
def load_user(user_id):
    """This function is CRITICAL - Flask-Login calls it on every request"""
    try:
        print(f"Loading user with ID: {user_id}")  # Debug line
        user = Users.query.get(int(user_id))
        if user:
            print(f" User loaded: {user.username}")
        else:
            print(f" No user found with ID: {user_id}")
        return user
    except Exception as e:
        print(f" Error loading user: {e}")
        return None
@login_manager.unauthorized_handler
def unauthorized():
    return jsonify({"success": False, "message": "Authentication required"}), 401
   
if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)) or ".")
    with app.app_context():
        seed() ##inititalize db with seed data
    app.run(debug=True)
