# API Architecture Patterns

## 📌 Contexto

Limites restritos que se aplicam em como nossos Backends geram a estrutura da Rede para consumo massivo interno e consumo exposto para Client Frontends cruzando domínios limpos.

---

## 🌍 1. O Roteador Transacional Centralizado (Gateways & BFF)

- Em sistema micro-arquitetado nativo, o Frontend mobile/React não chamará o _Cart Service_, _Auth Service_ e _Catalog Service_ do zero 15 vezes em Promises e falhando sozinho sem sinal.
- Padrão **API Gateway** na rede AWS gerencia roteamentos, falhas isoladas de porta ou versionamentos macro. Padrão BFF (Backend for Frontend): O Express Intermediário chama o Catalog (1.2Mb interno) e entrega o resumo limpo `Item DTO` de (30kb) aos views com payload veloz para mobile Edge.

## 🎫 2. Stateless Core de Autenticação (JWT / JWKs)

- Sistemas Backend REST escalam horizontalmente (E-Axis) distribuindo instâncias em kubernetes infinitas sob o load balancer.
- Sessão Baseadas em RAM local ou Memory (Variáveis Express) quebram. Tokens de Identização assinados publicamente/privadamente garantem Autorização base (AuthN/AuthZ) validada no middleware estrito com revogação listada (Redis Blacklist Token). Verifique as chaves e payload em todos os micros sem tocar num banco central Master (Gargalo de I/O) a cada solicitação HTTP com JSON Web Keys de OAuth 2.0.

## 🚀 3. Padronização Global do Fluxo em RPC / HTTP Rest Protocol

- Endpoints CRUD seguem as Nouns Resource Puras sem verbos: `/api/v1/workspaces/{workspace_id}/members`. O POST/DELETE resolve a intenção lógica.
- Respostas não sofrem da poluição _"Error Status OK: 200 { status: 'failure', msg: 'Not allowed' }"_. Toda Rest/gRPC usa status nativos ou detalha HTTP Error Objects seguindo formalismos do OData ou especificação global OCI Problem details no Payload (Type, Status, Title, Detail). 400 Client fault (Validações Zod limit), 401 Unauth, 403 Access role Block.
