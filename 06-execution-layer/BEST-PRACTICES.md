# 06-execution-layer - Melhores Práticas e Regras de Ouro de Camada de Execução Local e Automação

## 🚀 Boas Práticas Recomendadas

- Nunca rodar scripts que alterem arquivos globais do sistema operacional fora da sandbox de desenvolvimento.
- Utilizar scripts determinísticos com tratamento rígido de erros e logs legíveis para agentes de IA.
- Exigir aprovação explícita em comandos de alto risco (ex: deleção de pastas ou migração de banco de dados).

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
