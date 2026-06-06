# 🪐 DIRETRIZ OPERACIONAL DO CLAUDE (`CLAUDE.md`)

Esta diretriz estabelece as convenções de engenharia lógica, design engineering e viewport para agentes de alta precisão baseados em lógica e visão computacional (como a família **Claude 3.5 Sonnet / 3.7 Sonnet** e assistentes visuais baseados em layouts) operando em `c:\Dev\agente-core`.

---

## 📐 1. Visual Design Engineering e Viewport Rigor

Modelos orientados a design engineering devem aplicar rigor matemático e micro-interações impecáveis na renderização de interfaces do ecossistema:

1.  **Strict Bento Layouts:** A organização das views deve seguir uma proporção matemática harmoniosa. Use grades Bento para dados complexos, combinando diferentes pesos de boxes e garantindo alinhamento de bordas.
2.  **Rigor de 8px e Alinhamento:** Padding, margin, gap e tamanhos devem obrigatoriamente seguir a escala de 8px. Interfaces técnicas exigem consistência.
3.  **Translucidez Glassmorphism (Liquid Glass):**
    *   Sempre aplique `backdrop-filter: blur(...)` para dar sensação de profundidade tridimensional.
    *   Em overlays e modais, use `background: rgba(...)` calibrado para manter legibilidade do conteúdo subjacente.
4.  **Acessibilidade e Contraste APCA:**
    *   Utilize o algoritmo APCA para calcular o contraste perceptivo de fontes e superfícies.
    *   Texto pequeno ou de alta importância em fundo escuro deve usar pesos de fonte superiores (ex: `font-weight: 500`) ou maior luminosidade de cor.

---

## 🔧 2. Engenharia de Lógica e Qualidade de Código

Agentes de desenvolvimento devem assegurar a estabilidade lógica do ecossistema de software:

*   **TypeScript & Tipagem Rígida:** NUNCA utilize o tipo genérico `any`. Todas as assinaturas de funções, estados e APIs devem ser explicitamente tipadas com interfaces ou types estritos.
*   **Proibição Absoluta de Placeholders:** Ao editar ou criar arquivos de código, nunca insira comentários evasivos como `// TODO: implement later` ou `/* rest of the code remains the same */`. Código gerado deve ser completo, testável e pronto para produção (*Production-Ready*).
*   **Gestão de Estado Reativa e Signals:** Em frameworks como Svelte 5 ou Vue 3.6, implemente reatividade de baixo nível baseada em Signals/Runes, otimizando re-renders desnecessários e mantendo a renderização em 60fps estável.

---

## 🧪 3. Protocolo de QA e Cobertura de Testes

1.  **Testes Unitários e Integração:** Todo novo módulo em `/modules` que execute operações de cálculo ou manipulação de dados deve vir acompanhado de sua suite de testes unitários local.
2.  **Execução de Testes Automáticos:** Utilize o TestSprite MCP para disparar suites de testes de ponta a ponta (E2E), garantindo que as modificações de tela ou lógica não quebraram regressivamente outras áreas da aplicação.
3.  **Assertion de Cobertura:** A cobertura mínima aceitável para qualquer alteração lógica de produção é de **80%**.

---

## 🎨 4. Design-to-Code com Google Stitch

Ao receber especificações de design geradas através do Google Stitch:

*   **Mapeamento de Tokens:** Traduza as variáveis visuais do Stitch (color schemes, typography scales, corner radiuses) diretamente para variáveis CSS customizadas no arquivo global `index.css`.
*   **Fidelidade Multimodal:** Utilize a câmera de visão do modelo para comparar frames renderizados com o protótipo do Stitch, corrigindo cirurgicamente quaisquer desvios de pixels, proporções ou materiais.
