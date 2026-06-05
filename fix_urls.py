import os
import re

directory = '/home/anmol/Desktop/Pricezniti/pricestats'

# Regex to match the various backend URL assignments
# e.g., process.env.BACKEND_URL || "http://localhost:8000"
# process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
# process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
# process.env.BACKEND_URL ?? "http://localhost:8000"

pattern = re.compile(r'process\.env\.(?:BACKEND_URL|NEXT_PUBLIC_BACKEND_URL)(?:\s*(?:\|\||\?\?)\s*process\.env\.(?:BACKEND_URL|NEXT_PUBLIC_BACKEND_URL))?\s*(?:\|\||\?\?)\s*[\'"]http://localhost:8000[\'"]')

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content, count = pattern.subn('process.env.NEXT_PUBLIC_API_URL as string', content)
    
    if count > 0:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath} ({count} changes)")

for root, _, files in os.walk(directory):
    if 'node_modules' in root or '.next' in root:
        continue
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
            filepath = os.path.join(root, file)
            process_file(filepath)

