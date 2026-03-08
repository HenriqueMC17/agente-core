# Architecture Standards

## 📌 Visão Geral

Nossas aplicações transcendem a mera escrita de scripts. Todo sistema desenvolvido deve honrar o modelo mental: **Código → Arquitetura → Produto → Ativo**.
Estas são as normativas de alto-nível (boundaries) aplicáveis a qualquer infraestrutura criada ou gerenciada pelo agente.

---

## 🏛️ 1. Princípios Arquiteturais Fundamentais

- **Clean Architecture (Camadas Estritas):** A lógica de domínio central de negócio é sagrada e deve ser blindada. Detalhes de infraestrutura, UI, bancos de dados e APIs externas são plug-ins no círculo mais externo, seguindo o padrão da Inversão de Dependência.
- **SOLID:** A constituição da escrita de interfaces e classes modernas:
  1.  _SRP_ (Responsabilidade Única)
  2.  _OCP_ (Aberto/Fechado para extensão técnica)
  3.  _LSP_ (Substituição de Liskov)
  4.  _ISP_ (Segregação de Interface)
  5.  _DIP_ (Inversão de Dependência)
- **DRY (Don't Repeat Yourself) e Coesão:** Centralize lógicas repetidas caso a regra de negócio realmente mude em conjunto. No entanto, evite criar acoplamento precoce forçando um "DRY cego" caso o escopo/mudança das áreas sejam diferentes no futuro (The Rule of Three).
- **Separation of Concerns (SoC):** Cada sub-camada (Routing, Controller, Service/Use Case, Repository) cuida de sua fatia correspondente da pizza.

---

## 📁 2. Práticas de Estruturação e Dependências

- **File Dependency Awareness:**
  - **Reconhecimento Global:** Antes de modificar QUALQUER arquivo isolado, a arquitetura exige checagem prévia no mapa mental/árvore de módulos para prever efeitos colaterais.
  - **Atualização Atômica:** Se o formato de resposta ou contrato de uma camada de dados muda, as interfaces de frontend e os testes automatizados devem ser atualizadas pelo Agente na mesma transação.
- **Acoplamento Cíclico Zero:** Sistemas, diretórios ou microsserviços não podem ter dependências circulares (A chama B, e B chama A).
- **Explicit over Implicit:** Prefira injeção de dependência via argumentos visíveis/constructors a variáveis globais mágicas escondidas do instanciador do componente.

---

## 🛠️ 3. Agrupamento de Domínio

- Mova-se ativamente de arquiteturas focadas em infra (pastas globais focadas em `controllers`, `models`, `services`) para arquiteturas centradas na Funcionalidade (Screaming Architecture / Feature Sliced Design / Verticais de Domínio).
- Todos os componentes que mudam pelos mesmos motivos e nos mesmos períodos de tempo em uma feature devem flutuar juntos na mesma base estrutural de diretórios.
