# 🎨 [STANDARDS] — Padrões Técnicos, Qualidade de Código & Diretrizes Inegociáveis

## 📌 1. Visão Geral
O diretório `/standards` define as especificações estritas de engenharia de software e os critérios de qualidade inegociáveis para o desenvolvimento de todo o ecossistema `agente-core`. Ele traduz os princípios lógicos em diretrizes de engenharia práticas e mensuráveis.

## 🎯 2. Objective da Pasta
Assegurar a consistência, a segurança, a performance e a auditabilidade de todas as soluções de software, estabelecendo padrões técnicos universais para código, versionamento, segurança de dados e integrações.

## 🧠 3. Contexto Operacional
Tanto engenheiros humanos quanto agentes cognitivos de IA em runtime devem consultar este diretório para alinhar a formatação, arquitetura de componentes, tratamento de dados sensíveis e limites de consumo de recursos.

## 🏗️ 4. Arquitetura da Estrutura
O diretório é subdividido em manuais focados em qualidade e conformidade:
*   `coding-standards.md` — Convenções de escrita de código limpo, tipagem e nomenclatura.
*   `architecture-standards.md` — Diretrizes de separação de camadas e acoplamento.
*   `performance-guidelines.md` — Métricas de latência e otimização de consumo.
*   `security-standards.md` — Políticas de segurança de dados em repouso e em trânsito.
*   `skills-security.md` — Regras específicas para isolamento de privilégios de skills.
*   `git-governance.md` — Convenções de mensagens de commits, branching e versionamento semântico.
*   `quality-standards.md` — Cobertura mínima de testes unitários e critérios de aceite.

## 🛡️ 5. Responsabilidades
*   **Garantia de Qualidade:** Manter a consistência arquitetural do repositório a longo prazo.
*   **Segurança Estrita:** Garantir conformidade com diretrizes de criptografia e proteção de dados.
*   **Padronização de DX:** Facilitar a leitura, manutenção e evolução de código por múltiplos colaboradores.

## 🔄 6. Fluxos Relacionados
*   **Processo de Code Review:** Os templates de revisão e validação consomem as regras deste diretório.
*   **Pipeline de Integração Contínua (CI):** Testes de cobertura mínima (80%+) e validação estática aplicam os padrões aqui especificados.

## ⚙️ 7. Integrações
*   **Analisadores Estáticos (SonarQube/ESLint/Linter MCP):** Configurações baseadas diretamente nas diretrizes contidas neste diretório.

## 📦 8. Dependências
*   **`governance/`**: Consome os princípios de engenharia globais (`engineering-principles.md`) e de segurança pós-quântica (`post-quantum-cryptography.md`).

## 🎨 9. Padrões Utilizados
*   **Clean Code:** Convenções universais de legibilidade e modularização de código.
*   **OWASP Top 10:** Padrões de segurança inegociáveis para proteção contra injeções e vazamentos.

## 📜 10. Convenções
*   Todo o código submetido deve possuir tipagem estrita (TypeScript/Python Type Hints) e passar com 100% de sucesso nos linters configurados.
*   Mensagens de commits devem obrigatoriamente seguir a convenção de *Conventional Commits* detalhada em `git-governance.md`.

## 🔗 11. Relação com Outras Áreas
*   [**`/rules`**](file:///c:/Dev/agente-core/rules) — Executa em runtime os testes de conformidade das decisões técnicas.
*   [**`/templates`**](file:///c:/Dev/agente-core/templates) — Fornece os esqueletos de código pré-configurados de acordo com estes padrões.

## 🛠️ 12. Exemplos de Uso
Um desenvolvedor, ao criar um novo endpoint REST, consulta `standards/api-design-rules.md` (no diretório de regras) e `standards/performance-guidelines.md` para assegurar que a latência de resposta se manterá abaixo dos $200\text{ ms}$ exigidos por contrato.

## 💡 13. Boas Práticas
*   Mantenha a cobertura de testes unitários em no mínimo 80% para qualquer nova classe ou função criada.
*   Sempre valide e higienize os inputs para mitigar vetores de injeção em camadas de persistência.

## 🚨 14. Troubleshooting
*   *Problema: O pipeline rejeitou o pull request por falha de formatação.*
    *   *Solução:* Execute o comando local do prettier/linter conforme especificado em `coding-standards.md` antes de submeter alterações.

## 🚀 15. Roadmap Evolutivo
*   **Q3 2026:** Validação automatizada de regras de commit e análise estática de segurança integrada por agente IA de PRs.
*   **Q4 2026:** Mecanismo de correção automática de estilo (auto-formatting agêntico) em runtime.
