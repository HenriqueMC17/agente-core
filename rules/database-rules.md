# Database Workspace Rules

## 📌 Visão Geral

Este documento estabelece as restrições inamovíveis voltadas ao desenvolvimento lógico de modelagem, migração, otimização de consultas e escalabilidade distribuída para bancos de dados Relacionais, NoSQL e Caches no ecossistema `agente-core`.

---

## 🗄️ 1. Governança de Esquema e Migrações

- **Versionamento Físico de Schema:** O código base comanda o estado do banco, nunca a inserção/alteração direta do DBA pelo terminal SQL online.
  - Qualquer mudança de modelagem (adicionar novo campo, chave estrangeira, enum novo) deve ser feita obrigatoriamente através de scripts de **Migrations** versionados e rastreáveis (ex: `Prisma Migrate`, `Flyway`, `Alembic`). Rollbacks testados são premissa número um.
- **Soft Deletes por Padrão:** Registros cruciais do sistema (Pedidos, Transações, Finanças, Usuários) JAMAIS devem ser excluídos fisicamente via `DELETE FROM`. Utilize colunas booleanas (`is_deleted`) ou marcas temporais (`deleted_at`) para garantir trilhas de auditoria e recuperação de desastres.

---

## ⚡ 2. Otimização de Consultas e Estimativa de Cardinalidade

- **Cost-Based Optimizer (CBO) & Join Reordering:**
  - O otimizador de consultas por custo escolhe o plano de execução com base no menor custo estimado de E/S e processamento. Desenvolvedores devem compreender que o banco usa álgebra relacional e estatísticas (histogramas) para ordenar as junções.
  - Em queries complexas com múltiplos `JOINS`, o CBO calcula permutações de caminhos físicos. Use dicas (*hints*) do otimizador ou reestruture a query quando as heurísticas de ordenação de junções escolherem caminhos ineficientes (como Nested Loops em tabelas gigantescas em vez de Hash Joins).
- **Resiliência a Erros de Cardinalidade (Benchmark JOB):**
  - Estimadores de cardinalidade clássicos baseiam-se na premissa de independência de atributos, o que frequentemente falha em dados reais inter-relacionados (conforme demonstrado pelo *Join Order Benchmark* - JOB).
  - Erros em cascata nas estimativas de cardinalidade podem degradar a performance do plano de execução em ordens de magnitude. Consultas que envolvem tabelas fortemente correlacionadas devem ser testadas contra volumes de produção para identificar e corrigir planos de execução subótimos resultantes dessas falhas estatísticas.
- **Realidade de Dados Assimétricos: IMDB vs. TPC-H:**
  - Evite validar o desempenho de índices e planos de execução apenas com dados sintéticos uniformemente distribuídos (como no benchmark TPC-H).
  - Use conjuntos de dados reais ou assimétricos (como o benchmark IMDB, caracterizado por distribuições de dados realistas e enviesadas - *skewed data*) para verificar o comportamento sob assimetria severa de cardinalidade. A seletividade real dos índices deve ser testada contra picos de distribuição extrema de valores.

---

## 🌐 3. Teoremas CAP / PACELC e Consistência Distribuída

- **Diretrizes do Teorema PACELC:**
  - Ao adotar bancos de dados distribuídos (ex: Cassandra, DynamoDB, MongoDB), o arquiteto deve mapear o comportamento do sistema sob a lente do teorema PACELC:
    - **P (Partition):** Se houver uma partição de rede, o sistema deve escolher entre **A** (Disponibilidade) ou **C** (Consistência).
    - **E (Else):** Senão (funcionamento normal), o sistema deve balancear entre **L** (Latência) ou **C** (Consistência).
  - **Aplicações Críticas:** Para dados transacionais (contabilidade, saldos), configure as leituras e escritas para consistência forte (ex: nível de consistência `QUORUM` ou `ALL` em Cassandra, ou `Strongly Consistent Reads` no DynamoDB), aceitando a penalidade de latência de acordo com a regra **E (Else) -> Consistency**.
  - **Aplicações Eventuais:** Para dados de alta ingestão (logs, visualizações, dados analíticos de tracking), configure leituras rápidas e consistência eventual (ex: consistência `ONE` ou `LOCAL_QUORUM`), priorizando latência mínima (**E (Else) -> Latency**).

---

## 🔗 4. Indexação Estratégica e Prevenção de N+1

- **Indexação Racional:** Índices do tipo B-Tree (para buscas de intervalo e igualdade) e Hash (para igualdade direta) devem ser aplicados em colunas com alta cardinalidade usadas frequentemente em filtros `WHERE` e junções `JOIN`.
  - Evite o antipadrão de indexar todas as colunas indiscriminadamente, o que sobrecarrega a taxa de transferência de escrita (*Write Throughput*) devido ao custo de atualização de índices.
- **Batched Queries contra N+1:** É expressamente proibido realizar iterações de requisições de consulta ao banco de dados no nível de aplicação para carregar sub-recursos. Toda resolução de dados aninhados deve usar carregamento em lote unificado (`WHERE IN`) ou abstrações do tipo DataLoader.
