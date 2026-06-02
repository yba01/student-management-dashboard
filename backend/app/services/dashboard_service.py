from database.connection import connect
import database.board_queries as qr
from psycopg.rows import dict_row

def get_statistics():
    return {
        "total":get_total_student(),
        "sources":get_total_by_source(),
        "archives":get_archived_student()
    }

def get_total_student():
     with connect('schooldb') as con:
        if con != None :
            with con.cursor(row_factory = dict_row) as cur:
                qr.total_student(cur)
                total = cur.fetchone()
                return total['total']


def get_total_by_source():
    with connect('schooldb') as con:
        if con != None :
            with con.cursor(row_factory = dict_row) as cur:

                qr.total_by_source(cur)
                db = cur.fetchall()

                return db


def get_archived_student():
    with connect('schooldb') as con:
        if con != None :
            with con.cursor(row_factory = dict_row) as cur:

                qr.total_archived(cur)
                archived = cur.fetchone()


                return archived["archives"]

def classe_aggregation():
    with connect('schooldb') as con:
        if con != None :
            with con.cursor(row_factory = dict_row) as cur:

                qr.classe_aggreg(cur)
                classes = cur.fetchall()

                return classes

def get_best_ten():
   with connect('schooldb') as con:
        if con != None :
            with con.cursor(row_factory = dict_row) as cur:

                qr.first_ten(cur)
                bests = cur.fetchall()

                return bests
