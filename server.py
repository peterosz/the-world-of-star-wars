from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from connect_to_db import execute_query
from datetime import datetime
import requests
import json

app = Flask(__name__)
app.secret_key = 'ssssh its a secret'


@app.route('/', methods=['GET', 'POST'])
def index():
    table_header = ['Name',
                    'Diameter in km',
                    'Climate',
                    'Terrain',
                    'Surface water',
                    'Population',
                    'Residents']
    if session['logged_in']:
        user_logged_in = session['username']
        table_header.append('Vote')
        return render_template('index.html', table_header=table_header,
                                            user_logged_in=user_logged_in)
    else:
        return render_template('index.html', table_header=table_header)


@app.route('/login', methods=['GET'])
def login():
    return render_template('login.html')


@app.route('/register', methods=['GET'])
def register():
    return render_template('register.html')


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop('username', None)
    session['logged_in'] = False
    return redirect(url_for('index'))


@app.route('/register', methods=['POST'])
def register_user():
    username = request.form['name']
    password = request.form['password1']
    query_user = '''SELECT username
               FROM swusers
               WHERE username = '%s';''' % (username)
    result = execute_query(query_user)
    if result == []:
        password_hash = generate_password_hash(password)
        query = '''INSERT INTO swusers (username, p4ssword) \
                    VALUES ('%s', '%s');''' % (username, password_hash)
        execute_query(query)
        return redirect(url_for('login'))
    else:
        flash('Username already in use.')        
    return redirect(url_for('login'))


@app.route('/login', methods=['POST'])
def log_user_in():
    username = request.form['name']
    password = request.form['password']
    query_user = ('''SELECT username
                     FROM swusers
                     WHERE username='%s';''' % (username))
    user_check = execute_query(query_user)
    if username in user_check[0][0]:
        query_psw = ('''SELECT p4ssword
                    FROM swusers
                    WHERE username='%s';'''
                    % (username))
        psw_check = execute_query(query_psw)
        if check_password_hash(psw_check[0][0], password):
            session['username'] = username
            session['logged_in'] = True
            return redirect(url_for('index'))
        else:
            flash('User name or password incorrect.')
            return render_template('login.html')
    else:
        flash('User name or password incorrect.')
        return render_template('login.html')


@app.route('/vote', methods=['POST'])
def vote():
    get_planetid = request.json['votedPlanetId']
    planet_id = json.loads(get_planetid)
    planet_id = planet_id['votedplanet']
    username = session['username']
    timestamp = datetime.now()
    query_userid = '''SELECT id
                      FROM swusers
                      WHERE username = '%s';''' % (username)
    user_id = execute_query(query_userid)[0][0]
    query_vote_check = '''SELECT user_id, planet_id
                          FROM planet_votes
                          WHERE user_id = '%s' AND planet_id = '%s';''' % (user_id, planet_id)
    vote_check = execute_query(query_vote_check)
    if vote_check == []:
        query_save_vote = '''INSERT INTO planet_votes (planet_id, user_id, submission_time)
                            VALUES ('%s', '%s', '%s');''' % (planet_id, user_id, timestamp)
        execute_query(query_save_vote)
    return redirect(url_for('index'))


@app.route('/statistics', methods=['POST'])
def statistics():
    query_stat = '''SELECT planet_id, count(planet_id)
                    FROM planet_votes
                    GROUP BY planet_id
                    ORDER BY planet_id;'''
    vote_stats = execute_query(query_stat)
    vote_stats = jsonify(vote_stats)
    return  vote_stats


if __name__ == '__main__':
    app.run(debug=True)
