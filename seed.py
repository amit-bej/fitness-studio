import json
from models import db, FitnessClass,Booking
from utils.timezone import IST
from datetime import datetime

def seed(file_path="input.json"):
    db.create_all()
    # clear all existing data 
    db.session.query(Booking).delete()
    db.session.query(FitnessClass).delete()
    db.session.commit()
    # load data from JSON
    with open(file_path, "r") as f:
        classes = json.load(f)
    #insert seed data to the fitness table
    for item in classes:
        naive_dt = datetime.fromisoformat(item["datetime"])
        cls = FitnessClass(
            name=item["name"],
            datetime_ist=IST.localize(naive_dt),
            instructor=item["instructor"],
            available_slots=item["available_slots"]
        )
        db.session.add(cls)
    db.session.commit()
    print(f"Seeded fitness classes!!!")
