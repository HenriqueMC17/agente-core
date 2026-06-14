# Database Workspace Rules

## 📌 Visão Geral

Este documento estabelece as restrições inamovíveis voltadas ao desenvolvimento lógico de modelagem, migração, otimização de consultas e escalabilidade distribuída para bancos de dados Relacionais, NoSQL e Caches no ecossistema `agente-core`.

Para detalhes operacionais profundos sobre otimização e conteinerização de dados, consulte o compêndio em [OS Architecture and Container Engineering Concepts](file:///c:/Dev/Docs/OS%20Architecture%20and%20Container%20Engineering%20Concepts).

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
  - Para detalhes internos sobre modelagem de planos baseados em custo e heurísticas de junções relacionais, consulte o [Manual de Arquitetura de Software_ The Inner Workings of a Classic Query Optimizer.md](file:///c:/Dev/Docs/OS%20Architecture%20and%20Container%20Engineering%20Concepts/Manual%20de%20Arquitetura%20de%20Software_%20The%20Inner%20Workings%20of%20a%20Classic%20Query%20Optimizer.md) e as diretrizes do [Technical Recommendation Report_ Operational Robustness in Industrial-Scale Query Optimization.md](file:///c:/Dev/Docs/OS%20Architecture%20and%20Container%20Engineering%20Concepts/Technical%20Recommendation%20Report_%20Operational%20Robustness%20in%20Industrial-Scale%20Query%20Optimization.md).
- **Resiliência a Erros de Cardinalidade (Benchmark JOB):**
  - Estimadores de cardinalidade clássicos baseiam-se na premissa de independência de atributos, o que frequentemente falha em dados reais inter-relacionados.
  - Erros em cascata nas estimativas de cardinalidade podem degradar a performance do plano de execução em ordens de magnitude. Consultas que envolvem tabelas fortemente correlacionadas devem ser validadas. Siga o protocolo estabelecido no [Technical Protocol_ Cardinality Estimator Validation via Join Order Benchmark (JOB).md](file:///c:/Dev/Docs/OS%20Architecture%20and%20Container%20Engineering%20Concepts/Technical%20Protocol_%20Cardinality%20Estimator%20Validation%20via%20Join%20Order%20Benchmark%20(JOB).md).
- **Realidade de Dados Assimétricos: IMDB vs. TPC-H:**
  - Evite validar o desempenho de índices e planos de execução apenas com dados sintéticos uniformemente distribuídos (como no benchmark TPC-H).
  - Use conjuntos de dados reais ou assimétricos (como o benchmark IMDB, caracterizado por distribuições de dados realistas e enviesadas - *skewed data*) para verificar o comportamento sob assimetria severa de cardinalidade. A seletividade real dos índices deve ser testada contra picos de distribuição extrema de valores. Para fundamentação teórica sobre esse fenômeno, veja o [Why Computers Fail at Predicting Data_ A Guide to the _Guessing Game_ of Databases.md](file:///c:/Dev/Docs/OS%20Architecture%20and%20Container%20Engineering%20Concepts/Why%20Computers%20Fail%20at%20Predicting%20Data_%20A%20Guide%20to%20the%20_Guessing%20Game_%20of%20Databases.md).

---

## 🌐 3. Teoremas CAP / PACELC e Consistência Distribuída

- **Diretrizes do Teorema PACELC:**
  - Ao adotar bancos de dados distribuídos (ex: Cassandra, DynamoDB, MongoDB), o arquiteto deve mapear o comportamento do sistema sob a lente do teorema PACELC:
    - **P (Partition):** Se houver uma partição de rede, o sistema deve escolher entre **A** (Disponibilidade) ou **C** (Consistência).
    - **E (Else):** Senão (funcionamento normal), o sistema deve balancear entre **L** (Latência) ou **C** (Consistência).
  - **Aplicações Críticas:** Para dados transacionais (contabilidade, saldos), configure as leituras e escritas para consistência forte (ex: nível de consistência `QUORUM` ou `ALL` em Cassandra, ou `Strongly Consistent Reads` no DynamoDB), aceitando a penalidade de latência de acordo com a regra **E (Else) -> Consistency**.
  - **Aplicações Eventuais:** Para dados de alta ingestão (logs, visualizações, dados analíticos de tracking), configure leituras rápidas e consistência eventual (ex: consistência `ONE` ou `LOCAL_QUORUM`), priorizando latência mínima (**E (Else) -> Latency**).
  - Consulte o detalhamento acadêmico e conceitual sobre os tradeoffs de particionamento e consistência eventual no [Analytical Glossary_ Mastering the CAP Theorem & Distributed Systems.md](file:///c:/Dev/Docs/Programação%20Web/Analytical%20Glossary_%20Mastering%20the%20CAP%20Theorem%20&%20Distributed%20Systems.md).

---

## 🔗 4. Indexação Estratégica e Prevenção de N+1

- **Indexação Racional:** Índices do tipo B-Tree (para buscas de intervalo e igualdade) e Hash (para igualdade direta) devem ser aplicados em colunas com alta cardinalidade usadas frequentemente em filtros `WHERE` e junções `JOIN`.
  - Evite o antipadrão de indexar todas as colunas indiscriminadamente, o que sobrecarrega a taxa de transferência de escrita (*Write Throughput*) devido ao custo de atualização de índices.
- **Batched Queries contra N+1:** É expressamente proibido realizar iterações de requisições de consulta ao banco de dados no nível de aplicação para carregar sub-recursos. Toda resolução de dados aninhados deve usar carregamento em lote unificado (`WHERE IN`) ou abstrações do tipo DataLoader.
ar sub-recursos. Toda resolução de dados aninhados deve usar carregamento em lote unificado (`WHERE IN`) ou abstrações do tipo DataLoader.
