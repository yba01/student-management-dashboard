from database.connection import connect
import database.queries as qr
from utils.json_loader import load_json

def create_student(student):
    con = connect('schooldb')
    if con != None :
        cur = con.cursor()
        qr.create_student(cur, student.numero, student.code, student.prenom, student.nom, student.dates, student.classe, 'DB')
        con.commit()

    cur.close()
    con.close()

def create_students_with_note():
    data = load_json("data/valid.json")
    for student in data:
        create_student_with_note(student, 'JSON')

def create_student_with_note(student, source):
    con = connect('schooldb')
    if con != None :
        cur = con.cursor()
        try:
            qr.create_student(cur, student["numero"], student["code"], student["prenom"], student["nom"], student["date"], student["classe"], source)
            qr.create_all_note(cur, student["numero"], student["note"])
            con.commit()
        except Exception as e:
            con.rollback()
            print(e)

        cur.close()
        con.close()

def get_students_from_db(page, limit, search, classe, source):
    con = connect('schooldb')
    if con != None :
        cur = con.cursor()
        qr.get_students(cur, page, limit, search, classe, source)
        students = cur.fetchall()

        cur.close()
        con.close()

        return {
            "page":page, 
            "limit":limit,
            "data":students
        }
    
        

def get_single_student_from_db(numero):
    con = connect('schooldb')
    if con != None :
        cur = con.cursor()
        qr.get_student(cur, numero)
        student = cur.fetchone()
        return student

def archive_student(numero):
    con = connect('schooldb')
    if con != None :
        cur = con.cursor()
        qr.archive_student(cur, numero)
        con.commit()

        row = cur.rowcount

        cur.close()
        con.close()

        return row

def restore_student(numero):
    con = connect('schooldb')
    if con != None :
        cur = con.cursor()
        qr.restore_student(cur, numero)
        con.commit()

        row = cur.rowcount

        cur.close()
        con.close()

        return row
