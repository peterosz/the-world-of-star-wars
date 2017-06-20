from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    table_header = ['Name',
                    'Diameter in km',
                    'Climate',
                    'Terrain',
                    'Surface water percentage',
                    'Population in formatted way']
    return render_template('index.html', table_header=table_header)


if __name__ == '__main__':
    app.run(debug=True)