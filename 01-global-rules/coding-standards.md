# Coding Standards (Clean Code)

## 📌 Visão Geral

Este documento define as **leis inegociáveis** para a escrita de código em todo o ecossistema `@agente-senior-fullstack`.
O objetivo primário do código não é apenas ser executado por máquinas, mas ser **facilmente lido, mantido e escalado por humanos e agentes de IA**.

---

## 🏗️ 1. Princípios Básicos (A Filosofia Clean)

- **Seja Direto e Conciso:** O código deve fazer exatamente o que diz. Evite abstrações precoces e over-engineering (YAGNI - _You Aren't Gonna Need It_).
- **Auto-documentação:** Nomes de variáveis, funções e classes devem revelar sua intenção clara e inequivocamente. Comentários devem justificar o **porquê** (decisões de domínio/business) e nunca o **o que** (o código já diz isso).
- **Fail Fast:** Sistemas devem falhar visivelmente e o mais cedo possível em caso de erros ou dados impossíveis, em vez de arrastar estados inválidos pela aplicação (ex: _Guards Clauses_ no início da função).
- **KISS (Keep It Simple, Stupid):** Prefira soluções simples e idiomáticas. Um código inteligente (clever) quase sempre é pior que um código legível.

---

## 📜 2. Convenções e Estilística

- **Nomenclatura (Naming):**
  - Use nomes descritivos e pronunciáveis.
  - **Idiomas:** Salvo exceções locais, o código (variáveis, métodos, logs e infraestrutura) **deve ser escrito em Inglês**. Somente textos de UI/Mensagens voltadas ao usuário final podem ser localizados.
  - Booleans devem soar como perguntas: `isReady`, `hasPermission`, `shouldRender`.
- **Funções e Tamanho:**
  - Funções devem realizar **apenas uma coisa** (Single Responsibility Principle - SRP).
  - Limite de argumentos: Idealmente até 2 argumentos. Mais que isso, use objetos (Data Transfer Objects / Prop Objects) para encapsular parâmetros.
  - **Nesting (Profundidade):** Evite mais do que 2 níveis de aninhamento linear (`if` dentro de `for`). Retorne cedo (_early return_).

---

## 🧪 3. Padrões de Teste e Qualidade

- **Mandatório:** Nenhum código crítico de negócio (Core) é aceito sem cobertura de testes automatizados associados.
- **Pirâmide de Testes:**
  1.  **Unit Tests (Maioria):** Teste os isolamentos lógicos e funções puras de manipulação.
  2.  **Integration Tests (Meio):** Teste conexões entre serviços e APIs de DB reais ou acoplados.
  3.  **E2E (Topo da Pirâmide):** Fluxos críticos de interface com o usuário e endpoints centrais através do `playwright_runner.py` ou equivalentes.
- **Padrão AAA (Arrange, Act, Assert):**
  - _Arrange:_ Configure o cenário e dados.
  - _Act:_ Invoque o método que está sendo testado.
  - _Assert:_ Verifique se a expectativa final coincidiu. (Deixe cada setup bem demarcado visualmente).

---

## 🚨 4. Linters e Code Review

- **Execução Obrigatória:** O código deve passar de forma absoluta pelos comandos do `lint_runner.py` atrelados às regras base (ESLint stricto, Prettier, Pylint ou correspondente à linguagem nativa).
- **Code Review (IA & Humana):** Durante a criação ou push, nenhum _magic number_ (constantes jogadas sem nome), variáveis não utilizadas ou complexidade ciclomática acima do teto de qualidade deve ser admitida.
