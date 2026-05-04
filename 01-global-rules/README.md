# 01-global-rules

## 🎯 Propósito

Armazenar e impor as **leis inegociáveis** de engenharia. Trata-se do padrão mínimo absoluto de aceitação para qualquer linha de código escrita, alterada ou revisada.

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

Atua como o **Linting Cognitivo** do agente. Antes de qualquer entrega, valida a integridade, a segurança e a coerência do código em relação a toda a base. É a camada regulatória cross-domain (Tier 1 Global).

## 📂 Natureza dos Arquivos

Documentos contendo regras explícitas, imperativas e muitas vezes com pseudo-código ou regex de validação para balizar IA e Devs.

- `coding-standards.md`: Legibilidade, formatação e padrões de escrita.
- `architecture-standards.md`: Estruturas globais como injeção de dependências e boundaries.
- `security-standards.md`: Exigências como sanitização, fail-fast e tratamento de secrets.
- `performance-guidelines.md`: Otimização base em O(n), concorrência e memória.
- `git-governance.md`: Convenções de commit (Conventional Commits), branch flow e versionamento.

## ⚙️ Diretrizes de Manutenção e Evolução

- **Evolução:** Atualizado apenas frente à mudança de políticas operacionais ou frameworks unificados de código (e.g., adoção imperativa de tipagem estrita).
- **Uso:** Os agentes invocam estas regras invariavelmente ao finalizar tarefas (ex: `checklist.py`).

## 🔗 Relação com Outras Camadas

- É uma implementação estrita da filosofia contida no `00-governance`.
- Base unificada que restringe os tópicos abordados nas linguagens ou infraestrutura das `06-tech-stacks` e `02-workspace-rules`.
