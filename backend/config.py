# config.py - FIXED VERSION
import pytz
import os

class Config:
    # Database configuration
    SQLALCHEMY_DATABASE_URI = "sqlite:///fitness.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    IST = pytz.timezone("Asia/Kolkata")
    
    # FIXED: Use environment variable or fallback
    SECRET_KEY = os.environ.get('SECRET_KEY', '1459')
    
    # CRITICAL FIX: For local development with cross-origin
    # Option 1: Use Lax for development (recommended for localhost)
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SECURE = False  
    SESSION_COOKIE_SAMESITE = 'Lax'  # Changed back to 'Lax' for local dev
    
    # Option 2: If you must use None, you need HTTPS (not recommended for local dev)
    # SESSION_COOKIE_HTTPONLY = True
    # SESSION_COOKIE_SECURE = True  # Must be True with SameSite=None
    # SESSION_COOKIE_SAMESITE = 'None'
    
    # Flask-Login settings
    REMEMBER_COOKIE_DURATION = 86400  # 24 hours
    REMEMBER_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_SECURE = False  
    REMEMBER_COOKIE_SAMESITE = 'Lax'  # Match session cookie
    
    # Session configuration
    PERMANENT_SESSION_LIFETIME = 3600  # 1 hour
    SESSION_TYPE = 'filesystem'  # Helps with persistence