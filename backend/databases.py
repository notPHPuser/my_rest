from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)


def init_db():
    conn = sqlite3.connect('restaurant.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS rolls(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            price TEXT NOT NULL,
            img TEXT NOT NULL,
            type TEXT NOT NULL
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS drinks(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            price TEXT NOT NULL,
            img TEXT NOT NULL
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reservation (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            table_id INTEGER NOT NULL,
            phone TEXT NOT NULL,
            tg TEXT NOT NULL,
            roll_ids TEXT NOT NULL,
            FOREIGN KEY (table_id) REFERENCES tables(id)
        )
    ''')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tables (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            status TEXT NOT NULL,
            phone TEXT,
            tg TEXT
        )
    ''')

    rolls = [
        ('Калифорния', 500, 'https://playbarmaracana.ru/wp-content/uploads/2019/03/4B0A0848.jpg', 'cold'),
        ('Филадельфия', 600, 'https://sushiomsk.com/backend/web/storage/IMG_8875-min.jpg', 'cold'),
        ('Аляска', 800, 'https://суши-рядом.рф/files/products/img_9155.800x600w.jpg?75774c2208a3b6c15fb5c19c67386c5f',
         'cold'),
        ('Ролл с креветками', 500, 'https://шеф-суши.рф/storage/451/rolly-s-krevetkami.jpg', 'cold'),
        ('Танцующий', 600, 'https://playbarmaracana.ru/wp-content/uploads/2019/03/4B0A0837.jpg', 'cold'),
        ('Запеченный ролл', 600, 'https://mylovesushi.ru/wa-data/public/shop/products/14/00/14/images/103/103.720.png',
         'hot'),
        ('Ролл с угрем', 400, 'https://sushivi.ru/wp-content/uploads/2021/07/tempura-ugor--scaled.jpg', 'hot'),
        ('Цыпленок терияки', 700, 'https://vidnoe.crazybrothers.ru/wp-content/uploads/DSC_2808-700x467.jpg', 'hot'),
        ('Бали', 500, 'https://crazybrothers.ru/wp-content/uploads/Gorjachie-rolly-Balli-700x467.jpg', 'hot'),
        ('Хот чикен', 400, 'https://sushivi.ru/wp-content/uploads/2023/10/hot-chiken.jpg', 'hot')
    ]

    drinks = [
        ('чай ассам', 300, 'https://majaro.ru/wa-data/public/shop/products/50/02/250/images/476/476.750.jpg'),
        ('чай жасминовый', 500, 'https://img.freepik.com/premium-photo/glass-cup-tea-black-background_135932-4426.jpg'),
        ('кофе Экспроссо', 400, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ775oUryIK5L_ft_P2oLYeAPdLahAkrozEfA&s')
    ]

    for drink in drinks:
        cursor.execute('INSERT OR IGNORE INTO drinks (name, price, img) VALUES (?, ?, ?)', drink)

    for roll in rolls:
        cursor.execute('INSERT OR IGNORE INTO rolls (name, price, img, type) VALUES (?, ?, ?, ?)', roll)
    # cursor.execute("""
    #     UPDATE rolls
    #     SET img = 'https://cdn.foodpicasso.com/assets/2022/07/05/e8112b92cd6c18effd7d47ada2582923---jpg_1000x_103c0_convert.jpg'
    #     WHERE name = 'Хот чикен';
    # """)
    cursor.execute('''
        UPDATE drinks
        SET img = 'https://img.freepik.com/premium-photo/black-coffee-glass-dark-background_409663-325.jpg'
        WHERE name = 'кофе Экспроссо'
    ''')

    cursor.execute('SELECT COUNT (*) FROM tables')
    if cursor.fetchone()[0] == 0:
        for _ in range(10):
            cursor.execute('INSERT INTO tables (status, phone, tg) VALUES (?, ?, ?)', ('свободен', None, None))
    conn.commit()
    conn.close()


init_db()


@app.route('/rolls/cold', methods=['GET'])
def get_cold_rolls():
    conn = sqlite3.connect('restaurant.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM rolls WHERE type = 'cold'")
    rolls = cursor.fetchall()
    conn.close()
    return jsonify(rolls)


@app.route('/rolls/hot', methods=['GET'])
def get_hot_rolls():
    conn = sqlite3.connect('restaurant.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM rolls WHERE type = 'hot'")
    rolls = cursor.fetchall()
    conn.close()
    return jsonify(rolls)


@app.route('/rolls', methods=['GET'])
def get_all_rolls():
    conn = sqlite3.connect('restaurant.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM rolls")
    rolls = cursor.fetchall()
    conn.close()
    return jsonify(rolls)


@app.route('/drinks', methods=['GET'])
def get_drinks():
    conn = sqlite3.connect('restaurant.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM drinks')
    drinks = cursor.fetchall()
    conn.close()
    return jsonify(drinks)


@app.route('/reserve', methods=['POST'])
def reserve_table():
    phone = request.json.get('phone')
    tg = request.json.get('tg')
    table_id = request.json.get('table_id')
    roll_ids = ','.join(request.json.get('rolls', []))

    conn = sqlite3.connect('restaurant.db')
    cursor = conn.cursor()
    cursor.execute('UPDATE tables SET status = ?, phone = ?, tg = ? WHERE id = ?', ('занят', phone, tg, table_id))
    cursor.execute('INSERT INTO reservation (table_id, phone, tg, roll_ids) VALUES (?, ?, ?, ?)', (table_id, phone, tg, roll_ids))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Table reserved', 'table_id': table_id})


@app.route('/reservations', methods=['GET'])
def get_reservations():
    conn = sqlite3.connect('restaurant.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM reservation')
    reservations = cursor.fetchall()

    reservations_list = []
    cursor.execute('SELECT * FROM rolls')
    all_rolls = {str(row[0]): row[1] for row in cursor.fetchall()}

    for reservation in reservations:
        table_id, phone, tg, roll_ids = reservation[1], reservation[2], reservation[3], reservation[4]
        roll_names = [all_rolls[roll_id] for roll_id in roll_ids.split(',') if roll_id in all_rolls]
        reservations_list.append({
            'phone': phone,
            'tg': tg,
            'rolls': roll_names,
            'table_id': table_id
        })
    conn.close()
    return jsonify(reservations_list)


if __name__ == '__main__':
    app.run(debug=True)
