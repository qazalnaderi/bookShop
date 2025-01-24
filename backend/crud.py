from sqlalchemy.orm import Session
from models import User, Book, Admin,Order
from fastapi import HTTPException
from typing import Optional

from hash_service import HashService
hash_service = HashService()

# ----------------------------------User crud--------------------------------

def create_user(db: Session, name: str, email: str, password: str):
    # hashed_password = hash_service.hash_password(password)

    db_user = User(
        name=name,
        email=email,
        password=password,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, id: int):
    return db.query(User).filter(User.user_id == id).first()




def verify_user_credentials(db: Session, email: str, password: str):
    user =  get_user_by_email(db, email)
    
    if not user or not hash_service.verify_password(password, user.password):
        return None
    return user


#----------------------------------Book crud--------------------------------
def create_book(db: Session,title, author, price, category ,description,image: Optional[str] = None,):
    db_book = Book(
        title=title,
        author=author,
        price=price,
        image=image,
        category=category,
        description=description

    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def get_books(db: Session):
    return db.query(Book).all()

def get_book_by_id(db: Session, book_id: int):
    return db.query(Book).filter(Book.book_id == book_id).first()

def get_book_by_title(db: Session, title: str):
    return db.query(Book).filter(Book.title == title).first()

def update_book_quantity_by_id(db: Session, book_id: int, new_quantity: int):
    db_book = db.query(Book).filter(Book.book_id == book_id).first()
    if db_book:
        db_book.quantity = new_quantity
        db.commit()
        db.refresh(db_book)
        return db_book
    return None

def delete_book_from_db(db: Session, book_id: int):
    db_book = db.query(Book).filter(Book.book_id == book_id).first()
    if db_book:
        db.delete(db_book)
        db.commit()
    return db_book


#----------------------------------------Admin crud-----------------------
def create_admin(db: Session, username: str, password: str):
    # hashed_password = hash_service.hash_password(password)

    db_admin = Admin(
        username=username,
        password=password,
    )

    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)

    return db_admin
def get_admin_by_username(db: Session, username: str):
    return db.query(Admin).filter(Admin.username == username).first()

def authenticate_admin(db: Session, username: str, password: str):
    admin = get_admin_by_username(db, username)

    if not admin or password != admin.password:  
        return None
    return admin
#--------------------------------------Order crud------------------------------------

def create_order(db: Session, user_id: int, book_id: int, quantity: int, total_price: float):
    new_order = Order(user_id=user_id, book_id=book_id, quantity=quantity, total_price=total_price)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order
    

def update_book_quantity_after_order(db: Session, book_title: str, ordered_quantity: int):

    db_book = db.query(Book).filter(Book.title == book_title).first()

    if not db_book:
        raise HTTPException(status_code=400, detail="Book not found")

    # if db_book.quantity < ordered_quantity:
    #     raise HTTPException(status_code=400, detail="Not enough quantity available")

    # db_book.quantity -= ordered_quantity
    db.commit()
    db.refresh(db_book)

    return db_book

    


def get_orders_by_user_id(db: Session, user_id: int = None):
    return db.query(Order).filter(Order.user_id == user_id).all()