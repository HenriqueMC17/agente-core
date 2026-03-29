---
description: Centralizer for all generic Ad-Hoc Agent CLI and Chat commands.
---

# 💻 Agent Commands (Ad-Hoc Workflows)

Este documento centraliza a reação atômica aos comandos curtos e interativos do Agente.
Use estes protocolos quando o usuário invocar ferramentas de ação rápida.

---

## 1. `/create` - Iniciar Nova Aplicação
**Objetivo:** Criar scaffolding e setup de novos projetos a partir do zero.
- **Passo 1:** Analisar o pedido via `conversation-manager`.
- **Passo 2:** Planejar o projeto usando `project-planner` (Tech stack, estrutura de pastas).
- **Passo 3:** Orquestrar o `app-builder` (Database, Backend, Frontend).
- **Passo 4:** Iniciar Preview.

## 2. `/enhance` - Iteração em Aplicação Existente
**Objetivo:** Adicionar ou atualizar features rápidas no código atual.
- **Passo 1:** Ler estado atual (`session_manager.py info`).
- **Passo 2:** Planejar a alteração e listar impactos se for grande.
- **Passo 3:** Executar (invocando experts se necessário).
- **Passo 4:** Recarregar Preview (`hot reload`).

## 3. `/brainstorm` - Exploração (Sem Código)
**Objetivo:** Discutir ideias e caminhos arquiteturais detalhados com Prós e Contras antes do código.
- Ofereça pelo menos 3 abordagens (Opção A, B e C) com prós, contras e esforço estimado.
- Recomende o melhor caminho e pergunte a decisão.

## 4. `/plan` - Planejamento Isolado
**Objetivo:** Apenas planejar (Gerar `PLAN-{nome}.md`), **sem** escrever código da feature.
- Use modo Socrático.
- Gere o checklist detalhado dentro da pasta `docs/`.

## 5. `/test` - Geração e Execução de Testes
**Objetivo:** Criar suítes de teste (Unit/E2E), rodar testes locais e checar coverage.
- Padrão **Arrange-Act-Assert**.
- Isole Side-effects com Mocks ou Spies.

## 6. `/debug` - Resolução de Problemas
**Objetivo:** Investigação sistêmica reversa de bugs graves ou erros de compilação.
- Não "chute" o código. Forme hipóteses organizadas, teste cada uma eliminando o problema e só então aplique a correção.
- Adicione medidas preventivas.

## 7. `/deploy` - Liberação para Nuvem
**Objetivo:** Pipeline final interativa para Produção ou Preview on Vercel/Fly/AWS.
- **Prioridade:** Rodar `npm run build` ou lint (The Pre-flight check). Se falhar, negue o deploy e avise o usuário.
- Se passar, emita sumário do ambiente e URL.

## 8. `/preview` & `/status` - Dashboard e Teste Local
**Objetivo:** Iniciar auto_preview local e mostrar status estático.
- `preview start/stop/check` controla o servidor web local.
- `status` exibe as métricas ativas do Agente e features concluídas.
