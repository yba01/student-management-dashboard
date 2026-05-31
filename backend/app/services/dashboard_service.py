from database.connection import connect
import database.board_queries as qr

def get_statistics():
    return {
        "total" : get_total_student(),
        "db" : get_student_from_db(),
        "json" : get_student_from_json(),
        "archives" : get_archived_student()
    }

def get_total_student():
    con = connect('schooldb')
    if con != None :
        cur = con.cursor()
        qr.total_student(cur)
        total = cur.fetchone()

        cur.close()
        con.close()

        return total[0]

def get_student_from_db():
    con = connect('schooldb')
    if con != None :
        cur = con.cursor()

        qr.total_from_db(cur)
        db = cur.fetchone()

        cur.close()
        con.close()

        return db[0]

def get_student_from_json():
    con = connect('schooldb')
    if con != None :
        cur = con.cursor()

        qr.total_from_json(cur)
        json = cur.fetchone()


        cur.close()
        con.close()

        return json[0]

def get_archived_student():
    con = connect('schooldb')
    if con != None :
        cur = con.cursor()

        qr.total_archived(cur)
        archived = cur.fetchone()

        cur.close()
        con.close()

        return archived[0]

def classe_aggregation():
    con = connect('schooldb')
    if con != None :
        cur = con.cursor()

        qr.classe_aggreg(cur)
        classes = cur.fetchall()

        cur.close()
        con.close()

        return classes

def get_best_ten():
    con = connect('schooldb')
    if con != None :
        cur = con.cursor()

        qr.first_ten(cur)
        bests = cur.fetchall()

        cur.close()
        con.close()

        return bests
