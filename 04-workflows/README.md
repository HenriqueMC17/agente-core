# 04-workflows

## 🎯 Propósito

Centralizar e instanciar os **Sistemas de Execução Padronizada** que o agente ou o desenvolvedor sênior devem seguir. Representa a "Fábrica de Processos", descrevendo rigorosamente o passo a passo para as operações mecânicas mais essenciais da base lógica de forma agrupada por ecossistema de negócio.

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

Garante coerência na esteira. Remove a carga de planejamento ad hoc e garante que nada elementar seja esquecido ao iniciar projetos, auditar ou integrar códigos críticos. Lê as rotinas com economia de tokens (Contexto unificado em Mestres grandes, ao invés de inúmeros arquivos rasos e redundantes soltos).

## 📂 Estrutura de Arquivos Consolidada

A arquitetura usa o Padrão de Domínios para Master Files de Diretrizes:

- `00-agent-commands.md`: Centraliza a reação atômica aos comandos `/create, /enhance, /debug, /plan, /preview, /test, /status, /deploy, /brainstorm`. Farol de diretrizes inicial para o Agente.
- `01-engineering-sdlc.md`: O ciclo End-to-End (`project-bootstrap`, `feature-development`, `release-process` e MVPs).
- `02-quality-sec-perf.md`: Proteção Sistêmica e Auditoria (Refatoração, `code-audit`, `security`, automação QA E2E e `Incident_Response`).
- `03-architecture-specialist.md`: Arquitetura pesada local (Noções táticas de Domain-Driven Design e Sistemas Multi-Agente).
- `04-productivity-management.md`: Gestão executiva semanal tática ("CTO Life") e lógicas de scripts p/ Automação Base.
- `orchestrate.md`: Regras rigorosas e isoladas ("vermelhas") de prompt para coordenação entre vários Sub-Agentes Simultâneos.
- `ui-ux-pro-max.md`: Bússola e Guidelines profundos visuais do `design system engine`. Mantido isolado devido à conexão de script mecânico Python associado.

## ⚙️ Diretrizes de Manutenção e Evolução

- **Uso Estrito:** Podem contar com as marcações YAML/frontmatter nas skills e prompts (ex: `// turbo` ou `// turbo-all`) para auto-acionar processos contínuos no CLI sem atrito.
- **Evolução:** Ao adicionar novos contextos, funde-os aos domínios já estabelecidos. Apenas desmembre um arquivo Mestre se ele exceder 15.000 caracteres de lógica pura (Token Overflow). 

## 🔗 Relação com Outras Camadas

- Utiliza intensamente os scripts e capacidades contidas em `03-agent-capabilities` e `09-skills`.
- Devem cumprir fielmente sem tolerância a falhas os guias expostos no `01-global-rules`.
