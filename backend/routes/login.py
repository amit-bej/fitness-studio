from flask import Blueprint, url_for, render_template, redirect, request, jsonify
from flask_login import LoginManager,login_user,logout_user, login_required,current_user
from werkzeug.security import check_password_hash
from sqlalchemy.exc import IntegrityError
from models import db, Users

# This line creates a login blueprint, names it "login", 
# tells Flask where it’s defined (__name__), and where to find its HTML templates (../templates).
login_bp = Blueprint('login', __name__)

@login_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json() or request.form
        username = data.get('username', '').strip()
        password = data.get('password', '')

        if not username or not password:
            return jsonify({
                "success": False,
                "message": "Username and password are required"
            }), 400

        user = Users.query.filter_by(username=username).first()

        if not user:
            return jsonify({
                "success": False,
                "message": "Invalid username or password", 
                "error": "invalid-credentials"
            }), 401

        if not check_password_hash(user.password, password):
            return jsonify({
                "success": False,
                "message": "Invalid username or password",
                "error": "invalid-credentials"
            }), 401

        login_success = login_user(user, remember=True)
        # Debug: Check if login_user worked
        print(f"Login user result: {login_success}")
        print(f"User ID: {user.id}")
        print(f"Current user authenticated: {current_user.is_authenticated}")
        return jsonify({
            "success": True,
            "message": "Login successful",
            "data": {
                "user": {
                    "id": user.id, 
                    "username": user.username,
                    "email":user.email
                }
            }
        }), 200

    except Exception as e:
        print(f"Login error: {e}")  # Log server-side
        return jsonify({
            "success": False,
            "message": "An internal error occurred"
        }), 500


@login_bp.route('/logout', methods=['POST'])
def logout():  # Remove @login_required to allow logout even if session expired
    try:
        logout_user()
        return jsonify({
            "success": True,
            "message": "Logged out successfully"
        }), 200
    except Exception as e:
        print(f"Logout error: {e}")
        return jsonify({
            "success": True,  # Still return success for client cleanup
            "message": "Logged out successfully"
        }), 200
    
