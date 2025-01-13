import random
import re
import hashlib
import os

def validate_name(name: str) -> str:
    pattern = r"^[A-Za-z\s]+$"
    if not re.match(pattern, name):
        return "Name can only contain alphabetic characters and spaces."
    return None


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


def hash_password(password: str, salt: bytes = None) -> str:
    """Hash a password using SHA-256 and a salt."""
    if not salt:
        salt = os.urandom(16)
    hashed = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return f"{salt.hex()}:{hashed.hex()}"    