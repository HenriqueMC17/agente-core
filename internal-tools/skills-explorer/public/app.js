// ====================================================
// STATE MANAGEMENT & CONSTANTS
// ====================================================

let skills = [];
let filteredSkills = [];
let selectedSkill = null;
let originalContent = '';
let editedContent = '';
let aiGeneratedContent = '';

// NotebookLM Gateway state variables
let currentView = 'skills'; // 'skills' or 'notebooklm'
let notebookFiles = [];
let selectedNotebookFile = null;
let notebookOriginalContent = '';
let notebookEditedContent = '';
let notebookAiRefinedContent = '';

// New Premium features state
let riskFilter = '';
let gitStatusMap = {};
let notebookVariables = {};

// NotebookLM Refiner prompt presets
const REFINER_PRESETS = {
  'structure': 'Estruture este prompt para ser consumido por um LLM. Separe o papel (role), o contexto, a tarefa principal, as instruções passo-a-passo detalhadas e as restrições operacionais com títulos em markdown claros. Adicione clareza e precisão.',
  'systematize': 'Transforme este texto em um prompt de sistema de altíssimo nível para controle de IA. Defina a persona, regras inegociáveis do sandbox, árvore de decisões de raciocínio lógico e o formato estrito de saída esperado.',
  'condense': 'Otimize este prompt reduzindo redundâncias textuais e focando na concisão e na economia máxima de tokens de contexto de entrada para o NotebookLM, sem perder nenhuma restrição ou diretriz técnica relevante.',
  'examples': 'Gere 3 cenários práticos completos de entrada do usuário em blocos markdown para testar o comportamento deste prompt, apontando as respostas ideais esperadas da IA.'
};

// System prompt for skill adjustments
const SYSTEM_PROMPT = `Você é um engenheiro de IA de altíssimo nível especializado no framework corporativo "agente-core".
Sua tarefa é ajustar e aprimorar o manifesto SKILL.md fornecido de acordo com as instruções do usuário.
Você deve respeitar a estrutura existente de Clean Architecture, adendos constitucionais (como APCA, Bento layouts, Dark Mode Tri-Layer, regras de backend/database) se aplicável.

INSTRUÇÕES DE RETORNO SUPREMAS E CRÍTICAS:
1. Retorne APENAS o conteúdo bruto do arquivo markdown (SKILL.md) modificado.
2. NÃO adicione qualquer texto de introdução ou conclusão (ex: "Aqui está o arquivo alterado...").
3. NÃO envolva o arquivo inteiro em blocos de código com cercas de três crases (\`\`\`).
4. Retorne diretamente a primeira linha do markdown (ex: "# Nome da Habilidade") até o final do documento.`;

// Templates mappings
const TEMPLATE_PROMPTS = {
  'custom': '',
  'error-handling': 'Adicione uma seção completa de Tratamento de Erros e Exceções na skill, cobrando cenários de retries, limites de rate limit (como HTTP 429) e falhas de rede. Forneça exemplos de tratamentos práticos.',
  'examples': 'Enriqueça os exemplos práticos de payloads (JSON schema de entrada e saída) e adicione um snippet de implementação de referência completo em Python e Node.js.',
  'translate': 'Traduza todas as explicações, títulos e parágrafos descritivos para o Português (Brasil). Mantenha as assinaturas de funções, variáveis, comandos e trechos de código intactos no original.',
  'enrich': 'Expanda as seções de governança, regras operacionais da skill, limites do sandbox corporativo e conformidade técnica baseada nas diretivas do framework agente-core.',
  'refactor': 'Refatore a estrutura geral do manifesto para melhorar a legibilidade técnica, organizar os títulos e corrigir possíveis incoerências de formato.'
};

// ====================================================
// INITIALIZATION
// ====================================================

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Load API config from localStorage
  loadApiConfig();
  
  // Initialize Lucide Icons
  lucide.createIcons();
  
  // Register Event Listeners
  setupEventListeners();
  
  // Initial fetch of Git status
  fetchGitStatus();
  
  // Switch view to default
  switchView('skills');
}

function loadApiConfig() {
  const provider = localStorage.getItem('skills_explorer_provider') || 'gemini';
  const apiKey = localStorage.getItem('skills_explorer_key') || '';
  
  document.getElementById('llm-provider').value = provider;
  document.getElementById('api-key').value = apiKey;
}

function setupEventListeners() {
  // Save API config
  document.getElementById('save-api-config').addEventListener('click', saveApiConfig);
  
  // Tab switching (Skills View)
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));
  });
  
  // Search & Filters
  document.getElementById('search-input').addEventListener('input', handleSearch);
  document.getElementById('category-filter').addEventListener('change', handleSearch);
  
  // Risk filter button click
  const riskButtons = document.querySelectorAll('.risk-btn');
  riskButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      riskButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      riskFilter = e.target.getAttribute('data-risk');
      handleSearch();
    });
  });
  
  // Save File
  document.getElementById('btn-save-disk').addEventListener('click', saveSkillToDisk);
  
  // AI Playground Actions
  document.getElementById('ai-template').addEventListener('change', handleTemplateChange);
  document.getElementById('btn-run-ai').addEventListener('click', runAiAdjustment);
  document.getElementById('btn-ai-apply').addEventListener('click', applyAiAdjustments);
  document.getElementById('btn-ai-discard').addEventListener('click', discardAiAdjustments);
  
  // Reindex index trigger
  document.getElementById('trigger-reindex').addEventListener('click', triggerReindexing);
  
  // Sync editor character count & split preview
  document.getElementById('raw-editor').addEventListener('input', (e) => {
    editedContent = e.target.value;
    updateEditorCharCount();
    renderLiveSplitPreview();
  });

  // --- NotebookLM Gateway Events ---
  // Main View Navigation Toggles
  document.getElementById('nav-btn-skills').addEventListener('click', () => switchView('skills'));
  document.getElementById('nav-btn-notebooklm').addEventListener('click', () => switchView('notebooklm'));
  
  // Tab switching (NotebookLM View)
  const nbTabButtons = document.querySelectorAll('.tab-btn-nb');
  nbTabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTabNb(btn.getAttribute('data-tab-nb')));
  });

  // Notebook Editor actions
  document.getElementById('notebook-editor').addEventListener('input', (e) => {
    notebookEditedContent = e.target.value;
    updateNotebookCharCount();
    renderNotebookLivePreview();
    scanNotebookPromptVariables();
  });
  
  // Create / Save / Delete File
  document.getElementById('btn-new-notebook').addEventListener('click', createNewNotebookCard);
  document.getElementById('btn-start-notebook-prompt').addEventListener('click', createNewNotebookCard);
  document.getElementById('btn-save-notebook').addEventListener('click', saveNotebookFileToDisk);
  document.getElementById('btn-delete-notebook').addEventListener('click', deleteNotebookFileFromDisk);
  
  // Notebook variable compiler actions
  document.getElementById('btn-copy-compiled').addEventListener('click', copyCompiledPrompt);
  document.getElementById('btn-download-compiled').addEventListener('click', downloadCompiledPrompt);

  // Refiner Actions
  document.getElementById('refine-preset').addEventListener('change', handleRefinePresetChange);
  document.getElementById('btn-run-refiner').addEventListener('click', runNotebookPromptRefiner);
  document.getElementById('btn-refiner-apply').addEventListener('click', applyRefinedPrompt);
  document.getElementById('btn-refiner-discard').addEventListener('click', discardRefinedPrompt);
}

function saveApiConfig() {
  const provider = document.getElementById('llm-provider').value;
  const apiKey = document.getElementById('api-key').value.trim();
  
  localStorage.setItem('skills_explorer_provider', provider);
  localStorage.setItem('skills_explorer_key', apiKey);
  
  showConsoleMessage('Configurações de IA local salvas com sucesso.');
  
  // Flash visual response
  const btn = document.getElementById('save-api-config');
  const oldHtml = btn.innerHTML;
  btn.innerHTML = '<i data-lucide="check" class="icon-xs"></i> Salvo!';
  lucide.createIcons();
  setTimeout(() => {
    btn.innerHTML = oldHtml;
    lucide.createIcons();
  }, 1500);
}

function handleTemplateChange(e) {
  const template = e.target.value;
  const promptInput = document.getElementById('ai-prompt');
  
  if (template === 'custom') {
    promptInput.value = '';
    promptInput.placeholder = 'Ex: Adicione uma seção detalhando o tratamento de erros HTTP 429...';
  } else {
    promptInput.value = TEMPLATE_PROMPTS[template];
  }
}

// ====================================================
// CORE DATA FETCHING
// ====================================================

async function fetchSkillsList() {
  showConsoleMessage('Carregando catálogo de competências...');
  try {
    const res = await fetch('/api/skills');
    if (!res.ok) {
      const errMsg = await safeGetError(res);
      throw new Error(errMsg);
    }
    skills = await res.json();
    filteredSkills = [...skills];
    
    // Populate stats
    document.getElementById('stat-total-skills').innerText = skills.length;
    
    // Extract unique categories
    const categories = [...new Set(skills.map(s => s.category))].sort();
    document.getElementById('stat-categories').innerText = categories.length;
    
    // Populate categories filter select
    const catSelect = document.getElementById('category-filter');
    // Clear existing (except first)
    catSelect.innerHTML = '<option value="">Todas Categorias</option>';
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.innerText = cat;
      catSelect.appendChild(opt);
    });
    
    // Render list
    renderSkillsList();
    showConsoleMessage(`Catálogo carregado: ${skills.length} competências indexadas.`);
  } catch (err) {
    console.error(err);
    showConsoleMessage(`Erro: ${err.message}`, true);
    document.getElementById('skills-list').innerHTML = `
      <li class="text-xs text-muted" style="border-color: var(--color-rose); background-color: var(--color-rose-dim);">
        Falha ao ler o catálogo local. Certifique-se de que a indexação foi executada.
      </li>
    `;
  }
}

function renderSkillsList() {
  const listEl = document.getElementById('skills-list');
  listEl.innerHTML = '';
  
  if (filteredSkills.length === 0) {
    listEl.innerHTML = '<li class="text-xs text-muted">Nenhuma competência encontrada.</li>';
    return;
  }
  
  filteredSkills.forEach(skill => {
    const li = document.createElement('li');
    li.setAttribute('data-id', skill.id);
    if (selectedSkill && selectedSkill.id === skill.id) {
      li.classList.add('active');
    }
    
    // Check git status
    const skillFilePath = `${skill.path}/SKILL.md`.replace(/\\/g, '/');
    const gitStatus = gitStatusMap[skillFilePath];
    
    let gitBadgeHtml = '';
    if (gitStatus) {
      if (gitStatus === 'M') {
        li.classList.add('git-modified');
        gitBadgeHtml = '<span class="git-badge modified">MOD</span>';
      } else if (gitStatus === '??') {
        li.classList.add('git-untracked');
        gitBadgeHtml = '<span class="git-badge untracked">NEW</span>';
      } else {
        li.classList.add('git-modified');
        gitBadgeHtml = `<span class="git-badge modified">${gitStatus}</span>`;
      }
    }
    
    li.innerHTML = `
      <div class="skill-item-title" style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <span>${skill.name}</span>
        ${gitBadgeHtml}
      </div>
      <div class="skill-item-meta">
        <span class="mono">${skill.category}</span>
        <span class="mono text-xs ${skill.risk === 'critical' || skill.risk === 'offensive' ? 'text-accent' : ''}">${skill.risk}</span>
      </div>
    `;
    
    li.addEventListener('click', () => selectSkill(skill));
    listEl.appendChild(li);
  });
}

function fuzzyMatch(query, text) {
  if (!query) return true;
  if (!text) return false;
  query = query.toLowerCase();
  text = text.toLowerCase();
  
  let queryIdx = 0;
  for (let charIdx = 0; charIdx < text.length; charIdx++) {
    if (text[charIdx] === query[queryIdx]) {
      queryIdx++;
      if (queryIdx === query.length) return true;
    }
  }
  return false;
}

function handleSearch() {
  const text = document.getElementById('search-input').value.toLowerCase().trim();
  const category = document.getElementById('category-filter').value;
  
  filteredSkills = skills.filter(skill => {
    const matchText = fuzzyMatch(text, skill.name) || 
                      fuzzyMatch(text, skill.id) || 
                      (skill.description && fuzzyMatch(text, skill.description));
    const matchCategory = !category || skill.category === category;
    const matchRisk = !riskFilter || skill.risk === riskFilter;
    return matchText && matchCategory && matchRisk;
  });
  
  renderSkillsList();
}

// ====================================================
// SKILL DETAIL LOADING
// ====================================================

async function selectSkill(skill) {
  selectedSkill = skill;
  
  // Highlight in list
  const listItems = document.querySelectorAll('#skills-list li');
  listItems.forEach(li => {
    if (li.getAttribute('data-id') === skill.id) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });

  showConsoleMessage(`Lendo arquivo: ${skill.path}/SKILL.md`);
  
  try {
    const filePath = `${skill.path}/SKILL.md`;
    const res = await fetch(`/api/skill?path=${encodeURIComponent(filePath)}`);
    if (!res.ok) {
      const errMsg = await safeGetError(res);
      throw new Error(errMsg);
    }
    const data = await res.json();
    
    originalContent = data.content;
    editedContent = data.content;
    aiGeneratedContent = '';
    
    // Update UI elements
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('skill-detail-container').classList.remove('hidden');
    
    document.getElementById('skill-category').innerText = skill.category;
    document.getElementById('skill-title').innerText = skill.name;
    document.getElementById('skill-path').innerText = filePath;
    document.getElementById('editor-file-label').innerText = 'SKILL.md';
    
    // View Tab fields
    document.getElementById('skill-summary').innerText = skill.description || 'Nenhuma descrição no índice.';
    document.getElementById('meta-id').innerText = skill.id;
    document.getElementById('meta-type').innerText = skill.risk;
    document.getElementById('meta-fullpath').innerText = filePath;
    
    // Fill markdown viewer
    renderMarkdownViewer(originalContent);
    
    // Fill text editor
    document.getElementById('raw-editor').value = originalContent;
    updateEditorCharCount();
    renderLiveSplitPreview();
    
    // Reset AI panel inputs
    document.getElementById('ai-template').value = 'custom';
    document.getElementById('ai-prompt').value = '';
    document.getElementById('ai-output-stream').innerHTML = '';
    document.getElementById('ai-output-stream').setAttribute('data-placeholder', 'Aguardando envio do prompt...');
    document.getElementById('ai-response-actions').classList.add('hidden');
    
    // Disable diff tab
    document.getElementById('tab-diff-btn').disabled = true;
    
    // Auto-switch to Viewer Tab on change
    switchTab('tab-viewer');
    
    showConsoleMessage(`Arquivo carregado com sucesso.`);
  } catch (err) {
    console.error(err);
    showConsoleMessage(`Erro ao carregar skill: ${err.message}`, true);
  }
}

function updateEditorCharCount() {
  const count = editedContent.length;
  document.getElementById('editor-char-counter').innerText = `${count.toLocaleString()} caracteres`;
}

// Lightweight syntax highlighting engine
function highlightSyntax(code, lang) {
  lang = (lang || '').toLowerCase();
  
  // Escape html characters
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  if (lang === 'js' || lang === 'javascript' || lang === 'json' || lang === 'py' || lang === 'python' || lang === 'sh' || lang === 'bash' || lang === 'shell') {
    const items = [];
    
    // Comments
    escaped = escaped.replace(/(\/\/[^\n]*|#\s*[^\n]*|\/\*[\s\S]*?\*\/)/g, (match) => {
      const id = `__ITEM_${items.length}__`;
      items.push({ id, html: `<span class="syn-comm">${match}</span>` });
      return id;
    });
    
    // Strings (double quotes, single quotes, backticks)
    escaped = escaped.replace(/(["'`])(.*?)\1/g, (match, quote, content) => {
      const id = `__ITEM_${items.length}__`;
      items.push({ id, html: `<span class="syn-str">${match}</span>` });
      return id;
    });
    
    // Keywords
    const keywords = /\b(let|const|var|function|return|if|else|for|while|import|from|def|class|try|catch|throw|async|await|true|false|null|export|default|require|module|exports)\b/g;
    escaped = escaped.replace(keywords, '<span class="syn-key">$1</span>');
    
    // Numbers
    escaped = escaped.replace(/\b(\d+)\b/g, '<span class="syn-num">$1</span>');
    
    // Common types & built-ins
    const types = /\b(String|Number|Object|Array|Promise|console|print|sys|os|path|fs|process|Error|self|this|document|window|Math|JSON)\b/g;
    escaped = escaped.replace(types, '<span class="syn-type">$1</span>');
    
    // Restore comments and strings
    for (let k = items.length - 1; k >= 0; k--) {
      escaped = escaped.replace(items[k].id, items[k].html);
    }
  }
  
  return escaped;
}

// Convert markdown to HTML string (supporting code blocks with syntax highlighting)
function renderMarkdownToHtml(markdown) {
  if (!markdown) return '';
  
  // Basic parsing sanitization
  let html = markdown
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  // Code Blocks extraction
  const codeBlocks = [];
  
  // Match with specified language
  html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push({ lang: lang.trim(), code: code.trim() });
    return placeholder;
  });
  
  // Match fallback
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push({ lang: '', code: code.trim() });
    return placeholder;
  });
  
  // Parsing structural markdown elements
  html = html
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
    
  // Restore code blocks with syntax highlighting
  codeBlocks.forEach((block, idx) => {
    const rawCode = block.code
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
      
    const highlighted = highlightSyntax(rawCode, block.lang);
    html = html.replace(`__CODE_BLOCK_${idx}__`, `<pre><code class="language-${block.lang}">${highlighted}</code></pre>`);
  });
  
  return html;
}

function renderMarkdownViewer(markdown) {
  const container = document.getElementById('markdown-body');
  if (!markdown) {
    container.innerHTML = '<p class="text-muted">Nenhum conteúdo no arquivo.</p>';
    return;
  }
  container.innerHTML = renderMarkdownToHtml(markdown);
}

function renderLiveSplitPreview() {
  const container = document.getElementById('live-split-preview');
  if (!editedContent) {
    container.innerHTML = '<p class="text-muted">Nenhum conteúdo no editor.</p>';
    return;
  }
  container.innerHTML = renderMarkdownToHtml(editedContent);
}

function renderNotebookLivePreview() {
  const container = document.getElementById('notebook-live-preview');
  if (!notebookEditedContent) {
    container.innerHTML = '<p class="text-muted">Nenhum conteúdo no editor.</p>';
    return;
  }
  container.innerHTML = renderMarkdownToHtml(notebookEditedContent);
}

async function fetchGitStatus() {
  try {
    const res = await fetch('/api/git-status');
    if (!res.ok) {
      const errMsg = await safeGetError(res);
      throw new Error(errMsg);
    }
    gitStatusMap = await res.json();
    if (currentView === 'skills') {
      renderSkillsList();
    } else {
      renderNotebookFilesList();
    }
  } catch (err) {
    console.error('Error fetching git status:', err);
    gitStatusMap = {};
  }
}

// ====================================================
// FILESYSTEM ACTIONS
// ====================================================

async function saveSkillToDisk() {
  if (!selectedSkill) return;
  
  showConsoleMessage('Salvando alterações no disco...');
  try {
    const filePath = `${selectedSkill.path}/SKILL.md`;
    const res = await fetch('/api/save-skill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        path: filePath,
        content: editedContent
      })
    });
    
    if (!res.ok) {
      const errMsg = await safeGetError(res);
      throw new Error(errMsg);
    }
    
    const data = await res.json();
    originalContent = editedContent;
    
    // Refresh viewer content
    renderMarkdownViewer(originalContent);
    
    // Refresh Git Status
    fetchGitStatus();
    
    showConsoleMessage(`Salvo! Arquivo gravado no disco.${data.backedUp ? ' Backup criado (.bak).' : ''}`);
    
    // Flash visual checkmark in console bar
    const footer = document.querySelector('.app-footer');
    footer.style.backgroundColor = 'var(--color-emerald-dim)';
    setTimeout(() => {
      footer.style.backgroundColor = 'transparent';
    }, 1000);
    
  } catch (err) {
    console.error(err);
    showConsoleMessage(`Erro ao salvar no disco: ${err.message}`, true);
  }
}

async function triggerReindexing() {
  showConsoleMessage('Executando reindexação local (npm run index)...');
  const btn = document.getElementById('trigger-reindex');
  btn.classList.add('spinner');
  
  try {
    const res = await fetch('/api/reindex', { method: 'POST' });
    if (!res.ok) {
      const errMsg = await safeGetError(res);
      throw new Error(errMsg);
    }
    const data = await res.json();
    showConsoleMessage('Reindexação concluída com sucesso!');
    console.log(data.stdout);
    
    // Refresh Git status
    fetchGitStatus();
    
    // Reload list
    await fetchSkillsList();
  } catch (err) {
    console.error(err);
    showConsoleMessage(`Falha na reindexação: ${err.message}`, true);
  } finally {
    btn.classList.remove('spinner');
  }
}

// ====================================================
// INTERACTIVE AI ADJUSTMENT (ZERO-TOKENS PROXY ROUTE)
// ====================================================

async function runAiAdjustment() {
  const provider = document.getElementById('llm-provider').value;
  const apiKey = document.getElementById('api-key').value.trim();
  const promptInput = document.getElementById('ai-prompt').value.trim();
  
  if (!apiKey) {
    showConsoleMessage('Erro: Chave de API não informada no painel superior!', true);
    alert('Por favor, informe a sua API Key local no topo da página para fazer ajustes de IA gratuitos.');
    return;
  }
  
  if (!promptInput) {
    showConsoleMessage('Erro: O comando de instruções de ajuste está vazio.', true);
    return;
  }
  
  if (!selectedSkill) {
    showConsoleMessage('Erro: Nenhuma skill selecionada.', true);
    return;
  }
  
  // Set UI state
  const runBtn = document.getElementById('btn-run-ai');
  const statusEl = document.getElementById('ai-status');
  const outputEl = document.getElementById('ai-output-stream');
  const actionEl = document.getElementById('ai-response-actions');
  
  runBtn.disabled = true;
  statusEl.classList.remove('hidden');
  actionEl.classList.add('hidden');
  outputEl.removeAttribute('data-placeholder');
  outputEl.innerHTML = '';
  outputEl.classList.add('ai-cursor'); // Blinking stream cursor active
  
  showConsoleMessage(`Enviando prompt ao ${provider.toUpperCase()} via gateway local...`);
  
  // Build payload based on provider
  let url = '';
  let headers = { 'Content-Type': 'application/json' };
  let payload = {};
  
  const userPrompt = `Instruções de Ajuste solicitadas pelo usuário:
"${promptInput}"

Conteúdo Atual do arquivo (SKILL.md):
\`\`\`markdown
${editedContent}
\`\`\``;

  try {
    if (provider === 'gemini') {
      url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${apiKey}`;
      payload = {
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${SYSTEM_PROMPT}\n\n${userPrompt}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1
        }
      };
    } else if (provider === 'openai') {
      url = 'https://api.openai.com/v1/chat/completions';
      headers['Authorization'] = `Bearer ${apiKey}`;
      payload = {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.1,
        stream: true
      };
    } else if (provider === 'claude') {
      url = 'https://api.anthropic.com/v1/messages';
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
      payload = {
        model: 'claude-3-5-sonnet-latest',
        max_tokens: 8000,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.1,
        stream: true
      };
    }
    
    // Call the local proxy in server.js
    const response = await fetch('/api/proxy-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        headers,
        method: 'POST',
        data: payload
      })
    });
    
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Erro na API (${response.status}): ${errText}`);
    }
    
    // Read stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    aiGeneratedContent = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // Hold onto last unfinished line
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        
        // Parse according to provider stream format
        if (provider === 'claude') {
          if (trimmed.startsWith('data:')) {
            const dataStr = trimmed.substring(5).trim();
            if (dataStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.type === 'content_block_delta' && parsed.delta && parsed.delta.text) {
                appendStreamText(parsed.delta.text);
              }
            } catch (e) {}
          }
        } else if (provider === 'openai') {
          if (trimmed.startsWith('data:')) {
            const dataStr = trimmed.substring(5).trim();
            if (dataStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.choices && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                appendStreamText(parsed.choices[0].delta.content);
              }
            } catch (e) {}
          }
        } else if (provider === 'gemini') {
          // Gemini SSE stream lines start with "data: "
          if (trimmed.startsWith('data:')) {
            const dataStr = trimmed.substring(5).trim();
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.candidates && parsed.candidates[0].content && parsed.candidates[0].content.parts && parsed.candidates[0].content.parts[0].text) {
                appendStreamText(parsed.candidates[0].content.parts[0].text);
              }
            } catch (e) {}
          } else {
            // Check raw JSON array lines (fallback)
            try {
              const parsed = JSON.parse(trimmed);
              if (parsed.candidates && parsed.candidates[0].content && parsed.candidates[0].content.parts && parsed.candidates[0].content.parts[0].text) {
                appendStreamText(parsed.candidates[0].content.parts[0].text);
              }
            } catch (e) {}
          }
        }
      }
    }
    
    // Complete stream
    outputEl.classList.remove('ai-cursor'); // Turn off blinking streaming cursor
    runBtn.disabled = false;
    statusEl.classList.add('hidden');
    
    if (aiGeneratedContent.trim()) {
      actionEl.classList.remove('hidden');
      document.getElementById('tab-diff-btn').disabled = false;
      showConsoleMessage('Geração concluída. Revise e aplique as alterações.');
      
      // Build diff visual tab
      generateVisualDiff();
    } else {
      outputEl.setAttribute('data-placeholder', 'A API respondeu com sucesso, mas nenhum texto foi gerado. Verifique os logs.');
    }
    
  } catch (err) {
    console.error(err);
    outputEl.classList.remove('ai-cursor');
    runBtn.disabled = false;
    statusEl.classList.add('hidden');
    outputEl.innerHTML = `<span style="color:var(--color-rose)">Erro na operação: ${err.message}</span>`;
    showConsoleMessage(`Falha de processamento local: ${err.message}`, true);
  }
}

function appendStreamText(text) {
  const outputEl = document.getElementById('ai-output-stream');
  aiGeneratedContent += text;
  
  // Strip starting ```markdown block if LLM ignored system instruction
  let cleanText = aiGeneratedContent;
  if (cleanText.startsWith('```markdown')) {
    cleanText = cleanText.substring(11);
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.substring(3);
  }
  if (cleanText.endsWith('```')) {
    cleanText = cleanText.substring(0, cleanText.length - 3);
  }
  
  // Safe display (render raw code characters nicely)
  outputEl.textContent = cleanText.trim();
  outputEl.scrollTop = outputEl.scrollHeight; // Autoscroll
}

function applyAiAdjustments() {
  if (!aiGeneratedContent) return;
  
  let cleanText = aiGeneratedContent.trim();
  if (cleanText.startsWith('```markdown')) {
    cleanText = cleanText.substring(11);
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.substring(3);
  }
  if (cleanText.endsWith('```')) {
    cleanText = cleanText.substring(0, cleanText.length - 3);
  }
  cleanText = cleanText.trim();
  
  // Apply to text editor
  editedContent = cleanText;
  document.getElementById('raw-editor').value = editedContent;
  updateEditorCharCount();
  renderLiveSplitPreview();
  
  // Switch to Editor Tab to let user see
  switchTab('tab-editor');
  showConsoleMessage('Ajustes da IA aplicados ao editor. Clique em "Salvar no Disco" para consolidar.');
  
  // Hide actions since they are applied
  document.getElementById('ai-response-actions').classList.add('hidden');
}

function discardAiAdjustments() {
  aiGeneratedContent = '';
  document.getElementById('ai-output-stream').innerHTML = '';
  document.getElementById('ai-output-stream').setAttribute('data-placeholder', 'Aguardando envio do prompt...');
  document.getElementById('ai-response-actions').classList.add('hidden');
  document.getElementById('tab-diff-btn').disabled = true;
  showConsoleMessage('Ajustes da IA descartados.');
}

// ====================================================
// LCS VISUAL LINE DIFFING ENGINE
// ====================================================

function generateVisualDiff() {
  const container = document.getElementById('diff-view-body');
  container.innerHTML = '';
  
  let cleanGenerated = aiGeneratedContent.trim();
  if (cleanGenerated.startsWith('```markdown')) {
    cleanGenerated = cleanGenerated.substring(11);
  } else if (cleanGenerated.startsWith('```')) {
    cleanGenerated = cleanGenerated.substring(3);
  }
  if (cleanGenerated.endsWith('```')) {
    cleanGenerated = cleanGenerated.substring(0, cleanGenerated.length - 3);
  }
  cleanGenerated = cleanGenerated.trim();
  
  const oldLines = editedContent.split('\n');
  const newLines = cleanGenerated.split('\n');
  
  const diff = diffLines(oldLines, newLines);
  
  diff.forEach(item => {
    const lineEl = document.createElement('div');
    lineEl.className = `diff-line ${item.type}`;
    
    // Line number element
    const numEl = document.createElement('span');
    numEl.className = 'diff-line-num';
    
    if (item.type === 'added') {
      numEl.innerText = `+${item.newNum}`;
    } else if (item.type === 'removed') {
      numEl.innerText = `-${item.oldNum}`;
    } else {
      numEl.innerText = item.oldNum;
    }
    
    // Content element
    const contentEl = document.createElement('span');
    contentEl.className = 'diff-line-content';
    contentEl.textContent = item.val || ' '; // Keep empty line
    
    lineEl.appendChild(numEl);
    lineEl.appendChild(contentEl);
    container.appendChild(lineEl);
  });
}

function diffLines(oldLines, newLines) {
  const matrix = Array(oldLines.length + 1).fill().map(() => Array(newLines.length + 1).fill(0));
  
  for (let i = 1; i <= oldLines.length; i++) {
    for (let j = 1; j <= newLines.length; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1] + 1;
      } else {
        matrix[i][j] = Math.max(matrix[i - 1][j], matrix[i][j - 1]);
      }
    }
  }
  
  const diff = [];
  let i = oldLines.length;
  let j = newLines.length;
  
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      diff.unshift({ type: 'unchanged', val: oldLines[i - 1], oldNum: i, newNum: j });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || matrix[i][j - 1] >= matrix[i - 1][j])) {
      diff.unshift({ type: 'added', val: newLines[j - 1], oldNum: '', newNum: j });
      j--;
    } else if (i > 0 && (j === 0 || matrix[i][j - 1] < matrix[i - 1][j])) {
      diff.unshift({ type: 'removed', val: oldLines[i - 1], oldNum: i, newNum: '' });
      i--;
    }
  }
  
  return diff;
}

// ====================================================
// UTILITY FUNCTIONS
// ====================================================

function switchTab(tabId) {
  const contents = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-btn');
  
  contents.forEach(content => {
    if (content.id === tabId) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
  
  buttons.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // If moving to diff view, regenerate diff
  if (tabId === 'tab-diff') {
    generateVisualDiff();
  }
}

function showConsoleMessage(msg, isError = false) {
  const bar = document.getElementById('console-log-bar');
  bar.innerText = `// ${msg}`;
  if (isError) {
    bar.style.color = 'var(--color-rose)';
  } else {
    bar.style.color = 'var(--color-text-muted)';
  }
}

// ====================================================
// NOTEBOOKLM GATEWAY VIEW CONTROL & CRUD
// ====================================================

function switchView(viewName) {
  currentView = viewName;
  
  const skillsView = document.getElementById('skills-view');
  const notebookView = document.getElementById('notebooklm-view');
  const skillsBtn = document.getElementById('nav-btn-skills');
  const notebookBtn = document.getElementById('nav-btn-notebooklm');
  
  // Load Git status
  fetchGitStatus();
  
  if (viewName === 'skills') {
    skillsView.classList.remove('hidden');
    notebookView.classList.add('hidden');
    skillsBtn.classList.add('active');
    notebookBtn.classList.remove('active');
    
    // Load skills list if empty
    if (skills.length === 0) {
      fetchSkillsList();
    }
  } else {
    skillsView.classList.add('hidden');
    notebookView.classList.remove('hidden');
    skillsBtn.classList.remove('active');
    notebookBtn.classList.add('active');
    
    // Fetch files in prompts/notebooklm
    fetchNotebookFiles();
  }
}

async function fetchNotebookFiles() {
  showConsoleMessage('Carregando prompt cards do NotebookLM...');
  try {
    const res = await fetch('/api/notebooklm-files');
    if (!res.ok) {
      const errMsg = await safeGetError(res);
      throw new Error(errMsg);
    }
    notebookFiles = await res.json();
    renderNotebookFilesList();
    showConsoleMessage(`Carregados ${notebookFiles.length} prompt cards locais.`);
  } catch (err) {
    console.error(err);
    showConsoleMessage(`Erro: ${err.message}`, true);
  }
}

function renderNotebookFilesList() {
  const listEl = document.getElementById('notebook-files-list');
  listEl.innerHTML = '';
  
  if (notebookFiles.length === 0) {
    listEl.innerHTML = '<li class="text-xs text-muted">Nenhum prompt card salvo.</li>';
    return;
  }
  
  notebookFiles.forEach(file => {
    const li = document.createElement('li');
    li.setAttribute('data-name', file.name);
    if (selectedNotebookFile && selectedNotebookFile.name === file.name) {
      li.classList.add('active');
    }
    
    // Check git status
    const notebookFilePath = `prompts/notebooklm/${file.name}`.replace(/\\/g, '/');
    const gitStatus = gitStatusMap[notebookFilePath];
    
    let gitBadgeHtml = '';
    if (gitStatus) {
      if (gitStatus === 'M') {
        li.classList.add('git-modified');
        gitBadgeHtml = '<span class="git-badge modified">MOD</span>';
      } else if (gitStatus === '??') {
        li.classList.add('git-untracked');
        gitBadgeHtml = '<span class="git-badge untracked">NEW</span>';
      } else {
        li.classList.add('git-modified');
        gitBadgeHtml = `<span class="git-badge modified">${gitStatus}</span>`;
      }
    }
    
    // Format timestamp
    const date = new Date(file.mtime).toLocaleDateString('pt-BR');
    const sizeKb = (file.size / 1024).toFixed(1);
    
    li.innerHTML = `
      <div class="skill-item-title" style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        <span>${file.name.replace(/\.[^/.]+$/, "")}</span>
        ${gitBadgeHtml}
      </div>
      <div class="skill-item-meta">
        <span class="mono text-xs">${date}</span>
        <span class="mono text-xs">${sizeKb} KB</span>
      </div>
    `;
    
    li.addEventListener('click', () => selectNotebookFile(file));
    listEl.appendChild(li);
  });
}

async function selectNotebookFile(file) {
  selectedNotebookFile = file;
  
  // Highlight active card
  const listItems = document.querySelectorAll('#notebook-files-list li');
  listItems.forEach(li => {
    if (li.getAttribute('data-name') === file.name) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });

  showConsoleMessage(`Carregando prompt card: ${file.name}`);
  
  try {
    const res = await fetch(`/api/notebooklm-file?name=${encodeURIComponent(file.name)}`);
    if (!res.ok) {
      const errMsg = await safeGetError(res);
      throw new Error(errMsg);
    }
    
    const data = await res.json();
    notebookOriginalContent = data.content;
    notebookEditedContent = data.content;
    notebookAiRefinedContent = '';
    
    // Update fields
    document.getElementById('notebook-welcome-screen').classList.add('hidden');
    document.getElementById('notebook-detail-container').classList.remove('hidden');
    
    // Extract base name without extension
    const baseName = file.name.replace(/\.[^/.]+$/, "");
    document.getElementById('notebook-file-name').value = baseName;
    
    // Deduce category from name prefixes or select default
    document.getElementById('notebook-category').value = 'prompt';
    
    // Set Editor
    document.getElementById('notebook-editor').value = notebookEditedContent;
    updateNotebookCharCount();
    renderNotebookLivePreview();
    scanNotebookPromptVariables();
    
    // Reset AI Refiner fields
    document.getElementById('refine-preset').value = 'structure';
    document.getElementById('refine-instructions').value = '';
    document.getElementById('refiner-output').innerHTML = '';
    document.getElementById('refiner-output').setAttribute('data-placeholder', 'Aguardando início do refinamento...');
    document.getElementById('refiner-response-actions').classList.add('hidden');
    
    // Switch to editor tab
    switchTabNb('nb-tab-editor');
    showConsoleMessage('Prompt card carregado com sucesso.');
  } catch (err) {
    console.error(err);
    showConsoleMessage(`Erro: ${err.message}`, true);
  }
}

function createNewNotebookCard() {
  selectedNotebookFile = null;
  notebookOriginalContent = '';
  notebookEditedContent = '';
  notebookAiRefinedContent = '';
  
  // Highlight list none
  const listItems = document.querySelectorAll('#notebook-files-list li');
  listItems.forEach(li => li.classList.remove('active'));
  
  // Show editor container
  document.getElementById('notebook-welcome-screen').classList.add('hidden');
  document.getElementById('notebook-detail-container').classList.remove('hidden');
  
  // Clear fields
  const count = notebookFiles.length + 1;
  document.getElementById('notebook-file-name').value = `prompt_card_${count}`;
  document.getElementById('notebook-category').value = 'prompt';
  document.getElementById('notebook-editor').value = '';
  updateNotebookCharCount();
  renderNotebookLivePreview();
  scanNotebookPromptVariables();
  
  // Reset AI refiner
  document.getElementById('refine-preset').value = 'structure';
  document.getElementById('refine-instructions').value = '';
  document.getElementById('refiner-output').innerHTML = '';
  document.getElementById('refiner-output').setAttribute('data-placeholder', 'Aguardando início do refinamento...');
  document.getElementById('refiner-response-actions').classList.add('hidden');
  
  switchTabNb('nb-tab-editor');
  showConsoleMessage('Novo card criado. Dê um título e salve no disco.');
}

async function saveNotebookFileToDisk() {
  let name = document.getElementById('notebook-file-name').value.trim();
  const content = document.getElementById('notebook-editor').value;
  
  if (!name) {
    showConsoleMessage('Erro: O nome do arquivo não pode ser vazio.', true);
    alert('Por favor, defina um nome para o arquivo do prompt.');
    return;
  }
  
  // Sanitize name
  name = name.replace(/[^a-zA-Z0-9-_\.]/g, '_');
  if (!name.endsWith('.md') && !name.endsWith('.txt')) {
    name += '.md';
  }
  
  showConsoleMessage(`Salvando prompt card "${name}" no disco...`);
  
  try {
    const res = await fetch('/api/save-notebooklm-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        content
      })
    });
    
    if (!res.ok) {
      const errMsg = await safeGetError(res);
      throw new Error(errMsg);
    }
    
    const data = await res.json();
    notebookOriginalContent = content;
    
    // Select the saved file
    selectedNotebookFile = { name: data.name };
    fetchGitStatus();
    showConsoleMessage(`Salvo! Card gravado em prompts/notebooklm/${data.name}`);
    
    // Flash visual checkmark in console bar
    const footer = document.querySelector('.app-footer');
    footer.style.backgroundColor = 'var(--color-emerald-dim)';
    setTimeout(() => {
      footer.style.backgroundColor = 'transparent';
    }, 1000);
    
    // Reload files
    await fetchNotebookFiles();
  } catch (err) {
    console.error(err);
    showConsoleMessage(`Falha ao salvar card: ${err.message}`, true);
  }
}

async function deleteNotebookFileFromDisk() {
  if (!selectedNotebookFile) return;
  
  const confirmDel = confirm(`Tem certeza que deseja excluir o prompt card "${selectedNotebookFile.name}"? Esta ação é irreversível.`);
  if (!confirmDel) return;
  
  showConsoleMessage(`Excluindo card "${selectedNotebookFile.name}"...`);
  
  try {
    const res = await fetch('/api/delete-notebooklm-file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: selectedNotebookFile.name
      })
    });
    
    if (!res.ok) {
      const errMsg = await safeGetError(res);
      throw new Error(errMsg);
    }
    
    selectedNotebookFile = null;
    document.getElementById('notebook-welcome-screen').classList.remove('hidden');
    document.getElementById('notebook-detail-container').classList.add('hidden');
    
    showConsoleMessage('Prompt card excluído com sucesso.');
    
    // Reload files
    await fetchNotebookFiles();
  } catch (err) {
    console.error(err);
    showConsoleMessage(`Erro ao excluir card: ${err.message}`, true);
  }
}

function updateNotebookCharCount() {
  const count = notebookEditedContent.length;
  document.getElementById('notebook-char-counter').innerText = `${count.toLocaleString()} caracteres`;
}

function switchTabNb(tabId) {
  const contents = document.querySelectorAll('.tab-content-nb');
  const buttons = document.querySelectorAll('.tab-btn-nb');
  
  contents.forEach(content => {
    if (content.id === tabId) {
      content.classList.add('active');
      content.style.display = 'flex';
    } else {
      content.classList.remove('active');
      content.style.display = 'none';
    }
  });
  
  buttons.forEach(btn => {
    if (btn.getAttribute('data-tab-nb') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// ====================================================
// AI PROMPT REFINER (ZERO-TOKENS)
// ====================================================

function handleRefinePresetChange(e) {
  const preset = e.target.value;
  const instructionInput = document.getElementById('refine-instructions');
  
  if (preset === 'structure') {
    instructionInput.placeholder = 'Ex: Adicione títulos em markdown claros...';
  } else if (preset === 'systematize') {
    instructionInput.placeholder = 'Ex: Foque na persona e nas regras operacionais...';
  } else if (preset === 'condense') {
    instructionInput.placeholder = 'Ex: Reduza ao máximo mantendo o foco técnico...';
  } else {
    instructionInput.placeholder = 'Ex: Crie payloads de mock para cenários extremos...';
  }
}

async function runNotebookPromptRefiner() {
  const provider = document.getElementById('llm-provider').value;
  const apiKey = document.getElementById('api-key').value.trim();
  const preset = document.getElementById('refine-preset').value;
  const customInstructions = document.getElementById('refine-instructions').value.trim();
  
  if (!apiKey) {
    showConsoleMessage('Erro: Chave de API não informada no painel superior!', true);
    alert('Por favor, informe a sua API Key local no topo da página para usar o refinador de IA.');
    return;
  }
  
  const textToRefine = notebookEditedContent.trim();
  if (!textToRefine) {
    showConsoleMessage('Erro: Não há conteúdo para refinar.', true);
    return;
  }
  
  const runBtn = document.getElementById('btn-run-refiner');
  const statusEl = document.getElementById('refiner-status');
  const outputEl = document.getElementById('refiner-output');
  const actionEl = document.getElementById('refiner-response-actions');
  
  runBtn.disabled = true;
  statusEl.classList.remove('hidden');
  actionEl.classList.add('hidden');
  outputEl.removeAttribute('data-placeholder');
  outputEl.innerHTML = '';
  outputEl.classList.add('ai-cursor');
  
  showConsoleMessage(`Refinando prompt via ${provider.toUpperCase()}...`);
  
  // Build refinement instructions
  const refineAction = REFINER_PRESETS[preset];
  const userPrompt = `Texto do prompt original:
\`\`\`markdown
${textToRefine}
\`\`\`

Ação do refinador solicitada:
"${refineAction}"
${customInstructions ? `\nInstruções específicas do usuário:\n"${customInstructions}"` : ''}`;

  const SYSTEM_REFINER = `Você é um engenheiro de prompts sênior de alto nível especializado em otimizar contexto para o Google NotebookLM e Large Language Models.
Sua missão é refinar, estruturar, e aprimorar o prompt do usuário com foco técnico supremo.
Retorne APENAS o conteúdo final do prompt refinado em markdown completo.
NÃO use blocos de código com cercas de três crases (\`\`\`) envolvendo o prompt inteiro. Retorne o texto bruto do prompt.`;

  let url = '';
  let headers = { 'Content-Type': 'application/json' };
  let payload = {};
  
  try {
    if (provider === 'gemini') {
      url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${apiKey}`;
      payload = {
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${SYSTEM_REFINER}\n\n${userPrompt}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.15
        }
      };
    } else if (provider === 'openai') {
      url = 'https://api.openai.com/v1/chat/completions';
      headers['Authorization'] = `Bearer ${apiKey}`;
      payload = {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_REFINER },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.15,
        stream: true
      };
    } else if (provider === 'claude') {
      url = 'https://api.anthropic.com/v1/messages';
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
      payload = {
        model: 'claude-3-5-sonnet-latest',
        max_tokens: 8000,
        system: SYSTEM_REFINER,
        messages: [
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.15,
        stream: true
      };
    }
    
    const response = await fetch('/api/proxy-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        headers,
        method: 'POST',
        data: payload
      })
    });
    
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Erro na API (${response.status}): ${errText}`);
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    notebookAiRefinedContent = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        
        if (provider === 'claude') {
          if (trimmed.startsWith('data:')) {
            const dataStr = trimmed.substring(5).trim();
            if (dataStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.type === 'content_block_delta' && parsed.delta && parsed.delta.text) {
                appendRefinerStreamText(parsed.delta.text);
              }
            } catch (e) {}
          }
        } else if (provider === 'openai') {
          if (trimmed.startsWith('data:')) {
            const dataStr = trimmed.substring(5).trim();
            if (dataStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.choices && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                appendRefinerStreamText(parsed.choices[0].delta.content);
              }
            } catch (e) {}
          }
        } else if (provider === 'gemini') {
          if (trimmed.startsWith('data:')) {
            const dataStr = trimmed.substring(5).trim();
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.candidates && parsed.candidates[0].content && parsed.candidates[0].content.parts && parsed.candidates[0].content.parts[0].text) {
                appendRefinerStreamText(parsed.candidates[0].content.parts[0].text);
              }
            } catch (e) {}
          } else {
            try {
              const parsed = JSON.parse(trimmed);
              if (parsed.candidates && parsed.candidates[0].content && parsed.candidates[0].content.parts && parsed.candidates[0].content.parts[0].text) {
                appendRefinerStreamText(parsed.candidates[0].content.parts[0].text);
              }
            } catch (e) {}
          }
        }
      }
    }
    
    outputEl.classList.remove('ai-cursor');
    runBtn.disabled = false;
    statusEl.classList.add('hidden');
    
    if (notebookAiRefinedContent.trim()) {
      actionEl.classList.remove('hidden');
      showConsoleMessage('Refinamento concluído. Revise e aplique as alterações.');
    } else {
      outputEl.setAttribute('data-placeholder', 'Nenhum texto retornado pelo refinador.');
    }
    
  } catch (err) {
    console.error(err);
    outputEl.classList.remove('ai-cursor');
    runBtn.disabled = false;
    statusEl.classList.add('hidden');
    outputEl.innerHTML = `<span style="color:var(--color-rose)">Erro na operação: ${err.message}</span>`;
    showConsoleMessage(`Falha de refinamento: ${err.message}`, true);
  }
}

function appendRefinerStreamText(text) {
  const outputEl = document.getElementById('refiner-output');
  notebookAiRefinedContent += text;
  
  let cleanText = notebookAiRefinedContent;
  if (cleanText.startsWith('```markdown')) {
    cleanText = cleanText.substring(11);
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.substring(3);
  }
  if (cleanText.endsWith('```')) {
    cleanText = cleanText.substring(0, cleanText.length - 3);
  }
  
  outputEl.textContent = cleanText.trim();
  outputEl.scrollTop = outputEl.scrollHeight;
}

function applyRefinedPrompt() {
  if (!notebookAiRefinedContent) return;
  
  let cleanText = notebookAiRefinedContent.trim();
  if (cleanText.startsWith('```markdown')) {
    cleanText = cleanText.substring(11);
  } else if (cleanText.startsWith('```')) {
    cleanText = cleanText.substring(3);
  }
  if (cleanText.endsWith('```')) {
    cleanText = cleanText.substring(0, cleanText.length - 3);
  }
  cleanText = cleanText.trim();
  
  notebookEditedContent = cleanText;
  document.getElementById('notebook-editor').value = notebookEditedContent;
  updateNotebookCharCount();
  renderNotebookLivePreview();
  scanNotebookPromptVariables();
  
  switchTabNb('nb-tab-editor');
}

// ====================================================
// PROMPT VARIABLES FORM INJECTOR & DYNAMIC COMPILER
// ====================================================

function scanNotebookPromptVariables() {
  const text = notebookEditedContent || '';
  const regex = /\{\{([a-zA-Z0-9_-]+)\}\}/g;
  let match;
  const variables = new Set();
  
  while ((match = regex.exec(text)) !== null) {
    variables.add(match[1]);
  }
  
  const container = document.getElementById('variables-inputs-container');
  
  if (variables.size === 0) {
    container.innerHTML = '<p class="text-xs text-muted mono">Nenhuma variável detectada no prompt. Escreva {{nome_da_variavel}} no seu rascunho de texto.</p>';
    notebookVariables = {};
    compileNotebookPrompt();
    return;
  }
  
  // Retain existing values of variables, discard deleted ones, initialize new ones with empty string
  const newNotebookVariables = {};
  variables.forEach(v => {
    newNotebookVariables[v] = notebookVariables[v] || '';
  });
  notebookVariables = newNotebookVariables;
  
  // Render fields
  container.innerHTML = '';
  variables.forEach(v => {
    const field = document.createElement('div');
    field.className = 'variable-field';
    
    const label = document.createElement('label');
    label.innerText = v.toUpperCase().replace(/_/g, ' ');
    label.className = 'mono text-xs text-muted';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'input-text text-sm';
    input.placeholder = `Inserir valor para ${v}...`;
    input.value = notebookVariables[v];
    
    input.addEventListener('input', (e) => {
      notebookVariables[v] = e.target.value;
      compileNotebookPrompt();
    });
    
    field.appendChild(label);
    field.appendChild(input);
    container.appendChild(field);
  });
  
  compileNotebookPrompt();
}

function compileNotebookPrompt() {
  let compiledText = notebookEditedContent || '';
  
  for (const [key, value] of Object.entries(notebookVariables)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    compiledText = compiledText.replace(regex, value);
  }
  
  document.getElementById('compiled-prompt-output').value = compiledText;
}

function copyCompiledPrompt() {
  const output = document.getElementById('compiled-prompt-output');
  output.select();
  document.execCommand('copy');
  
  showConsoleMessage('Prompt compilado copiado para a área de transferência.');
  
  const btn = document.getElementById('btn-copy-compiled');
  const oldHtml = btn.innerHTML;
  btn.innerHTML = '<i data-lucide="check" class="icon-xs"></i> Copiado!';
  lucide.createIcons();
  setTimeout(() => {
    btn.innerHTML = oldHtml;
    lucide.createIcons();
  }, 1500);
}

function downloadCompiledPrompt() {
  const compiledText = document.getElementById('compiled-prompt-output').value;
  if (!compiledText) {
    alert('Nenhum prompt compilado para baixar.');
    return;
  }
  
  let filename = document.getElementById('notebook-file-name').value.trim();
  if (!filename) filename = 'prompt';
  filename = filename.replace(/\.[^/.]+$/, "") + '_compilado.md';
  
  const blob = new Blob([compiledText], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showConsoleMessage(`Prompt compilado baixado como "${filename}".`);
  showConsoleMessage('Prompt refinado aplicado no editor. Não esqueça de salvar no disco!');
  document.getElementById('refiner-response-actions').classList.add('hidden');
}

function discardRefinedPrompt() {
  notebookAiRefinedContent = '';
  document.getElementById('refiner-output').innerHTML = '';
  document.getElementById('refiner-output').setAttribute('data-placeholder', 'Aguardando início do refinamento...');
  document.getElementById('refiner-response-actions').classList.add('hidden');
  showConsoleMessage('Ajustes do refinador descartados.');
}

async function safeGetError(res) {
  try {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const errData = await res.json();
      return errData.error || errData.message || `Erro ${res.status}`;
    }
  } catch (e) {}
  try {
    const text = await res.text();
    return text.substring(0, 100) || `Erro ${res.status}`;
  } catch (e) {}
  return `Erro ${res.status}`;
}
