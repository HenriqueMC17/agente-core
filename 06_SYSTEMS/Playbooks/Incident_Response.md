# Incident Response Protocol

## 🚨 Fase 1: Identificação e Triage (0-15 min)

- Qualifique a severidade do incidente (P1 - Crítico, P2 - Alto, P3 - Médio, P4 - Baixo).
- **Ações imediatas**: Confirme o impacto para o usuário e isole o componente se houver risco de vazamento/corrupção de dados.

## 🔍 Fase 2: Investigação (15-45 min)

- Verifique logs e métricas (DataDog, Sentry, CloudWatch).
- Quais deploys recentes ocorreram nas últimas 24hs?
- O banco de dados está com load normal? Há queries lentas ou trancadas (locks)?

## 🛠 Fase 3: Mitigação e Rollback (45-60 min)

- O objetivo é estabilizar o sistema, mesmo que com funcionalidade degradada.
- Execute Rollback do último deploy, caso seja o culpado.
- Escale a infraestrutura caso o gargalo seja load.

## 📝 Fase 4: Post-Mortem (Após 24-48 horas)

- Root Cause Analysis (5 Whys).
- Action items para garantir que isso não volte a acontecer.
- O que fizemos bem? Onde falhamos na resposta?
