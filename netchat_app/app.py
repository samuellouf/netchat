from flask import Flask, request, jsonify, render_template
import socket
from . import __version__

app = Flask(__name__)

messages = []

userlist = {}

jsbool = lambda boolean: str(boolean).lower()
true = "true"
false = "false"

@app.route("/")
def home():
  return render_template("index.html")

@app.route("/isLive/")
def isLive():
  return true

@app.route("/getIP/")
def getIP():
  s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
  s.connect(("10.253.155.219", 58162)) # werkzeug/serving.py
  ip = s.getsockname()[0]
  s.close()
  return ip

@app.route("/getVersion/")
def getVersion():
  return __version__

@app.route("/user/<string:username>", methods = ["GET", "POST", "DELETE"])
def user(username):
  if request.method == "GET":
    return jsbool(username in userlist)
  
  data = request.get_json()
  password = data["password"]
  
  if request.method == "POST":
    if not username in userlist:
      userlist[username] = { "password": password }
      return true
    
    return false
  elif request.method == "DELETE":
    if username in userlist:
      if userlist[username]["password"] == password:
        del userlist[username]
      else:
        return false
    
    return true
  else:
    pass

@app.route("/user/password/<string:username>", methods = ["GET", "POST"])
def user_password(username):
  if request.method == "GET":
    password = request.args.get("password")
    return jsbool(username in userlist and userlist[username]["password"] == password)
  elif request.method == "POST":
    data = request.get_json()
    old_password = data["old_password"]
    new_password = data["new_password"]
    
    if username in userlist:
      if userlist[username]["password"] == old_password:
        userlist[username]["password"] = new_password
        return jsonify({ "success": True })
      else:
        return jsonify({ "success": False, "error": "WrongPassword" })
    else:
      return jsonify({ "success": False, "error": "NoUser" })

@app.route("/msg/sendText/", methods = ["POST"])
def msg_sendText():
  data = request.get_json()
  messages.append({ "message": data["message"], "username": data["username"], "timestamp": data["timestamp"] })
  return true

@app.route("/msg/getTextsSentSince/<int:timestamp>", methods = ["GET"])
def msg_getTextsSentSince(timestamp):
  return list(filter(lambda message: message["timestamp"] > timestamp, messages))

def run(**kwargs):
  app.run(**kwargs)

if __name__ == "__main__":
  app.run(host="0.0.0.0", debug=False)
