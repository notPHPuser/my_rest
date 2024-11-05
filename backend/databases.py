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


if __name__ == '__main__':
    app.run(debug=True)
