
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
        "SELECT numero, code, prenom, nom, date_naissance date, datasource source, classe FROM etudiant WHERE numero = %s",
        (numero,)
    )

def get_students(cur, page, limit, numero, nom, code, classe, source):
    params = []
    query = """
        SELECT numero, code, prenom, nom, date_naissance date, datasource source, classe, archived
        FROM etudiant
    """
        # WHERE archived = FALSE

    conditions = []

    if nom:
        conditions.append("(LOWER(nom) LIKE LOWER(%s) OR LOWER(prenom) LIKE LOWER(%s))")
        params.extend([f"{nom}%"] * 2)

    if numero:
        conditions.append("LOWER(numero) LIKE %s")
        params.append(f'{numero}%')

    if code:
        conditions.append("LOWER(code) LIKE %s")
        params.append(f'{code}%')

    if classe:
        conditions.append("classe = %s")
        params.append(classe)
         
    if source :
        conditions.append("datasource = %s")
        params.append(source)

    if conditions:
        query += " WHERE (" + " OR ".join(conditions) + ")"



    if page and limit:
        # Pagination
        query += " ORDER BY datasource DESC, prenom, nom"
        query += " LIMIT %s OFFSET %s"

        offset = (page - 1) * limit
        params.extend([limit, offset])
        

    if params:
        cur.execute(query, params)
    else:
        cur.execute(query)



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