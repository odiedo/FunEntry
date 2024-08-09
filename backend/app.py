import os
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from datetime import datetime
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


    @app.route('/submit', methods=['POST'])
    @jwt_required()
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
            fatherName = request.form.get('fatherName')
            fatherIdNumber = request.form.get('fatherIdNumber')
            motherName = request.form.get('motherName')
            motherIdNumber = request.form.get('motherIdNumber')
            applicantPhoneNumber = request.form.get('applicantPhoneNumber')
            feeStructure = request.form.get('feeStructure')
            resultSlip = request.form.get('resultSlip')
            birthCert = request.form.get('birthCert')
            disableCert = request.form.get('disableCert')
            selectedStatus = request.form.get('selectedStatus')
            birthCertNo = request.form.get('birthCertNo')

            # Validate fee balance
            try:
                feeBalance = float(feeBalance) if feeBalance else None
            except ValueError:
                return jsonify({'message': 'Invalid fee balance value'}), 400

            # Handle file uploads
            def save_file(file, prefix):
                if file:
                    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
                    filename = f"{prefix}_{timestamp}.png"
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    return filename
                return None

            fatherFrontIdPhoto_filename = save_file(request.files.get('fatherFrontIdPhoto'), prefix=f"{fatherIdNumber}_frnt")
            fatherBackIdPhoto_filename = save_file(request.files.get('fatherBackIdPhoto'), prefix=f"{fatherIdNumber}_back")
            motherFrontIdPhoto_filename = save_file(request.files.get('motherFrontIdPhoto'), prefix=f"{motherIdNumber}_frnt")
            motherBackIdPhoto_filename = save_file(request.files.get('motherBackIdPhoto'), prefix=f"{motherIdNumber}_back")
            disableCertPhoto_filename = save_file(request.files.get('disableCert'), prefix=f"{studentName}_disable")
            feeStructurePhoto_filename = save_file(request.files.get('feeStructure'), prefix=f"{studentName}_fee")
            resultSlipPhoto_filename = save_file(request.files.get('resultSlip'), prefix=f"{studentName}_result_slip")
            birthCert_filename = save_file(request.files.get('birthCert'), prefix=f"{birthCertNo}_birth")


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
            
            # Create new attachment
            new_attachment = Attachment(
                student_id=new_student.id,
                fee_structure=feeStructurePhoto_filename,
                result_slip=resultSlipPhoto_filename,
                birth_cert=birthCert_filename,
                disable_status=selectedStatus,
                disable_cert=disableCertPhoto_filename,
                birth_cert_no=birthCertNo,
            )
            db.session.add(new_attachment)
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
