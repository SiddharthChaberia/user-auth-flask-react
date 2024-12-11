from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
from dotenv import load_dotenv
import os
from flask_cors import CORS

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', '1234567890abcdefghijk') 
CORS(app)

jwt = JWTManager(app)

db_config = {
    'host': '127.0.0.1',
    'user': 'root',
    'password': '1234',
    'database': 'simple_login_auth_db',
    'port': 3306
}

def connect_to_mysql():
    try:
        return mysql.connector.connect(**db_config)
    except mysql.connector.Error as e:
        print(f"Database Error: {e}")
        return None

# Register endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    u_name, email, password = data['u_name'], data['email'], data['password']
    hashed_password = generate_password_hash(password)

    connection = connect_to_mysql()
    if connection is None:
        return jsonify({'error': 'Database connection failed'}), 500

    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
        if cursor.fetchone():
            return jsonify({'error': 'Email already exists'}), 400
        cursor.execute("INSERT INTO users (user_name, email, pwd) VALUES (%s, %s, %s)", (u_name, email, hashed_password))
        connection.commit()
        return jsonify({'message': 'User registered successfully', 'user': {'id': u_name, 'email': email}}), 201
    except mysql.connector.Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email, password = data['email'], data['password']

    connection = connect_to_mysql()
    if connection is None:
        return jsonify({'error': 'Database connection failed'}), 500

    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
        user = cursor.fetchone()
        if user and check_password_hash(user['pwd'], password):
            token = create_access_token(identity={'u_name': user['user_name'],'email': email})
            return jsonify({'token': token, 'user': {'id': user['user_id'], 'email': user['email']}}), 200
        return jsonify({'error': 'Invalid credentials'}), 401
    except mysql.connector.Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

# Protected route
@app.route('/greet', methods=['GET'])
@jwt_required()
def greet_user():
    identity = get_jwt_identity()
    return jsonify({'message': f"Hello, {identity['u_name']}!"}), 200

if __name__ == "__main__":
    app.run(debug=True, port = 5000)
