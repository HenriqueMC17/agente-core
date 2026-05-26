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
        return None, "No YAML frontmatter found"
    
    yaml_text = fm_match.group(1)
    try:
        parsed = yaml.safe_load(yaml_text)
        if not isinstance(parsed, dict):
            return None, "Frontmatter is not a valid YAML mapping/object"
        return parsed, None
    except Exception as e:
        return None, f"YAML parsing error: {e}"

def validate_skill_file(skill_path):
    errors = []
    try:
        with open(skill_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return [f"Could not read file: {e}"]

    # Parse and validate frontmatter
    metadata, fm_err = parse_frontmatter(content)
    if fm_err:
        errors.append(fm_err)
    else:
        # Check required fields
        required_fields = ["name", "description", "category"]
        for field in required_fields:
            if field not in metadata or not metadata[field]:
                errors.append(f"Missing required metadata field: '{field}'")
        
        # Check description length
        desc = metadata.get("description", "")
        if desc and len(str(desc)) > 250:
            errors.append(f"Description is too long ({len(str(desc))} chars, max is 250)")

    # Check for '## When to Use' section
    if "## When to Use" not in content and "## When to use" not in content:
        errors.append("Missing required '## When to Use' section")

    return errors

def main():
    base_dir = find_repo_root(os.path.dirname(__file__))
    modules_dir = os.path.join(base_dir, "modules")
    
    print(f"🔍 Validating skills in: {modules_dir}")
    
    total_skills = 0
    skills_with_errors = 0
    total_errors = 0
    
    for root, dirs, files in os.walk(modules_dir):
        # Skip hidden directories
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        if "SKILL.md" in files:
            total_skills += 1
            skill_path = os.path.join(root, "SKILL.md")
            rel_path = os.path.relpath(skill_path, base_dir)
            
            errors = validate_skill_file(skill_path)
            if errors:
                skills_with_errors += 1
                total_errors += len(errors)
                print(f"❌ Errors in {rel_path}:")
                for err in errors:
                    print(f"   - {err}")
    
    print("\n📊 Validation Summary:")
    print(f"   Total Skills Scanned: {total_skills}")
    print(f"   Skills with Errors:   {skills_with_errors}")
    print(f"   Total Errors Found:   {total_errors}")
    
    # We allow a warning budget/loose checking for legacy compliance
    # But if there are failures, we fail the build if running in --strict mode
    strict_mode = "--strict" in sys.argv
    if strict_mode and total_errors > 0:
        print("\n❌ STRICT MODE: Validation failed.")
        sys.exit(1)
    
    print("\n✅ Skill validation complete.")
    sys.exit(0)

if __name__ == "__main__":
    main()
