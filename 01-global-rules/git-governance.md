# Git Governance

## 📌 Visão Geral

Definições imutáveis que asseguram nosso livro de registros arquiteturais, versionamento histórico de código e o mapeamento linear e escalável de features entregues frente ao negócio e sub-agentes autônomos.

---

## 🔀 1. Branching Strategy e Nomenclatura

- Uso de um modelo ágil do tipo **Feature-Branch Workflow / GitHub Flow**:
  - O ramo `main`/`master` é sacrossanto, bloqueado e de qualidade "Production-Ready". Nenhuma interface, arquivo não-testado ou POC sobe livremente da IDE para cá.
  - Qualquer melhoria deve ter um _desprendimento efêmero_ derivado. Ex.: `feature/auth-pipeline`, `bugfix/cart-state-delay`, `refactor/split-ui-components`.
- Utilizar sufixo ou prefixos em minúsculo e espaçamento separado por hífenes (`kebab-case`).

---

## 💬 2. Padrões de Commit (Conventional Commits)

Um log de Git não é um diário confuso, é uma literatura do desenvolvimento de negócio.
Todos os commits devem cumprir **totalmente e semanticamente** com a RFC do Conventional Commits:

- **Formato de entrada:** `tipo(escopo-opcional): mensagem em minusculo`
- **Tipos aceitos de cabeçalhos:**
  - `feat:` Funcionalidade estrita que atinge o fim do funil ou valoriza o usuário.
  - `fix:` Supressão de Anomalia e conserto final.
  - `refactor:` Melhora/deslocamento interno de código ou lógica que **não** dita nova funcionalidade e **não** conserta bug funcional.
  - `chore:` Rotinas utilitárias como atualizar dependências do node, build scripts, ajustes do Agente, lint format.
  - `test:` Adicionando automações faltantes em pirâmide de Teste.
  - `docs:` Modificando `README.md`, templates ou esquemas de governança no 01/02-rules.

---

## 🤝 3. Regimes Transacionais e Integração (Merge/PR)

- Múltiplos Commits "Quebrados" (`fix typos`, `fixing syntax` etc.) advindos de refações confusas durante as horas de design de soluções ou prompts devem sofrer _SQUASH_ (achatamento) ao engajarem em um Merge/Feature Integration.
- Pull Requests / Integrations pedem revisão clara e concisa descritiva (vide: `08-templates/code-review-template.md`). Se o commit final não cabe em uma frase que o descreva fielmente, o PR é por definição amplo demais. Divida-o de volta.
