---
description: A Malha Fina de Segurança, Performance, Dívida Técnica e Reação a Bugs em Produção.
---

# 🛡️ Quality, Security & Performance

Este master playbook assegura a estabilidade extrema. Sempre que instanciar verificações de qualidade `/test`, auditar repositórios ou lidar com falhas de produção, este ciclo rigoroso deve ser invocado.

---

## 1. Code Audit & Refactoring (O Boy Scout Core)
Auditoria total contínua e a regra do acampamento mais limpo.

- **Check Acoplamento:** Camadas de UI e Rotas NUNCA referenciam Banco de Dados diretamente.
- **Refatoração Atômica:** Use *Extract Method* ou *Invert If* sempre que funções ficarem com mais de 3 níveis de aninhamento de IF.
- **Lint e Formatação (`// turbo-all`):** Antes de testar qualquer lógica, corrija dívida de `Prettier`/`Ruff`/`ESLint`.

## 2. QA & Browser Automation (Automação de End-to-End)
- Estabelecer a estratégia focado na resiliência: Playwright / Cypress.
- Escopo focado em rotas quentes (`/login`, `/checkout`).
- Caia matando em cima de "Flaky Tests". Não admita rodadas que às vezes passam. E2E estritamente determinísticas.

## 3. Security Audit (Hardening de Segurança)
Metodologia direta de pentesting e proteção em escopos Web.

- Avalie Controles de Acesso (IDOR, Admin paths).
- Injete vulnerabilidades comuns SQL/NoSQL Injection, XSS em outputs brutos (dangerouslySetInnerHTML no React).
- Cace hardcoded Secrets com scanner de diretórios antes do deploy.

## 4. Performance & Traffic Analysis
Para Web Vitals em declínio ou APIs que não respondem.

- **Tráfego do Cliente (LCP / CLS / INP):** Faça análises do bundle Javascript JS (`size-limit`). Substitua bibliotecas mastodônticas por `Intl` ou alternativas nativas do Web Platform. Remova Main Thread Blocks.
- **Server DB Blocks:** Adicione Log de Queries. Combata o "N+1" nas integrações de ORM (Prisma/TypeORM).

## 5. Incident Response Protocol
Procedimento mecânico se o servidor estiver caído (P1/P2/P3).

- **Fase 1 (Triage):** Avalie nível de criticidade e corte acesso isolando bancos.
- **Fase 2 (Investigação Métrica):** Verifique DataDog, Sentry ou Logs Brutos na Máquina. Qual deploy aconteceu hoje?
- **Fase 3 (Mitigação):** Faça Rollback impiedoso do commit se a falha começou no último PR. Restabeleça o SLA com degradação aceitável antes de caçar o bug minuciosamente via `/debug`.
- **Fase 4 (Death-Postmortem):** Por que caímos? (5 Whys). Escreva o report.
