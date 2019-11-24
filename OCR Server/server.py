import os
from flask import Flask, request, Response
from werkzeug.utils import secure_filename
from OCR import detect_text
import json
from flask_ngrok import run_with_ngrok
# import nltk
from nltk.corpus import wordnet

UPLOAD_FOLDER = "uploads"

app = Flask(__name__)
run_with_ngrok(app)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
# nltk.download()
removeArray = ["total", "tax", "sub", "table", "spec", "dec", "save", "saved", "coupon", "coupons", "order","jr", "links", "now", "grocery","today","non-coupon","savings","saving","was", "free", "item", "extra", "vendor", "team", "business", "appreciates","fast", "friendly", "promotions", "provided","shannon","flat", "johnny", "crossing","shoals","crossing","store","mill", "whole", "food", "foods", "market", "greenwich", "street", "new", "york", "fiesta", "shred", "heart", "light","roast","black", "yellow", "blue", "red", "each", "tare", "weight", "non", "sweet", "sour", "net", "sold", "visa", "summary", "rate", "taxed", "name","bunch"]

@app.route("/")
def home():
    return "Unauthorized access. Please contact Harrison Chow for support!"

@app.route("/procReceipt", methods=['POST'])
def processReceipt():
    # english_vocab = set(w.lower() for w in nltk.corpus.words.words())
    print(request)
    file = request.files['image']

    if (file is None or file.filename == ''):
        return "No file selected"
    else:
        returnArray = []
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        ingredients = detect_text(str(app.config['UPLOAD_FOLDER'] + "/" +filename))
        for i in range (len(ingredients)):
            arr = ingredients[i].split()
            for j in range (len(arr)):
                # if (arr[j] in english_vocab):
                if (len(arr[j]) != 1 and len(arr[j]) != 2 and (arr[j].lower() not in removeArray) and (arr[j].capitalize() not in returnArray) and ("." not in arr[j]) and wordnet.synsets(arr[j])):
                    returnArray.append(str(arr[j]).capitalize())

        return Response(json.dumps(returnArray), mimetype='application/json')


if __name__ == "__main__":
    app.run()