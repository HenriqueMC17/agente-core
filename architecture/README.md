# 🏛️ [ARCHITECTURE] — Engenharia de Sistemas, Estrutura Física & Árvores Semânticas

## 📌 1. Visão Geral
O diretório `/architecture` define a planta física, a hierarquia lógica e as regras de zoneamento de componentes de software de todo o ecossistema `agente-core`. Ele serve como a fonte única da verdade para a conformidade do layout e da organização de arquivos.

## 🎯 2. Objetivo da Pasta
Mapear e assegurar a integridade estrutural do repositório, ditando como os diretórios se relacionam de forma a evitar acúmulos redundantes, dependências circulares e desalinhamento de domínios.

## 🧠 3. Contexto Operacional
Os sistemas e agentes em runtime leem este diretório para compreender a organização do workspace e validar a corretude dos caminhos lógicos antes de gerarem novos módulos ou reestruturarem pastas.

## 🏗️ 4. Arquitetura da Estrutura
O diretório divide-se nos seguintes mapas:
*   `global-index.md` — O índice físico absoluto que mapeia cada recurso.
*   `governance-architecture.md` — A lógica de fluxo arquitetural da governança.
*   `semantic-tree.md` — A árvore conceitual de caminhos regulados por domínios.

## 🛡️ 5. Responsabilidades
*   **Zoneamento:** Garantir que novos pacotes ou arquivos sejam alocados no diretório temático correto.
*   **Consistência Semântica:** Impedir nomes de caminhos ambíguos.
*   **Orquestração de Dependências:** Mapear e rastrear a árvore de chamada de funções.

## 🔄 6. Fluxos Relacionados
*   **Verificação de Lint de Caminhos:** O validador de links cruzados e estruturas físicas corre contra os mapas definidos neste diretório.
*   **Refatorações de Grande Escala:** Sempre guiadas pelo mapa de transições arquiteturais de `global-index.md`.

## ⚙️ 7. Integrações
*   **MCP File System Connector:** Expõe o mapa arquitetural para agentes de ferramentas MCP navegarem com rapidez e baixo consumo de tokens.

## 📦 8. Dependências
*   **`governance/`**: Fornece os limites regulatórios gerais que determinam as divisões de segurança física do repositório.

## 🎨 9. Padrões Utilizados
*   **Clean Architecture:** Separação estrita de camadas (infraestrutura, dados, domínio, aplicação).
*   **Domain-Driven Design (DDD):** Delimitação clara de contextos de negócio.

## 📜 10. Convenções
*   Nenhum arquivo de código executável deve residir diretamente nas pastas de governança técnica ou padrões.
*   Toda nova pasta criada no repositório deve ser registrada em `semantic-tree.md`.

## 🔗 11. Relação com Outras Áreas
*   [**`/standards`**](file:///c:/Dev/agente-core/standards) — Transforma as regras abstratas em limites físicos de codificação.
*   [**`/templates`**](file:///c:/Dev/agente-core/templates) — Fornece os esqueletos físicos para as pastas aqui desenhadas.

## 🛠️ 12. Exemplos de Uso
Um agente cognitivo que necessite adicionar uma nova skill de validação de dados de checkout consulta o `semantic-tree.md` para garantir que deve alocá-la em `/modules/checkout-validation` e não em diretórios raiz de infraestrutura.

## 💡 13. Boas Práticas
*   Mantenha a hierarquia profunda de subpastas limitada a 4 níveis para evitar dispersão de contexto.
*   Evite caminhos relativos em diagramas de fluxo; prefira links baseados em `file:///`.

## 🚨 14. Troubleshooting
*   *Problema: O validador structural-validator.ps1 acusa desvio estrutural.*
    *   *Solução:* Verifique se a nova pasta criada possui o README correspondente e está mapeada no `global-index.md` do repositório.

## 🚀 15. Roadmap Evolutivo
*   **Q3 2026:** Geração automatizada de diagramas Mermaid em tempo real a partir da análise da árvore estática de arquivos.
*   **Q4 2026:** Verificação de acoplamento e coesão automatizada via análise sintática de dependências no pipeline.
