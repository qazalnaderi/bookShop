from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import get_user_by_email, get_user_by_number, create_user, verify_user_credentials
from database import get_db
from schema import UserCreateSchema, UserLoginRequestSchema, UserLoginResponseSchema
from utils import validate_name, check_password_strength, hash_password

router = APIRouter()

@router.post("/Register", response_model=UserCreateSchema)
def register_user(user_data: UserCreateSchema, db: Session = Depends(get_db)):
    existing_user_email = get_user_by_email(db, user_data.email)
    if existing_user_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    existing_user_number = get_user_by_number(db, user_data.number)
    if existing_user_number:
        raise HTTPException(status_code=400, detail="Phone number already registered")

    name_error = validate_name(user_data.last_name)
    if name_error:
        raise HTTPException(status_code=400, detail=name_error)

    password_error = check_password_strength(user_data.password)
    if password_error:
        raise HTTPException(status_code=400, detail=password_error)

    hashed_password = hash_password(user_data.password)
    user = create_user(db, user_data.name, user_data.email, user_data.number, hashed_password)
    return user


@router.post("/Login", response_model=UserLoginResponseSchema)
def login_user(user_data: UserLoginRequestSchema, db: Session = Depends(get_db)):
    user = verify_user_credentials(db, user_data.email, user_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Email or password is incorrect")

    return {"message": "login successful"}
