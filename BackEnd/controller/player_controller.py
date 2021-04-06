from flask import jsonify, request
from api import player_api as player
from flask_jwt_extended import (
    get_jwt_identity
)
from response_handler import response_handler as handler
import os
from main import app
from werkzeug.utils import secure_filename
import json




def login():
    u_name = request.json.get('username')
    password = request.json.get('password')
    if u_name is None:
        # return jsonify({"mesage": "Missing username"}), 400
        return handler.send_response(400, 'Username missing')
    elif password is None:
        # return jsonify({"mesage": "Missing password"}), 400
        return handler.send_response(400, 'Password missing')
    else:
        return player.login(u_name, password)
def logout():
    user = get_jwt_identity()
    return player.logout(user['user_id'])

def register():
    form_data = json.loads(request.form.get('registration_data'))
    name = form_data['name']
    mail = form_data['emailId']
    mobile = form_data['mobileNo']
    password = form_data['password']

    profile_img = request.files['img']
    filename = secure_filename(profile_img.filename)
    img_location = os.path.join(app.config['UPLOAD_PATH'], filename)
    profile_img.save(img_location)
    # print(os.path.abspath(img_location), img_location)
    # print(name, mail, mobile, password, img_location)
    abs_path = os.path.abspath(img_location).replace('\\', '/')

    return player.add_player(name, mail, mobile, password, abs_path)

def get_user_details():
    user = get_jwt_identity()
    return player.get_player_details(user['user_id'])
    # return jsonify({'player_name': player.name, 'player_id': player.id, 'mobile_no': player.mobile_number}), 200

def get_online_player_details(): 
    user = get_jwt_identity()
    return player.get_online_players(user['user_id'])