import unittest
import json
from datetime import datetime
from app import app, db
from models import FitnessClass

class BookingApiTests(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.user = app.test_client()
        with app.app_context():
            db.create_all()
            fc = FitnessClass(
                name="Sample Class",
                datetime_ist=datetime(2025, 8, 20, 9, 0),
                instructor="Sample Instructor",
                available_slots=2
            )
            db.session.add(fc)
            db.session.commit()
            self.class_id = fc.id

    def tearDown(self):
        with app.app_context():
            db.drop_all()

    def test_classes(self):
        resp = self.user.get("/classes")
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertGreaterEqual(len(data), 1)
        self.assertEqual(data[0]["name"], "Sample Class")

    def test_booking(self):
        payload = {
            "class_id": self.class_id,
            "user_name": "Test User",
            "user_email": "testuser@gamil.com"
        }
        resp = self.user.post("/book", json=payload)
        self.assertEqual(resp.status_code, 201)

    def test_booking_duplicate(self):
        payload = {
            "class_id": self.class_id,
            "user_name": "Test User",
            "user_email": "testuser@gmail.com"
        }
        self.user.post("/book", json=payload)
        resp = self.user.post("/book", json=payload)
        self.assertEqual(resp.status_code, 400)

    def test_no_slots_left(self):
        payload1 = {
            "class_id": self.class_id,
            "user_name": "User One",
            "user_email": "one@gmail.com"
        }
        payload2 = {
            "class_id": self.class_id,
            "user_name": "User Two",
            "user_email": "two@gmail.com"
        }
        self.user.post("/book", json=payload1)
        self.user.post("/book", json=payload2)
        # Now slots should be 0
        payload3 = {
            "class_id": self.class_id,
            "user_name": "User Three",
            "user_email": "three@gmail.com"
        }
        resp = self.user.post("/book", json=payload3)
        self.assertEqual(resp.status_code, 400)

    def test_booking_retrieval(self):
        payload = {
            "class_id": self.class_id,
            "user_name": "Retrieve User",
            "user_email": "retrieve@gmail.com"
        }
        self.user.post("/book", json=payload)
        resp = self.user.get(f"/bookings?email=retrieve@gmail.com")
        self.assertEqual(resp.status_code, 200)
        bookings = resp.get_json()
        self.assertTrue(any(b["class_name"] == "Sample Class" for b in bookings))

if __name__ == "__main__":
    unittest.main()
