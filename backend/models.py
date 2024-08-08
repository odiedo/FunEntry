from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    
class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_name = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(200), nullable=False)
    adm_no = db.Column(db.String(20), nullable=False)
    education_level = db.Column(db.String(20), nullable=False)
    school = db.Column(db.String(100), nullable=False)
    form_class = db.Column(db.String(10), nullable=False)
    fee_balance = db.Column(db.Float, nullable=False)
    parent_status = db.Column(db.String(20), nullable=False)
    
class Parent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    father_name = db.Column(db.String(100), nullable=True)
    father_id_number = db.Column(db.String(20), nullable=True)
    father_front_id_photo = db.Column(db.String(200), nullable=True)
    father_back_id_photo = db.Column(db.String(200), nullable=True)
    mother_name = db.Column(db.String(100), nullable=False)
    mother_id_number = db.Column(db.String(20), nullable=False)
    mother_front_id_photo = db.Column(db.String(200), nullable=True)
    mother_back_id_photo = db.Column(db.String(200), nullable=True)
    applicant_phone_number = db.Column(db.String(20), nullable=False)
    student = db.relationship('Student', back_populates='parents')
    
class Attachment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    fee_structure = db.Column(db.String(200), nullable=True)
    result_slip = db.Column(db.String(200), nullable=True)
    birth_cert = db.Column(db.String(200), nullable=True)
    disable_cert = db.Column(db.String(200), nullable=True)
    birth_cert_no = db.Column(db.String(20), nullable=True)
    student = db.relationship('Student', back_populates='attachments')

Student.parents = db.relationship('Parent', order_by=Parent.id, back_populates='student')
Student.attachments = db.relationship('Attachment', order_by=Attachment.id, back_populates='student')