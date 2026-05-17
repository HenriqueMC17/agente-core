# 08-templates - Melhores Práticas e Regras de Ouro de Repositório de Boilerplates e Especificações Padronizadas

## 🚀 Boas Práticas Recomendadas

- Utilizar obrigatoriamente os templates de PRD, Tech Spec e ADR ao documentar decisões técnicas e de negócios.
- Integrar os esquemas visuais do Google Stitch no template padrão de `DESIGN.md` para evitar alucinações UI.
- Garantir que todos os arquivos gerados a partir de templates respeitem os limites de tamanho e complexidade da constituição.

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
