from models import db, User
from werkzeug.security import generate_password_hash
from app import create_app
 

def seed_users():
    # initial users
    initial_users = [
        {'name': 'Alice', 'email': 'alice@gmail.com', 'password': 'password'},
        {'name': 'Odiedo', 'email': 'charlie@gmail.com', 'password': 'password'}
    ]

    for user_data in initial_users:
        hashed_password = generate_password_hash(user_data['password'], method='pbkdf2:sha256')
        user = User(name=user_data['name'], email=user_data['email'], password=hashed_password)
        db.session.add(user)

    db.session.commit()

# def seed_locations():
#     #entry location
#     initial_location = [
#         { 'ward': 'malaba_central', 'location': 'akadetewai', 'sub_location': 'olobai' }
#         { 'ward': 'malaba_north', 'location': 'amoni', 'sub_location': 'amoni' }
#     ]
    
#     for location_data in initial_location:
        

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        # ensure all tables are created
        db.create_all()
        # seeds the database with initial users
        seed_users()   
        print("Database seeded!")
