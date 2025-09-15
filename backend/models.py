from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
db = SQLAlchemy()

##Fitnes table model
class FitnessClass(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    datetime_ist = db.Column(db.DateTime, nullable=False)
    instructor = db.Column(db.String(80), nullable=False)
    available_slots = db.Column(db.Integer, nullable=False)
##Booking table model
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.Integer, db.ForeignKey('fitness_class.id'), nullable=False)
    user_name = db.Column(db.String(80), nullable=False)
    user_email = db.Column(db.String(120), nullable=False)

class Users(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)