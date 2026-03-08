---
description: Avaliação heurística e auditoria total de projetos e pastas
---

# Auditoria de Código Contínua

## Objetivo

Avaliações rígidas usando scripts paralelos para caçar dívida técnica sistêmica (Code Smells), falha em segurança e lentidão severa na árvore construída.

## ⚙️ Executando a Rotina Completa (O Workflow)

1. **A Invocação**
   - Quando ativado o perfil `code-audit` ou mencionado pelos comandos finais de fase como "final checks", inicie a bateria mecânica em camadas.
   - Confirme que você está no diretório correto do projeto base (Ex: `./src/app` ou `.`).

2. **Fase 1: Scanner de Vulnerabilidades (Ameaça Alta)**
   - Inicie ferramentas analíticas ativas e varredura na pasta, validando chaves expostas, desatualização de módulos CVE ou pacotes comprometidos.
   - Aplique a leitura de heurística (ex: script `security_scan.py` das skills/09-skills).

3. **Fase 2: Arquitetura e Linting Reflexivo**
   - Verifique o acoplamento: Controller/Routes não podem referenciar diretamente `query('SELECT...')` e devem fazê-lo abstraídos.
   - Verifique componentes React: Estão grandes demais? Se houver mais de 3 hooks inter-dependentes soltos (sem custom hook isolado) levante bandeira vermelha e sugira o refactor atômico.
   - **// turbo**
   - Confirme execução do formater `Prettier` e rules do `ESLint/Ruff`.

4. **Fase 3: Elaboração do Resumo de Correção**
   - Retorne para o usuário a matriz de severidade dos achados.
   - Dê a opção: "Gostaria de rodar um script de formatação automática para os 14 erros de lint, ou quer que refatoremos juntos a dívida técnica apontada no módulo X?"
