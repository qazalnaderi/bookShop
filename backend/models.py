from sqlalchemy import Column, Integer, String, BigInteger, DateTime, Float, func, ForeignKey, Numeric, Text
from database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True ,autoincrement=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(Text, nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    orders = relationship("Order", back_populates="user")


# -----------------------------------------------------------------
class Admin(Base):
    __tablename__ = "admins"

    admin_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    password = Column(Text, nullable=False)


class Book(Base):
    __tablename__ = "books"

    book_id = Column(Integer, primary_key=True, index=True ,autoincrement=True)
    title = Column(String, index=True, nullable=False)
    author = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    image = Column(String, nullable=True) 
    category = Column(String, nullable=False)
    description = Column(String, nullable=False)
           
    

    orders = relationship("Order", back_populates="book") 

class Order(Base):
    __tablename__ = "orders"

    order_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    book_id = Column(Integer, ForeignKey("books.book_id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Numeric(10, 2), nullable=False)
    order_date = Column(DateTime, server_default=func.now(), nullable=False)

    user = relationship("User", back_populates="orders")
    book = relationship("Book", back_populates="orders")