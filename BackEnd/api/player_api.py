from flask import jsonify
from settings.config import session
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from response_handler import response_handler as handler
from models.player_model import Player
import base64


def add_player(name, mail, mobile, password, img_location):
    try:
        if (session.query(Player).filter_by(email_id=mail).first()):
            return handler.send_response(500, 'Email Id already exists')
        if (session.query(Player).filter_by(mobile_number=mobile).first()):
            return handler.send_response(500, 'Mobile number already exists')
        player = Player(name=name, email_id=mail, mobile_number=mobile, profile_img=img_location, isOnline=0)
        player.hash_password(password)
        session.add(player)
        session.commit()
        return handler.send_response(200, 'User Successfully Added')
    except:
        print('Some error occurred')
        return handler.send_response(500, 'Some error occurred')

def login(username, pwd):
    try:
        player = session.query(Player).filter_by(email_id=username).first()
        if not player:
            return handler.send_response(400, 'User not found')
        if player.verify_password(pwd):
            token = create_access_token(identity={'user_id': player.id})
            player.isOnline = 1
            session.commit()
            response = jsonify({
                'user_id': player.id,
                'access_token': token,
                'message': 'Login Successful'
            })
            return response, 200
            # return jsonify(access_token=token), 200
        else:
            return handler.send_response(400, 'Invalid Password')
    except:
        print('Some error occurred')
        return handler.send_response(500, 'Some error occurred')

def logout(user_id):
    try:
        player = session.query(Player).filter_by(id=user_id).first()
        if not player:
            return handler.send_response(400, 'User not found')
        else:
            player.isOnline = 0
            session.commit()
            return handler.send_response(200, 'User successfully logged out')
    except:
        return handler.send_response(500, 'Some error occurred')

def get_player_details(player_id):
    try:
        player = session.query(Player).filter_by(id=player_id).first()
        with open(player.profile_img, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())
        print(type(encoded_string), type(encoded_string.decode('utf-8')))
        base64Str = encoded_string.decode('utf-8')
        response = jsonify({
            'player_name' : player.name,
            'mobile_numbr' : player.mobile_number,
            'img_location' : base64Str
        })
        return response, 200
    except:
        print('Some error occurred')
        return handler.send_response(500, 'Some error occurred')

def get_online_players(player_id):
    try:
        players = session.query(Player).filter_by(isOnline=1).all()
        response = []
        for i in players:
            res = {
                'player_id': i.id,
                'player_name' : i.name,
                'mobile_numbr' : i.mobile_number,
                'is_host': True if i.id == player_id else False
            }
            # if i.id != player_id:
            response.append(res)
        return jsonify(res=response), 200
    except:
        print('Some error occurred')
        return handler.send_response(500, 'Some error occurred')
