from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load a pre-trained text generation model
generator = pipeline('text-generation', model='gpt2')

@app.route('/generate', methods=['POST'])
def generate_text():
    # Get the prompt from the request
    data = request.get_json()
    prompt = data.get('prompt', '')

    if not prompt:
        return jsonify({'error': 'Prompt is required!'}), 400

    # Generate text using the model
    generated_text = generator(prompt, max_length=150, num_return_sequences=1)[0]['generated_text']
    
    return jsonify({'generated_text': generated_text})

if __name__ == '__main__':
    # Run the server on all network interfaces to allow external devices to connect
    app.run(host='0.0.0.0', port=5000, debug=True)

