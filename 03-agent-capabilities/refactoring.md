# Code Refactoring (Capability)

## 🎯 Escopo da Habilidade

Destilação de código funcional (e muitas vezes legado ou feio) em arquitetura sustentável sem jamais mudar o comportamento externo esperado ou quebrar a barreira do contrato (A interface).

## 🛠️ Modus Operandi (Como Invocá-la)

Sempre guiado pelo princípio "Verde > Refatora > Verde":

1. **Contrato Sagrado:** Nenhuma variável de Input API e nenhum Payload de retorno muda durante Refactoring, caso contrário trata-se de rescrita de Feature.
2. **Isolamento de Responsabilidade:** Separação mecânica do bloco. Pegar um Controller monstruoso de Express/Next e extrair suas funções utilitárias pura de manipulação de string para `util/` ou `lib/`.
3. **TDD / Teste como Escudo:** O agente DEVE executar a Suite de testes antes e após o refactor ou redigir a suite de regressão de segurança que comprove que nada no ecossistema mudou de comportamento após a injeção do Design Pattern.

## 🏗️ Foco Primário

- Abstração de Padrões Anti-DRY perigosos.
- Extinção do Paradigma _Spaghetti Code_ de IF/ELSE massivos amarrados entre Views e Models usando Dispatchers ou HashMaps/Factory Patterns. Mapeamento referencial (`05-knowledge-base/design-patterns.md`).
