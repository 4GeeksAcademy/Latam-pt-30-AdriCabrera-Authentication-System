"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def create_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    
    if None in [email, password]:
        return jsonify({
            "Message": "Required email and password"
        }), 400
    
    user_email = email
    user_password = password
    user_exists = db.session.execute(db.select(User).filter_by(email=user_email)).one_or_none()

    if user_exists:
        return jsonify({
            "Message": "Email invalid"
        }), 400
    
    new_user = User(email=user_email, password=user_password, is_active=True)

    try: 
        db.session.add(new_user)
        db.session.commit()
    except Exception as error:
        print(error)
        db.session.rollback()
        return jsonify({
            "Message":"DB error"
        })

    return jsonify({"Message": "New user created"}), 200

@api.route('/login', methods=['POST'])
def login_user():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if None in [email, password]:
        return jsonify({
            "Message": "Required email and password"
        }), 400
    
    user = User.query.filter((User.email == email)).first()

    if user is None or user.password != password:
        return jsonify({
            "Message": "Ivalid email or password"
        }), 400
     
    token = create_access_token(identity=user.id) 

    return jsonify({"token": token ,"user": user.serialize()}), 201

    