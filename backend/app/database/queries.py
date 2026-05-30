
def create_student(cur, numero, code, prenom, nom, date, classe, source):
     cur.execute(
            "INSERT INTO etudiant (numero, code, prenom, nom, date_naissance, classe, datasource) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (numero, code, prenom, nom, date, classe, source)
        )
     
def create_note_devoir(cur, numero, matiere, ordre, value):
        cur.execute(
            "INSERT INTO note (numero, matiere, categorie, ordre_devoir, valeur) VALUES (%s, %s, %s, %s, %s)",
            (numero, matiere, 'devoir', ordre, value)
        )

def create_note_exam(cur, numero, matiere, value):
     cur.execute(
            "INSERT INTO note (numero, matiere, categorie, ordre_devoir, valeur) VALUES (%s, %s, %s, %s, %s)",
            (numero, matiere, 'examen', None, value)
        )

def create_note(cur,numero, matiere, devoirs, examen ):
    for ordre, note in enumerate(devoirs):
        create_note_devoir(cur, numero, matiere, ordre+1, note)
    create_note_exam(cur, numero, matiere, examen)

def create_all_note(cur, numero, notes):
    for note in notes:
        create_note(cur, numero, note["matiere"], note["devoirs"], note["exam"])      

def get_student(cur, numero):
    cur.execute(
        "SELECT * FROM etudiant WHERE numero = %s",
        (numero,)
    )

def get_students(cur, page, limit, search, classe, source):
    params = []
    query = """
        SELECT *
        FROM etudiant
        WHERE archived = FALSE
    """
    if search :
        query += """
            AND (
                LOWER(nom) LIKE LOWER(%s)
                OR LOWER(prenom) LIKE LOWER(%s)
                OR numero LIKE %s
                OR code LIKE %s
            )
        """
        search_term = f"%{search}%"
        params.extend([search_term] * 4)

    if classe:
        query += " AND classe = %s"
        params.append(classe)
         
    if source :
        query += " AND source = %s"
        params.append(source)

    # Pagination
    query += " ORDER BY datasource DESC, prenom, nom"
    query += " LIMIT %s OFFSET %s"

    offset = (page - 1) * limit
    params.extend([limit, offset])


    cur.execute(query, params)



def archive_student(cur, numero):
    cur.execute(
        "UPDATE etudiant SET archived = TRUE WHERE numero = %s", 
        (numero,)
    )

def restore_student(cur, numero):
    cur.execute(
        "UPDATE etudiant SET archived = FALSE WHERE numero = %s", 
        (numero,)
    )


def update_student(cur, numero, student):
    fields = []
    values = []

    if student.code is not None:
        fields.append("code = %s")
        values.append(student.code)

    if student.prenom is not None:
        fields.append("prenom = %s")
        values.append(student.prenom)
    
    if student.nom is not None:
        fields.append("nom = %s")
        values.append(student.nom)
    
    if student.dates is not None:
        fields.append("date_naissance = %s")
        values.append(student.dates)

    if student.classe is not None:
        fields.append("classe = %s")
        values.append(student.classe)
    
    if student.datasource is not None:
        fields.append("datasource = %s")
        values.append(student.datasource)

    values.append(numero)

    query = f'UPDATE etudiant SET {", ".join(fields)} WHERE numero = %s'

    cur.execute(query, tuple(values))