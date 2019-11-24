import os
from flask import Flask, request, Response
from werkzeug.utils import secure_filename
from OCR import detect_text
import json
from flask_ngrok import run_with_ngrok

UPLOAD_FOLDER = "uploads"

app = Flask(__name__)
run_with_ngrok(app)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/")
def home():
    return "Unauthorized access. Please contact Harrison Chow for support!"

@app.route("/procReceipt", methods=['POST'])
def processReceipt():
    print(request)
    file = request.files['image']

    if (file is None or file.filename == ''):
        # flash('No selected File')
        return "No file selected"
    else:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        ingredients = detect_text(str(app.config['UPLOAD_FOLDER'] + "/" +filename))
        print (type(ingredients))
        for i in range (len(ingredients)):
            print (ingredients[i])
        # response = json.dumps(ingredients)
        # print (response)
        # for i in range (len(response)):
        #     print (response[i])

        return Response(json.dumps(ingredients), mimetype='application/json')


if __name__ == "__main__":
    app.run()