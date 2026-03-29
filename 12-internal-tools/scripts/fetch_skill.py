import os
import sys
import shutil
import argparse
from pathlib import Path

def find_root():
    """Returns the absolute path to the .agent-senior-fullstack root directory."""
    script_dir = Path(__file__).resolve().parent
    return script_dir.parent.parent

def search_skills(root_dir, keyword):
    skills_dir = root_dir / "09-skills"
    kb_dir = root_dir / "05-knowledge-base"
    
    matches = []
    
    # Busca recursiva simples em 09-skills
    if skills_dir.exists():
        for path in skills_dir.rglob("*"):
            if keyword.lower() in path.name.lower():
                matches.append(path)
                
    # Busca recursiva em 05-knowledge-base
    if kb_dir.exists():
        for path in kb_dir.rglob("*"):
            if keyword.lower() in path.name.lower():
                matches.append(path)
                
    return matches

def main():
    parser = argparse.ArgumentParser(description="Importa dinamicamente uma skill do repositório central para o subagente local.")
    parser.add_argument("keyword", help="Nome ou palavra-chave da skill (ex: 'react', 'fastapi', 'docker')")
    parser.add_argument("--dest", default=".local-skills", help="Pasta de destino local no workspace atual (padrão: .local-skills)")
    args = parser.parse_args()
    
    root_dir = find_root()
    matches = search_skills(root_dir, args.keyword)
    
    if not matches:
        print(f"❌ Nenhuma skill encontrada para '{args.keyword}' no repositório {root_dir}.")
        print("Tente termos mais genéricos ou verifique a pasta 09-skills diretamente via explorador.")
        sys.exit(1)
        
    # Filtra as correspondências: preferimos pastas antes de arquivos se houver colisão de nomes,
    # e caminhos mais curtos (módulos raiz da skill) em vez de subarquivos da mesma skill.
    matches.sort(key=lambda x: (not x.is_dir(), len(x.parts)))
    best_match = matches[0]
    
    print(f"🔍 Encontradas {len(matches)} correspondências no total para '{args.keyword}'.")
    print(f"🎯 Selecionando a mais relevante: {best_match.relative_to(root_dir)}")
    
    dest_dir = Path.cwd() / args.dest
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    dest_path = dest_dir / best_match.name
    
    try:
        if best_match.is_dir():
            if dest_path.exists():
                print(f"⚠️ A pasta '{dest_path.name}' já existia em {dest_dir}. Substituindo...")
                shutil.rmtree(dest_path)
            shutil.copytree(best_match, dest_path)
            print(f"✅ Diretório '{best_match.name}' importado com sucesso para {dest_path}")
        else:
            shutil.copy2(best_match, dest_path)
            print(f"✅ Arquivo '{best_match.name}' importado com sucesso para {dest_path}")
            
        print("\n💡 Instrução para a IA: Você já pode ler os arquivos recém-copiados para obter todo o contexto da skill!")
        
    except Exception as e:
        print(f"❌ Erro ao importar a skill: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
