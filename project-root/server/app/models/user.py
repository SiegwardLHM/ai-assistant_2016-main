from sqlalchemy import Column, Integer, String
from app.database import Base

class User(Base):
    __tablename__ = "users"

    username = Column(String(50), primary_key=True)
    password = Column(String(100))