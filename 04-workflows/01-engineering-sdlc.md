---
description: Solidez do ciclo de vida de Engenharia de Software (SDLC) cobrindo fundação até MVP e Cloud.
---

# 🏗️ Engineering: End-to-End SDLC

Este master playbook rege a fundação estrutural desde a criação de repositórios até o lançamento tático de produtos. Siga estas etapas ao trabalhar com desenvolvimento progressivo "from scratch to cloud".

---

## 1. Project Bootstrap (A Gênese)
O início limpo que previne arquiteturas acopladas de humor.

- **Validação:** Não crie pastas ou "npx" antes de indagar Socraticamente o usuário sobre "Onde esse código vai rodar?".
- **Scaffolding:** Siga o template cru (vide `/08-templates/project-structure-template.md`).
- **Linters Iniciais:** Aloque Husky/Pre-commit. Rode `--max-warnings=0` no linter.

## 2. Feature Development (O Crescimento Unitário)
A regra de ouro de PRs e Tasks contínuas controladas pelo Agente.

- **Pense ➜ Prove Falha ➜ Code ➜ Revise.**
- Isole em branch (e.g. `feature/auth-roles` ou mentalmente no workflow do agente).
- Screaming Architecture pura. O arquivo de UI do carrinho não deve saber da querie de pagamento do backend.

## 3. Ship SaaS MVP (O Enxugamento Vertical)
Regra de ouro quando o usuário diz "Vamos lançar um MVP agora", ou "Crie um SaaS base".

- Foque as energias nas **Jornadas Críticas do Usuário** (`auth`, `pagamento` e `core value`). Todo o resto é ruído.
- Se o usuário pedir um SaaS web full: Crie Frontend, a API tática de backend e as migrações SQL. Garanta que testes cobrem o pagamento (happy path) antes da release.

## 4. Release Process (O Desembargue na Nuvem)
O código sai da IDE e atinge a vida real. Deve ser um funil hermético. 

- **Checklist Mecânica do CI Guard:** Build Strict / Linters zerados. Se houver tipagem no TypeScript quebrada, aborte o Release. Fail Fast!
- Aplique o SemVer: `v1.0.1` (hotfix), `v1.1.0` (feat livre), `v2.0.0` (arquitetura nova ou APIs hard break).
- **Post-Release:** Após fazer commit e subir na branch Main, execute chamadas na API de healthcheck. Monitore a persistência nas 2 próximas horas de deploy ativo.
