# sudo psql -U postgres -d schooldb -c "
# TRUNCATE TABLE
# etudiant,
# note,
# RESTART IDENTITY CASCADE;
# "

sudo -u postgres psql -d schooldb -c "
TRUNCATE TABLE
etudiant,
note
RESTART IDENTITY CASCADE;
"