from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template(
        'index.html', 
        title="Welcome | Debjyoti's Space",
        message="🚀 Welcome to Debjyoti's Digital Hub! Explore, Learn, and Grow."
    )

@app.route('/health')
def health():
    return render_template(
        'health.html',
        title="System Health Status",
        status="✅ All Systems Operational!",
        uptime="Server running smoothly for: 99.99% uptime"
    )
