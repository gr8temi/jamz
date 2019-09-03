import os
from cs50 import SQL
from flask import Flask, jsonify, redirect, render_template, request, session
from flask_session import Session

from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
from werkzeug.security import check_password_hash, generate_password_hash



app = Flask(__name__)

#login
db = SQL("sqlite:///jamz.db")
@app.route("/signup", methods=["GET","POST"])
def signup():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")
 
        if not name:
            return apology ("name")  # error message
        
        if not password:
            return apology("username not provided", 406)
        
        if (confirmation != password):
            return apology("Password Mismatch")
        hash = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)

        db.execute("INSERT INTO users (name,email,hash) VALUES (:name, :email, :hash)", name=name, email=email, hash=hash) 
    else:
        return redirect("/")   
