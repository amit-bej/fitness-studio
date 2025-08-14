from flask import Blueprint, request, jsonify
from models import FitnessClass
from utils.timezone import convert_timezone
import logging

classes_bp = Blueprint("classes", __name__)

#Returns a list of all fitness classes with details and supports timezone conversion.
@classes_bp.route("/classes", methods=["GET"])
def get_classes():
    timezone = request.args.get("tz", "Asia/Kolkata")
    classes = FitnessClass.query.order_by(FitnessClass.datetime_ist).all()
    resultSet = []
    for cls in classes:
        local_date = convert_timezone(cls.datetime_ist, timezone)
        resultSet.append({
            "id": cls.id,
            "name": cls.name,
            "datetime": local_date.strftime("%Y-%m-%d %H:%M %Z"),
            "instructor": cls.instructor,
            "available_slots": cls.available_slots
        })
    logging.info("List of classes returned")
    return jsonify(resultSet), 200
