# Architecture Patterns (Macro-Level)

## 📌 Contexto

Este manifesto mapeia as constelações estruturais na qual todo software criado pelo ecossistema deve se basear antes de iniciar o scaffold. É uma referência teórica passiva usada para resolução estratégica superior.

---

## 🏗️ 1. O Monolito Modular (Ponto de Partida Ouro)

- Para o _Developer Solo / Startup_: A vasta maioria dos projetos começam com a falha de prever escala irreal com Kubernetes e dezenas de microsserviços precoces. O Padrão central é o Monolito bem fatiado.
- Os Domínios (`auth`, `billing`, `inventory`) coabitam o mesmo repositório e DB, mas com boundaries severos lógicos (ex: Tabela A não sofre CASCADE explícito livre para Tabela C, se uma separação for previsível).

---

## 🌐 2. Microservices e Serverless

- **O Foco Certo de Microsserviços:** Extrair um módulo para um serviço paralelo apenas quando a natureza do processamento for desproporcional. (ex: "Processar o vídeo dura minutos e suga 8GB RAM do Node; Autenticar sessão leva 10ms. Quebre o processador de mídia para um Serverless Fargate AWS autônomo e assíncrono").
- **Coreografia vs Orquestração:** Caso decida por separá-los sem bloquear o UI final, utilize Tópicos (Publish-Subscribe pattern) no AWS SQS / Kafka em vez do Microsserviço A travar HTTP Waiting para o Microsserviço B (Single Point of Failure Chain).

---

## 🪟 3. Front-End Arquitetural

- **Microfrontends Opcional:** Só adote Module Federation (Webpack/Vite) quando em squads distintas e gigastensas (Equipe Carrinho X Equipe HomePage) que fazem releases em dias diferentes. Do contrário, um Monorepo pautado em TurboRepo atende escala colossal perfeitamente bem.
- **BFF (Backend para o Frontend):** No lugar do app React mobile chamar diretamente os 8 microsserviços para pintar 1 tela, ele deve chamar a Rota BFF nativa no Next.js Router, que junta tudo ali (lado do servidor do provedor da borda - Edge) e devolve só os JSONs mínimos para render local. Reduz chamadas pesadas do celular/browser para a API distante.
