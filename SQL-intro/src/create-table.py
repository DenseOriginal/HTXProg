import mysql.connector

mydb = mysql.connector.connect(
  host="4.tcp.eu.ngrok.io",
  port="18754",
  user="root",
  password="root",
  database="mysql"
);

mycursor = mydb.cursor()

mycursor.execute("""
  CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    age INT NOT NULL,
    job_title varchar(255) NOT NULL,
    favorite_color varchar(255) NOT NULL,
    favorite_genre varchar(255) NOT NULL,
    favorite_song varchar(255) NOT NULL,
    PRIMARY KEY (id)
  );
""")