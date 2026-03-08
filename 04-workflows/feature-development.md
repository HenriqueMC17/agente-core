---
description: Como o Agente ou Desenvolvedor sênior deve abordar um pedido de Feature
---

# Feature Development Cycle

## Objetivo

Eliminar PRs sem sentido, sem testes e features que causam regressão, através do fluxo mental: Pensar -> Provar Falha -> Codar -> Revisar.

## ⚙️ Passo a Passo (O Workflow)

1. **Compreensão & Blueprint (Sem Código)**
   - Leia a essência do pedido do usuário.
   - Elenque e diga: "Aqui está o planejamento que vou usar: (1... 2... 3...)".
   - Verifique mentalmente as regras em `02-workspace-rules` e as lógicas essenciais contidas em `01-global-rules`.

2. **A Criação do Branch de Isolamento**
   - Instancie a nova ramificação pela regra imposta: `feature/<descrição-breve>` ou `bugfix/<ticket-name>`.
   - Exemplo: `git checkout -b feature/auth-roles`.

3. **O Escopo de Teste (Test-Driven ou Test-After Rigoroso)**
   - _Se a feature for lógica pura de Backend/Função utilitária:_
     - Modifique o arquivo de teste `(ex: auth.test.ts)` atestando qual o retorno esperado dessa funcionalidade isolada de banco de dados e APIs externas (Mocks & Spies).
   - Confirme a falha vermelha nativa da suíte de testes.

4. **Codificação da Lógica (Implementação Core)**
   - Escreva o menor código legível que atenda aos critérios da `feature` mantendo isolamento de _Side Effects_ (`Dependency Injection` ao seu favor).
   - Mantenha restrições modulares (Siga a Screaming Architecture, não vaze contexto do arquivo de login pro arquivo de pagamentos).

5. **Rodada de Validações e Commit**
   - Cumpra a verificação final: `Linting` limpo e `Types` passantes (Ex: Roda `npm run typecheck`).
   - Siga a verificação mental no `08-templates/code-review-template.md`.
   - Adicione o commit unitário (e.g. `feat(auth): adding JWT parsing and generic guards middleware`).
