from flask import Blueprint, request, jsonify
from models import FitnessClass, Booking
from utils.validators import isValidEmail
from utils.timezone import convert_timezone
import logging

bookings_bp = Blueprint("bookings", __name__)
#Returns the list of bookings made by the user
@bookings_bp.route("/bookings", methods=["GET"])
def get_bookings():

    email = request.args.get("email")
    target_tz = request.args.get("tz", "Asia/Kolkata")

    if not email:
        return jsonify({"error": "Email parameter required"}), 400
    
    if not isValidEmail(email):
        return jsonify({"error": "Invalid email format"}), 400

    bookings = Booking.query.filter_by(user_email=email).all()

    result = []
    for booking in bookings:
        cls = FitnessClass.query.get(booking.class_id)
        if not cls:
            return jsonify({"error": f"Class with ID {booking.class_id} not found in Classes, but user has booked!"}), 404
        local_dt = convert_timezone(cls.datetime_ist, target_tz)
        result.append({
            "class_name": cls.name,
            "date&time": local_dt.strftime("%Y-%m-%d %H:%M %Z"),
            "instructor": cls.instructor
        })
    if len(result) == 0:
        return jsonify({"info": "No bookings found"}),200
    
    logging.info(f"Returned {len(result)} bookings for {email}.")
    return jsonify(result), 200
