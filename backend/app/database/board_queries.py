def total_student(cur):
    cur.execute(
        "SELECT COUNT(numero) FROM etudiant"
    )

def total_from_db(cur):
    cur.execute(
        "SELECT COUNT(numero) FROM etudiant WHERE datasource = 'DB'"
    )

def total_from_json(cur):
    cur.execute(
        "SELECT COUNT(numero) FROM etudiant WHERE datasource = 'JSON'"
    )

def total_archived(cur):
    cur.execute(
        "SELECT COUNT(numero) FROM etudiant WHERE archived = TRUE"
    )

def total_by_classe(cur):
    cur.execute(
        "SELECT classe, COUNT(numero) FROM etudiant GROUP BY classe"
    )

def total_by_source(cur):
    cur.execute(
        "SELECT source, COUNT(numero) FROM etudiant GROUP BY datasource"
    )

def classe_aggreg(cur):
    cur.execute(
        """
            WITH notes_matiere AS (
                SELECT
                    numero,
                    matiere,
                    (
                        AVG(valeur) FILTER (WHERE categorie = 'devoir')
                        + 2 * AVG(valeur) FILTER (WHERE categorie = 'examen')
                    ) / 3 AS moyenne_matiere
                FROM note
                GROUP BY numero, matiere
            ),
            moyenne_generale AS (
                SELECT 
                    numero,
                    AVG(moyenne_matiere) AS mean
                FROM notes_matiere 
                GROUP BY numero
            )

            SELECT e.classe, COUNT(e.numero) effectif, ROUND(AVG(m.mean), 2) moyenne
            FROM etudiant e JOIN moyenne_generale m ON e.numero = m.numero
            GROUP BY e.classe
            ORDER BY e.classe DESC
        """
    )

def first_ten(cur):
    cur.execute(
        """
            WITH notes_matiere AS (
                SELECT
                    numero,
                    matiere,
                    (
                        AVG(valeur) FILTER (WHERE categorie = 'devoir')
                        + 2 * AVG(valeur) FILTER (WHERE categorie = 'examen')
                    ) / 3 AS moyenne_matiere
                FROM note
                GROUP BY numero, matiere
            ),
            moyenne_generale AS (
                SELECT 
                    numero,
                    AVG(moyenne_matiere) AS mean
                FROM notes_matiere 
                GROUP BY numero
            )

            SELECT e.numero, e.code, e.prenom, e.nom, e.date_naissance, e.classe, ROUND(m.mean, 2) AS moyenne
            FROM etudiant e JOIN moyenne_generale m ON e.numero = m.numero
            ORDER BY moyenne DESC
            LIMIT 10
        """
    )