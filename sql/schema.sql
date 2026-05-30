-- database: :memory:
CREATE TYPE data_source AS ENUM ('JSON', 'DB');
CREATE TYPE classe_name AS ENUM (
    '6e A', '6e B', '6e C', '6e D',
    '5e A', '5e B', '5e C', '5e D', 
    '4e A', '4e B', '4e C', '4e D', 
    '3e A', '3e B', '3e C', '3e D'
);

CREATE TABLE IF NOT EXISTS etudiant(
    numero VARCHAR(7) PRIMARY KEY,
    code VARCHAR(6) NOT NULL, 
    prenom VARCHAR(100) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    date_naissance DATE,
    classe classe_name NOT NULL,
    archived BOOLEAN NOT NULL DEFAULT FALSE,
    datasource data_source NOT NULL
);


CREATE TYPE categorie_note AS ENUM ('devoir', 'examen');
CREATE TYPE matiere_name AS ENUM ('math', 'pc', 'svt', 'hg', 'fr', 'ang');

CREATE TABLE IF NOT EXISTS note(
    id_note SERIAL PRIMARY KEY,
    numero VARCHAR(7) NOT NULL REFERENCES etudiant(numero) ON DELETE CASCADE,
    matiere matiere_name NOT NULL, 
    categorie categorie_note NOT NULL,
    ordre_devoir INTEGER,
    valeur NUMERIC(4, 2) NOT NULL,

    CONSTRAINT check_ordre_devoir
    CHECK(
        (categorie = 'devoir' AND ordre_devoir IS NOT NULL)
        OR
        (categorie = 'examen' AND ordre_devoir IS NULL)
    )
);

-- Un seul examen par étudiant et matière
CREATE UNIQUE INDEX unique_examen
ON note(numero, matiere)
WHERE categorie = 'examen';

-- Un numéro de devoir unique par étudiant et matière
CREATE UNIQUE INDEX unique_devoir
ON note(numero, matiere, ordre_devoir)
WHERE categorie = 'devoir';

