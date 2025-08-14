from datetime import datetime
import pytz
from config import Config

IST = Config.IST

'''
Converts a datetime object to IST, 
localizing if naive or converting if timezone is known
'''
def to_ist(dt: datetime) -> datetime:
    if dt.tzinfo is None:
        return IST.localize(dt)
    else:
        return dt.astimezone(IST)
'''
Converts a datetime from IST to a specified timezone, localizing if needed.
'''
def convert_timezone(dt_ist: datetime, target_tz: str) -> datetime:
    try:
        tz = pytz.timezone(target_tz)
    except Exception:
        tz = IST
    if dt_ist.tzinfo is None:
        dt_ist = IST.localize(dt_ist)
    return dt_ist.astimezone(tz)
