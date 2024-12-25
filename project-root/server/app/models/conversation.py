from sqlalchemy import Column, Integer, String, Enum, DateTime
from datetime import datetime
from .chat_mode import ChatMode
from ..database import Base

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    mode = Column(Enum(ChatMode), default=ChatMode.GENERAL)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow) 