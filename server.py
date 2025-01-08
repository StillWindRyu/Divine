import http.server
import socketserver

# Define the port
PORT = 8000

# Set up the handler to serve files from the current directory
Handler = http.server.SimpleHTTPRequestHandler

# Start the server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever()
