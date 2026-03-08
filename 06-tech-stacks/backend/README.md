# 06-tech-stacks / backend

## 🎯 Propósito

Isolar os padrões operacionais, sintaxes, arquiteturas de domínio e diretrizes de desenvolvimento estritamente ligadas a APIs, processos em segundo plano, serviços corporativos e fluxos sistêmicos rodando no servidor (Backend).

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

É o módulo de barreira tecnológica de serviços lógicos. Garante que os processos executados (ex: Java, Node, Go) mantenham altíssima manutenibilidade, resiliência perante falhas (Fail Fast, Circuit Breaker) e escalabilidade assíncrona.

## 📂 Natureza dos Arquivos

- Acordos de integração, versionamento de Endpoint e tipagem de protocolos (REST, GraphQL, gRPC).
- Convenções de código específico e tratamento de filas (Mensageria, Apache Kafka, RabbitMQ).
- Abordagens arquiteturais como Domain-Driven Design (DDD), Hexagonal Architecture ou Clean Architecture (nível infra e domínios).
- Tratamentos de log, graceful shutdown, health checks e rate limiting.

## ⚙️ Diretrizes de Manutenção e Uso

- Ao gerar novos controllers ou refatorar serviços legados, o LLM deve ancorar-se sob o espectro de conhecimento dessas documentações.
- Descarte regras não idiomáticas do respectivo framework, priorizando sempre as convenções mais modernas de segurança de tipo de cada tecnologia.

## 🔗 Relação com Outras Camadas

- Segue hierarquicamente a base global exposta em `01-global-rules` e deve espelhar o `02-workspace-rules/backend-rules.md`.
