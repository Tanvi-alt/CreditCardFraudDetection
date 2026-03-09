import os
from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load trained model
model = joblib.load("final_best_model.pkl")

@app.route("/")
def home():
    return "ML Fraud Detection Service is running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    X = np.array([[
        data["v14"],
        data["v4"],
        data["v11"],
        data["v12"],
        data["v10"]
    ]])

    prob = model.predict_proba(X)[0][1]

    label = "Fraud" if prob >= 0.4 else "Legit"

    return jsonify({
        "prediction": label,
        "fraud_probability": round(float(prob), 4)
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)