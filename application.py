import os

# import eyed3
from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# Configure session to use filesystem i.e, local files (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)




#login
db = SQL("sqlite:///jamz.db")

@app.route("/check", methods=["GET"])

def check():
    """Return true if username is available, else false, in JSON format"""
    email = request.args.get("email")
    rows = db.execute("SELECT * FROM users WHERE email = :email", email=email)
    # print(rows)
    # print(q)
    if len(rows) == 1:
        return jsonify(False)
    else:
        return jsonify(True)



@app.route("/signup", methods=["GET","POST"])
def signup():
    if request.method == "POST":
        # name = request.form.get("name")
        # email = request.form.get("email")
        # password = request.form.get("password")
        # confirmation = request.form.get("confirmation")

        info = request.get_json()
  
        if not info["name"]:
            return jsonify ("please enter your name")  # error message
        
        if not info["password"]:
            return jsonify("please select a password", 406)
        
        if (info["confirmation"] != info["password"]):
            return jsonify("Password Mismatch")
            
        hash = generate_password_hash(info["password"], method='pbkdf2:sha256', salt_length=8)

        db.execute("INSERT INTO users (name,email,hash) VALUES (:name, :email, :hash)", name=info["name"], email=info["email"], hash=hash) 
        return jsonify(True)
    else:
        return render_template("signup.html")   

# @app.route("/")
# def index():
#     return render_template("index.html")   


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        info =request.get_json()
        # Ensure username was submitted
        print(info)
        if not info["email"]:
            return jsonify("must provide username")

        # Ensure password was submitted
        elif not info["password"]:
            return jsonify("must provide password")
        
        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE email = :email",
                          email=info["email"])
        # print(rows[0]["hash"])
        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], info["password"]):
            return jsonify("invalid username and/or password")

        
        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return jsonify(True) 

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")
          
# @app.route('/main',  methods=["GET"])
# def index():
#     # songs = os.listdir('static/music')
#     # audiofiles = []
#     # infos = []
#     # info = []
#     # for song in songs:
#     #     audiofiles.append(song)
#     # for audio in audiofiles:
#     #     infos.append(eyed3.load('static/music/'+audio))
    
#     # for i , val in enumerate(infos):
#     #     info.append({
#     #         "id":i+1,
#     #         "title":val.tag.title,
#     #         "album":val.tag.album,
#     #         "artist":val.tag.artist,
#     #         "song":audiofiles[i]
#     #     })
#     #     db.execute("INSERT INTO artiste (name) VALUES (:artist)",artist=val.tag.artist)
#     #     artiste = db.execute("SELECT id FROM artiste where name=:name",name=val.tag.artist)
#     #     db.execute("INSERT INTO album (name,artiste_id) VALUES (:name,:artist)",name=val.tag.album,artist=artiste[0]["id"])
#     #     album = db.execute("SELECT id FROM album where artiste_id=:artiste",artiste=artiste[0]["id"])
#     #     db.execute("INSERT INTO song (song_name,artiste_id,song) VALUES (:song_name,:artiste,:song)",song_name=val.tag.title,artiste=val.tag.artist,song=audiofiles[i])    
#     songs = db.execute("SELECT * FROM song")
#     # print(songs) 
#     return render_template("index.html",songs=songs)

@app.route('/favourite', methods=["GET", "POST"])
def favourite():
    if request.method=="POST":
        song = request.get_json()
        # song_info = db.execute("SELECT ")
        # print (song["title"])
        db.execute("UPDATE song SET favourite=1 WHERE song_name=:song",song=song["title"])
    return jsonify(True)
