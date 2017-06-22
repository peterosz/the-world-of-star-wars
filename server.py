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
    return render_template('index.html', table_header=table_header, modal_table_header=modal_table_header)


if __name__ == '__main__':
    app.run(debug=True)