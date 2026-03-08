# Document & NoSQL Capabilities

## 📌 Contexto

Estruturas flexíveis/Dimensionais sem Schema rígido (MongoDB, DynamoDB, Redis/K-V). Não deve ser selecionada pelo hype inicial ou para evitar o trabalho das Migrations de um SGBD, mas por demanda exclusiva da natureza escalável da entidade massiva/documento JSON do Business.

---

## 📄 1. Modelagem Desnormalizada

A premissa da agregação de dados vs Joins lógicos: Em MongoDB os _Joins_ (`$lookup`) são ineficientes numa arquitetura de sharding longo cross-tables.

- **Dado que viaja junto, armazene junto.** Ao modelar `Posts` do Blog, não quebre uma Tabela relacional externa paralela pesada de `Comment`. Embeda em Arrays controláveis do Documento Mongo Pai `Post: { comments: [{..}] }` ativamente caso a listagem não infle o limiar BSON size document (16Mb), se exceder ou ser estritamente semântico para outro domínio (Lista de Usuários Fãs), crie a Referência separada.
- Mapeamento Single-Table-Design do DynamoDB avança além de schemas nativos e centraliza Múltiplas Partições Sort-Keys em Modelos mestres otimizados apenas para as Query Patterns lógicas, não pro "Ego do Database Model visual limpo".

## 🏎️ 2. Key-Value & Caching Extremo (Redis Memória Passará)

O Cache NoSQL do Redis se trata como nuvem de Memória viva e volátil sem fidelidade.

- Dados guardados nunca pressupõem eternidade para as Regras do Workspace. Se queimar, o fluxo base Backend recalcula, e reconstrói o Record String via banco lento estruturado ou Rest-Call e armazena via Injeções Stale revalidadas com `TTL` (Expirations automáticos) e Chaves Hierárquicas organizadas semanticamente (`user:auth:token_hash-xx / item:stock_counter:ID_xx / web:ssr:home_html_xx`).
- Idealmente modelado pro bloqueio atômico mútuo em disputas virtuais e _Rate Limiting Gateways_.
