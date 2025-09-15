from flask import Blueprint, url_for, render_template, redirect,request,jsonify
from flask_login import LoginManager
from werkzeug.security import generate_password_hash
from sqlalchemy.exc import IntegrityError
from models import db, Users

register_bp = Blueprint('register', __name__, template_folder='../templates')

# login_Manager = LoginManager()
# login_Manager.init_app(register_bp)


@register_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json() or request.form
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if username and email and password:
            hash_password = generate_password_hash(password)
            try:
                new_user = Users(
                    username=username,
                    email=email,
                    password=hash_password,
                )
                db.session.add(new_user)
                db.session.commit()
            except IntegrityError:
                return  jsonify({
                    "success": False,
                    "message": "Username and Email already Exist"
                }), 404

            return jsonify({
                    "success": True,
                    "message": "Successfully Registered"
                }), 200
                
        else:
            return jsonify({
                    "success": False,
                    "message": "Missing Feilds"
                }), 404
    # else:
    #     return render_template('register.html')
