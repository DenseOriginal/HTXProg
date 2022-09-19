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
mycursor.execute("""
  SELECT * FROM users
  WHERE age > 50 AND age < 60
  AND favorite_color = 'yellow'
  AND favorite_genre = 'Pop';
""")
toc = time()

myresult = mycursor.fetchall()

for x in myresult:
  print(x)

print(f'Execution time: {toc - tic} ms')