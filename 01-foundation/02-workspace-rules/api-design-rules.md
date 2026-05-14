# API Design Workspace Rules

## 📌 Visão Geral

Define as obrigações estritas e as filosofias para planejamento, consumo e contrato público das conexões inter-sistemas via redes (REST, GraphQL, gRPC, tRPC, WebSockets). Garantia de retrocompatibilidade, verbosidade correta e segurança.

---

## 🛣️ 1. Princípios de Assinatura e Negociação de Interface (Contratos RESTful)

- **Mapeamento Resource-Oriented (Substantivos, Nunca Verbos no Resto):** Uma URI define uma entidade. O Verbo HTTP define o que vai ser feito.
  - ❌ Incorreto: `POST /api/createOrder` | `GET /api/filterUsers`
  - ✅ Correta Abordagem: `POST /api/orders` | `GET /api/users?status=active`
- **Aninhamentos (HATEOAS em Profundidade):** Evite sub-nós na URL cruzarem vastas tabelas do DB ou gerarem ambiguidade. Fique em, no máximo, dois níveis.
  - ✅ OK: `/users/{id}/orders`
  - ❌ Frágil/Engessado: `/users/{id}/orders/{order_id}/items/{item_id}`. (Prefira um route direto como `GET /items/{item_id}` ao invocar a atomicidade real do modelo).
- **Tipagem Forte Universal (Toda API Externa ou Fullstack tem Payload):** Adote schemas Zod/Joi para modelar cada trânsito ou exporte os Tipos `.ts` se for tRPC/GraphQL gerado nativamente.

---

## 📦 2. Limites (Rate Limits) e Proteção de Borda

- Toda API gerada pelos Agentes ou Infraestrutura deste repositório terá proteção ativa e passiva implementada no Cloud Provider ou Nginx/API Gateway limitando _Spikes_ repentinos (Rate Limiting HTTP 429).
- Seja implacável no tratamento dos dados postados. Verifique assinaturas e tokens em Middlewares rigorosos globais e aplique `Helmet` (ou headers equivalentes HTTP modernos HSTS / CSP).

---

## 🧾 3. Versionamento Dinâmico sem Fuga (Breaking Changes)

- A arquitetura corporativa **abomina a alteração/retirada arbitrária de campos** (Breaking Changes destrutivos) em V1, pois clients, mobile ou provedores externos podem quebrar cegamente.
- Mude o payload e adicione colunas (Additive Changes) à vontade.
- Caso precise realmente _reescrever como o recurso fundamental se porta_, faça nascer uma `v2` na URl ou via aceitações no Content-Type Headers (API Versioning).
  Ex: `/api/v2/products` enquanto orfana graciosamente a rota `/v1` por aviso HTTP `Warning` e período de _sunset_.
