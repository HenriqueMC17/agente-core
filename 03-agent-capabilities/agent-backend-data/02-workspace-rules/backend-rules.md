# Backend Workspace Rules

## 📌 Visão Geral

Este documento foca na arquitetura, segurança, isolamento estrutural e comunicação das aplicações lógicas e bases servidoras construídas pelo Agente e Engenheiro de Software.

---

## 🛰️ 1. Isolamento e Boundaries (Padrão Hexagonal / Limpa)

- **Domain-Centric:** O negócio dita o backend, e não o framework (express, nest, flask). Crie interfaces para todo provedor de saída. Caso amanhã se troque de _AWS S3_ para _Cloudflare R2_, nenhuma regra lógica do caso de uso (Use Case) do sistema deve sofrer alteração. Apenas o "S3Adapter" que implelemta o "StorageInterface" é tocado.
- **Modelos de Transferência (DTOs):** A entidade local que sai do banco de dados (ex: `UserEntity` com senha hasheada e timestamps locais) NUNCA deve ser diretamente devolvida no payload da rota. Use Data Transfer Objects com parsers severos (ex: Mappers `fromEntityToDTO()`) para varrer lixo e dados confidenciais do payload final.

---

## 🔄 2. Resiliência e Graceful Degradation

- **Circuit Breakers & Retries:** Se a API consumir outras APIs de Microserviços via RPC, use resiliência inteligente. Em caso de timeout em cascata, engaje o bloqueio local (Circuit breaker) para não exaurir recursos dos _worker threads_. Utilize filas in-memory/distribuídas (Kafka/SQS) para compensação posterior, não deixando processos em status de falha silenciosa.
- **Graceful Shutdown:** Intercepte sinais de encerramento do SO (`SIGTERM` / `SIGINT`). Feite conexões abertas do banco em lote, encerre processamento pendente em Background, recuse novas conexões REST temporariamente, e então desligue a runtime com segurança (Evitar corrupção de pool db status).

---

## 🪵 3. Tratamento de Erros e Logs (Observabilidade)

- **Tratamentos Centralizados:** Todo sistema MVC / RESTful contará obrigatoriamente com _Error Middlewares_ globais. Mapeie tipos severos (Ex: `AppError`, `ValidationHttpError`) para gerar Status Codes em respostas padronizadas (RFC 7807 - Problem Details JSON object).
- **Logs Atuáveis:** `console.log` para prints perdidos é vetado no Backend produtivo. Use _Winston/Pino_ formatado em JSON para injestão inteligente na AWS CloudWatch, Datadog ou Grafana Loki.
  - Logue Informações de Autenticação apenas pelo Context ID (`reqId`, `userId`), jamais o Request Body completo que possua dados senhas ou cartões (PII).
