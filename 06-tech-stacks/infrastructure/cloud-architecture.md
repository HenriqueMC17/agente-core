# Cloud & Infrastructure Architecture

## 📌 Contexto

Desacoplamento cognitivo de Provedores. Serviços corporativos devem flutuar com elasticidade infinita utilizando as abstrações serverless extremas do AWS / GCP e do Modelo CDN Vercel ou CF.

---

## ☁️ 1. Padrão Serverless e Edge Network

Computadores distantes são letalmente mais fáceis de operar em abstrações de Custo Otimizado.

- Arquitetura de Apresentação Client SSR (Next/Remix) deverá rodar puramente na Vercel/Cloudflare em Cloudflare V8 Runtimes/Edge. Latência Zero global e Caches passivos distribuídos por POP nodes em todo planeta distribuindo respostas super compactas sem sobrecarregar um monolito Java/Node central no país local para servir Páginas de Título Fixo Blog.
- Componentes e Filas CRUD backend que executam pesadas, rodam num AWS Lambdas e/ou Docker-containers enxutos de EC2/ECS/Fargate do Elastic Load Balancer subindo Instâncias CPU dependendo apenas da métrica Load, usando Infra-as-Code Terraform (IAC). Não acesse Cloud da porta manualmente pra configurar instâncias e DBs com Cliques na Web GUI interface, faça o State Tracked pelo Código e Agente.

## 🛡️ 2. VPCs Private, Ingress e Security Groups

- **O Banco de dados JAMAIS será público via porta IP 5432 aberto à Wide-Web para acessos práticos de GUI do SQL do Dev Júnior de casa**. As entidades Rediss Cache e Bancos vivem fechadas submissas em SubGifs de Segurança Isoladas VPC. Somente os Backend Servers Controllers / Lambdas que estão listados nas subnets internas conectam-se. A Entrada Global REST passa unicamente pelo Proxy Route DNS Externo seguro mitigado de WAF DDoS HTTP (Gateway API com Limitadores). Não misture Borda Global App Externa com Storage e Cluster Interno Crítico em 1 Zona visível pro OS.
