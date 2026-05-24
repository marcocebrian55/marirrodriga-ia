from flask import Flask, request, jsonify
from flask_cors import CORS
import anthropic
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = anthropic.Anthropic(api_key=os.environ.get('ANTHROPIC_API_KEY'))


@app.route('/api/claude', methods=['POST'])
def claude():
    data = request.get_json()
    try:
        message = client.messages.create(
            model=data.get('model', 'claude-sonnet-4-20250514'),
            max_tokens=data.get('max_tokens', 800),
            system=data.get('system', ''),
            messages=data.get('messages', []),
        )
        return jsonify({'text': message.content[0].text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
