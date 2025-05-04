FROM mysql:8.4.3

# copy initializing script for databse
COPY database_1_initialization.sql /docker-entrypoint-initdb.d/
COPY database_2_functions.sql /docker-entrypoint-initdb.d/
COPY database_3_inserts.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
