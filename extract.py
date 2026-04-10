import os, re

path = r'C:\Users\Андрей\Downloads\DBA1-handouts-16'
out = open(os.path.join(path, '_extract.txt'), 'w', encoding='utf-8')

for fn in sorted(os.listdir(path)):
    if not fn.endswith('.html') or 'dba1_0' not in fn:
        continue
    fp = os.path.join(path, fn)
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    
    out.write(f'=== {fn} ({len(content)} chars) ===\n')
    
    # Find page sections
    page_sectionss = re.findall(r'(data-page-no="(\d+)".*?)(?=<div id="pf|$)', content, re.DOTALL)
    
    for page_html, page_no in page_sectionss:
        # Find text divs within each page
        t_divs = re.findall(r'<div class="t[^"]*"[^>]*>(.*?)</div>', page_html, re.DOTALL)
        texts = []
        for div_content in t_divs:
            spans = re.findall(r'<span[^>]*>([^<]*)</span>', div_content)
            text = ''.join(spans).strip()
            if text:
                texts.append(text)
        
        if texts:
            out.write(f'\n--- Page {page_no} ---\n')
            for t in texts:
                out.write(f'  {t}\n')
    
    out.write('\n\n')

out.close()
print('DONE - file written')
