# Classificação de Skills por Escopo (Global, Local e Workspace)

Com base na análise do diretório `skills` e dos arquivos `SKILL.md` de cada pasta (incluindo as recém-adicionadas do n8n), as skills foram reclassificadas considerando três escopos de atuação do agente:

**Critérios Definidos (Modelo de Arquitetura):**
- **Global**: Skills utilitárias de propósito geral (processamento de arquivos autônomos, geradores de código genérico e conversores) que não dependem do ambiente de desenvolvimento atual nem de regras de uma empresa específica.
- **Workspace**: Skills estruturais voltadas para o ecossistema de trabalho local do desenvolvedor/agente. Elas interagem diretamente com a infraestrutura, ferramentas, servidores ou esteiras de execução (ex: MCP, testes E2E locais, pipelines de automação).
- **Local**: Skills focadas nas regras de negócio, dominância de produto ou identidade corporativa do projeto em que o desenvolvedor atua. Fortemente acopladas a restrições, políticas de comunicação ou branding.

---

## 🌍 Skills Globais (Escopo Universal)
*Processamento de dados e geração de artefatos avulsos aplicáveis em qualquer lugar.*

1. **`algorithmic-art`** - Geração matemática de arte em p5.js.
2. **`canvas-design`** - Desenho e modelagem em canvas.
3. **`doc-coauthoring`** - Coautoria de textos genéricos.
4. **`docx`** - Criação, leitura e manipulação de documentos Word.
5. **`frontend-design`** - Design de interfaces e componentes independentes.
6. **`pdf`** - Extração e edição de arquivos PDF.
7. **`pptx`** - Elaboração e formatação de slides PowerPoint.
8. **`slack-gif-creator`** - Utilitário para geração de GIFs e reações para chat.
9. **`theme-factory`** - Criação de temas e paletas de cores.
10. **`web-artifacts-builder`** - Gerador rápido de componentes isolados web.
11. **`xlsx`** - Manipulação e análise estrutural de planilhas Excel.

---

## 💻 Skills Workspace (Escopo de Ferramental e Infraestrutura)
*Voltadas para turbinar o ambiente de trabalho e desenvolvimento contínuo (Testes, Metadados e Serviços).*

1. **`skill-creator`** - Meta-habilidade para o próprio agente criar e documentar novas skills contextuais dentro do seu cérebro.
2. **`mcp-builder`** - Estruturação de novos servidores MCP para interoperabilidade da máquina e ambiente do desenvolvedor.
3. **`webapp-testing`** - Interação e testes fim-a-fim em aplicações web que rodam em `localhost` usando Playwright.
4. **`n8n-skills` (Pacote de automação local/remoto)** - Conjunto de skills interligadas e voltadas diretamente à infraestrutura do n8n (Workspace):
   - `n8n-mcp-tools-expert` - Operação das ferramentas do servidor do n8n.
   - `n8n-node-configuration` / `n8n-workflow-patterns` - Padrões de infra de workflows.
   - `n8n-expression-syntax` / `n8n-validation-expert` - Regras do motor do n8n.
   - `n8n-code-javascript` / `n8n-code-python` - Execução nativa no ambiente do n8n.

---

## 🏢 Skills Locais (Escopo Corporativo / Negócio)
*Ferramentas restritas pela "personalidade" do projeto, regras institucionais e cultura.*

1. **`brand-guidelines`** - Validação e injeção de estilo e formatação, restringindo paletas e fontes à identidade corporativa parametrizada no projeto.
2. **`internal-comms`** - Geração de comunicados operacionais, adequados ao tom de voz local da organização ou processos internos.
