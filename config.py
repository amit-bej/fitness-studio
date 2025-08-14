import pytz

class Config:
    SQLALCHEMY_DATABASE_URI = "sqlite:///fitness.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    IST = pytz.timezone("Asia/Kolkata")
