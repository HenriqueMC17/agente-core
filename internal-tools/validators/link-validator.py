import os
import sys
import urllib.parse
import re

def detect_encoding(file_path):
    try:
        with open(file_path, "rb") as f:
            bom = f.read(2)
            if bom == b"\xff\xfe":
                return "utf-16-le"
            elif bom == b"\xfe\xff":
                return "utf-16-be"
            else:
                return "utf-8"
    except Exception:
        return "utf-8"

def find_markdown_links(content):
    links = []
    start_pos = 0
    while True:
        idx = content.find("](", start_pos)
        if idx == -1:
            break
            
        bracket_open = content.rfind("[", start_pos, idx)
        if bracket_open == -1:
            start_pos = idx + 2
            continue
            
        label = content[bracket_open + 1:idx]
        
        url_start = idx + 2
        balance = 1
        url_end = url_start
        while url_end < len(content) and balance > 0:
            char = content[url_end]
            if char == '(':
                balance += 1
            elif char == ')':
                balance -= 1
            url_end += 1
            
        if balance == 0:
            url = content[url_start:url_end - 1].strip()
            links.append((label, url))
            start_pos = url_end
        else:
            start_pos = idx + 2
            
    return links

def is_placeholder_or_external(link):
    if link.startswith("http://") or link.startswith("https://") or link.startswith("#") or link.startswith("mailto:"):
        return True
    if link in ("URL", "url", "...", "path/to/file", "finding_N_screenshot.png") or "URL" in link:
        return True
    if link.startswith("/") and not link.startswith("//") and not link.lower().startswith("/c:") and not link.lower().startswith("/dev"):
        return True
    if "docs/contributors/" in link or "tools/scripts/" in link:
        return True
    if re.search(r'[\*\[\]\^\$\?\\]', link):
        return True
    return False

def check_file_links(file_path, base_dir):
    if not os.path.exists(file_path):
        return []
        
    encoding = detect_encoding(file_path)
    try:
        with open(file_path, "r", encoding=encoding) as f:
            content = f.read()
    except Exception:
        return []
        
    links = find_markdown_links(content)
    broken = []
    
    for label, link in links:
        if is_placeholder_or_external(link):
            continue
            
        decoded_link = urllib.parse.unquote(link).strip("<> ")
        decoded_link = decoded_link.split("#")[0].split("?")[0]
        if not decoded_link:
            continue
            
        if decoded_link.lower().startswith("file:///"):
            clean_path = decoded_link[8:]
            if clean_path.lower().startswith("c:/dev/agente-core/") or clean_path.lower().startswith("c:\\dev\\agente-core\\"):
                sub = clean_path[19:]
                clean_path = os.path.join("c:\\Dev\\.agente-core", sub)
            full_target_path = os.path.abspath(clean_path)
        else:
            file_dir = os.path.dirname(file_path)
            full_target_path = os.path.abspath(os.path.join(file_dir, decoded_link))
            
        if not os.path.exists(full_target_path):
            broken.append((label, link, full_target_path))
            
    return broken

def main():
    strict_mode = "--strict" in sys.argv or "-Strict" in sys.argv
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    
    print("==================================================")
    print("🔗 INICIANDO VALIDAÇÃO DE LINKS DE MARROWD (AST)")
    print("==================================================")
    print(f"Diretório base: {base_dir}")
    print(f"Modo Estrito (Strict): {'ATIVADO' if strict_mode else 'DESATIVADO'}")
    
    total_files = 0
    total_broken = 0
    broken_summary = []
    
    for root, dirs, files in os.walk(base_dir):
        if ".git" in root or "node_modules" in root or "__pycache__" in root:
            continue
            
        rel_root = os.path.relpath(root, base_dir)
        if rel_root.startswith("modules"):
            continue
            
        for file in files:
            if file.endswith(".md"):
                total_files += 1
                full_path = os.path.join(root, file)
                broken = check_file_links(full_path, base_dir)
                if broken:
                    total_broken += len(broken)
                    rel_path = os.path.relpath(full_path, base_dir)
                    broken_summary.append((rel_path, broken))
                    
    print(f"\n- Total de arquivos de governança .md analisados: {total_files}")
    print(f"- Total de links quebrados encontrados: {total_broken}")
    
    if broken_summary:
        print("\n❌ Encontrados links quebrados nos seguintes arquivos de governança:")
        for rel_path, broken in broken_summary:
            print(f"\n📄 {rel_path}:")
            for label, link, target in broken:
                print(f"   - [{label}]({link}) -> Alvo não existe: {target}")
    else:
        print("\n✅ Nenhum link quebrado detectado na governança do ecossistema!")
        
    print("\n==================================================")
    if total_broken > 0 and strict_mode:
        print("❌ STATUS DA VALIDAÇÃO DE LINKS: FALHA (Strict Mode)")
        sys.exit(1)
    else:
        print("✅ STATUS DA VALIDAÇÃO DE LINKS: SUCESSO")
        sys.exit(0)

if __name__ == "__main__":
    main()
