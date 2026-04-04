from flask import Flask, request, jsonify, send_file, session
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import json, os, csv, io
from datetime import datetime
import uuid

app = Flask(__name__)
app.secret_key = "pingle-college-secret-key-2024"
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)

# ─── helpers ───────────────────────────────────────────────
def load(name):
    path = os.path.join(DATA_DIR, f"{name}.json")
    if not os.path.exists(path):
        return []
    with open(path) as f:
        return json.load(f)

def save(name, data):
    with open(os.path.join(DATA_DIR, f"{name}.json"), "w") as f:
        json.dump(data, f, indent=2)

def load_users():
    path = os.path.join(DATA_DIR, "users.json")
    if not os.path.exists(path):
        default = [
            {"id":"1","username":"admin","password":generate_password_hash("admin123"),"role":"admin","name":"Administrator"},
            {"id":"2","username":"student","password":generate_password_hash("student123"),"role":"student","name":"Demo Student"},
        ]
        with open(path,"w") as f: json.dump(default,f,indent=2)
        return default
    with open(path) as f: return json.load(f)

# ─── auth ───────────────────────────────────────────────────
@app.route("/api/login", methods=["POST"])
def login():
    d = request.json
    users = load_users()
    user = next((u for u in users if u["username"]==d.get("username")),None)
    if user and check_password_hash(user["password"],d.get("password","")):
        session["user_id"] = user["id"]
        return jsonify({"success":True,"user":{"id":user["id"],"name":user["name"],"role":user["role"],"username":user["username"]}})
    return jsonify({"success":False,"message":"Invalid credentials"}),401

@app.route("/api/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"success":True})

@app.route("/api/me")
def me():
    uid = session.get("user_id")
    if not uid: return jsonify({"user":None})
    users = load_users()
    user = next((u for u in users if u["id"]==uid),None)
    if user:
        return jsonify({"user":{"id":user["id"],"name":user["name"],"role":user["role"],"username":user["username"]}})
    return jsonify({"user":None})

# ─── generic CRUD factory ───────────────────────────────────
def make_crud(resource):
    @app.route(f"/api/{resource}", methods=["GET"], endpoint=f"get_{resource}")
    def get_all():
        return jsonify(load(resource))

    @app.route(f"/api/{resource}", methods=["POST"], endpoint=f"create_{resource}")
    def create():
        items = load(resource)
        item = request.json
        item["id"] = str(uuid.uuid4())
        item["created_at"] = datetime.now().isoformat()
        items.append(item)
        save(resource, items)
        return jsonify(item), 201

    @app.route(f"/api/{resource}/<item_id>", methods=["PUT"], endpoint=f"update_{resource}")
    def update(item_id):
        items = load(resource)
        for i,it in enumerate(items):
            if it["id"]==item_id:
                items[i].update(request.json)
                items[i]["id"]=item_id
                save(resource,items)
                return jsonify(items[i])
        return jsonify({"error":"Not found"}),404

    @app.route(f"/api/{resource}/<item_id>", methods=["DELETE"], endpoint=f"delete_{resource}")
    def delete(item_id):
        items = load(resource)
        items = [it for it in items if it["id"]!=item_id]
        save(resource,items)
        return jsonify({"success":True})

for r in ["announcements","activities","assignments","timetable","resources","mentors",
          "grievances","progressions","faculty","students","events","tab_records"]:
    make_crud(r)

# ─── CSV upload/download ────────────────────────────────────
@app.route("/api/<resource>/upload-csv", methods=["POST"])
def upload_csv(resource):
    file = request.files.get("file")
    if not file: return jsonify({"error":"No file"}),400
    stream = io.StringIO(file.stream.read().decode("utf-8"))
    reader = csv.DictReader(stream)
    items = load(resource)
    added = 0
    for row in reader:
        row["id"] = str(uuid.uuid4())
        row["created_at"] = datetime.now().isoformat()
        items.append(row)
        added += 1
    save(resource, items)
    return jsonify({"success":True,"added":added})

@app.route("/api/<resource>/download-csv")
def download_csv(resource):
    items = load(resource)
    if not items:
        output = io.StringIO()
        output.write("No data available\n")
        output.seek(0)
        return send_file(io.BytesIO(output.getvalue().encode()), mimetype="text/csv",
                         as_attachment=True, download_name=f"{resource}.csv")
    keys = list(items[0].keys())
    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=keys)
    writer.writeheader()
    writer.writerows(items)
    output.seek(0)
    return send_file(io.BytesIO(output.getvalue().encode()), mimetype="text/csv",
                     as_attachment=True, download_name=f"{resource}.csv")

@app.route("/api/<resource>/clear", methods=["DELETE"])
def clear_resource(resource):
    save(resource,[])
    return jsonify({"success":True})

# ─── dashboard stats ────────────────────────────────────────
@app.route("/api/dashboard-stats")
def dashboard_stats():
    return jsonify({
        "students": len(load("students")),
        "faculty": len(load("faculty")),
        "announcements": len(load("announcements")),
        "activities": len(load("activities")),
        "assignments": len(load("assignments")),
        "grievances": len([g for g in load("grievances") if g.get("status")=="open"]),
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
