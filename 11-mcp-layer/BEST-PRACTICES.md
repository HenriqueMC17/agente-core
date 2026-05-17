# 11-mcp-layer - Melhores Práticas e Regras de Ouro de Camada Model Context Protocol (MCP)

## 🚀 Boas Práticas Recomendadas

- Utilizar servidores MCP homologados (como Convex, Figma, Supabase, Vercel, Stitch) para obter informações contextuais limpas.
- Sanitizar inputs e outputs de ferramentas MCP contra injeções de prompts maliciosos.
- Registrar e monitorar o tráfego de dados sensíveis corporativos que passam pela camada MCP.

---

## 🚫 Práticas Proibidas (Anti-Patterns)

> [!CAUTION]
> **Ações de Alto Risco e Anti-Patterns proibidos neste módulo:**
> - **Código Frankenstein**: Mesclar trechos de códigos desordenados sem passar pela validação estrita do AST validator.
> - **Amnésia Contextual**: Tentar processar problemas complexos sem carregar a base de conhecimentos passiva (`05-knowledge-system`).
> - **Injeção Silenciosa**: Modificar arquivos físicos sem registrar no log de tarefas de execução (`task.md`).
> - **Violência de Escopo**: Modificar o escopo físico da tarefa aprovada sem solicitar nova revisão do plano de implementação.

---

## 💡 Dicas de Performance e Otimização
- **Foco de Contexto (Progressive Disclosure)**: Mantenha a atenção focada apenas nos arquivos estritamente necessários para a tarefa corrente para otimizar o uso da janela de tokens.
- **Tipagem Estrita**: Escreva TypeScript altamente tipado. Tipos explícitos são a melhor âncora para impedir alucinações em cascata do modelo de linguagem.
