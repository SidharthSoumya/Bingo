from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from controller import player_controller

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'jjhdskjfskdjfjkdsuieyuhsjdfue'
app.config['UPLOAD_PATH'] = 'uploads'
CORS(app)
jwt = JWTManager(app)


@app.route('/')
@app.route('/login', methods=['POST'])
def login(): return player_controller.login()


@app.route('/register', methods=['POST'])
def register(): return player_controller.register()


@app.route('/getPlayerDetails', methods=['GET'])
@jwt_required
def get_user(): return player_controller.get_user_details()

@app.route('/getOnlinePlayers', methods=['GET'])
@jwt_required
def get_online_player(): return player_controller.get_online_player_details()

@app.route('/logout', methods=['GET'])
@jwt_required
def log_out(): return player_controller.logout()




if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=4000)
