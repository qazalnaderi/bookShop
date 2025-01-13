from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL
DATABASE_URL = "postgresql://postgres:admin@localhost/bookshop"

# Create Engine
engine = create_engine(DATABASE_URL, echo=True)

# Create Session Factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarative Base
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
