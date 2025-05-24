from flask import Flask, render_template, abort
import markdown
import os
from datetime import datetime # Added

app = Flask(__name__)

CONTENT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'docs')

def get_time_based_theme():
    current_hour = datetime.now().hour
    if 6 <= current_hour < 18: # 6 AM to 5:59 PM is day
        return "day"
    else:
        return "night"

@app.route('/')
def home():
    theme_mode = get_time_based_theme() # Added
    md_file_path = os.path.join(CONTENT_DIR, 'index.md')
    if not os.path.exists(md_file_path):
        # Fallback if docs/index.md doesn't exist for some reason
        return render_template('index.html', message="Welcome! Main content from docs/index.md not found.", theme_mode=theme_mode) # Added theme_mode

    with open(md_file_path, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    html_content = markdown.markdown(md_content, extensions=['fenced_code', 'tables', 'attr_list']) # Add extensions as needed
    # For simplicity, assuming 'Home' as title for docs/index.md for now
    return render_template('page_template.html', html_content=html_content, title="Home", theme_mode=theme_mode) # Added theme_mode


@app.route('/<path:page_path>.md')
def render_markdown_page(page_path):
    theme_mode = get_time_based_theme() # Added
    md_file_path = os.path.join(CONTENT_DIR, page_path + '.md')

    if not os.path.isfile(md_file_path):
        # Check if it's an index file in a subdirectory
        md_file_path_index = os.path.join(CONTENT_DIR, page_path, 'index.md')
        if os.path.isfile(md_file_path_index):
            md_file_path = md_file_path_index
        else:
            abort(404) # Not found

    with open(md_file_path, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Extract title from frontmatter if possible (simple version)
    page_title = page_path.split('/')[-1].replace('_', ' ').title() # Basic title
    if md_content.startswith('---'):
        try:
            frontmatter_end = md_content.find('---', 3)
            if frontmatter_end != -1:
                frontmatter = md_content[3:frontmatter_end]
                for line in frontmatter.splitlines():
                    if line.startswith('title:'):
                        page_title = line.split('title:', 1)[1].strip()
                        break
        except Exception:
            pass # Ignore errors in frontmatter parsing for now

    html_content = markdown.markdown(md_content, extensions=['fenced_code', 'tables', 'attr_list', 'toc', 'pymdownx.superfences', 'pymdownx.arithmatex']) # Added more extensions

    return render_template('page_template.html', html_content=html_content, title=page_title, theme_mode=theme_mode) # Added theme_mode

if __name__ == '__main__':
    app.run(debug=True)
