from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import( get_user_by_email, get_user_by_number, create_user, verify_user_credentials,
get_admin_by_username,authenticate_admin,create_admin, get_user_by_id,
create_book, create_order_with_quantity_check , get_orders, get_book_by_id, delete_book)
from database import get_db
from schema import(UserCreateSchema, UserLoginRequestSchema, UserLoginResponseSchema, UserResponseSchema,
AdminLogin, AdminResponse, AdminCreateSchema,
BookCreate,BookResponse,OrderCreate, OrderResponse,
DeleteBookRequest, DeleteBookResponse) 
from utils import validate_name, check_password_strength
from typing import List 
from models import User
from hash_service import HashService

hashservice = HashService()
router = APIRouter()

# ----------------------------------User routers--------------------------------
#TODO add delete account
@router.post("/user/register", response_model=UserResponseSchema)
def register_user(user_data: UserCreateSchema, db: Session = Depends(get_db)):
    existing_user_email = get_user_by_email(db, user_data.email)
    if existing_user_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    existing_user_number = get_user_by_number(db, user_data.number)
    if existing_user_number:
        raise HTTPException(status_code=400, detail="Phone number already registered")

    name_error = validate_name(user_data.name)
    if name_error:
        raise HTTPException(status_code=400, detail=name_error)

    password_error = check_password_strength(user_data.password)
    if password_error:
        raise HTTPException(status_code=400, detail=password_error)

    hashed_password = hashservice.hash_password(user_data.password)
    user = create_user(db, user_data.name, user_data.email, user_data.number, hashed_password)
    return user


@router.post("/user/login", response_model=UserLoginResponseSchema)
def login_user(user_data: UserLoginRequestSchema, db: Session = Depends(get_db)):

    user = verify_user_credentials(db, user_data.email, user_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Email or password is incorrect")

    return {"message": "login successful"}

# ----------------------------------Admin router--------------------------------

@router.post("/admin/register", response_model=AdminResponse)
def register_admin(admin_data: AdminCreateSchema, db: Session = Depends(get_db)):
    existing_admin = get_admin_by_username(db, admin_data.username)
    if existing_admin:
        raise HTTPException(status_code=400, detail="Username Taken")

    hashed_password = hashservice.hash_password(admin_data.password)
    admin = create_admin(db, admin_data.username, hashed_password)
    return admin

@router.post("/admin/login", response_model=AdminResponse)
def login_admin(admin_data: AdminLogin, db: Session = Depends(get_db)):
    admin = authenticate_admin(db, admin_data.username, admin_data.password)
    if not admin:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password",
        )
    return {"message": "login successful"}


@router.post("/admin/books/", response_model=BookResponse)
def add_books(book_data:BookCreate, db: Session = Depends(get_db)):
    book = create_book(db, book_data.title, book_data.author, book_data.price, book_data.quantity)
    return book



@router.delete("/admin/delete-books", response_model=DeleteBookResponse)
def delete_books(
    delete_request: DeleteBookRequest,
    db: Session = Depends(get_db)):
    book = get_book_by_id(db, delete_request.book_id)
    delete_book(db, book)
    return {"message": "book deleted successful"}



#------------------------------------------Orders router------------------------------------------

@router.post("/users/orders/", response_model=OrderResponse)
def create_new_order(order_data: OrderCreate, db: Session = Depends(get_db)):
    
    book = db.query(Book).filter(Book.id == order_data.book_id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    if book.quantity < order_data.quantity:
        raise HTTPException(status_code=400, detail="Not enough stock available")

    
    total_price = book.price * order_data.quantity

    
    new_order = Order(
        user_id=order_data.user_id,
        book_id=order_data.book_id,
        quantity=order_data.quantity,
        total_price=total_price
    )
    
    try:
        db.add(new_order)
        db.commit()
        db.refresh(new_order)
        return new_order  
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create order")


@router.get("/orders/{user_id}", response_model=List[OrderResponse])
def get_orders(user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    orders = get_orders(user_id, db)
    
    if not orders:
        raise HTTPException(status_code=404, detail="No orders found for this user")
    
    return orders

#----------------------------------------Admin Report router------------------------------------------

