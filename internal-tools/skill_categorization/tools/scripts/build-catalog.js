const fs = require('fs');
const path = require('path');

function findRepoRoot(startDir) {
    let current = path.resolve(startDir);
    while (true) {
        if (fs.existsSync(path.join(current, 'AGENTS.md')) || fs.existsSync(path.join(current, '.git'))) {
            return current;
        }
        const parent = path.dirname(current);
        if (parent === current) {
            return path.resolve(startDir);
        }
        current = parent;
    }
}

function main() {
    const repoRoot = findRepoRoot(__dirname);
    const indexFile = path.join(repoRoot, 'modules', 'skills_index.json');
    const catalogFile = path.join(repoRoot, 'modules', 'CATALOG.md');

    console.log(`🏗️ Building catalog from: ${indexFile}`);

    if (!fs.existsSync(indexFile)) {
        console.error(`❌ Index file not found at: ${indexFile}. Please run the index script first.`);
        process.exit(1);
    }

    let skills = [];
    try {
        const data = fs.readFileSync(indexFile, 'utf8');
        skills = JSON.parse(data);
    } catch (e) {
        console.error(`❌ Error reading or parsing index file: ${e.message}`);
        process.exit(1);
    }

    // Group skills by category
    const grouped = {};
    skills.forEach(skill => {
        const cat = skill.category || 'uncategorized';
        if (!grouped[cat]) {
            grouped[cat] = [];
        }
        grouped[cat].push(skill);
    });

    // Generate Markdown
    let content = `# 📚 Catálogo Geral de Competências (Skills)\n\n`;
    content += `Este catálogo é gerado de forma autônoma a partir do índice de competências do repositório. Contém um total de **${skills.length}** competências cognitivas indexadas e disponíveis.\n\n`;
    content += `---\n\n`;

    // Sort categories alphabetically
    const categories = Object.keys(grouped).sort();
    
    categories.forEach(cat => {
        const catName = cat.replace(/-/g, ' ').toUpperCase();
        content += `## 📁 ${catName} (${grouped[cat].length} skills)\n\n`;
        content += `| Skill Name | Description | Risk | Source | Path |\n`;
        content += `| :--- | :--- | :--- | :--- | :--- |\n`;

        // Sort skills within category alphabetically by name
        const catSkills = grouped[cat].sort((a, b) => a.name.localeCompare(b.name));
        
        catSkills.forEach(s => {
            const skillName = s.name || s.id;
            const desc = s.description || 'No description available.';
            const risk = s.risk || 'unknown';
            const source = s.source || 'unknown';
            
            // Clean description of pipe symbols to not break the Markdown table
            const cleanDesc = desc.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
            const cleanPath = s.path ? `[${s.id}](file:///c:/Dev/agente-core/${s.path})` : s.id;

            content += `| **${skillName}** | ${cleanDesc} | \`${risk}\` | ${source} | ${cleanPath} |\n`;
        });
        
        content += `\n`;
    });

    try {
        fs.writeFileSync(catalogFile, content, 'utf8');
        console.log(`✅ Catalog generated successfully with ${skills.length} skills at: ${catalogFile}`);
        process.exit(0);
    } catch (e) {
        console.error(`❌ Error writing catalog file: ${e.message}`);
        process.exit(1);
    }
}

main();
