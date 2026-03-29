# Java Enterprise System Constraints

## 📌 Contexto

Este stack é governado pela fortíssima segurança de tipo da linguagem, multithreading massivo nativo e maturidade arquitetural (Spring Boot Ecosystem / Quarkus JVM limit).

---

## ☕ 1. Design MVC Global do Spring Framework

- A base é pautada primariamente em REST via `@RestController` injetados pela mágica do IoC e Dependency Injection via Scopes contextuais (`@Service`, `@Repository`).
- A injeção pesada ou via Getters descontrolada foi trocada inteiramente pelo _Constructor Injection_. Vantagem da nulabilidade (Campos _final_, imutabilidade limpa dos DTOs via Records no Java 17+, garantindo não instanciar Controllers inúteis por reflexão faltante). NADA de `@Autowired` desimpedido no topo de classe suja.

## 🏗️ 2. JPA & Hibernate Cuidado de Estado (Database)

O Java pode falhar espetacularmente na nuvem caso o pool se atrase na comunicação com entidades Relacionais longas.

- O perigo clássico e imoral do `LazyLoadingException` do DB na Sessão O.R.M vs JSON DTOs soltos no roteamento Spring: Entidades Hibernate com coleções Lazy (`@OneToMany`) são lidas com `@Query EntityGraph` ativamente definidos em consultas Repository pesadas para o N+1 não dizimar a API na query N vezes invisível para cada sub-entidade de lista. DTO Projects resolvem. Repasse DTO Record e não a Entidade com travas proxy Hibernate até a View JSON do Jackson.

## ⚙️ 3. Concorrência Multithreading e Records Modernos

- Emprega os Recursos Recentes (Virtual Threads - `Project Loom`), para alívio assombroso em processos IO-bound massivos bloqueantes ou uso limpo das execuções via ThreadPools nativas fixadas do Spring Async/Executor. Nada de classes imensas e Boilerplate em record/getters: Domínios puramente utilitários se balizam em Java `Records` garantindo DTO imutáveis e puristas para a memória do GC e Threads.
