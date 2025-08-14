# Fitness Studio Booking API

A Flask-based RESTful API for managing fitness classes and bookings. This project allows users to view available fitness classes, book a class, and retrieve their bookings. It supports timezone conversion and basic validation.

## Features

- **List Classes:** View all available fitness classes with instructor, time, and slots.
- **Book a Class:** Book a slot in a fitness class by providing your name and email.
- **Prevent Duplicate Bookings:** Users cannot book the same class more than once.
- **Prevent Overbooking:** Classes cannot be booked if no slots are available.
- **Retrieve Bookings:** Get all bookings for a user by email.
- **Timezone Support:** View class times in different timezones.
- **Seed Data:** Easily seed the database with initial class data from a JSON file.

## Project Structure

```
ftness-studio/
│
├── app.py                  # Main Flask app entry point
├── models.py               # SQLAlchemy models for FitnessClass and Booking
├── seed.py                 # Script to seed the database from input.json
├── config.py               # Configuration (including timezone setup)
│
├── routes/
│   ├── book.py             # Booking endpoint
│   ├── bookings.py         # Bookings retrieval endpoint
│   └── classes.py          # Classes listing endpoint
│
├── utils/
│   ├── timezone.py         # Timezone conversion helpers
│   └── validators.py       # Email and other validators
│
├── tests/
│   └── test_api.py         # Unit tests for API endpoints
│
├── input.json              # Example seed data for classes
└── README.md               # Project documentation
```

## Setup & Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/yourusername/fitness-studio.git
   cd fitness-studio
   ```

2. **Create a virtual environment and activate it:**
   ```
   python -m venv venv
   venv\Scripts\activate   # On Windows
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Seed the database (optional):**
   ```
   python seed.py
   ```

5. **Run the Flask app:**
   ```
   python app.py
   ```

## API Endpoints

### List Classes

- **GET /classes**
- Optional query param: `tz` (timezone string, e.g. `America/New_York`)
- **Example:**  
  ```
  GET /classes?tz=Asia/Kolkata
  ```

### Book a Class

- **POST /book**
- **Body (JSON):**
  ```json
  {
    "class_id": 1,
    "user_name": "John Doe",
    "user_email": "john@example.com"
  }
  ```

### Retrieve Bookings

- **GET /bookings?email=user_email**
- Optional query param: `tz` (timezone string)
- **Example:**  
  ```
  GET /bookings?email=john@example.com&tz=Asia/Kolkata
  ```

## Running Tests

To run the unit tests:

```
python -m unittest tests/test_api.py
```

## Notes

- All endpoints return JSON responses.
- Timezone conversion uses `pytz`.
- Duplicate bookings and overbooking are prevented.
- Error messages are returned with appropriate HTTP status codes.


## Author

Amit Ranjan Bej
