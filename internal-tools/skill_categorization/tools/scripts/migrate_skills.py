import os
import re
import sys
import yaml

# Ensure UTF-8 output for Windows compatibility
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

def find_repo_root(start_path):
    current = os.path.abspath(start_path)
    while True:
        if os.path.exists(os.path.join(current, "AGENTS.md")) or os.path.exists(os.path.join(current, ".git")):
            return current
        parent = os.path.dirname(current)
        if parent == current:
            return os.path.abspath(start_path)
        current = parent

def parse_frontmatter(content):
    fm_match = re.search(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
    if not fm_match:
        return None, None, "No YAML frontmatter found"
    
    yaml_text = fm_match.group(1)
    try:
        parsed = yaml.safe_load(yaml_text)
        if not isinstance(parsed, dict):
            return None, None, "Frontmatter is not a valid YAML mapping"
        return parsed, fm_match.group(0), None
    except Exception as e:
        return None, None, f"YAML parsing error: {e}"

def fix_description(desc):
    if not desc or len(str(desc)) <= 250:
        return desc, None
    
    original = str(desc)
    # Truncate to 247 chars and add ...
    truncated = original[:247]
    last_space = truncated.rfind(' ')
    if last_space > 200:
        truncated = truncated[:last_space]
    truncated += "..."
    return truncated, original

def process_file(skill_path, base_dir, dry_run=True):
    try:
        with open(skill_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {skill_path}: {e}")
        return False

    metadata, fm_block, err = parse_frontmatter(content)
    if err:
        print(f"Skipping {skill_path}: {err}")
        return False

    dirty = False
    log_msgs = []

    # 1. Determine Category
    rel_from_modules = os.path.relpath(os.path.dirname(skill_path), os.path.join(base_dir, "modules"))
    parts = rel_from_modules.split(os.sep)
    
    if len(parts) >= 2:
        category_suggested = parts[0]
    else:
        category_suggested = parts[0] if parts[0] else "uncategorized"

    if "category" not in metadata or not metadata["category"]:
        metadata["category"] = category_suggested
        dirty = True
        log_msgs.append(f"Added category: '{category_suggested}'")

    # 2. Check description length
    desc = metadata.get("description", "")
    new_desc, long_desc = fix_description(desc)
    if long_desc:
        metadata["description"] = new_desc
        dirty = True
        log_msgs.append(f"Truncated description (original length: {len(long_desc)})")
        
        # Check if the long description (or its first 50 chars) is already in the body
        search_snippet = long_desc[:50]
        second_fm = content.find("---", 3)
        body_content = content[second_fm:] if second_fm != -1 else content
        
        if search_snippet not in body_content:
            overview_pos = content.find("## Overview")
            if overview_pos == -1:
                overview_pos = content.find("## Description")
            
            if overview_pos != -1:
                # Insert it right below the "## Overview" header
                eol = content.find("\n", overview_pos)
                if eol != -1:
                    eol += 1
                    content = content[:eol] + long_desc + "\n\n" + content[eol:]
                    log_msgs.append("Prepended long description to existing ## Overview section")
            else:
                # Create a new ## Overview section at the very beginning of the body
                body_start = second_fm + 3 if second_fm != -1 else 0
                overview_section = f"\n\n# {metadata.get('name', 'Skill').title()}\n\n## Overview\n{long_desc}\n"
                content = content[:body_start] + overview_section + content[body_start:]
                log_msgs.append("Created new ## Overview section with the long description")

    # 3. Check for '## When to Use' section
    if "## When to Use" not in content and "## When to use" not in content:
        log_msgs.append("Added '## When to Use' section")
        dirty = True
        when_to_use_boilerplate = f"\n\n## When to Use\nUse this skill when you need to perform operations related to {metadata.get('name', 'this component')}."
        content += when_to_use_boilerplate

    # 4. Check if frontmatter formatting needs standardization (single-line values)
    new_fm_text = yaml.safe_dump(metadata, allow_unicode=True, default_flow_style=False, sort_keys=False, width=1000)
    new_fm_block = "---\n" + new_fm_text + "---"
    if new_fm_block.strip() != fm_block.strip():
        dirty = True
        log_msgs.append("Standardized frontmatter YAML formatting (single-line values)")

    if dirty:
        print(f"[{'DRY RUN' if dry_run else 'FIXED'}] {os.path.relpath(skill_path, base_dir)}")
        for msg in log_msgs:
            print(f"  - {msg}")
        
        if not dry_run:
            new_content = "---\n" + new_fm_text + "---\n" + content[content.find("---", 3)+3:].lstrip()
            try:
                with open(skill_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
            except Exception as e:
                print(f"  Error writing file: {e}")
                return False
        return True
    return False

def main():
    base_dir = find_repo_root(os.path.dirname(__file__))
    dry_run = "--run" not in sys.argv
    single_file = None
    
    for i, arg in enumerate(sys.argv):
        if arg == "--file" and i + 1 < len(sys.argv):
            single_file = sys.argv[i+1]

    if single_file:
        file_path = os.path.abspath(single_file)
        if os.path.exists(file_path):
            process_file(file_path, base_dir, dry_run=dry_run)
        else:
            print(f"File not found: {file_path}")
        return

    modules_dir = os.path.join(base_dir, "modules")
    print(f"Scanning skills in {modules_dir}...")
    fixed_count = 0
    
    for root, dirs, files in os.walk(modules_dir):
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        if "SKILL.md" in files:
            skill_path = os.path.join(root, "SKILL.md")
            if process_file(skill_path, base_dir, dry_run=dry_run):
                fixed_count += 1
                
    print(f"\nDone. Total files processed: {fixed_count}")
    if dry_run:
        print("This was a dry run. Run with '--run' to apply changes.")

if __name__ == "__main__":
    main()