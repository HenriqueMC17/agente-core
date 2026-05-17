# 10-rules-engine - Melhores Práticas e Regras de Ouro de Motor de Regras e Linters Sintáticos

## 🚀 Boas Práticas Recomendadas

- Manter a regra SSOT do arquivo `MASTER-RULES.md` como soberana absoluta.
- Rejeitar imediatamente commits que apresentem arquivos com mais de 300 linhas de código ou funções com complexidade ciclomática >= 10.
- Executar validações de linters locais de forma nativa e integrada à IDE Antigravity.

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
