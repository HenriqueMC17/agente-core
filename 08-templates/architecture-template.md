# Architecture Decision Record (ADR) Template

## 📌 Contexto

_[Descreva o contexto e o problema a ser resolvido em no máximo 2 parágrafos. Explique a situação técnica ou de negócios que motivou a necessidade de uma decisão.]_

---

## ⚖️ Decisão Arquitetural

_[Declare a decisão técnica ou de infraestrutura que está sendo formalmente adotada.]_

> **Decisão:** [Ex: Adotar gRPC para comunicação interna de microsserviços em vez de REST.]

### Fundamentação (O Porquê)

- **Motivador 1:** _[Ex: Redução brutal de payload em tráfego de rede para serviços com alto throughput.]_
- **Motivador 2:** _[Ex: Contratos fortemente tipados na borda com Protobuf, evitando esquemas frouxos.]_
- **Base Teórica Opcional:** _[Referência ao `05-knowledge-base/architecture-patterns.md` se houver]_

---

## 📉 Consequências

### Positivas (+)

- _[Beneficio claro 1]_
- _[Beneficio claro 2]_

### Negativas / Riscos / Trade-offs (-)

- _[Ex: Curva de aprendizado inicial maior para membros juniores]_
- _[Ex: Necessidade de setup adicional no load balancer para multiplexação HTTP/2]_

---

## альтернаativas Avaliadas e Descartadas

1. **[Solução Alternativa 1]:** _[Por que não foi escolhida? Ex: REST com JSON — Tráfego redundante e falta de tipagem hard-coded client-side.]_
2. **[Solução Alternativa 2]:** _[Por que não foi escolhida?]_

---

## 🏷️ Meta-Dados

- **Status:** [ ] Proposto | [ ] Aceito | [ ] Depreciado | [ ] Substituído
- **Data:** `YYYY-MM-DD`
- **Área Impactada:** _[Backend, Frontend, Infra, Database, Security]_
- **Validado por:** `@Agente / Arquiteto Responsável`
