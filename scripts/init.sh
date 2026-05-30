cp "./sql/schema.sql" /tmp/
sudo -u postgres psql -d schooldb -f /tmp/schema.sql
