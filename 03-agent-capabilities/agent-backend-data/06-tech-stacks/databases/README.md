# 06-tech-stacks / databases

## 🎯 Propósito

Governar as decisões, sintaxes, lógicas relacionais ou dimensionais focadas no armazenamento, persistência, indexação e segurança dos **Bancos de Dados**.

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

Atua como o referencial restritivo das fundações de persistência. Obriga e disciplina a atuação do agente sobre transações, bloqueios de escalabilidade de lock e regras para queimas controladas de dados.

## 📂 Natureza dos Arquivos

- Documentações isoladas por infraestrutura DB (PostgreSQL, MongoDB, Redis).
- Políticas rigorosas sobre versionamento de esquema e migrations (`schema-evolution.md`).
- Paradigmas de indexação, B-Trees vs NoSQL indexing, Query Profiling via plan.
- Padrões de conexão, pool management, e ORMs vs Raw SQL.

## ⚙️ Diretrizes de Manutenção e Uso

- Quando convocado a debugar queries lentas ou modificar _migration scripts_, ler os fundamentos contidos de forma mandatória.
- Evolução seletiva: O conhecimento do banco não deve se espalhar nas regras do código cliente/app-level; mantenha o limite do "domínio de persistência" imaculado.

## 🔗 Relação com Outras Camadas

- Totalmente contido no espectro definido em `02-workspace-rules/database-rules.md`.
- Fundamenta os "porquês" nas soluções contidas em `05-knowledge-base/scalability-patterns.md`.
