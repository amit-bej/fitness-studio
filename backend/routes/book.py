from flask import Blueprint, request, jsonify
from models import db, FitnessClass, Booking
from utils.validators import isValidEmail
from utils.timezone import IST
import logging
from flask_login import login_required, current_user

book_bp = Blueprint("book", __name__)

@book_bp.route("/book", methods=["POST"])
# @login_required
def book_class():
    # Debug: Check if user is authenticated
    print(f"Current user authenticated: {current_user.is_authenticated}")
    print(f"Current user: {current_user.username if current_user.is_authenticated else 'Not authenticated'}")
    
    try:
        data = request.get_json(silent=True)
        logging.info(f"Booking request data: {data}")
        
        if not data:
            logging.error("JSON body missing")
            return jsonify({"success": False, "error": "Missing JSON body"}), 400

        # Get class_id from request
        try:
            class_id = int(data.get("classid"))
        except (ValueError, TypeError):
            logging.error("Invalid class id")
            return jsonify({"success": False, "error": "Invalid class ID"}), 400

        # Validate current user has required fields
        if not current_user.username:
            logging.error("Username Not found")
            return jsonify({"success": False, "error": "User name not found"}), 400
        
        if not current_user.email or not isValidEmail(current_user.email):
            logging.error("Invalid email")
            return jsonify({"success": False, "error": "Valid email required"}), 400

        user_name = current_user.username
        user_email = current_user.email

        # Check if user already booked this class
        existing_booking = Booking.query.filter_by(
            class_id=class_id,
            user_email=user_email
        ).first()

        if existing_booking:
            logging.error("Already booked")
            return jsonify({"success": False, "error": "You have already booked this class"}), 409

        # Check if class exists
        fitness_class = FitnessClass.query.get(class_id)
        if not fitness_class:
            logging.error(f"Class {class_id} not found")
            return jsonify({"success": False, "error": "Class not found"}), 404

        # Check available slots
        if fitness_class.available_slots <= 0:
            logging.error("No slots available")
            return jsonify({"success": False, "error": "No slots available"}), 409

        # Create booking
        fitness_class.available_slots -= 1
        booking = Booking(
            class_id=fitness_class.id,
            user_name=user_name,
            user_email=user_email
        )
        
        db.session.add(booking)
        db.session.commit()

        logging.info(f"Booking successful – {user_name} booked '{fitness_class.name}'")
        return jsonify({
            "success": True, 
            "message": f"Successfully booked {fitness_class.name}"
        }), 201

    except Exception as e:
        db.session.rollback()
        logging.error(f"Booking error: {str(e)}")
        return jsonify({"success": False, "error": "Internal server error"}), 500

# Add a custom handler for unauthorized access
@book_bp.errorhandler(401)
def unauthorized(e):
    return jsonify({
        "success": False,
        "error": "Authentication required. Please log in again."
    }), 401