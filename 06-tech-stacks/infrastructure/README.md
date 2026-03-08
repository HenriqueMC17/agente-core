# 06-tech-stacks / infrastructure

## 🎯 Propósito

Centralizar a arquitetura como código (IaC), processos unificados de Continuous Integration/Deployment (CI/CD), orquestração e monitoramento em **Ambientes de Nuvem e Edge**.

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

Funciona como o "Manual de Voo do Opser". A arquitetura delega aqui à orquestração dos recursos para que o código vire artefato de entrega isolado, reprodutível e monitorável sob stress de alto rendimento.

## 📂 Natureza dos Arquivos

- Receitas para conteinerização minimalista (Dockerfiles hardenizados).
- Playbooks e pipelines (GitHub Actions YAML guidelines, CI checks automáticos de build/test/lint).
- Modelagem Serverless, Edge Functions, Reverse Proxies (Nginx / API Gateways / Cloudflare).
- Padrões de Secret Management e estratégias para observability e alertas.

## ⚙️ Diretrizes de Manutenção e Uso

- Este material baliza imediatamente todas as operações de **Deploy** ou automações do repositório.
- Deve alinhar-se com práticas modernas de resiliência e failover dinâmicos. Em caso de mudanças em Cloud Providers (AWS para GCP), versionar o registro histórico aqui.

## 🔗 Relação com Outras Camadas

- Estrita conexão com os diretivos passivos em `05-knowledge-base/devops-practices.md`.
- Base material necessária para os testes e passadeiras automáticas do `04-workflows/release-process.md`.
