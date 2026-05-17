# 15-security - Melhores Práticas e Regras de Ouro de Segurança Corporativa Zero-Trust e Guardrails

## 🚀 Boas Práticas Recomendadas

- Nunca commitar secrets, tokens ou senhas no código fonte, utilizando exclusivamente variáveis de ambiente ou cofres criptográficos de chaves.
- Sanitizar inputs gerados pela IA utilizando validação robusta com schemas Pydantic antes de enviá-los a serviços consumidores (downstream).
- Manter o isolamento em sandbox de contêineres Docker para a execução de códigos e scripts não assinados e não confiáveis.

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
