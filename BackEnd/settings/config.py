from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://postgres:happy@localhost:5432/Bingo-App')

JWT_SECRET_KEY = 'thisismysecretkey'

Base = declarative_base()
DBSession = sessionmaker(bind=engine)
session = DBSession()
