import random
import re
import hashlib
import os

MIN_PASSWORD_LENGTH = 8

def validate_name(name: str) -> str:
    pattern = r"^[A-Za-z\s]+$"
    if not re.match(pattern, name):
        return "Name can only contain alphabetic characters and spaces."
    return None

def validate_email(email: str):
    if re.match(r"^[a-zA-Z0-9._%+-]+@gmail\.com$", email):
      return "Valid Gmail address"
    else:
        return "Invalid Gmail address"
    
def check_password_strength(password: str) -> str:
    if len(password) < MIN_PASSWORD_LENGTH:
        return "Password must be at least 8 characters long."
    if not re.search(r"[A-Z]", password):
        return "Password must contain at least one uppercase letter."
    if not re.search(r"[a-z]", password):
        return "Password must contain at least one lowercase letter."
    if not re.search(r"[0-9]", password):
        return "Password must contain at least one digit."
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        return "Password must contain at least one special character."
    return None
