# Database Workspace Rules

## 📌 Visão Geral

Restrições inamovíveis voltadas ao desenvolvimento lógico de modelagem, migração, esquemas temporais e recuperação transacional contra bancos de dados Relacionais, NoSQL ou Caches Voláteis.

---

## 🗄️ 1. Governança do Schema e das Migrations

- **Versionamento Físico de Schema:** O código base comanda o destino do banco, nunca a inserção/alteração direta do DBA (Data Base Administrator) pelo terminal SQL online.
- Qualquer mudança de modelagem (adicionar novo campo referencial, enum novo, retirar restrição de chaves virgens) OBRIGATORIAMENTE se faz através de Scritps de Migrations rastreáveis (e.g., `Prisma Migrate`, `Flyway`, `Alembic`, `TypeORM Migrations`). Rollbacks fáceis são a premissa 1.0.
- **Soft Deletes por Instinto:** Prefira a restrição de dados e apagamentos maciços. Registros cruciais do sistema (Pedidos, Finanças, Contratos, Assinantes) JAMAIS serão de fato `DELETADOS` nativamente pelo operador `DELETE FROM`. Insira sinalizadores booleanos `is_deleted` ou estampas temporais `deleted_at`, garantindo rastros para recuperação contenciosa (Audit-logs em Action).

---

## 🔗 2. Otimização de Pesquisa e Modelagem Restrita

- **Normalização Racional:** Até a 3ª Forma Normal no modelo relacional para extirpar cópias falsas. No entando, admita denormalização com triggers passivos no banco para visualização rápida caso a leitura custe dezenas de `JOINS` matemáticos na aplicação, prejudicando os Core Web Vitals visuais do sistema.
- **Indexação Estratégica, não Global:** Campos sempre atuantes no clímax do _WHERE_ (como Chave estrangeira, Emails para log in, Datas de criação contínua, IDs de sessões hash) DEVERÃO receber `INDEXes`, frequentemente com restrições B-Tree ou Hash nativas adequadas para leitura de alta performance. Indexação massiva de toda coluna no entanto desacelera violentamente Writes e Inserts massivos (Update Lag). Analise seu Read-Write Ratio.

---

## ⚡ 3. A Luta contra o N+1 e Carga Massiva

- **Sorteio em Lote / DataLoader:** A arquitetura RESTful/GraphQL proíbe lances N+1 diretos no Repositório Subjacente (ex: Retornou 50 autores e, via iteração burra map, fez mais 50 querries pedindo "livros relacionados por autor"). Implemente abstrações severas (DataLoader) ou Queries unificadas aglomeradas em um SQL `WHERE IN (a, b, c)` unificado na borda ORM.
