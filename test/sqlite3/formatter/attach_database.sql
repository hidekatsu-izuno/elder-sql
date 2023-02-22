ATTACH DATABASE ':memory:' AS mem_db;

ATTACH DATABASE 'new_database.db' AS new_db;

ATTACH DATABASE CONCAT('new_database', '.db') AS new_db;

ATTACH DATABASE ('database_' || strftime('%Y%m%d', 'now') || '.db') AS new_db;

ATTACH 'new_database.db' AS new_db;

ATTACH 'database_' || '.db' AS new_db;

