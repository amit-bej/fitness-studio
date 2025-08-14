import re

EMAIL_RE = re.compile(r"[^@]+@[^@]+\.[^@]+")

def isValidEmail(email: str) -> bool:
    return bool(EMAIL_RE.match(email))
