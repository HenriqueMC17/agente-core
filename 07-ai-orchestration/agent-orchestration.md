# Arquitetura de Multi-Agent Orquestration

## 📌 Contexto

O gerenciamento dos Sub-Sistemas de Agentes locais (Swarm Models ou Hierárquicos LLM Networks com MCP). Não trata-se da resposta individual mas de como o **Agente Orquestrador / Master** aloca, comissiona e repassa payloads locais cruzando fronteiras e skills.

---

## 🤖 1. Framework Hierárquico do Master-Agent Router (The Gatekeeper)

A base principal de contato User -> Codebase não sai fatiando arquivos e codificando na hora local de complexidade imensa. O Agente Topo entra pelo Filtro Global Analítico (`Socratic Gate`).

- Master Agent ou Orquestrador entende a Dor. Pauta-se na hierarquia de domínio na matriz de Routing do `GEMINI.md`: "O pedido é Mudar Otimização do Dockerfile do Database -> Delegue à personalidade Backend / DevOps Infra Spec". O Top-layer apenas valida e formata a Resposta que o Sub-Agente InfraWorker gerou isoladamente focando só nos módulos nativos limitados. Ele junta a PR ao Repositório do Human.

## 🔗 2. O Model Context Protocol (MCP) Bindings para Delegação de Tools

A orquestração perfeita se fia das integrações via JSON-RPC estandarizadas `11-mcp-integrations/`. O Agente Sênior Mestre invoca a Tool (E.g. "Github Fetch Branch/Supabase DB Query Info" vinda de instâncias autônomas ou Servers MCP TypeScript remotos rodando a porta stdio interna ou network local). Ele lê o tráfego limpo das ferramentas terceiras (Figma, Notion Contexts) unificando num Buffer para despachar nas inferencias filhas restritas (Ex. Tool _Extract Figma Image Layers to Tailwind Code_ > _React Scaffolder Agent_ processa UI purista).

## 🛡️ 3. O Loop Supervisor (Avaliativo Reflexivo) / Critic Agent Parallels

Ao entregar um pedaço de feature por Multi-Agent, deve possuir na base uma Instancia Avaliadora / _Critic Role_.
Ela NÃO sabe criar e NÃO processa inputs com as ferramentas Web do Sistema, seu Token Context só engloba 1 fato: As Regras do `00-governance` e do `01-global-rules` nativas e o Blob Diff Code Final. A instãncia orquestrada checa os padrões. Se pontuação/heurística falhar sem justificativa (e.g. Injetou Secrets em Strings puras), Ele gera a Reject Alert e atira de repouso O Feedback loop iterativo pro Agent Creator Code Coder corrigir sob punição mental, forçando Loop-Autónomo Restrito fechado do Code-Check Pipeline LLM System na base!
