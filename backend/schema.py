from pydantic import BaseModel
from typing import List, Optional
from pydantic import BaseModel, ConfigDict

class UserCreateSchema(BaseModel):
    name: str
    email: str
    number: str
    password: str

class UserResponseSchema(BaseModel):
    id: int
    name: str
    email: str
    number: str

    model_config = ConfigDict(from_attributes=True)




class UserLoginRequestSchema(BaseModel):
    email: str
    password: str


class UserLoginResponseSchema(BaseModel):
    message: str