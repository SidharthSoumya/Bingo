from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from passlib.apps import custom_app_context as pwd_context

# from models.role_model import Role
from settings.config import Base, engine

class Player(Base):
    __tablename__ = 'player'

    name = Column(String(80), nullable = False)
    email_id = Column(String(60), unique=True, nullable = False)
    mobile_number = Column(String(20), unique=True, nullable=False)
    password_hash = Column(String(128))
    id = Column(Integer, primary_key = True)
    isOnline = Column(Integer, nullable=False)
    profile_img = Column(String(200))
    
    def hash_password(self, password):
        self.password_hash = pwd_context.hash(password)
    
    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    
    @property
    def serialize(self):
       """Return object data in easily serializeable format"""
       return {
           'id': self.id,
           'name': self.name,
           'email_id': self.email_id,
           'mobile_number': self.mobile_number
       }
# Role.user = relationship("User", order_by=Role.id, back_populates="role")
# Create DB
Base.metadata.create_all(engine)