---
description: Processo padrão para iniciar um novo projeto ou repositório do zero com o Agente Sênior
---

# Estrutura e Início Rápido (Bootstrap)

## Objetivo

Padronizar a forma como todo projeto é gerado para evitar decisões repetitivas ou arquiteturas acopladas baseadas no humor do desenvolvedor.

## ⚙️ Passo a Passo (O Workflow)

1. **Definição de Domínio e Validação (Socratic Gate)**
   - Antes de rodar qualquer CLI ou script de scaffold (e.g. `npx create-next-app`), pergunte ao usuário:
     - "Qual o core business deste repositório?"
     - "Quem são os clientes finais do serviço (Interno cruds, ou Público SEO-first)?"
   - Utilize a matriz em `00-governance/decision-framework.md` para garantir que o projeto não pode ser resolvido com uma ferramenta pronta (SaaS/Planilha).

2. **Scaffolding e Estrutura Diretiva**
   - **// turbo**
   - Clone o template mental de pastas disposto em `08-templates/project-structure-template.md`.
   - Adicione o `.gitignore` padronizado ignorando `/node_modules`, `.env`, e binários nativos.
   - Aplique os packages utilitários mínimos do manifesto corporativo em pacote (`typescript`, linter global como `eslint-config-standard` ou Prettier, framework unitário leve `vitest`/`jest`).

3. **Injeção de Linters & Automação Base**
   - Insira configurações de `husky` ou pre-commit hooks.
   - Configure o comando `npm run lint` e garanta que ele execute com `--max-warnings=0`.

4. **Gerando Manifestos Internos**
   - Copie e popule o arquivo `08-templates/documentation-template.md` na raiz do novo projeto salvando como `README.md`.
   - Popule as referências essenciais do `Tech Stack`.

5. **First Commit (Gênese)**
   - Realize o `git init` e submeta `chore(setup): initializing core application architecture`.
   - Faça push inicial vazio ou do layout cru (se já houver o repositório no Cloud).
