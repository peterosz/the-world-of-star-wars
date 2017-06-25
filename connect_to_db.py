import psycopg2
from local_config import *
import os
import urllib

urllib.parse.uses_netloc.append('postgres')
url = urllib.parse.urlparse(os.environ.get('DATABASE_URL'))
connection = psycopg2.connect(
    database=url.path[1:],
    user=url.username,
    password=url.password,
    host=url.hostname,
    port=url.port
)


def connect_db(connect_credentials):
    conn = None
    try:
        conn = psycopg2.connect(connect_credentials)
        return conn
    except Exception as error:
        print(error)
        return 'connection error'


def execute_query(query):
    result = {}
    connect_credentials = "dbname={0} user={1} password={2} host={3}".format(DATABASE, USER, PASSWORD, HOST)
    connection = connect_db(connect_credentials)
    if connection == 'connection error':
        result = 'Connection error. Server unreachable.'
        return result
    else:
        try:
            connection.autocommit = True
            cursor = connection.cursor()
            cursor.execute(query)
            if "SELECT" in query:
                result = cursor.fetchall()
            cursor.close()
        except Exception as error:
            result = error
            print(error)
        return result
