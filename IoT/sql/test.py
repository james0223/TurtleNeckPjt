import pymysql

db = pymysql.connect(
    host='i3b109.p.ssafy.io', 
    port=3306, 
    user='b109', 
    passwd='b109', 
    db='test3',
    charset='utf8',
    autocommit=True
)

cursor = db.cursor()

cursor.execute("INSERT INTO accounts_device VALUES (1,26.13,88)")

data = cursor.fetchall()

print(data)

db.close()
