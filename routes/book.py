from flask import Blueprint, request, jsonify
from models import db, FitnessClass, Booking
from utils.validators import isValidEmail
from utils.timezone import IST
import logging

book_bp = Blueprint("book", __name__)

@book_bp.route("/book", methods=["POST"])
def book_class():

    data = request.get_json(silent=True)

    if not data:
        logging.error("Json body missing")
        return jsonify({"error": "Missing body of type - JSON"}), 400

    required_fields = ["class_id", "user_name", "user_email"]

    # Check if all required fields are present
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400


    try:
        class_id = int(data["class_id"])
    except Exception:
        return jsonify({"error": "class_id must be integer"}), 400

    user_name = str(data["user_name"]).strip()

    user_email = str(data["user_email"]).strip()

    if not class_id:
        logging.error("Class_id is Null")
        return jsonify({"error": "class_id cannot be empty"}), 400
    
    if not user_name:
        logging.error("user_name is Null")
        return jsonify({"error": "user_name cannot be empty"}), 400
    
    if not isValidEmail(user_email):
        logging.error("Invalid Email Id")
        return jsonify({"error": "Invalid email format"}), 400
    
    #check if user has already booked the same class
    existing_booking = Booking.query.filter_by(
        class_id=class_id,
        user_email=user_email
    ).first()

    if existing_booking:
        return jsonify({"error": "Class already booked"}), 400

    fitness_class = FitnessClass.query.get(class_id)

    if not fitness_class:
        logging.error("Requested class not found")
        return jsonify({"error": "Class not found"}), 404

    if fitness_class.available_slots <= 0:
        logging.error("No more slots available")
        return jsonify({"error": "No slots available"}), 400

    fitness_class.available_slots -= 1

    booking = Booking(class_id=fitness_class.id,
                      user_name=user_name,
                      user_email=user_email)
    
    db.session.add(booking)

    db.session.commit()

    logging.info(f"Booking successful — {user_name} booked '{fitness_class.name}'")

    return jsonify({"message": "Booking successful"}), 201
