# ⚙️ [RULES] — Motor de Regras, Diretivas de Runtime & Restrições Inegociáveis

## 📌 1. Visão Geral
O diretório `/rules` contém as especificações exatas de restrição de runtime e validação comportamental para o desenvolvimento e a execução do framework. É o coração operacional e disciplinar do ecossistema.

## 🎯 2. Objetivo da Pasta
Centralizar e estruturar os conjuntos de regras estritas (P0 - Inegociáveis, P1 - Críticas) para desenvolvimento frontend, backend, bancos de dados, integrações de APIs e lógica geral de agentes autônomos.

## 🧠 3. Contexto Operacional
Tanto o parser de regras automatizado (rules engine) quanto os agentes executando em runtime leem este diretório no início de qualquer ciclo de raciocínio para delimitar as bordas de codificação válidas e evitar violações lógicas.

## 🏗️ 4. Arquitetura da Estrutura
O ecossistema de regras divide-se em:
*   `master-rules.md` — Regras Mestres e a hierarquia suprema de controle de erros do repositório.
*   `rules-engine-master.md` — Especificação do motor dinâmico de regras e do ciclo de validação.
*   `frontend-rules.md` — Regras aplicadas para design system, UX e interfaces (APCA, Dark Mode 2.0).
*   `backend-rules.md` — Regras aplicadas para robustez, concorrência e chamadas de APIs.
*   `database-rules.md` — Regras aplicadas para consultas SQL eficientes, indexação e segurança.
*   `api-design-rules.md` — Regras para criação de APIs limpas, versionamento e payloads robustos.
*   `fullstack-rules.md` — Regras integradas para pontes de comunicação e consistência de dados.

## 🛡️ 5. Responsabilidades
*   **Imposição Disciplinar:** Assegurar que nenhum código seja aceito se violar diretivas P0.
*   **Fail-Fast Execution:** Forçar a interrupção imediata de scripts de IA caso ocorra violação de regras estruturais.
*   **Mapeamento de Restrições:** Atualizar as restrições comportamentais do ecossistema à medida que novos frameworks e limites regulatórios são adicionados.

## 🔄 6. Fluxos Relacionados
*   **Validação de Código (Pre-Commit / Pipeline):** Execução do motor de regras contra códigos gerados por IA.
*   **Metodologia FLARE:** Integração estreita com as heurísticas lógicas para validação em runtime (`flare-reasoning.md`).

## ⚙️ 7. Integrações
*   **Rules Engine Parser:** Conexão com executores de regras do Model Context Protocol (MCP) e analisadores estáticos de código locais.

## 📦 8. Dependências
*   **`governance/`**: Fornece os alicerces jurídicos e constitucionais que embasam as restrições de escrita de regras técnicas.

## 🎨 9. Padrões Utilizados
*   **Rules-as-Code:** Representação formalizada de restrições em markdown indexável.
*   **Princípio Fail-Fast:** Quebra imediata do fluxo caso qualquer regra P0 seja infringida.

## 📜 10. Convenções
*   As regras contidas no `master-rules.md` se sobrepõem a qualquer diretiva local ou sugestão de código de IA de terceiros.
*   Novas regras devem ser testadas em ambiente sandbox antes de integrarem os arquivos de runtime principais.

## 🔗 11. Relação com Outras Áreas
*   [**`/prompts`**](file:///c:/Dev/agente-core/prompts) — Traduz as regras em instruções diretas para o prompt dos agentes.
*   [**`/governance`**](file:///c:/Dev/agente-core/governance) — Define a governança suprema que as regras visam cumprir.

## 🛠️ 12. Exemplos de Uso
Um robô ou pipeline autônomo, antes de salvar uma alteração de schema em banco de dados, lê `rules/database-rules.md` para assegurar que está gerando índices corretos e não violando políticas de criptografia pós-quântica.

## 💡 13. Boas Práticas
*   Mantenha cada arquivo de regra focado estritamente em um único domínio técnico.
*   Não crie regras conflitantes ou sobreposições ambíguas; utilize a hierarquia P0/P1 declarada.

## 🚨 14. Troubleshooting
*   *Problema: O loop de raciocínio da IA entrou em deadlock alegando conflito de regras.*
    *   *Solução:* Abra `rules/master-rules.md` e valide o fluxo de precedência. A regra P0 sempre anula qualquer outra instrução conflitante.

## 🚀 15. Roadmap Evolutivo
*   **Q3 2026:** Validação semântica e semântico-sintática de regras de runtime baseada em grafos lógicos em tempo real.
*   **Q4 2026:** Tradução automatizada de regras em linguagem natural para testes unitários automatizados de conformidade.
