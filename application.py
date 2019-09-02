import os
import datetime
from cs50 import SQL
from flask import Flask, flash, jsonify, redirect, render_template, request, session
from flask_session import Session


app =Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"]=True

