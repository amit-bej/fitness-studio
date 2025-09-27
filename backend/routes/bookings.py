from flask import Blueprint, request, jsonify
from models import db, FitnessClass, Booking
from utils.validators import isValidEmail
from utils.timezone import convert_timezone
from flask_login import login_required, current_user
import logging

bookings_bp = Blueprint("bookings", __name__)
#Returns the list of bookings made by the user
@bookings_bp.route("/bookings", methods=["GET"])
@login_required
def get_bookings():

    email = current_user.email
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
            "id":cls.id,
            "class_name": cls.name,
            "date_time": local_dt.strftime("%Y-%m-%d %H:%M %Z"),
            "instructor": cls.instructor
        })
    if len(result) == 0:
        return jsonify({"info": "No bookings found"}),200
    
    logging.info(f"Returned {len(result)} bookings for {email}.")
    return jsonify(result), 200


@bookings_bp.route("/cancelBooking",methods = ["POST"])
@login_required
def cancelBooking():
    email = current_user.email
    # email = "arb11459@gmail.com"
    if not email:
        return jsonify({"error": "Email parameter required"}), 400
    
    if not isValidEmail(email):
        return jsonify({"error": "Invalid email format"}), 400
    data = request.get_json(silent=True)
    print(data)
    if not data:
            logging.error("JSON body missing")
            return jsonify({"success": False, "error": "Missing JSON body"}), 400
    booking_id = data.get("bookingId")
    if not booking_id:
        return jsonify({"error": "Missing bookingId"}), 400
    existing_booking = Booking.query.filter_by(
        id=booking_id,
        user_email=email
    ).first()
    # print(existing_booking.__dict__)
    # print(existing_booking.class_id)
    if existing_booking:
        db.session.delete(existing_booking)
        fitness_class = FitnessClass.query.get(existing_booking.class_id)
        if not fitness_class:
            return jsonify({"success": False, "message": "Class not found"}), 404
        fitness_class.available_slots += 1
        db.session.commit()
        
        return jsonify({
            "success": True,
            "message": "Successfully deleted your booking"
        })
    
    else:
        return jsonify({
            "success": False,
            "error": "No booking found for this class"
        }), 404