# 🗺️ [CONTEXT MAPS] — Mapas de Contexto, Grafos de Dependência & Estruturas Semânticas

## 📌 1. Visão Geral
O diretório `/context-maps` funciona como a representação geográfica e conceitual do repositório `agente-core`. Ele armazena as plantas, diagramas e grafos que auxiliam agentes de IA a se situarem espacialmente na base de código.

## 🎯 2. Objetivo da Pasta
Fornecer guias espaciais e semânticos consistentes para reduzir o consumo de tokens das janelas de contexto das IAs, facilitando buscas locais direcionadas e evitando leituras recursivas caras em diretórios inteiros.

## 🧠 3. Contexto Operacional
Sempre que uma nova sessão de desenvolvimento agêntico é iniciada, o orquestrador carrega os mapas deste diretório para munir a IA de uma visão estrutural precisa do repositório antes que qualquer leitura física de arquivo comece.

## 🏗️ 4. Arquitetura da Estrutura
O diretório divide-se nos seguintes mapas estruturais:
*   `context-maps-readme.md` — Visão centralizada das rotas de navegação do repositório.
*   `concept-map.md` — Mapeamento conceitual e semântico de conexões de negócios.
*   `physical-map.md` — Planta física de diretórios e arquivos ativos (árvore estruturada).
*   `agent-context-core.md` — Roteiro de inicialização de contexto para agentes de IA de alto desempenho.

## 🛡️ 5. Responsabilidades
*   **Eficiência Semântica:** Prover sumários e localizadores rápidos de competências para reduzir leituras redundantes.
*   **Navegabilidade:** Garantir que links absolutos e caminhos estejam consistentemente atualizados.
*   **Redução de Custo Cognitivo:** Facilitar a rápida assimilação da estrutura do repositório por novos engenheiros ou agentes recém-instanciados.

## 🔄 6. Fluxos Relacionados
*   **Inicialização Cognitiva:** Primeira etapa obrigatória na inicialização de qualquer agente executor em sandbox.

## ⚙️ 7. Integrações
*   **Graph Databases (Neo4j) / Vector Stores:** Mapeamento conceitual exportável para bancos de grafos de alta performance corporativos.

## 📦 8. Dependências
*   **`automations/`**: Depende de scripts executáveis locais (como `auto-doc-generator.ps1`) para reconstruir dinamicamente a planta física markdown.

## 🎨 9. Padrões Utilizados
*   **Semantic Hierarchical Mapping:** Organização da documentação espacial em níveis progressivos de detalhe (Visão Global -> Pasta -> Arquivo).
*   **Mermaid Visualization:** Grafos visuais acoplados a todas as explicações de conexões de arquivos.

## 📜 10. Convenções
*   Todos os hiperlinks internos inseridos nos mapas de contexto devem utilizar obrigatoriamente links locais absolutos (`file:///c:/Dev/agente-core/...`).
*   Modificações na estrutura lógica de pastas devem ser imediatamente refletidas no `physical-map.md` para evitar desvios conceptuais em runtime de IA.

## 🔗 11. Relação com Outras Áreas
*   [**`/architecture`**](file:///c:/Dev/agente-core/architecture) — Fornece os limites conceituais e divisões físicas que balizam a geração dos mapas deste diretório.
*   [**`/roadmaps`**](file:///c:/Dev/agente-core/roadmaps) — Aponta as áreas futuras do repositório que necessitarão de novos mapeamentos espaciais.

## 🛠️ 12. Exemplos de Uso
Um desenvolvedor Staff, ao ingressar no projeto, abre `agent-context-core.md` para compreender imediatamente quais pastas são ativas, quais são redundantes e a precedência absoluta de execução das suítes locais.

## 💡 13. Boas Práticas
*   Mantenha a planta física compacta e objetiva. Evite listar exaustivamente arquivos temporários ou de build (`node_modules`, `.git`, etc.) que poluem o mapa.
*   Use nomes semânticos claros nos nós de diagramas Mermaid para facilitar a leitura por interpretadores de grafos de LLM.

## 🚨 14. Troubleshooting
*   *Problema: O agente de IA está se perdendo na estrutura de diretórios ou tentando acessar arquivos que foram movidos.*
    *   *Solução:* Execute a automação de documentação para regenerar `physical-map.md` e force a IA a recarregar o arquivo atualizado na memória de sessão.

## 🚀 15. Roadmap Evolutivo
*   **Q3 2026:** Geração e sincronização de grafos de dependência tridimensionais interativos na UI do dashboard corporativo.
*   **Q4 2026:** Atualização instantânea e automática do banco vetorial semântico de contexto a cada alteração aprovada em pull request (Continuous Contextualization).
