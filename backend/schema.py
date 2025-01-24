from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

# ----------------------------------User schema--------------------------------

class UserCreateSchema(BaseModel):
    name: str
    email: str
    password: str

class UserResponseSchema(BaseModel):
    name: str
    email: str

    class Config:
        orm_mode = True
        from_attributes = True

class UserLoginRequestSchema(BaseModel):
    email: str
    password: str


class UserLoginResponseSchema(BaseModel):
    message: str

    class Config:
        orm_mode = True

# ----------------------------------Book schema--------------------------------
class BookCreate(BaseModel):
    title: str
    author: str
    price: float
    category: str
    description: str

    model_config = ConfigDict(from_attributes=True)


class BookResponse(BookCreate):
    title: str
    author: str
    price: float
    category: str
    image: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

class BookDetail(BaseModel):
    book_id: int
    title: str
    author: str
    price: float
    category: str
    description: str
    image: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)



class DeleteBookResponse(BaseModel):
    message: str

    model_config = ConfigDict(from_attributes=True)





class quantityChangeRequest(BaseModel):
    book_id : int
    new_quantity: int
    model_config = ConfigDict(from_attributes=True)

class quantityChangeResponse(BaseModel):
    book_id : int
    updated_quantity: int
    model_config = ConfigDict(from_attributes=True)

class ShowAllResponse(BaseModel):
    book_id: int
    title: str
    author: str
    price: float
    category: str
    description: str
    image: Optional[str]  

    model_config = ConfigDict(from_attributes=True)
 


# ----------------------------------Admin schema--------------------------------
class AdminCreateSchema(BaseModel):
    username: str
    password: str

class AdminBase(BaseModel):
    username: str

class AdminLogin(AdminBase):
    password: str

class AdminResponse(BaseModel):
    username: str
    message: str
    class Config:
        orm_mode = True
class AdminOrderView(BaseModel):
    book_title: str
    user_id: int
    


# # ----------------------------------Order schema--------------------------------

class OrderCreate(BaseModel):
    book_title: str  
    user_id: int
    quantity: int

class OrderResponse(BaseModel):
    order_id: int
    user_id: int
    book_title: str
    quantity: int
    total_price: float
    order_date: datetime

    class Config:
        orm_mode = True
