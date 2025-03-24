from flask import Flask, request, jsonify
from flask_cors import CORS
# from transformers import pipeline
# import torch
import requests
import json
from PIL import Image
import io
import ollama
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for React

@app.route('/api/hello', methods=['GET'])
def hello():
    result = {"prediction": "100%"}
    return jsonify(result)

@app.route('/api/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    image = request.files['image']
    img = Image.open(io.BytesIO(image.read()))  # Open image using PIL
    img = img.convert("RGB")  # Convert to RGB if needed

    # Image Processing (Example: Convert to Grayscale)
    img = img.convert("L")
    img.save("./images/processed_image.jpg")

    return jsonify({"message": "Image uploaded and processed successfully"})

# Sample endpoint
@app.route('/api/predict', methods=['GET'])
def predict():
    data = request.json  # Get JSON data from request
    # Example: Use data to make ML predictions (replace with actual ML model)
    result = {"prediction": "Approved" if data["credit_score"] > 700 else "Rejected"}
    return jsonify(result)

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    API_KEY = os.getenv("OPENROUTER_API_KEY")
    MODEL = "deepseek/deepseek-r1:free"

    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        f"Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "Be brief and provide responses in 1-2 sentences."},
            {"role": "user", "content": user_input}
        ],
        "temperature": 0.5,  # Adjusts randomness; higher = more creative
        "top_p": 0.9,  # Controls token probability sampling
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))
        
        if response.status_code == 200:
            result = response.json()
            choice = result.get("choices", [{}])[0]
            bot_response = choice.get("message", {}).get("content", "No response available")
            finish_reason = choice.get("finish_reason", "")

            return jsonify({"response": bot_response.strip()})
        else:
            return jsonify({"response": "Error: " + response.text})

    except requests.exceptions.RequestException as e:
        return jsonify({"response": "Error: " + str(e)})

@app.route('/api/chat3', methods=['POST'])
def chat3():
    user_input = request.json.get('message');
    response = ollama.chat(
        model="llama3.2",
        messages=[
            {"role": "system", "content": "You are an expert in disaster assessment and help people in need. Give short and concise responses."},
            {"role": "user", "content": user_input},
        ]
    )

    return jsonify({"response": response['message']['content']})

@app.route('/api/evacuation', methods=['POST'])
def evacuation():
    user_input = request.json.get('message')
    API_KEY = "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"
    MODEL = "deepseek/deepseek-r1:free"

    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        f"Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": MODEL,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are an AI Disaster Response Planner, specializing in emergency preparedness, "
                    "relief coordination, and resource management. Your goal is to generate a well-structured, "
                    "actionable disaster response plan based on the provided situation, available resources, "
                    "and required skills. \n\n"
                    "Your response should include:\n"
                    "1. Risk Assessment - Identify the severity and impact of the disaster.\n"
                    "2. Resource Allocation - Assign food, water, medical aid, and volunteers efficiently.\n"
                    "3. Rescue & Evacuation Plan - Outline safe zones, shelters, and transport methods.\n"
                    "4. Communication Strategy - Define how emergency updates reach authorities and civilians.\n"
                    "5. Team Assignments - Allocate people with specific skills to roles that maximize efficiency.\n"
                    "6. Contingency Planning - Backup plans in case of worsening conditions or resource shortages.\n"
                    "7. Recovery & Rehabilitation - Long-term recovery efforts post-disaster."
                )
            },
            {"role": "user", "content": user_input}
        ],
        "temperature": 0.7,  # Adjusts randomness; higher = more creative
        "top_p": 0.9,  # Controls token probability sampling
    }


    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))
        
        if response.status_code == 200:
            result = response.json()
            choice = result.get("choices", [{}])[0]
            bot_response = choice.get("message", {}).get("content", "No response available")
            finish_reason = choice.get("finish_reason", "")

            return jsonify({"response": bot_response.strip()})
        else:
            return jsonify({"response": "Error: " + response.text})

    except requests.exceptions.RequestException as e:
        return jsonify({"response": "Error: " + str(e)})


# torch.device("cpu")

# Load the BlenderBot model
# chatbot = pipeline("text2text-generation", model="facebook/blenderbot-400M-distill", device=-1)

# Chat function
# def vanilla_chatbot(message):
#     response = chatbot(message, max_length=100, truncation=True)
#     return response[0]["generated_text"]

# @app.route('/api/chat2', methods=['POST'])
# def chat2():
    # user_input = request.json.get('message')
    # return jsonify({"response": vanilla_chatbot(user_input)})

if __name__ == '__main__':
    app.run(debug=True)
