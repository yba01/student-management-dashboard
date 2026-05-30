import psycopg

def connect(db):
    try:
        conn  = psycopg.connect(
            host = "localhost",
            dbname = db,
            port = 5432,
            user = "postgres",
            password = "adamaba"
        )
        return conn
    except Exception as e:
        print("Erreur de connection : ", e)
        return None
