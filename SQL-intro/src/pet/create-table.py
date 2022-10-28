import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="test1234",
  database="mysql"
);

mycursor = mydb.cursor()

mycursor.execute("""
  CREATE TABLE pets (
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    animal varchar(50) NOT NULL,
    color varchar(50) NOT NULL,
    owner INT NOT NULL,
    PRIMARY KEY (id)
  );
""")