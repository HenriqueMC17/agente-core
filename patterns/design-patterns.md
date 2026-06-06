# 📚 KNOWLEDGE BASE: Design Patterns — Catálogo Operacional 2026

> **Domínio:** Patterns / Software Design  
> **Versão:** 1.0 | 2026

---

## 1. Filosofia: Padrões como Vocabulário Compartilhado

> "Padrões de projeto são soluções para problemas recorrentes; diretrizes sobre como abordar certos desafios em situações específicas."  
> — Kamran Ahmed

Padrões NÃO são:
- Bibliotecas para instalar
- Código para copiar e colar
- Soluções universais

Padrões SÃO:
- Vocabulário técnico compartilhado
- Templates de raciocínio para problemas recorrentes
- Trade-offs documentados e testados

---

## 2. Padrões Criacionais: Como Instanciar Objetos

### Singleton
```typescript
// Quando: Exatamente UMA instância global (DB connection, Logger)
class DatabaseConnection {
  private static instance: DatabaseConnection;
  
  private constructor() {}
  
  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
}
```
**Use quando:** Config global, connection pooling, Logger centralizado  
**Evite quando:** Estado mutável compartilhado (causa bugs difíceis de rastrear)

---

### Factory Method
```typescript
// Quando: Criação de objetos com variações sem expor a lógica de construção
interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  send(message: string) { /* email */ }
}

class SMSNotification implements Notification {
  send(message: string) { /* SMS */ }
}

function createNotification(type: 'email' | 'sms'): Notification {
  const factories = {
    email: () => new EmailNotification(),
    sms: () => new SMSNotification(),
  };
  return factories[type]();
}
```
**Use quando:** Múltiplas variações de um objeto, lógica de criação complexa

---

### Builder
```typescript
// Quando: Objeto com muitos parâmetros opcionais
class QueryBuilder {
  private query = { table: '', conditions: [], limit: 100 };
  
  from(table: string) { this.query.table = table; return this; }
  where(condition: string) { this.query.conditions.push(condition); return this; }
  take(limit: number) { this.query.limit = limit; return this; }
  build() { return this.query; }
}

// Uso fluente (Method Chaining)
const query = new QueryBuilder()
  .from('users')
  .where('active = true')
  .take(50)
  .build();
```
**Use quando:** Construção complexa passo a passo, configurações opcionais

---

## 3. Padrões Estruturais: Composição de Entidades

### Repository
```typescript
// Quando: Abstração da camada de dados (Clean Architecture)
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}

// Implementação — pode ser trocada sem impactar o domínio
class PostgresUserRepository implements UserRepository {
  async findById(id: string) { /* SQL query */ }
  async save(user: User) { /* INSERT/UPDATE */ }
  async delete(id: string) { /* DELETE */ }
}
```
**Use sempre que:** Houver acesso a banco de dados — isola o domínio da infraestrutura

---

### Adapter
```typescript
// Quando: Integrar interfaces incompatíveis
// Sistema legado retorna snake_case, mas o domínio usa camelCase

interface LegacyPaymentAPI {
  process_payment(amount: number, card_number: string): { transaction_id: string };
}

interface ModernPaymentService {
  processPayment(amount: number, cardNumber: string): Promise<{ transactionId: string }>;
}

class PaymentAdapter implements ModernPaymentService {
  constructor(private legacy: LegacyPaymentAPI) {}
  
  async processPayment(amount: number, cardNumber: string) {
    const result = this.legacy.process_payment(amount, cardNumber);
    return { transactionId: result.transaction_id };
  }
}
```
**Use quando:** Integrando SDKs de terceiros, migrando sistemas legados

---

### Decorator
```typescript
// Quando: Adicionar comportamento sem modificar a classe original
interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) { console.log(message); }
}

class TimestampLogger implements Logger {
  constructor(private logger: Logger) {}
  
  log(message: string) {
    this.logger.log(`[${new Date().toISOString()}] ${message}`);
  }
}

class JsonLogger implements Logger {
  constructor(private logger: Logger) {}
  
  log(message: string) {
    this.logger.log(JSON.stringify({ message, level: 'info' }));
  }
}

// Composição: Timestamp + JSON + Console
const logger = new TimestampLogger(new JsonLogger(new ConsoleLogger()));
```
**Use quando:** Middleware chains, logging, caching, validação transversal

---

## 4. Padrões Comportamentais: Comunicação entre Objetos

### Observer (Event-Driven)
```typescript
// Quando: Reação a eventos sem acoplamento direto
type EventHandler<T> = (payload: T) => void;

class EventEmitter<Events extends Record<string, unknown>> {
  private listeners = new Map<keyof Events, Set<EventHandler<unknown>>>();
  
  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(handler as EventHandler<unknown>);
  }
  
  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    this.listeners.get(event)?.forEach(handler => handler(payload));
  }
}
```
**Use quando:** Sistemas de notificação, desacoplar produtores de consumidores

---

### Strategy
```typescript
// Quando: Algoritmos intercambiáveis em runtime
interface SortStrategy {
  sort(data: number[]): number[];
}

class QuickSort implements SortStrategy {
  sort(data: number[]) { /* quick sort */ return data; }
}

class MergeSort implements SortStrategy {
  sort(data: number[]) { /* merge sort */ return data; }
}

class DataProcessor {
  constructor(private strategy: SortStrategy) {}
  
  setStrategy(strategy: SortStrategy) { this.strategy = strategy; }
  
  process(data: number[]) { return this.strategy.sort(data); }
}
```
**Use quando:** Múltiplos algoritmos para o mesmo problema, configuração por ambiente

---

### Command
```typescript
// Quando: Ações reversíveis (undo/redo), filas de operações
interface Command {
  execute(): void;
  undo(): void;
}

class MoveCommand implements Command {
  private previousPosition: Position;
  
  constructor(
    private entity: Entity,
    private newPosition: Position
  ) {}
  
  execute() {
    this.previousPosition = this.entity.position;
    this.entity.moveTo(this.newPosition);
  }
  
  undo() {
    this.entity.moveTo(this.previousPosition);
  }
}
```
**Use quando:** Histórico de ações, undo/redo, filas de operações, CQRS

---

## 5. Padrões Específicos para IA (2026)

### Context Manager Pattern
```typescript
// Quando: Gerenciar janela de contexto de LLMs
class ContextManager {
  private stack: ContextItem[] = [];
  private readonly MAX_TOKENS = 32_000;
  
  add(item: ContextItem) {
    this.stack.push(item);
    this.prune(); // Remove itens menos relevantes se exceder limite
  }
  
  private prune() {
    while (this.estimateTokens() > this.MAX_TOKENS) {
      // Remove do meio (mantém início e fim — Golden Order Rule)
      const midIndex = Math.floor(this.stack.length / 2);
      this.stack.splice(midIndex, 1);
    }
  }
  
  getOrdered(): ContextItem[] {
    // Retorna na ordem: críticos → suporte → tarefa atual
    return [
      ...this.stack.filter(i => i.priority === 'critical'),
      ...this.stack.filter(i => i.priority === 'support'),
      ...this.stack.filter(i => i.priority === 'current'),
    ];
  }
}
```

### Agent Orchestrator Pattern
```typescript
// Quando: Coordenar múltiplos agentes especializados
class AgentOrchestrator {
  private agents: Map<string, Agent> = new Map();
  
  register(name: string, agent: Agent) {
    this.agents.set(name, agent);
  }
  
  async execute(task: Task): Promise<Result> {
    const plan = await this.planDecomposition(task);
    
    const results = await Promise.all(
      plan.subTasks.map(subTask => {
        const agent = this.selectAgent(subTask);
        return agent.execute(subTask);
      })
    );
    
    return this.aggregateResults(results);
  }
  
  private selectAgent(task: SubTask): Agent {
    // Seleciona agente mais especializado para a sub-tarefa
    return this.agents.get(task.domain) ?? this.agents.get('general')!;
  }
}
```

---

## 6. Anti-Patterns: O Que NUNCA Fazer

| Anti-Pattern | Sintoma | Solução |
|---|---|---|
| **God Object** | Uma classe faz tudo | Dividir por responsabilidade (SRP) |
| **Primitive Obsession** | Usar string para email, CPF, etc | Criar Value Objects |
| **Magic Numbers** | `if (status === 3)` | Constants nomeadas ou enums |
| **Shotgun Surgery** | Mudança simples afeta 10+ arquivos | Localizar responsabilidade |
| **Feature Envy** | Método usa mais dados de outra classe | Mover o método |
| **Ball of Mud** | Contexto gigante sem estrutura | Context Manager Pattern |

---

> **Fontes:**  
> - *Guia Mágico de Padrões de Projeto: Do Cotidiano ao Código*  
> - *Guia Mestre: Fundamentos de Arquitetura de Software – Monólitos vs. Microserviços*
