import os
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from flask_migrate import Migrate
from models import db, User, Student, Parent, Attachment

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your_secret_key'
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=5)
    app.config['UPLOAD_FOLDER'] = 'uploads'

    db.init_app(app)
    jwt = JWTManager(app)
    migrate = Migrate(app, db)

    # Ensure upload directory exists
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])

    @app.route('/signup', methods=['POST'])
    def signup():
        data = request.get_json()
        if not data or not 'name' in data or not 'email' in data or not 'password' in data:
            return jsonify({'message': 'Invalid input'}), 400
        
        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
        new_user = User(name=data['name'], email=data['email'], password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created'}), 201

    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if not user or not check_password_hash(user.password, data['password']):
            return jsonify({'message': 'Login failed, check your email and password'}), 401
        
        access_token = create_access_token(identity={'id': user.id, 'email': user.email})
        return jsonify(access_token=access_token), 200

    @app.route('/user', methods=['GET'])
    @jwt_required()
    def get_user():
        current_user = get_jwt_identity()
        user = User.query.filter_by(id=current_user['id']).first()
        if user:
            return jsonify({'name': user.name, 'email': user.email}), 200
        return jsonify({'message': 'User not found'}), 404

    @app.route('/student', methods=['POST'])
    @jwt_required()
    def add_student():
        data = request.get_json()
        new_student = Student(
            student_name=data['student_name'],
            gender=data['gender'],
            adm_no=data['adm_no'],
            education_level=data['education_level'],
            school=data['school'],
            form_class=data['form_class'],
            fee_balance=data['fee_balance'],
            parent_status=data['parent_status']
        )
        db.session.add(new_student)
        db.session.commit()
        return jsonify({'message': 'Student added'}), 201
        
    @app.route('/parent', methods=['POST'])
    @jwt_required()
    def add_parent():
        data = request.get_json()
        new_parent = Parent(
            student_id=data['student_id'],
            father_name=data.get('father_name'),
            father_id_number=data.get('father_id_number'),
            father_front_id_photo=data.get('father_front_id_photo'),
            father_back_id_photo=data.get('father_back_id_photo'),
            mother_name=data['mother_name'],
            mother_id_number=data['mother_id_number'],
            mother_front_id_photo=data.get('mother_front_id_photo'),
            mother_back_id_photo=data.get('mother_back_id_photo'),
            applicant_phone_number=data['applicant_phone_number']
        )
        db.session.add(new_parent)
        db.session.commit()
        return jsonify({'message': 'Parent Added'}), 201
    
    @app.route('/attachment', methods=['POST'])
    @jwt_required()
    def add_attachment():
        data = request.get_json()
        new_attachment = Attachment(
            student_id=data['student_id'],
            fee_structure=data.get('fee_structure'),
            result_slip=data.get('result_slip'),
            birth_cert=data.get('birth_cert'),
            disable_cert=data.get('disable_cert'),
            birth_cert_no=data.get('birth_cert_no')
        )
        
        db.session.add(new_attachment)
        db.session.commit()
        return jsonify({'message': 'Attachment added'}), 201

    @app.route('/submit', methods=['POST'])
    def submit():
        try:
            # Get form data
            studentName = request.form.get('studentName')
            admNo = request.form.get('admNo')
            selectedGender = request.form.get('selectedGender')
            selectedLevel = request.form.get('selectedLevel')
            inputSchool = request.form.get('inputSchool')
            formClass = request.form.get('formClass')
            feeBalance = request.form.get('feeBalance')
            selectedParentStatus = request.form.get('selectedParentStatus')
            fatherNoId = request.form.get('fatherNoId')
            motherNoId = request.form.get('motherNoId')
            fatherName = request.form.get('fatherName')
            fatherIdNumber = request.form.get('fatherIdNumber')
            motherName = request.form.get('motherName')
            motherIdNumber = request.form.get('motherIdNumber')
            applicantPhoneNumber = request.form.get('applicantPhoneNumber')

            # Handle file uploads
            fatherFrontIdPhoto = request.files.get('fatherFrontIdPhoto')
            fatherBackIdPhoto = request.files.get('fatherBackIdPhoto')
            motherFrontIdPhoto = request.files.get('motherFrontIdPhoto')
            motherBackIdPhoto = request.files.get('motherBackIdPhoto')

            fatherFrontIdPhoto_filename = secure_filename(fatherFrontIdPhoto.filename) if fatherFrontIdPhoto else None
            fatherBackIdPhoto_filename = secure_filename(fatherBackIdPhoto.filename) if fatherBackIdPhoto else None
            motherFrontIdPhoto_filename = secure_filename(motherFrontIdPhoto.filename) if motherFrontIdPhoto else None
            motherBackIdPhoto_filename = secure_filename(motherBackIdPhoto.filename) if motherBackIdPhoto else None

            # Save files
            if fatherFrontIdPhoto:
                fatherFrontIdPhoto.save(os.path.join(app.config['UPLOAD_FOLDER'], fatherFrontIdPhoto_filename))
            if fatherBackIdPhoto:
                fatherBackIdPhoto.save(os.path.join(app.config['UPLOAD_FOLDER'], fatherBackIdPhoto_filename))
            if motherFrontIdPhoto:
                motherFrontIdPhoto.save(os.path.join(app.config['UPLOAD_FOLDER'], motherFrontIdPhoto_filename))
            if motherBackIdPhoto:
                motherBackIdPhoto.save(os.path.join(app.config['UPLOAD_FOLDER'], motherBackIdPhoto_filename))

            # Create new student
            new_student = Student(
                student_name=studentName,
                adm_no=admNo,
                gender=selectedGender,
                education_level=selectedLevel,
                school=inputSchool,
                form_class=formClass,
                fee_balance=feeBalance,
                parent_status=selectedParentStatus
            )
            db.session.add(new_student)
            db.session.commit()

            # Create new parent
            new_parent = Parent(
                student_id=new_student.id,
                father_name=fatherName,
                father_id_number=fatherIdNumber,
                father_front_id_photo=fatherFrontIdPhoto_filename,
                father_back_id_photo=fatherBackIdPhoto_filename,
                mother_name=motherName,
                mother_id_number=motherIdNumber,
                mother_front_id_photo=motherFrontIdPhoto_filename,
                mother_back_id_photo=motherBackIdPhoto_filename,
                applicant_phone_number=applicantPhoneNumber
            )
            db.session.add(new_parent)
            db.session.commit()

            return jsonify({'message': 'Data submitted successfully'}), 201

        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

    @app.route('/protected', methods=['GET'])
    @jwt_required()
    def protected():
        current_user = get_jwt_identity()
        return jsonify(logged_in_as=current_user), 200

    @app.route('/logout', methods=['POST'])
    @jwt_required()
    def logout():
        return jsonify({"message": "Logout successful"}), 200

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')
