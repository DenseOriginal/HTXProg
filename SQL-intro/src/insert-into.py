import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="test1234",
  database="mysql"
);

mycursor = mydb.cursor()

mycursor.execute("""
  INSERT INTO users (
    `first_name`,
    `last_name`,
    `email`,
    `age`,
    `job_title`,
    `favorite_color`,
    `favorite_genre`,
    `favorite_song`
  )
  VALUES (
    'Anders',
    'Kok',
    'example@example.com',
    19,
    'Software Dev',
    'yellow',
    'music',
    'Never gonna give you up'
  )
""")
mydb.commit()