# Relational (SQL) Databases & Architectures

## 📌 Contexto

Os limitados e imortais repositórios estruturados: PostgreSQL e MySQL. A premissa suprema para qualquer dado que importa (Financeiro, Usuários, Contratos) onde as regras ACID são a fundação inquestionável.

---

## 🗄️ 1. Otimização Transacional (ACID Limits)

- Bancos Relacionais prosperam sob normalização e garantem **Consistência Limitada**.
- Mantenha fumaça de Lock baixa: Modificações no banco (Transações explícitas - `BEGIN/COMMIT`) devem ser tratadas pelo Agente de forma ultra-encapsulada. A transação abre, insere R$, e fecha _instantaneamente_. Não faça requisições externas à redes/APIs com banco de dados em um `await` que congela os workers de tabelas longamente, gerando Deadlocks cruéis nos outros Clientes do Pool de Conexão.

## 🐎 2. ORMs Relacionais e suas Armadilhas (Prisma/TypeORM/Hibernate)

As abstrações facilitam o CRUD mas corroem analíticas por baixo do pano de Query gerada via Proxy.

- Fuja das "Lazy Loads Mascaradas" em N+1 (Pedir dados em Array Loop do JS/TS) se seu Log emitiver várias queries em rajada isoladas. O ORM deve unificá-las na raiz (Includes globais de 1-to-Many).
- Nunca execute count() in-memory com métodos `.length` nas entidades. Adote a busca na própria Engine de agrupamento SQL (`SELECT COUNT(*)`, Aggregates direct DB).
- Tabelas quentes requerem `Index` no FK e buscas (B-Tree). Exigido o `.EXPLAIN ANALYZE` caso tabelas do projeto de Agent Tech passem da barreira de 1MRows sem índex. Se usar UUID na PK Primária de chaves relacionais em PgSQL, saiba que a inserção desordenada prejudica páginas. Empregue chaves lexicográficas incrementais `ULID/UUIDv7` como ID primária do projeto.
