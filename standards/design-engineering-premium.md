# Protocolo de Excelência em Interface (Design Engineering Premium)

Este documento estabelece as normas técnicas, matemáticas e filosóficas obrigatórias para a construção de interfaces corporativas e sistemas visuais de alta fidelidade no ecossistema `agente-core`. 

O design no cenário tecnológico de 2026 é tratado estritamente como um problema de engenharia: sistemático, performático e matematicamente rigoroso.

---

## 1. Visão Estratégica: A Engenharia de Design (*Craft*)

A transição da estética utilitária plana para a era da **Design Engineering** representa o amadurecimento do software. A excelência visual não é decorativa; é um indicador da integridade da engenharia subjacente. Uma interface com ritmo visual preciso e movimentos fluidos sinaliza que a segurança, a performance e a gestão de dados possuem o mesmo rigor aplicado ao alinhamento de um pixel.

### Pilares Fundamentais:
*   **Velocidade como Recurso de Design:** Um software sem latência que responde de forma mágica transforma o tempo de processamento em uma experiência fluida de recepção.
*   **Estética Blueprint:** Inspirada no design suíço e em diagramas arquitetônicos, utiliza grades matemáticas visíveis de baixa opacidade para estruturar o layout, comunicando transparência, precisão e estabilidade.

---

## 2. Fundações Estruturais: Grades, Espaçamento e Tipografia

A consistência matemática é o único antídoto contra o "vale da estranheza" (*uncanny valley*) em interfaces profissionais.

### 2.1. O Sistema de Espaçamento de 8px
Todo o layout deve ser construído sobre uma unidade base de **8px**. Variações são permitidas apenas por necessidade de ajuste óptico pontual (±1px).

| Elemento de Interface | Medida (Desktop) | Medida (Mobile) | Objetivo / Impacto Visual |
| :--- | :--- | :--- | :--- |
| **Grid de Blueprint** | 16px / 32px | 16px | Scaffold estrutural e rigor técnico visível. |
| **Gutter Size (Calhas)** | 24px | 16px | Define o ritmo respiratório do layout. |
| **Layout Padding** | 24px a 64px | 16px a 24px | Isola o foco cognitivo e aumenta a clareza. |
| **Micro-espaçamento** | 4px / 8px | 4px / 8px | Agrupa logicamente labels, ícones e controles. |

### 2.2. Tipografia Técnica
A tipografia atua como a camada primária de navegação estrutural.
*   **Fontes:** Utilize **Geist** (projetada a partir de sua versão *monospace* para maior legibilidade em ambientes de dados densos) ou **SF Pro**.
*   **Alinhamento de Dados:** Para tabelas e exibição de métricas numéricas, é mandatório o uso de fontes mono-espaçadas ou a propriedade CSS `font-variant-numeric: tabular-nums` para garantir alinhamento vertical perfeito.
*   **Contraste APCA:** O contraste de texto e componentes deve seguir o padrão **APCA** (*Advanced Perceptual Contrast Algorithm*), superando as limitações do WCAG 2 tradicional com maior precisão perceptual.

---

## 3. Materialidade e Profundidade: Dark Mode 2.0 e Glassmorphism

Substituímos o design plano por superfícies que possuem volume, comportamento físico e iluminação.

### 3.1. Dark Mode Premium (Default Standard)
Em 2026, o Dark Mode é o padrão profissional para análises prolongadas de dados. É proibido o uso de preto puro (`#000000`).

```
[Layer 2 (Elevated): #2D2D2D] (Modais e Menus)
      ^
[Layer 1 (Card): #1A1A1A] (Superfícies de Conteúdo)
      ^
[Layer 0 (Base): #0D0D0D] (Fundo Primário)
```

*   **Layer 0 (Base):** `#0D0D0D` — O fundo de menor elevação da aplicação.
*   **Layer 1 (Card):** `#1A1A1A` — Superfícies de agrupamento de conteúdo.
*   **Layer 2 (Elevated):** `#2D2D2D` — Modais, popovers e menus flutuantes.
*   **Iluminação:** Como sombras são ineficazes no fundo escuro, utilize bordas finas semi-transparentes de `1px` (*Crisp Borders*) combinadas com sombras em camadas (*Layered Shadows* — mínimo de 2 camadas: uma para luz de ambiente, outra para projeção de foco).

### 3.2. Glassmorphism 2.0 (Indicadores de IA)
O efeito de vidro fosco é restrito à sinalização de elementos transitórios ou saídas geradas por IA em tempo real.
*   **Parâmetros:** `backdrop-filter: blur(12px)` a `blur(20px)` com opacidade de fundo entre **8% e 15%**.
*   **Aceleração de Hardware:** Sempre aplique `transform: translateZ(0)` ou `will-change: transform` para forçar a renderização por GPU e evitar engasgos (*jank*) de rolagem.
*   **Performance CSS:** Proibido o uso de `transition: all;`. Liste detalhadamente as propriedades animadas. Utilize blocos `@supports` para resiliência em browsers legados.

---

## 4. Padrões de Interação e Feedback Dinâmico

### 4.1. Streaming Text (SSE)
Para saídas gerativas de IA via *Server-Sent Events*, é obrigatória a inclusão de um cursor vertical de `2px` piscando na frequência de **500ms** posicionado no final do rastro de texto para indicar processamento ativo.

### 4.2. Skeleton Loaders Sem Deslocamento
Skeletons de carregamento devem espelhar exatamente (1:1) as dimensões físicas dos componentes finais para mitigar o **CLS** (*Cumulative Layout Shift*). Utilize gradientes lineares com animação suave de *shimmer*.

### 4.3. Indicadores de Confiança de IA
Sinalize a confiabilidade de dados sintetizados por IA através de:
*   Bordas codificadas por cor (verde para alta confiança, âmbar para incerteza lógica).
*   Badges percentuais de certeza.
*   Exibição clara de citações de fontes de referência (*Source Citations*).

---

## 5. Performance, Teclado e Formulários

*   **Acessibilidade:** Utilize `aria-live="polite"` em contêineres de texto em streaming para que leitores de tela processem o conteúdo sem interromper abruptamente a audição do usuário. Use `:focus-visible` para anéis de foco nítidos.
*   **Comportamento de Teclado em Formulários:** Em inputs de linha única, a tecla `Enter` submete o formulário. Em blocos `<textarea>`, a submissão deve ocorrer exclusivamente via `Cmd/Ctrl + Enter`; a tecla `Enter` isolada deve apenas inserir uma quebra de linha.
*   **Sem Bloqueio de Submissão:** Nunca desative botões de submit. Permita que o usuário tente enviar para disparar a validação e focar automaticamente no primeiro campo com erro.
*   **Física de Animação:** Evite durações lineares estáticas. Utilize a função CSS `linear()` para simular movimentação física e aceleração de mola.
*   **Scrolljacking:** É terminantemente proibido sequestrar a física de rolagem do browser do usuário. Animações devem ser acionadas pela posição do scroll, mantendo o controle total da velocidade com o usuário.

---

## 6. Checklist de Excelência (Deploy Ready)

Antes de realizar o deploy de qualquer interface, verifique:

1.  [ ] **APCA Contrast:** O texto sobre elementos translúcidos atende ao contraste perceptual mínimo?
2.  [ ] **Safe Areas:** O layout respeita notches e áreas seguras de aparelhos mobile?
3.  [ ] **Streaming Active:** O cursor vertical piscando a 500ms está presente na geração de texto?
4.  [ ] **Zero CLS Skeletons:** As dimensões dos skeletons batem 1:1 com os dados carregados?
5.  [ ] **GPU Acceleration:** Elementos com blur e filtros utilizam `translateZ(0)`?
6.  [ ] **Focus Return:** O foco retorna ao elemento de origem após fechar modais?
7.  [ ] **Tabular Nums:** Números em tabelas usam fontes tabulares e alinhamento vertical perfeito?
8.  [ ] **Translate Exclusions:** Chaves de código e termos técnicos possuem `translate="no"`?
9.  [ ] **Hydration-Safe:** Inputs retêm foco e valor após a hidratação do SSR/CSR?
10. [ ] **Physics Easing:** Transições complexas utilizam funções de mola e easings físicos?
