from flask import Flask, jsonify, request
import json

app = Flask(__name__)

# Helper function to load JSON data
def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Load files
classes = load_json('classes.json')
instances = load_json('instances.json')
relations = load_json('relations.json')

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '').strip().lower()
    results = {"classes": [], "instances": []}

    # Search classes
    for class_id, class_name in classes["classes"].items():
        if query in class_name.lower():
            results["classes"].append({"id": class_id, "name": class_name})

    # Search instances
    for instance_id, instance_name in instances["instances"].items():
        if query in instance_name.lower():
            results["instances"].append({"id": instance_id, "name": instance_name})

    return jsonify(results)

@app.route('/relations', methods=['GET'])
def get_relations():
    target_id = request.args.get('id', '').strip()
    result = {"type": "", "relations": []}

    # Find relations for a class
    if target_id in relations["relations"]:
        result["type"] = "class"
        result["relations"] = relations["relations"][target_id]
    
    # Find relations for an instance
    elif target_id in relations["reverse_relations"]:
        result["type"] = "instance"
        result["relations"] = relations["reverse_relations"][target_id]

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
