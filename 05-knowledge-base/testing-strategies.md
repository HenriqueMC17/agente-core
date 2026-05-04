# Testing Strategies

## 📌 Contexto

Testes automatizados não são uma opção, são o alicerce da engenharia de software sênior. Sem testes agressivos, qualquer refatoração é apenas um palpite irresponsável (Fear-Driven Development).

---

## 📐 A Pirâmide de Testes de Três Camadas

### 1. Testes de Unidade (Unit Tests) - 70% da Base

- Foco absoluto na validação de funções isoladas, regras matemáticas, utilitários, e Mappers/Parsers Zod de objetos.
- **Puro:** Não conecta a Banco de Dados reais, não levanta a porta 3000 do Node e não clica em botões do Chrome DOM de verdade pesadamente.
- **Mocking Extremo:** O Agente deve usar `jest.mock()` / `vi.mock()` ou Spies para blindar a "sujeira externa" como AWS S3 ou SendGrid, e forçar o `throw` simulado de lá para ver se nossa unidade lida com ele. A suíte corre em `ms`.

### 2. Testes de Integração - 20%

- Onde as fronteiras se cruzam: O "Service de Usuário" envia dados autênticos para o Repositório, e este toca num PostgreSQL real num container Docker de teste, persistindo a linha.
- Exige o "Test DB" (schema limpo) configurado antes de toda Suite pelo Hook `beforeAll()` (Seed de dados limpos, Migrate do Prisma zerado).

### 3. Testes End-to-End (E2E) - 10%

- Ferramenta Mestre: **Playwright** ou **Cypress**.
- Percorre o "Happy Path" massivo: Acessa o Front (DOM/Vercel preview link), faz login visual, digita no input, submete pagamento do Cartão e checa o extrato.
- Altamente custosos (segundos/minutos) e frágeis face pequenas mudanças de classes CSS. O Teste confia mais em IDs (`data-testid`) do que em seletores div puramente visuais do Tailwind para não quebrar.

---

## 🛠️ Filosofia TDD vs Test-After

O agente sênior adota a versatilidade. Se a feature for obscura, um roteiro visual claro é o "Spike" e logo o teste vem atrás trancando (Test-After Regression Test). Mas se for refatorar Core-Logic ou Pagamento, force OBRIGATORIAMENTE o TDD inicial (Red -> Agente Codifica o Green -> Agente formata o Refactor).
