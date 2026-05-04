# Prompt Engineering & Cognitive Chains

## 📌 Contexto

Os sub-agentes e os LLMs interligados precisam de comandos eficientes para extrair Lógicas Sênior, contornar "Lost-in-The-Middle" do tokens window context e eliminar _Alucinação técnica_ focando a atenção total na documentação.

---

## 🧠 1. Frameworks de Processamento Limitado

A Inteligência Artificial baseada em Next-Token Prediction trabalha infinitamente melhor através de pausas calculadas reflexivas do que gerando 50 linhas em 1 único prompt mal planejado.

- **Técnica CoT Limpa (Chain-of-Thought):** Diga em todo Prompt de alto calibre: "Baseie-se antes de criar código num bloco mental ou `thought` isolando (1) Escopo do Workspace atual, (2) Se existe solução prévia nas regras `01-global-rules` e `02-workspace-rules` e (3) Planeje as funções antes de soltar Markdown code.
- **RAG Refriction & Context Limp:** Excluir todo lixo e artefatos (Dumps longos) contextuais e alimentá-los somente pela RAG de busca Semântica do MCP seletiva (Context7 Tool ou Supabase Search local/Docs). O input com mil códigos errados sujos só distrai o modelo gerativo principal, o ideal é alimentar as classes focadas num Context limit de poucas janelas antes do prompt.

## 🚧 2. Prevenção Defensiva à Alucinações Clássicas

Os IAs têm a necessidade "Biológica" generativa complacente de aprovar a arquitetura imposta ou alucinar libraries não atualizadas pelas features atuais em NextJs App router v15 (ex: Hooks antigas em Client Bounds).

- **Zero-Shot Restritivo Punição Explicita (The GuardRails):** Mapeie restrições no Prompt Base. "Só utilize código canônico do Docs 2025. Proibido forçar sintaxes depreciadas. Se não tem domínio sobre API nativa Zod XYZ versão beta, aborte a recomendação e não crie uma function fake".
- Utilize do Modelo `Tree of Thoughts` para os agentes: Explore o ramo do TDD, se esgotar ou os testes não rodarem limpos internamente pelo LLM Agent Bash Tool, aborte a refação da branch regressiva por si, avise o Master Dev e volte ao State mental original do git Head.
