import os
import psycopg

from dotenv import load_dotenv

load_dotenv()

def connect():
    try:
        conn  = psycopg.connect(
            host = os.getenv("DB_HOST"),
            dbname = os.getenv("DB_NAME"),
            port = os.getenv("DB_PORT"),
            user = os.getenv("DB_USER"),
            password = os.getenv("DB_PASSWORD")
        )
        return conn
    except Exception as e:
        print("Erreur de connection : ", e)
        return None
