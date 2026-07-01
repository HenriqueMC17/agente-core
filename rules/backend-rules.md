# Backend Workspace Rules

## 📌 Visão Geral

Este documento estabelece as diretrizes de arquitetura, segurança, concorrência, otimização de baixo nível e integração de sistemas para o desenvolvimento lógico de aplicações servidoras de alta resiliência no ecossistema `agente-core`.

Para estudos e aprofundamentos detalhados, consulte o compêndio completo em [Bibliotecas, Frameworks, API e Crud](file:///c:/Dev/Docs/Bibliotecas,%20Frameworks,%20API%20e%20Crud) e o [Manual de Governança Técnica e Padrões de Engenharia](file:///c:/Dev/Docs/Essential%20Developer%20Resource%20Directory/Manual%20de%20Governança%20Técnica%20e%20Padrões%20de%20Engenharia.md).

---

## 🛰️ 1. Isolamento e Boundaries (Padrão Hexagonal / Clean Architecture)

- **Hexagonal Architecture (Ports & Adapters):** O domínio central de negócios (lógica de regras puras e entidades) deve ser inteiramente isolado de agentes externos e de infraestrutura técnica (bancos de dados, clientes HTTP, bibliotecas de serialização, frameworks web).
  - Toda comunicação com o mundo externo deve ocorrer através de **Ports** (interfaces abstratas de entrada/saída) declaradas no domínio.
  - Implementações específicas (como banco PostgreSQL, AWS S3 ou chamada gRPC) residem na camada externa como **Adapters** (adaptadores) que implementam tais portas. A alteração de um adaptador de persistência (ex: trocar de AWS S3 para Cloudflare R2) deve ter impacto zero na lógica de negócio core.
  - Para detalhes de implementação conceitual e isolamento de regras, consulte o [Conceptual Guide_ Understanding Hexagonal and Clean Architectures.md](file:///c:/Dev/Docs/Bibliotecas,%20Frameworks,%20API%20e%20Crud/Conceptual%20Guide_%20Understanding%20Hexagonal%20and%20Clean%20Architectures.md).
- **Modelos de Transferência (DTOs & Mappers):** Entidades do banco de dados e segredos internos jamais devem vazar em respostas HTTP. O fluxo de dados deve converter entidades em Data Transfer Objects (DTOs) por meio de mappers estritamente tipados antes de atingir a camada de controle/roteamento.

---

## 💾 2. Mapeamento de Dados: ORM vs. ODM

- **Escolha Racional de Persistência:** A modelagem deve respeitar a distinção estrutural entre tradutores relacionais e documentais.
  - Consulte a comparação conceitual em [The Bridge Between Code and Data_ A Beginner's Guide to ORM and ODM.md](file:///c:/Dev/Docs/Bibliotecas,%20Frameworks,%20API%20e%20Crud/The%20Bridge%20Between%20Code%20and%20Data_%20A%20Beginner's%20Guide%20to%20ORM%20and%20ODM.md).
  - **Object-Relational Mappers (ORM):** Adequados para modelos de dados altamente interconectados e transacionais (ACID). Atenção especial à concorrência interna, carregamento ansioso de relacionamentos críticos e invalidação de cache de primeiro/segundo nível para evitar concorrências silenciosas e estouros de heap.
  - **Evolução de Runtimes ORM (Prisma 7):** Priorize soluções livres de dependência de binários Rust externos em tempo de execução para otimizar a velocidade de inicialização do contêiner e mitigar quebras de FFI no Node.js/TypeScript. Para detalhes sobre essa migração arquitetural, veja o [Architectural Evolution Report_ The Transition to Rust-Free ORM Runtimes (Prisma 7).md](file:///c:/Dev/Docs/Bibliotecas,%20Frameworks,%20API%20e%20Crud/Architectural%20Evolution%20Report_%20The%20Transition%20to%20Rust-Free%20ORM%20Runtimes%20(Prisma%207).md).
  - **Object-Document Mappers (ODM):** Adequados para estruturas de dados aninhadas de baixa interconectividade (hierárquicas). Evitar o antipadrão de simular relacionamentos do tipo "join" na camada da aplicação, o que degrada o throughput.
- **Prevenção do N+1:** É mandatório o uso de técnicas de agrupamento (*batching*) via DataLoaders ou unificação de buscas SQL (`WHERE IN`) para eliminar chamadas redundantes e consecutivas ao banco durante a resolução de coleções de dados.

---

## ⚙️ 3. Orquestração, Protocolos e Runtimes de Baixo Nível

- **Orquestração Big Data com Apache Spark (Kubernetes):**
  - Workloads de dados massivos devem ser orquestrados de forma conteinerizada nativa. Implementar gerenciamento dinâmico de recursos (*Dynamic Resource Allocation*), delimitando de forma estrita o ciclo de vida e a memória dos executores (*Executors*). Otimizar o armazenamento efêmero local e refinar os parâmetros de *Shuffle* (como número de partições e compactação) para evitar estrangulamento de rede e I/O de disco sob estresse. Consulte o planejamento estratégico em [Strategic Roadmap for SPARK-Based Multi-Cluster Kubernetes Orchestration.md](file:///c:/Dev/Docs/Bibliotecas,%20Frameworks,%20API%20e%20Crud/Strategic%20Roadmap%20for%20SPARK-Based%20Multi-Cluster%20Kubernetes%20Orchestration.md).
- **Zig Systems Toolchain:**
  - Para workloads que exigem performance pura de sistemas, processamento de baixo nível ou bibliotecas nativas de alto desempenho, priorizar o Zig, aproveitando a integração nativa com C/C++ sem camadas complexas de binding e cross-compilação robusta integrada. Consulte o estudo sobre segurança de memória em [Panorama of Reliable Technologies_ A Guide to Memory Safety and Systems Optimization.md](file:///c:/Dev/Docs/Linguagens%20de%20Programa%C3%A7%C3%A3o/Panorama%20of%20Reliable%20Technologies_%20A%20Guide%20to%20Memory%20Safety%20and%20Systems%20Optimization.md).
- **Tunagem de Concorrência e Garbage Collection (JVM, .NET 10, Go, Node.js):**
  - Consulte a avaliação comparativa de runtimes de alta performance em [Technical Comparative Report_ The Architecture of Logic, Types, and Execution (2026).md](file:///c:/Dev/Docs/Linguagens%20de%20Programa%C3%A7%C3%A3o/Technical%20Comparative%20Report_%20The%20Architecture%20of%20Logic,%20Types,%20and%20Execution%20(2026).md).
  - **Thread Pool Tuning:** Ajustar os limites mínimo e máximo de threads ativas para coincidir com as restrições físicas de vCPU e memória do contêiner, evitando exaustão por alternância excessiva de contexto (*context switching*).
  - **Garbage Collection (GC):** Em ambientes contêinerizados, o GC deve ser configurado de forma condizente com a carga de trabalho. Para servidores backend de alto throughput, configure runtimes como .NET 10 e Java para rodar em modo **Server GC** (maior consumo de RAM, porém com menor frequência de suspensão de execução). Para mitigar anti-padrões clássicos em contêineres sob estresse severo, siga o [Diagnostic Report_ Production Anti-Patterns in .NET 10 API Ecosystems.md](file:///c:/Dev/Docs/Bibliotecas,%20Frameworks,%20API%20e%20Crud/Diagnostic%20Report_%20Production%20Anti-Patterns%20in%20.NET%2010%20API%20Ecosystems.md).
- **Matriz de Decisão de Comunicação e APIs:**
  - O design de integrações distribuídas deve se guiar pela latência, vazão e overhead de serialização de cada protocolo. Avalie as compensações entre REST, GraphQL, gRPC (HTTP/2 + Protobuf), WebSockets e SSE usando o framework em [Technical Decision Matrix_ Communication Protocols for Distributed Architectures.md](file:///c:/Dev/Docs/Bibliotecas,%20Frameworks,%20API%20e%20Crud/Technical%20Decision%20Matrix_%20Communication%20Protocols%20for%20Distributed%20Architectures.md). Para uma comparação de alto nível entre as stacks backend de produção (Python, Node.js, PHP), consulte o [Relatório de Decisão Arquitetural (ADR) - Stacks Backend](file:///c:/Dev/Docs/Essential%20Developer%20Resource%20Directory/Relatório%20de%20Decisão%20Arquitetural%20(ADR)_%20Avaliação%20Comparativa%20de%20Stacks%20Backend%20(Python,%20Node.js,%20PHP).md).

---

## 🔒 4. Resiliência, Segurança de Acesso e Rate Limiting

- **API Security & Agentic Backends (OWASP 2025):**
  - Toda comunicação baseada em agentes deve seguir políticas rígidas de Zero-Trust e controle contextual dinâmico via ABAC. Consulte o manual de segurança em [Advanced Architectural Guide_ API Security and Agentic Backends (OWASP 2025 Standards).md](file:///c:/Dev/Docs/Desenvolvimento%20de%20Software/Advanced%20Architectural%20Guide_%20API%20Security%20and%20Agentic%20Backends%20(OWASP%202025%20Standards).md).
- **Circuit Breakers & Retries:** Chamadas entre microsserviços distantes devem ser blindadas por disjuntores lógicos (*Circuit Breakers*) que cortam conexões consecutivas em caso de timeouts ou erros recorrentes do serviço dependente, preservando os recursos da thread local. Siga as orientações contidas no [Reliability Engineering Manual_ Implementing Resilient and Secure Distributed Systems.md](file:///c:/Dev/Docs/Linguagens%20de%20Programa%C3%A7%C3%A3o/Reliability%20Engineering%20Manual_%20Implementing%20Resilient%20and%20Secure%20Distributed%20Systems.md).
- **Arquitetura de Rate Limiting Adaptativa:**
  - Aplique regras de contenção de requisições baseadas nos algoritmos Token Bucket ou Leaky Bucket nas bordas da rede para evitar ataques de DoS e exaustão de conexões no backend. Consulte o guia arquitetural em [The Architect's Guide to API Rate Limiting_ Ensuring Stability and Fairness.md](file:///c:/Dev/Docs/Bibliotecas,%20Frameworks,%20API%20e%20Crud/The%20Architect's%20Guide%20to%20API%20Rate%20Limiting_%20Ensuring%20Stability%20and%20Fairness.md).
- **Defesa Estratégica em APIs JWT:**
  - Proteja o tráfego contra explorações de identidade clássicas (como alteração para `alg: none` e sequestro de sessão). É obrigatória a rotação segura de chaves assimétricas via JWKS (JSON Web Key Sets) e a implementação de validação rigorosa de emissores (*iss*) e audiências (*aud*). Para diretrizes de hardening detalhadas, veja o [Technical Opinion_ Strategic Architectural Defense Against JWT Vulnerabilities and Identity Exploitation.md](file:///c:/Dev/Docs/Bibliotecas,%20Frameworks,%20API%20e%20Crud/Technical%20Opinion_%20Strategic%20Architectural%20Defense%20Against%20JWT%20Vulnerabilities%20and%20Identity%20Exploitation.md).
- **Graceful Shutdown (SIGTERM / SIGINT):** O backend deve interromper a aceitação de novas requisições em runtime, terminar o processamento de transações em andamento de forma segura, drenar o pool de conexões com o banco de dados e serviços externos, e apenas após essa rotina desligar o processo de forma limpa.
enar o pool de conexões com o banco de dados e serviços externos, e apenas após essa rotina desligar o processo de forma limpa.
