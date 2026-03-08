# Protocolo de Refatoração (The Boy Scout Rule)

## 📌 1. Análise Inicial (Antes de Tocar o Código)

- O código que será modificado já possui **testes unitários ou de integração** mitigando efeitos colaterais (side-effects)?
- Existem quebras dependentes? (Ex.: Mudar a assinatura de um serviço compartilhado).

## 🛠 2. Refatorando Sem Alterar Comportamento

- Use _Extract Method, Extract Variable, Invert If_.
- NOMEAÇÃO: Refinamento de nomes de funções e variáveis baseando-se no que elas **fazem**, e não no que elas **são** tecnicamente.
- A função faz apenas UMA coisa? (Princípio SRP).

## 🧪 3. Feedback Loop

- Execute os testes a cada alteração pequena.
- Lint: Certifique-se de estar rodando as ferramentas estáticas antes do envio (SonarQube, ESLint, Flake8).

## 🚀 4. Review & Deploy

- "Deixe o acampamento mais limpo do que encontrou."
- Quebre os commits (Commits em partes pequenas facilitam Review).
- Especifique a mudança na descrição de seu Pull Request indicando o _Porquê_ em vez do _O que_.
