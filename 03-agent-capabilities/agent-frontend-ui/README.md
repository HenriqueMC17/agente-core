# 🎨 Workspace: Agente Especialista Frontend UI/UX

Este é um workspace isolado e ultraleve dedicado ao desenvolvimento Frontend.

## 🎯 Por que Isolado?
Para evitar poluição de contexto e consumo excessivo de tokens pelo LLM, este ambiente contém **exatamente e apenas** o que é necessário para construir interfaces (UI), gerir estado global no cliente, e aplicar estilizacões. Não existem regras de banco de dados, middlewares de backend ou microsserviços pesados carregados nativamente aqui.

## 🛠 Como trabalhar neste nível?
Abra esta pasta diretamente no Cursor ou em sua IDE com IA (*Open Folder* -> `subagents/agent-frontend-ui`). A IDE lerá o arquivo `.cursorrules` focado e entenderá perfeitamente seu papel isolado no fluxo.

## 📥 Busca de Conhecimento Dinâmico (fetch_skill)
Caso a IA ou você precisem resolver um problema front-end muito específico que demanda heurísticas complexas (ex: WebGL avançado, D3.js, ou novas metodologias de testes), **NÃO duplique o conhecimento**. Em vez disso, puxe a skill temporariamente do repositório mestre usando a ferramenta fornecida.

### Usando o Script de Busca
No terminal desta mesma pasta, execute:

```bash
python ../../12-internal-tools/scripts/fetch_skill.py <nome_da_tecnologia>
```

**Exemplo:**
```bash
python ../../12-internal-tools/scripts/fetch_skill.py tailwind
```
O script vasculhará o repositório mestre (`09-skills` e `05-knowledge-base`) e importará a pasta/arquivo correto para `subagents/agent-frontend-ui/.local-skills/`. 
A partir disso, sua IDE terá o contexto recém-importado lido imediatamente e focado!
