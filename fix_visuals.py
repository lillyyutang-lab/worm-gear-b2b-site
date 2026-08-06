import os
import re

target_dir = 'worm-gear-b2b-site'
html_files = [f for f in os.listdir(target_dir) if f.endswith('.html')]

replacements = [
    # Encoding artifacts
    (r'鉁?', '✓'),
    (r'鈫?', '→'),
    (r'馃彮', '🏭'),
    (r'馃殮', '🚚'),
    (r'鈿?', '⚙'),
    (r'馃幎', '🎥'),
    (r'Â©', '©'),
    (r'â?', '☰'),
    (r'â?', '→'),
]

def fix_html(filepath):
    # Read as binary to avoid encoding issues during read
    with open(filepath, 'rb') as f:
        data = f.read()
    
    # Try decoding as utf-8, then latin-1
    try:
        content = data.decode('utf-8')
    except UnicodeDecodeError:
        content = data.decode('latin-1')

    # Apply character replacements
    for old, new in replacements:
        content = content.replace(old, new)
    
    # Specific layout fixes for index.html
    if 'index.html' in filepath:
        # Fix Testimonials dimensions
        content = re.sub(r'src="assets/images/testimonials\.webp" alt="What Our Clients Say" style="[^"]+" width="\d+" height="\d+"', 
                         'src="assets/images/testimonials.webp" alt="What Our Clients Say" style="max-width: 100%; height: auto; display: block; margin: 0 auto; border-radius: 10px; box-shadow: var(--shadow);" width="1400" height="788"', content)
        
        # Fix News Grid messy structure (remove duplicate or broken tags)
        # This is a bit tricky with regex, so I'll try to find the whole grid and replace it
        grid_pattern = re.compile(r'<div class="news-grid">.*?</div></div></section>', re.DOTALL)
        clean_grid = """<div class="news-grid">
          <a class="news-card" href="news-are-worm-gearboxes-self-locking.html">
            <div class="news-thumb">⚙</div>
            <div>
              <small>August 4, 2026</small>
              <h3>Are Worm Gearboxes Really Self-Locking?</h3>
              <strong>VIEW MORE &rarr;</strong>
            </div>
          </a>
          <a class="news-card" href="news-inside-smk-factory.html">
            <div class="news-thumb">🎥</div>
            <div>
              <small>July 31, 2026</small>
              <h3>Inside SMK Factory: How We Ensure High Quality Worm Gear Reducers</h3>
              <strong>VIEW MORE &rarr;</strong>
            </div>
          </a>
          <a class="news-card" href="news-shipment-completed.html">
            <div class="news-thumb">🚚</div>
            <div>
              <small>July 31, 2026</small>
              <h3>SMK Successfully Completed Shipment of Worm Gear Reducer Motors</h3>
              <strong>VIEW MORE &rarr;</strong>
            </div>
          </a>
        </div></div></section>"""
        content = grid_pattern.sub(clean_grid, content)

    # General icon cleanup (e.g. ☰)
    content = content.replace('☰/button>', '☰</button>') # Fix broken toggle
    
    # Save as UTF-8
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for filename in html_files:
    if 'google' in filename: continue
    fix_html(os.path.join(target_dir, filename))
    print(f"Fixed {filename}")
