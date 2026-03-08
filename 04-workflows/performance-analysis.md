---
description: Auditoria cirúrgica para quebras de latência, vazamentos de memória e bundles lentos da Web.
---

# Análise de Tráfego e Performance

## Objetivo

Responder inteligentemente a métricas decrescentes de Vitals, gargalos de rede (N+1 no SQL) e congelamentos bloqueantes no Client-Side.

## ⚙️ O Playbook Direto (Workflow Técnico)

1. **Hipótese de Lentidão (Socratic Triage)**
   - Determine categoricamente a falha isolada:
     - "É falha de rede ou TTFB (Backend lento, query sem indexação)?"
     - "É Renderização bloqueada no Main Thread do Cliente (Muitos pacotes JS, Loops pesados UI, Large DOM)?"

2. **Caminho A: Tratamento Web Vitals e Interface Cliente (LCP / CLS / INP)**
   - Analisar o report do `Lighthouse` e o tamanho compilado via `bundle_analyzer.py`.
   - Remova imports maciços ou libraries gigantes importadas de forma linear (Siga as orientações em `01-global-rules/performance-guidelines.md` e adicione lazy-loading `import()`).
   - Corrigir CLS injetando restrições visuais CSS rígidas (width/height no placeholder de imagens carregadas tardiamente).

3. **Caminho B: Bloqueio Lógico Backend ou DB Oneroso**
   - Se o backend for um Node / API local, profilar os event-loops que travam. Você está bloqueando CPU via leitura de disco iterativa com funções síncronas em JSON grandes? (e.g., `readFileSync`, loops puros in-memory massivos sem streams)?
   - Adicione Log temporal nas Queries do Banco e use o Database Profiling (`EXPLAIN ANALYZE`). Se o ORM estiver ocultamente gerando Múltiplas buscas "N+1" para objetos agregados (ex: `Include` do Prisma errados/Lento), altere o Aggregator.
   - Avalie adicionar Cache Passivo para listas estáveis com Hit-Rate alto. (Redis / CDN).
