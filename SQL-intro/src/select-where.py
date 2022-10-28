import mysql.connector
from time import time

mydb = mysql.connector.connect(
  host="4.tcp.eu.ngrok.io",
  port="18754",
  user="root",
  password="root",
  database="mysql"
);

mycursor = mydb.cursor()

tic = time()
mycursor.execute("""
  SELECT * FROM users
  WHERE age BETWEEN 50 AND 60
  AND favorite_color = 'yellow'
  AND favorite_genre = 'Pop';
""")
toc = time()

myresult = mycursor.fetchall()

for x in myresult:
  print(x)

print(f'Execution time: {toc - tic} ms')