from flask import Blueprint, request, jsonify, render_template
from models import FitnessClass
from utils.timezone import convert_timezone
from flask_login import login_required,current_user
import logging

classes_bp = Blueprint("classes", __name__)

# Returns a list of all fitness classes with details and supports timezone conversion.
@classes_bp.route("/classes", methods=["GET"])
# @login_required
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

@classes_bp.route('/classes/view')
@login_required
def view_classes():
     return render_template('classes.html', username=current_user.username)
