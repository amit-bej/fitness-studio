from flask import Blueprint, jsonify, redirect, url_for
from flask_login import login_required
home_bp = Blueprint('home', __name__)

##Root page of application
@home_bp.route('/')
#@login_required
def home():
    return redirect(url_for('login.login'))
