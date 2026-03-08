# Design Patterns (Micro-Level)

## 📌 Contexto

Os micro-patterns de design referenciam o que ocorre "por dentro das funções ou classes". São as técnicas estritas (muitas do 'GoF') úteis no ambiente Node.js/TypeScript/Java e seus contra-exemplos diretos para as armadilhas comuns encontradas na prática.

---

## 🧩 Padrões Comuns de Base

### 1. Injeção de Dependência (Dependency Injection / IoC)

O sangue da Testabilidade Limpa.

- **❌ Ruim (Hard-coded):** Um Controller X instância a sua própria Database `const db = new PostgresDriver()` dentro do método `save()`. (Impossível de dar Mock num jest de unidade limpo).
- **✅ Correto:** O Controller recebe o DB no Constructor `constructor(private readonly db: DBInterface)`. A Main App acopla os dois.

### 2. Padrão Estratégia (Strategy Pattern) e o Fim dos IFs longos

Substitua switch/classes de métodos infinitos por interfaces limpas.

- Se o usuário paga via boleto, cartão, PIX e crédito na loja, não crie um Mega-controller de `Payment()` de mil linhas e `if` em todo lado. Crie "BoletoStrategy", "PixStrategy" que satisfaçam a interface da `ProcessPayment()` permitindo a classe chamadora invocar a variável designada dinamicamente via Dependency Registration (Factory/Record Hashmap).

### 3. Singleton (Raro Uso Moderno Consciente)

- Útil para Pools de conexão a banco ou Instanciar Instâncias pesadas de Prisma Client num dev server Hot-reload.
- Porém, fuja do "Estado Singleton Mutável" que guarda informações de request assíncrono em variáveis globais expostas no script corrompendo concorrência das chamadas web ao Node (`process.env` mutáveis e afins).

### 4. Builder / Fabric

- Muito usado para geração de Fixtures na suíte do Agente (Factories de Dados no Teste unitário). Mantenha as invocações de Objetos longos simples por chaining (ex: `new UserBuilder().withAdminRole().build()`).
