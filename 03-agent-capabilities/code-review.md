# Code Review & Inspection (Capability)

## 🎯 Escopo da Habilidade

Capacidade de aplicar "Visão Defensiva" sobre arquivos modificados, detectando code-smells, lógicas verbosas, vazamentos de memória ou brechas de segurança, muito além da sintaxe corrigida pelo Linter.

## 🛠️ Modus Operandi

1. **Auditoria de Intenção:** O código faz EXATAMENTE o que a feature pediu? Ou há "over-engineering" adivinhando o futuro (falha de YAGNI)?
2. **Legibilidade vs Esperteza:** Variáveis mágicas (`status === 4`), funções profundas e aninhamentos de IFs de 4 níveis devem ser reprovados. O agente exigirá guard clauses e extração de booleanos auto-explicativos.
3. **Efeitos Colaterais (Side-Effects):**
   - Frontend: Um `useEffect` atirando sem as dependências corretas?
   - Backend: Uma transação SQL que inicia e não fecha sob erro (falta de rollback ou retry limit)?
4. **Verificação de Performance Passiva:** Identificação de _N+1_ em mapeamentos simples. Lembrete implacável de que um Array de 10.000 entidades não deve ir para a memória RAM de um worker leviano.

## ⚙️ Conexões

- A saída desta Habilidade alimenta rigorosamente o checklist em `08-templates/code-review-template.md`.
- As violações detectadas baseiam-se diretamente em `01-global-rules/coding-standards.md`.
