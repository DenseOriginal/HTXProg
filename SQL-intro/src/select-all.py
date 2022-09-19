import mysql.connector
from time import time

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="test1234",
  database="mysql"
);

mycursor = mydb.cursor()

tic = time()
mycursor.execute("SELECT * FROM users")
myresult = mycursor.fetchall()
toc = time()

print(len(myresult))
print(f'Execution time: {toc - tic} ms')