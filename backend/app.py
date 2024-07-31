from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# needed for session management
app.config['SECRET_KEY'] = 'your_secret_key'  
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

# token for expiration
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=5)

db = SQLAlchemy(app)
jwt = JWTManager(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# route to register a user 
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = User(name=data['name'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created'}), 201

# route for user to login 
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login failed, check your email and password'}), 401
    
    access_token = create_access_token(identity={'id' : user.id, 'email' : user.email})
    return jsonify(access_token=access_token), 200

# route to get user details
@app.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user['id']).first()
    if user:
        return jsonify({'name' : user.name, 'email': user.email}), 200
    return jsonify({'message' : 'User not found'}), 404


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

# route to logout the current user
@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # Optional: Blacklist the token if necessary
    jti = get_jwt_identity()
    # Implement token blacklisting logic here if needed
    return jsonify({"message": "Logout successful"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')
