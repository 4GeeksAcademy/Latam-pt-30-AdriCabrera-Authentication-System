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


@api.route('/user', methods=['POST'])
def create_user():
    data = request.json
    email_in_data = data.get("email")
    password_in_data = data.get("password")
    if None in [email_in_data, password_in_data]:
        return jsonify({
            "Message": "Required email and password"
        }), 400
    user_email = email_in_data
    user_password = password_in_data
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

    return jsonify({}), 200

@api.route('/login', methods=['POST'])
def login_user():
    data = request.json
    email_in_data = data.get("email")
    password_in_data = data.get("password")
    if None in [email_in_data, password_in_data]:
        return jsonify({
            "Message": "Required email and password"
        }), 400
    
    user_result = db.session.execute(db.select(User).filter_by(email=data["email"])).one_or_none()

    if user_result is None:
        return jsonify({
            "Message": "Ivalid email or password"
        }), 400
    
    user = user_result[0]
    password_is_valid = data["password"] == user.password

    if not password_is_valid:
        return jsonify({
            "Message": "Invalid email or password"
        }), 400
    
    return jsonify({"Message": "Login"}), 201

