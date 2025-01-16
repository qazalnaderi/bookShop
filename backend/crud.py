from sqlalchemy.orm import Session
from models import User, Book, Admin, Order

from hash_service import HashService
hash_service = HashService()

# ----------------------------------User crud--------------------------------

def create_user(db: Session, name: str, email: str, number: str, password: str):

    db_user = User(
        name=name,
        email=email,
        number=number,
        password=password,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, id: int):
    return db.query(User).filter(User.id == id).first()

def get_user_by_number(db: Session, number: str):
    return db.query(User).filter(User.number == number).first()

def verify_user_credentials(db: Session, email: str, password: str):
    user =  get_user_by_email(db, email)
    
    if not user or not hash_service.verify_password(password, user.password):
        return None
    return user

# ----------------------------------Book crud--------------------------------
def create_book(db: Session,title, author, price, quantity):
    db_book = Book(
        title=title,
        author=author,
        price=price,
        quantity=quantity
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def get_books(db: Session):
    return db.query(Book).all()

def get_book_by_id(db: Session, book_id: int):
    return db.query(Book).filter(Book.id == book_id).first()

def update_book_quantity(db: Session, book_id: int, new_quantity: int):
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book:
        db_book.quantity = new_quantity
        db.commit()
        db.refresh(db_book)
        return db_book
    return None


def delete_book(db: Session, book):
    db.delete(book)
#----------------------------------------
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

    if not admin or not hash_service.verify_password(password, admin.password):  
        return None
    return admin
#--------------------------------------

def create_order_with_quantity_check(db: Session,book_title, quantity, user_id: int):
    book = db.query(Book).filter(Book.title == order.book_title).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    if book.quantity < quantity: 
        raise HTTPException(
            status_code=400,
            detail=f"Only {book.quantity} copies of '{book.title}' are available"
        )
    
    total_price = book.price *quantity

    book.quantity -= quantity
    db.add(book)
    db_order = Order(
        user_id=user_id,
        book_id=book_id,
        quantity=quantity,
        total_price=total_price,
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


def get_orders(db: Session, user_id: int = None):
    db.query(Order).filter(Order.user_id == user_id).all()

