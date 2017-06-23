from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
import requests
from connect_to_db import execute_query

app = Flask(__name__)
app.secret_key = 'ssssh its a secret'


@app.route('/', methods=['GET', 'POST'])
def index():
    table_header = ['Name',
                    'Diameter in km',
                    'Climate',
                    'Terrain',
                    'Surface water percentage',
                    'Population in formatted way',
                    'Residents']
    modal_table_header = ['Name',
                          'Height',
                          'Mass',
                          'Hair color',
                          'Skin color',
                          'Eye color',
                          'Birth year',
                          'Gender']
    if session['logged_in']:
        user_logged_in = session['username']
        return render_template('index.html', table_header=table_header,
                                            modal_table_header=modal_table_header,
                                            user_logged_in=user_logged_in)
    else:
        return render_template('index.html', table_header=table_header,
                                             modal_table_header=modal_table_header)


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
    print(username)
    query_user = '''SELECT username
               FROM swusers
               WHERE username = '%s';''' % (username)
    result = execute_query(query_user)
    print(result)
    if result == []:
        password_hash = generate_password_hash(password)
        query = '''INSERT INTO swusers (username, p4ssword) \
                    VALUES ('%s', '%s');''' % (username, password_hash)
        execute_query(query)
        return redirect(url_for('login'))
    else:
        error = 'Username already in use.'
        return render_template('error.html', error=error)
    return redirect(url_for('login'))


@app.route('/login', methods=['POST'])
def log_user_in():
    username = request.form['name']
    password = request.form['password']
    query_user = ('''SELECT username
                FROM swusers
                WHERE username='%s';'''
                % (username))
    user_check = execute_query(query_user)
    if username in user_check[0][0]:
        query_psw = ('''SELECT p4ssword
                    FROM swusers
                    WHERE username='%s';'''
                    % (username))
        psw_check = execute_query(query_psw)
        print(psw_check[0][0])
        print(password)
        print(check_password_hash(psw_check[0][0], password))
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

if __name__ == '__main__':
    app.run(debug=True)