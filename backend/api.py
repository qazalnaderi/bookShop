import logging
from hash_service import HashService
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from crud import (get_user_by_email, create_user, verify_user_credentials,
                  delete_book_from_db, get_user_by_email, get_user_by_id, create_user, verify_user_credentials,
                  get_admin_by_username, authenticate_admin, create_admin, get_book_by_title, get_book_by_id,
                  create_book, update_book_quantity_by_id, create_order, get_orders_by_user_id, update_book_quantity_after_order)
from fastapi.staticfiles import StaticFiles

from database import get_db
from schema import (UserCreateSchema, UserLoginRequestSchema, UserLoginResponseSchema, UserResponseSchema,
                    AdminLogin, AdminResponse, AdminCreateSchema,
                    BookCreate, BookResponse, OrderCreate, OrderResponse, quantityChangeResponse, quantityChangeRequest,
                    DeleteBookResponse, AdminOrderView, ShowAllResponse, BookDetail)
from utils import validate_name, check_password_strength, validate_email
from typing import List
from models import Order, Book
from fastapi import UploadFile, File, Form
from pathlib import Path
import time
import os

from token import create_access_token

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

hashservice = HashService()
router = APIRouter()

# ----------------------------------User routers--------------------------------


@router.post("/user/register", response_model=UserResponseSchema)
def register_user(user_data: UserCreateSchema, db: Session = Depends(get_db)):
    existing_user_email = get_user_by_email(db, user_data.email)
    if existing_user_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    name_error = validate_name(user_data.name)
    if name_error:
        raise HTTPException(status_code=400, detail=name_error)

    password_error = check_password_strength(user_data.password)
    if password_error:
        raise HTTPException(status_code=400, detail=password_error)

    email_error = validate_email(user_data.email)
    if password_error:
        raise HTTPException(status_code=400, detail=email_error)

    hashed_password = hashservice.hash_password(user_data.password)
    user = create_user(db, user_data.name, user_data.email, hashed_password)

    return UserResponseSchema.from_orm(user)


@router.post("/user/login")
def login_user(user_data: UserLoginRequestSchema, db: Session = Depends(get_db)):

    user = verify_user_credentials(db, user_data.email, user_data.password)
    if not user:
        raise HTTPException(
            status_code=400, detail="Email or password is incorrect")

    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

# ----------------------------------Admin router--------------------------------


@router.post("/admin/register", response_model=AdminResponse)
def register_admin(admin_data: AdminCreateSchema, db: Session = Depends(get_db)):
    existing_admin = get_admin_by_username(db, admin_data.username)
    if existing_admin:
        raise HTTPException(status_code=400, detail="Username Taken")

    # hashed_password = hashservice.hash_password(admin_data.password)
    admin = create_admin(db, admin_data.username, admin_data.password)
    return AdminResponse(username=admin_data.username, messege="Admin created")


@router.post("/admin/login")
def login_admin(admin: AdminLogin, db: Session = Depends(get_db)):
    admin = authenticate_admin(db, admin.username, admin.password)
    if not admin:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password",
        )
    token = create_access_token(data={"sub": admin.username})
    return {"access_token": token, "token_type": "bearer"}


@router.post("/admin/add_book/", response_model=BookResponse)
async def add_books(
    title: str = Form(...),
    author: str = Form(...),
    price: float = Form(...),
    description: str = Form(...),
    category: str = Form(...),

    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        file_name = f"{int(time.time())}_{image.filename}"
        file_path = f"uploads/{file_name}"

        if not os.path.exists("uploads"):
            os.makedirs("uploads")

        with open(file_path, "wb") as buffer:
            content = await image.read()
            buffer.write(content)

        book = create_book(
            db=db,
            title=title,
            author=author,
            price=price,
            category=category,
            description=description,
            image=file_name
        )

        return book

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# @router.get("/admin/all_orders", response_model=List[AdminOrderView])
# def get_all_orders_for_admin(db: Session = Depends(get_db)):
#     orders = db.query(Order).join(Book, Order.book_id == Book.book_id).all()

#     if not orders:
#         raise HTTPException(status_code=404, detail="No orders found")

#     result = [
#         AdminOrderView(
#             book_title=order.book.title,
#             user_id=order.user_id
#         ) for order in orders
#     ]
#     return result
# #------------------------------------------Orders router------------------------------------------

@router.post("/user/orders", response_model=OrderResponse)
def create_book_order(order_data: OrderCreate, db: Session = Depends(get_db)):
    db_book = get_book_by_title(db, title=order_data.book_title)
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found")

    if order_data.quantity <= 0:
        raise HTTPException(
            status_code=400, detail="Quantity must be greater than zero")

    try:
        update_book_quantity_after_order(
            db, book_title=order_data.book_title, ordered_quantity=order_data.quantity
        )
    except HTTPException as e:
        raise e

    total_price = db_book.price * order_data.quantity

    db_order = create_order(
        db,
        user_id=order_data.user_id,
        book_id=db_book.book_id,
        quantity=order_data.quantity,
        total_price=total_price
    )

    return {
        "order_id": db_order.order_id,
        "user_id": db_order.user_id,
        "book_title": db_book.title,
        "quantity": db_order.quantity,
        "total_price": db_order.total_price,
        "order_date": db_order.order_date,
    }


@router.get("/admin/orders/{user_id}", response_model=List[OrderResponse])
def get_orders(user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    orders = get_orders_by_user_id(db, user_id)

    if not orders:
        raise HTTPException(
            status_code=404, detail="No orders found for this user")

    return [OrderResponse(
        order_id=order.order_id,
        user_id=order.user_id,
        book_title=order.book.title,
        quantity=order.quantity,
        total_price=order.total_price,
        order_date=order.order_date
    ) for order in orders]


# @router.post("/admin/change-quantity", response_model=quantityChangeResponse)
# def change_quantity(quantity_change: quantityChangeRequest, db: Session = Depends(get_db)):
#     book = get_book_by_id(db, quantity_change.book_id)
#     if not book:
#         raise HTTPException(status_code=404, detail="Book not found")
#     if quantity_change.new_quantity < 0:
#         raise HTTPException(status_code=400, detail="Quantity cannot be negative")
#     updated_book = update_book_quantity_by_id(db, book.book_id, quantity_change.new_quantity)
#     return quantityChangeResponse(
#         book_id=updated_book.book_id,
#         updated_quantity=updated_book.quantity
#     )

@router.delete("/admin/delete-books", response_model=DeleteBookResponse)
def delete_book(
        book_id: int,
        db: Session = Depends(get_db)):
    try:
        logging.info(f"Received delete request for book ID: {book_id}")

        book = get_book_by_id(db, book_id)
        if not book:
            logging.warning(f"Book not found: {book_id}")
            raise HTTPException(status_code=404, detail="Book not found")

        delete_book_from_db(db, book_id)

        logging.info(f"Successfully deleted book: {book_id}")

        return {"message": "Book deleted successfully"}

    except Exception as e:
        logging.error(f"Error deleting book: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/admin/show_all_books_details", response_model=List[ShowAllResponse])
def get_all_books(db: Session = Depends(get_db)):
    books = db.query(Book).all()
    return books


@router.get("/books/{book_id}", response_model=BookDetail)
def get_book(book_id: int, db: Session = Depends(get_db)) -> BookDetail:
    book = get_book_by_id(db, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    book_data = BookDetail.from_orm(book)

    if book.image:
        book_data.image = f"/uploads/{book.image}"

    return book_data
