from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from pydantic import BaseModel, ConfigDict
from datetime import datetime

# ----------------------------------User schema--------------------------------

class UserCreateSchema(BaseModel):
    name: str
    email: str
    number: int
    password: str

class UserResponseSchema(BaseModel):
    name: str
    email: str
    number: int 

    model_config = ConfigDict(from_attributes=True)


class UserLoginRequestSchema(BaseModel):
    email: str
    password: str


class UserLoginResponseSchema(BaseModel):
    message: str


# ----------------------------------Book schema--------------------------------
class BookCreate(BaseModel):
    title: str
    author: str
    price: float
    quantity: int

class BookResponse(BookCreate):
    title: str
    author: str
    price: float

    model_config = ConfigDict(from_attributes=True)

class DeleteBookResponse(BaseModel):
    message: str

class DeleteBookRequest(BaseModel):
    book_id: int
# ----------------------------------Admin schema--------------------------------
class AdminCreateSchema(BaseModel):
    username: str
    password: str

class AdminBase(BaseModel):
    username: str

class AdminLogin(AdminBase):
    password: str

class AdminResponse(BaseModel):
    message: str

    model_config = ConfigDict(from_attributes=True)


# ----------------------------------Order schema--------------------------------
class OrderBase(BaseModel):
    user_id: int
    book_id: int
    quantity: int

class OrderCreate(BaseModel):
    book_title: str
    quantity: int

class OrderResponse(OrderBase):
    order_id: int
    total_price: float
    order_date: datetime

    model_config = ConfigDict(from_attributes=True)