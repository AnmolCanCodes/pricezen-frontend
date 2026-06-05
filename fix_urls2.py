import os

directory = '/home/anmol/Desktop/Pricezniti/pricestats'

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content.replace('process.env.NEXT_PUBLIC_API_URL as string', '(process.env.NEXT_PUBLIC_API_URL || "")')
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(directory):
    if 'node_modules' in root or '.next' in root:
        continue
    for file in files:
        if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
            filepath = os.path.join(root, file)
            process_file(filepath)

