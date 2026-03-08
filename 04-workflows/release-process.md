---
description: Procedimento padronizado e cauteloso de deploy do código do agente para ambientes de nuvem/Produção.
---

# Release Process & Deploy

## Objetivo

Garantir que código desenvolvido jamais comprometa branches protegidas e os ambientes reais do negócio via pipeline mecânica blindada.

## ⚙️ Passo a Passo (O Workflow)

1. **Testes Estáticos (The CI Guard)**
   - O código final do release sofre Rebase/Merge com o topo (`HEAD`) mais atual de produção ou staging.
   - A pipeline CI virtual (ex: GitHub Actions `ci.yml`) rodou integralmente: build passou em modo `strict`, linters passaram, suites (Unit e E2E) acenaram sucesso unânime.
   - Caso o bot detecte quebra: A Release é vetada em bloco ("Fail Fast" da camada Global).

2. **Changelog e Versionamento Semântico**
   - Agregue o log via Conventional Commits.
   - Identifique a mudança da Release pela versão (SemVer).
     - Fez `fix()` (Patches) -> `v1.0.1`
     - Adicionou `feat()` não quebrante (Minor) -> `v1.1.0`
     - Adicionou arquitetura quebrante nova / Alterações DB maciças (Major) -> `v2.0.0`

3. **Empacotamento da Imagem ou Build**
   - A instância em execução vai congelar e realizar a geração otimizada focada em CPU/Memória (Production Bundles, Tree-shaking).
   - As injeções das variáveis do cofre (Environment Secrets) são acopladas. (Nunca hard coded no commit de Release).

4. **Deploy Progressivo (Opcional ou Mandatório por Workspace)**
   - Realiza Blue/Green Deployment ou migração de nuvem, rodando os testes de fumaça (Smoke Tests e Healthchecks rápidos `/api/health`).
   - Apenas se `/api/health` retornar HTTP 200, reponte o load-balancer primário.
   - Monitore nas próximas 1h via instâncias de Log/Dashboard.
