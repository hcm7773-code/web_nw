import os
import re
import base64
import glob

def build_single_file_html():
    dist_html_path = 'dist/index.html'
    if not os.path.exists(dist_html_path):
        print("dist/index.html does not exist, running build first...")
        os.system('npm run build')

    with open(dist_html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Find CSS file
    css_files = glob.glob('dist/assets/*.css')
    css_content = ''
    for css_file in css_files:
        with open(css_file, 'r', encoding='utf-8') as f:
            css_content += f.read() + '\n'

    # Find JS file
    js_files = glob.glob('dist/assets/*.js')
    js_content = ''
    for js_file in js_files:
        with open(js_file, 'r', encoding='utf-8') as f:
            js_content += f.read() + '\n'

    # Read and encode images
    img_dir = 'src/assets/images'
    image_replacements = {}
    if os.path.exists(img_dir):
        for img_name in os.listdir(img_dir):
            if img_name.endswith(('.jpg', '.png', '.jpeg', '.webp')):
                full_img_path = os.path.join(img_dir, img_name)
                ext = img_name.split('.')[-1].lower()
                mime = 'image/jpeg' if ext in ['jpg', 'jpeg'] else f'image/{ext}'
                with open(full_img_path, 'rb') as img_f:
                    b64_data = base64.b64encode(img_f.read()).decode('utf-8')
                    data_uri = f'data:{mime};base64,{b64_data}'
                    # We can replace both the /src/assets/images/path and /assets/path
                    image_replacements[f'/src/assets/images/{img_name}'] = data_uri
                    image_replacements[f'src/assets/images/{img_name}'] = data_uri
                    image_replacements[f'./src/assets/images/{img_name}'] = data_uri
                    image_replacements[img_name] = data_uri

    # Replace image paths in JS and CSS
    for orig, data_uri in image_replacements.items():
        if orig.startswith('/'):
            js_content = js_content.replace(orig, data_uri)
            css_content = css_content.replace(orig, data_uri)

    # Remove external stylesheet link and replace with inline <style>
    html = re.sub(r'<link\s+rel="stylesheet"[^>]+>', '', html)
    style_tag = f'<style id="inlined-styles">\n{css_content}\n</style>'
    html = html.replace('</head>', f'{style_tag}\n</head>')

    # Remove script tags that load external module bundles and replace with inline script
    html = re.sub(r'<script\s+type="module"[^>]*src="[^"]+"[^>]*></script>', '', html)
    # Also remove any modulepreload
    html = re.sub(r'<link\s+rel="modulepreload"[^>]+>', '', html)

    script_tag = f'<script type="module">\n{js_content}\n</script>'
    html = html.replace('</body>', f'{script_tag}\n</body>')

    os.makedirs('public', exist_ok=True)
    out_path = 'public/standalone-index.html'
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Generated standalone HTML successfully at {out_path} ({len(html)} bytes)")

    if os.path.exists('dist'):
        with open('dist/standalone-index.html', 'w', encoding='utf-8') as f:
            f.write(html)

    with open('public/huashen-standalone-index.html', 'w', encoding='utf-8') as f:
        f.write(html)

if __name__ == '__main__':
    build_single_file_html()
