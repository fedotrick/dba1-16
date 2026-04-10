import os, re

path = r'C:\Users\Андрей\Downloads\DBA1-handouts-16'
out = open(os.path.join(path, '_extract2.txt'), 'w', encoding='utf-8')

for fn in sorted(os.listdir(path)):
    if not fn.endswith('.html'):
        continue
    if 'dba1_00' not in fn and 'dba1_01' not in fn and 'dba1_02' not in fn:
        continue
    
    fp = os.path.join(path, fn)
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    
    out.write(f'\n{"="*80}\n')
    out.write(f'FILE: {fn} ({len(content)} chars)\n')
    out.write(f'{"="*80}\n')
    
    # Find all page divs
    page_divs = re.findall(r'<div id="(pf[^"]+)"[^>]*data-page-no="(\d+)">(.*?)</div>\s*</div>\s*(?=<div id="pf|$)', content, re.DOTALL)
    
    for pf_id, page_no, page_html in page_divs:
        out.write(f'\n--- Page {page_no} (id={pf_id}) ---\n')
        
        # Find ALL text content: spans inside div.t elements, and also any standalone text
        # Method 1: Get all span content from div.t elements
        t_divs = re.findall(r'<div class="t[^"]*"[^>]*>(.*?)</div>', page_html, re.DOTALL)
        
        all_texts = []
        for div_content in t_divs:
            spans = re.findall(r'<span[^>]*>([^<]*)</span>', div_content)
            text = ''.join(spans)
            if text.strip():
                all_texts.append(text.strip())
        
        # Also try getting text from <a> elements (links/outline)
        links = re.findall(r'<a[^>]*>([^<]*)</a>', page_html)
        link_texts = [l.strip() for l in links if l.strip()]
        
        if all_texts:
            for t in all_texts:
                out.write(f'  {t}\n')
        elif link_texts:
            for lt in link_texts:
                out.write(f'  [link] {lt}\n')
        else:
            # Check for base64 image content (text might be rendered as image)
            imgs = re.findall(r'<img[^>]*src="data:image/png;base64,([^"]{50})', page_html)
            if imgs:
                out.write(f'  [image-based page, {len(imgs)} images]\n')
            else:
                out.write(f'  [no text found]\n')
    
    out.write('\n')

out.close()
print('DONE')
