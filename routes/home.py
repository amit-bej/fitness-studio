from flask import Blueprint, jsonify

home_bp = Blueprint('home', __name__)

##Root page of application
@home_bp.route('/')
def home():
    return jsonify({"message": "Welcome to the Fitness Club!"})
