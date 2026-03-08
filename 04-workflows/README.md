# 04-workflows

## 🎯 Propósito

Centralizar e instanciar os **Sistemas de Execução Padronizada** que o agente ou o desenvolvedor sênior devem seguir. Representa a "Fábrica de Processos", descrevendo rigorosamente o passo a passo para as operações mecânicas mais essenciais da base lógica.

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

Funciona como o roteador das **tarefas iterativas** (Tier 2/3). Remove a carga de planejamento ad hoc e garante que nada elementar seja esquecido ao iniciar, auditar ou integrar códigos críticos.

## 📂 Natureza dos Arquivos

Scripts markdown com formatação de fluxograma, checklists ou matrizes de execução linear ou em paralelos.

- `project-bootstrap.md`: Configuração inicial segura, scaffolding de templates e infraestrutura.
- `feature-development.md`: Branches, TDD setup, criação e commit via convenção.
- `code-audit.md`: Validação de linters cognitivos e CI/CD checks (lint, typs, tests, sec).
- `performance-analysis.md`: Profile do Frontend, análise de chamadas e tracing backend.
- `release-process.md`: Homologação, semver tagging e monitoramentos do Edge/Cloud pos-lançamento.

## ⚙️ Diretrizes de Manutenção e Evolução

- **Uso Estrito:** Podem contar com as marcações YAML/frontmatter nas skills e prompts (ex: `// turbo` ou `// turbo-all`) para auto-acionar processos contínuos no CLI sem atrito.
- **Evolução:** Mantenha curto. Quanto menor o atrito e mais rápido o _feedback loop_, mais ágil é a resposta aos testes.

## 🔗 Relação com Outras Camadas

- Utiliza intensamente os scripts e capacidades contidas em `03-agent-capabilities` e `09-skills`.
- Devem cumprir fielmente sem tolerância a falhas os guias expostos no `01-global-rules`.
