# 🔌 CONECTOR DE INTEGRAÇÃO DO TESTSPRITE MCP (`test-sprite.md`)

O conector **TestSprite MCP** acopla o motor de IA a um orquestrador autônomo de garantia de qualidade (*QA Test Orchestrator*). Ele capacita o agente a gerar planos de teste completos (frontend e backend), codificar casos de teste unitários e de integração, executar baterias de testes em lote e analisar diagnósticos em tempo real por meio de um painel interativo.

---

## 📐 1. Visão Geral da Arquitetura

O TestSprite atua no ciclo de execução **BMAD** (Multi-Agent Workflow) na fase de **Garantia de Qualidade (`/qa`)**:

```
 ┌──────────────┐         Model Context Protocol         ┌──────────────┐
 │  Agente IA   │ ◄────────────────────────────────────► │ Orquestrador │
 │ (Antigravity)│      Automação de Planos/Execução     │ (TestSprite) │
 └──────┬───────┘                                        └──────┬───────┘
        │                                                       │
        ▼                                                       ▼
 [AGENTS.md] Governança                                  [Dashboard Web]
```

---

## 🛠️ 2. Referência de Ferramentas (Tooling Schema)

O servidor TestSprite MCP expõe as seguintes ferramentas corporativas para verificação contínua do workspace:

### Inicialização e Contabilidade
*   **`mcp_TestSprite_testsprite_bootstrap`**: Inicializa as configurações do projeto (`.testsprite/config.json`). Deve ser invocado apenas uma vez no setup do repositório, especificando a porta de serviço, tipo (frontend/backend) e escopo (`codebase` ou `diff`).
*   **`mcp_TestSprite_testsprite_check_account_info`**: Consulta o consumo de créditos, plano de subscrição e cota disponível.

### Planejamento Estratégico de Testes
*   **`mcp_TestSprite_testsprite_generate_backend_test_plan`**: Examina o código backend e constrói planos de teste para APIs, CRUDs e integrações de banco de dados.
*   **`mcp_TestSprite_testsprite_generate_frontend_test_plan`**: Analisa componentes UI e constrói fluxos de testes de ponta a ponta (E2E), permitindo declarar necessidade de login (`needLogin`).

### Execução e Diagnósticos
*   **`mcp_TestSprite_testsprite_generate_code_and_execute`**: Gera o código físico dos testes e dispara a execução.
    *   *Nota Crítica:* Para projetos locais, certifique-se de que o servidor local está de pé (ex: `npm run dev`). Se rodando em dev, o parâmetro `serverMode` deve ser definido como `development` (limitando a 15 testes de alta prioridade para evitar sobrecarga).
*   **`mcp_TestSprite_testsprite_generate_code_summary`**: Fornece um relatório resumido de alto nível da topologia e da cobertura lógica do repositório.
*   **`mcp_TestSprite_testsprite_open_test_result_dashboard`**: Abre um painel interativo web local para que o arquiteto humano e o agente possam inspecionar steps individuais de testes falhos e re-executar etapas específicas.

---

## 🧪 3. O Ciclo de Verificação Contínua (Continuous Verification Loop)

A validação de sanidade do código gerado pelo agente de desenvolvimento (`/dev`) é automatizada sob o seguinte fluxo de 4 passos:

1.  **Bootstrapping:**
    O agente QA verifica se o projeto já está configurado. Se o diretório `.testsprite/` não existir, ele invoca `testsprite_bootstrap`.
2.  **Mapeamento de Escopo:**
    Ao invocar alterações lógicas, o agente foca os testes no escopo `diff` para otimizar tempo de computação. Se o refactoring for estrutural, aplica-se o escopo `codebase` completo.
3.  **Execução de Suite:**
    Dispara-se `testsprite_generate_code_and_execute` garantindo que o servidor local (como Svelte/Vapor ou Next.js) está ativo na porta correspondente.
4.  **Auto-Correção Baseada em Logs:**
    Se testes falharem, o agente invoca `testsprite_open_test_result_dashboard` para obter os steps exatos de quebra, aplicando correções cirúrgicas de código via `replace_file_content` e re-executando a verificação até obter 100% de sucesso.

---

## 🔒 4. Sandbox e Parâmetros de Execução

*   **Token Exigido:** `TESTSPRITE_TOKEN` (definido globalmente no host).
*   **Controle de Sobrecarga:** Em modo de desenvolvimento, o limite rígido de 15 testes impede a exaustão de memória da máquina de desenvolvimento e latência desnecessária no ciclo de deploy.
