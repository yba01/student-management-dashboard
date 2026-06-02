from database.connection import connect
import database.queries as qr
from utils.json_loader import load_json
from psycopg.rows import dict_row

def create_student(student):
    with connect('schooldb') as con:
        if con != None :
            with con.cursor() as cur:
                qr.create_student(cur, student.numero, student.code, student.prenom, student.nom, student.dates, student.classe, 'DB')
                con.commit()


def create_students_with_note():
    data = load_json("data/valid.json")
    for student in data:
        create_student_with_note(student, 'JSON')


def create_student_with_note(student, source):
    with connect('schooldb') as con:
        if con != None :
            with con.cursor() as cur:
                try:
                    qr.create_student(cur, student["numero"], student["code"], student["prenom"], student["nom"], student["date"], student["classe"], source)
                    qr.create_all_note(cur, student["numero"], student["note"])
                    con.commit()
                except Exception as e:
                    con.rollback()
                    print(e)

       

def get_students_from_db(page, limit, numero, nom, code, classe, source):
    with connect('schooldb') as con:
        if con != None :
            with con.cursor(row_factory = dict_row) as cur:
                qr.get_students(cur, page, limit, numero, nom, code, classe, source)
                students = cur.fetchall()

                return {
                    "page":page, 
                    "limit":limit,
                    "data":students
                }
    
        

def get_single_student_from_db(numero):
     with connect('schooldb') as con:
        if con != None :
            with con.cursor(row_factory = dict_row) as cur:
                qr.get_student(cur, numero)
                student = cur.fetchone()
                return student
            

def archive_student(numero):
    with connect('schooldb') as con:
        if con != None :
            with con.cursor() as cur:
                qr.archive_student(cur, numero)
                con.commit()

                return cur.rowcount


def restore_student(numero):
    with connect('schooldb') as con:
        if con != None :
            with con.cursor() as cur:
                qr.restore_student(cur, numero)
                con.commit()

                return cur.rowcount


def update_student(numero, student):
   with connect('schooldb') as con:
        if con != None :
            with con.cursor() as cur:
                qr.update_student(cur, numero, student)
                con.commit()

                return cur.rowcount