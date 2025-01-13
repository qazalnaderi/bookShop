from sqlalchemy.orm import Session
from models import User
from utils import hash_password, pwd_context


def create_user(db: Session, name: str, email: str, number: str, password: str):
    hashed_password = hash_password(password)

    db_user = User(
        name=name,
        email=email,
        number=number,
        hashed_password=hashed_password,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_user_by_number(db: Session, number: str):
    return db.query(User).filter(User.number == number).first()


def verify_user_credentials(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not pwd_context.verify(password, user.hashed_password):
        return None

    return user
