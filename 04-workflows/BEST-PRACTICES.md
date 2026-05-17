# 04-workflows - Melhores Práticas e Regras de Ouro de Fluxos de Trabalho Padronizados (BMAD)

## 🚀 Boas Práticas Recomendadas

- Seguir estritamente as transições de estado do BMAD: PM -> Architect -> Dev -> QA -> DevOps.
- Realizar a checagem 'Vibe Checking' (verificação visual DOM vs Canvas baseada no DESIGN.md gerado pelo Stitch).
- Documentar em tempo real todos os passos de execução em arquivos de tarefas (`task.md`).

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
