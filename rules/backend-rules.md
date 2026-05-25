# Backend Workspace Rules

## 📌 Visão Geral

Este documento estabelece as diretrizes de arquitetura, segurança, concorrência, otimização de baixo nível e integração de sistemas para o desenvolvimento lógico de aplicações servidoras de alta resiliência no ecossistema `agente-core`.

---

## 🛰️ 1. Isolamento e Boundaries (Padrão Hexagonal / Clean Architecture)

- **Hexagonal Architecture (Ports & Adapters):** O domínio central de negócios (lógica de regras puras e entidades) deve ser inteiramente isolado de agentes externos e de infraestrutura técnica (bancos de dados, clientes HTTP, bibliotecas de serialização, frameworks web).
  - Toda comunicação com o mundo externo deve ocorrer através de **Ports** (interfaces abstratas de entrada/saída) declaradas no domínio.
  - Implementações específicas (como banco PostgreSQL, AWS S3 ou chamada gRPC) residem na camada externa como **Adapters** (adaptadores) que implementam tais portas. A alteração de um adaptador de persistência (ex: trocar de AWS S3 para Cloudflare R2) deve ter impacto zero na lógica de negócio core.
- **Modelos de Transferência (DTOs & Mappers):** Entidades do banco de dados e segredos internos jamais devem vazar em respostas HTTP. O fluxo de dados deve converter entidades em Data Transfer Objects (DTOs) por meio de mappers estritamente tipados antes de atingir a camada de controle/roteamento.

---

## 💾 2. Mapeamento de Dados: ORM vs. ODM

- **Escolha Racional de Persistência:** A modelagem deve respeitar a distinção estrutural entre tradutores relacionais e documentais:
  - **Object-Relational Mappers (ORM):** Adequados para modelos de dados altamente interconectados e transacionais (ACID). Atenção especial à concorrência interna, carregamento ansioso de relacionamentos críticos e invalidação de cache de primeiro/segundo nível para evitar concorrências silenciosas e estouros de heap.
  - **Object-Document Mappers (ODM):** Adequados para estruturas de dados aninhadas de baixa interconectividade (hierárquicas). Evitar o antipadrão de simular relacionamentos do tipo "join" na camada da aplicação, o que degrada o throughput.
- **Prevenção do N+1:** É mandatório o uso de técnicas de agrupamento (*batching*) via DataLoaders ou unificação de buscas SQL (`WHERE IN`) para eliminar chamadas redundantes e consecutivas ao banco durante a resolução de coleções de dados.

---

## ⚙️ 3. Orquestração e Runtimes de Baixo Nível

- **Orquestração Big Data com Apache Spark (Kubernetes):**
  - Workloads de dados massivos devem ser orquestrados de forma conteinerizada nativa.
  - Implementar gerenciamento dinâmico de recursos (*Dynamic Resource Allocation*), delimitando de forma estrita o ciclo de vida e a memória dos executores (*Executors*).
  - Otimizar o armazenamento efêmero local e refinar os parâmetros de *Shuffle* (como número de partições e compactação) para evitar estrangulamento de rede e I/O de disco sob estresse.
- **Zig Systems Toolchain:**
  - Para workloads que exigem performance pura de sistemas, processamento de baixo nível ou bibliotecas nativas de alto desempenho, priorizar o Zig.
  - Aproveitar a integração nativa out-of-the-box com C/C++ sem camadas complexas de binding (FFI) e seu sistema robusto de cross-compilação integrado.
- **Tunagem de Concorrência e Garbage Collection (JVM, .NET 10, Go, Node.js):**
  - **Thread Pool Tuning:** Ajustar os limites mínimo e máximo de threads ativas para coincidir com as restrições físicas de vCPU e memória do contêiner, evitando exaustão por alternância excessiva de contexto (*context switching*).
  - **Garbage Collection (GC):** Em ambientes contêinerizados, o GC deve ser configurado de forma condizente com a carga de trabalho. Para servidores backend de alto throughput, configure runtimes como .NET 10 e Java para rodar em modo **Server GC** (maior consumo de RAM, porém com menor frequência de suspensão de execução). Para microsserviços leves com baixa memória, adote o modo workstation/padrão.

---

## 🔄 4. Resiliência e Shutdown Gracioso

- **Circuit Breakers & Retries:** Chamadas entre microsserviços distantes devem ser blindadas por disjuntores lógicos (*Circuit Breakers*) que cortam conexões consecutivas em caso de timeouts ou erros recorrentes do serviço dependente, preservando os recursos da thread local.
- **Graceful Shutdown (SIGTERM / SIGINT):** O backend deve interromper a aceitação de novas requisições em runtime, terminar o processamento de transações em andamento de forma segura, drenar o pool de conexões com o banco de dados e serviços externos, e apenas após essa rotina desligar o processo de forma limpa.
