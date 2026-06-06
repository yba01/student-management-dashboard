sudo -u postgres psql -d schooldb -c "
TRUNCATE TABLE
etudiant,
note
RESTART IDENTITY CASCADE;
"