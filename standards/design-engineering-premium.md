# Protocolo de Excelência em Interface (Design Engineering Premium)

## 📌 Visão Geral

Este documento estabelece as normas técnicas, matemáticas e de física visual obrigatórias para a construção de interfaces de usuário (UI) de altíssimo prestígio no ecossistema `agente-core`. 

Em 2026, o design de interface é tratado como uma disciplina de engenharia rigorosa, combinando precisão geométrica com performance gráfica impecável.

Para especificações detalhadas sobre padronização de layouts e ecossistemas estéticos, consulte o compêndio completo em [Mastering AntiGravity and Google Stitch The Loop Design Manual](file:///c:/Dev/Docs/Mastering%20AntiGravity%20and%20Google%20Stitch%20The%20Loop%20Design%20Manual).

---

## 🎨 1. Estética Blueprint e Tipografia Técnica

O visual corporativo deve refletir transparência e integridade técnica por meio da estética de diagrama arquitetônico (*Blueprint*). Para diretrizes visuais premium, consulte o [2026 Enterprise Interface Standardization Manual_ A Reference for Design, Product, and Engineering.md](file:///c:/Dev/Docs/Mastering%20AntiGravity%20and%20Google%20Stitch%20The%20Loop%20Design%20Manual/2026%20Enterprise%20Interface%20Standardization%20Manual_%20A%20Reference%20for%20Design,%20Product,%20and%20Engineering.md).

- **Matriz Geométrica de Blueprint:**
  - Layouts devem evidenciar sua estrutura matemática. Utilize grades de baixa opacidade (linhas de 1px em `#1A1A1A` ou `#2D2D2D` com opacidade reduzida a `4%` - `8%`) separando colunas e seções de dados.
- **Tipografia Geist (Vercel):**
  - **Geist Sans:** A fonte sem-serifa padrão para títulos, textos de navegação e parágrafos.
  - **Geist Mono:** Utilizada para tabelas de dados, indicadores numéricos, chaves identificadoras e logs de sistema.
  - **Alinhamento Numérico:** Em tabelas e listas numéricas, é obrigatório aplicar a diretiva CSS `font-variant-numeric: tabular-nums` para forçar largura uniforme de caracteres e garantir alinhamento vertical perfeito de colunas.
- **APCA Contrast (Advanced Perceptual Contrast Algorithm):**
  - O contraste de texto e componentes de controle deve ser medido utilizando o algoritmo APCA. O WCAG 2 tradicional é considerado obsoleto.
  - Para textos comuns, o nível mínimo de contraste deve ser **Lc 75** (contraste ótimo). Para textos grandes ou cabeçalhos em negrito, o mínimo é **Lc 60**.

---

## 🖤 2. Materialidade e Profundidade: Dark Mode Tri-Layer

O design plano (*flat*) é proibido. As interfaces devem possuir profundidade física simulando camadas de empilhamento de materiais e iluminação realista.

```text
+-------------------------------------------------------------+
| Layer 2 (Elevated): #2D2D2D (Bordas finas de 1px a 15% white)|  <-- Modais, Popovers, Dropdowns
+-------------------------------------------------------------+
      ^
+-------------------------------------------------------------+
| Layer 1 (Card): #1A1A1A (Bordas finas de 1px a 8% white)    |  <-- Cards, Tabelas, Sidebar
+-------------------------------------------------------------+
      ^
+-------------------------------------------------------------+
| Layer 0 (Base): #0D0D0D                                     |  <-- Fundo Primário
+-------------------------------------------------------------+
```

- **Layer 0 (Base - Background):** `#0D0D0D` - A camada de menor elevação de tela.
- **Layer 1 (Card - Surface):** `#1A1A1A` - Superfície para agrupamento de widgets, formulários e painéis.
- **Layer 2 (Elevated - Overlay):** `#2D2D2D` - Camada para diálogos, menus flutuantes, tooltips e modais.
- **Crisp Borders (Bordas Finas de 1px):** Sombras puras são ineficazes sobre fundos escuros. Substitua-as por bordas internas de `1px` com cores sólidas levemente mais claras ou gradientes semi-transparentes de branco (`rgba(255, 255, 255, 0.08)` em Layer 1; `rgba(255, 255, 255, 0.15)` em Layer 2) para separar cirurgicamente as elevações.
- **Layered Shadows:** Utilize sombras ambientais em camadas para simular oclusão de luz. Exemplo em CSS:
  ```css
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.5),
    0 8px 16px -4px rgba(0, 0, 0, 0.7);
  ```

---

## 🍹 3. Liquid Glass (Vidro Líquido Acelerado por GPU)

O efeito de vidro fosco é exclusivo para painéis interativos flutuantes, sidebars dinâmicas e blocos de processamento gerados por IA.

- **Configuração CSS Recomendada:**
  ```css
  background-color: rgba(13, 13, 13, 0.4);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  ```
- **Aceleração Gráfica por Hardware:**
  - Efeitos de desfoque de fundo são intensos em processamento. Para evitar lentidão na renderização e engasgos (*jank*) de scroll, aplique transformações 3D vazias no elemento para forçar a renderização na GPU:
    ```css
    transform: translate3d(0, 0, 0);
    will-change: transform, backdrop-filter;
    ```

---

## 🌀 4. Movimento Físico e Easing de Mola

Animações lineares ou transições estáticas sem graça transmitem artificialidade. O movimento de elementos de interface deve seguir leis físicas de molas e elasticidade.
- Para obter especificações detalhadas sobre timelines de movimento e animações acionadas por rolagem física acelerada por GPU, consulte [Mastering the Flow_ A Conceptual Compendium of Scroll-Driven Animation.md](file:///c:/Dev/Docs/Mastering%20AntiGravity%20and%20Google%20Stitch%20The%20Loop%20Design%20Manual/Mastering%20the%20Flow_%20A%20Conceptual%20Compendium%20of%20Scroll-Driven%20Animation.md).

- **CSS `linear()` Spring Easing:**
  - Use a nova especificação da função `linear()` para mapear com precisão matemática o retorno elástico (*spring bounce*).
  - **Fórmula de Mola (CSS linear):**
    ```css
    transition: transform 0.6s linear(
      0, 0.402 7.4%, 0.732 14.8%, 0.852 18.6%, 
      0.901 20.9%, 1 25.1%, 1.054 29.8%, 1.059 31.9%, 
      1.05 34.2%, 1 42.6%, 0.985 47.9%, 0.985 53.6%, 1 65%
    );
    ```
- **Proibição de `transition: all`:**
  - É proibido forçar o navegador a interpolar todas as propriedades CSS de um elemento. Especifique detalhadamente os alvos da transição (ex: `transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;`) para otimizar o tempo de quadro.

---

## ⚡ 5. Micro-interações de Inteligência Artificial

- **Streaming Text Cursor (Server-Sent Events):**
  - Ao exibir texto gerado em tempo real por LLMs, exiba ao final do bloco de caracteres um cursor vertical de `2px` de largura com animação de piscamento de **500ms**.
  - **CSS do Cursor:**
    ```css
    .ai-cursor::after {
      content: '';
      display: inline-block;
      width: 2px;
      height: 1.2em;
      background-color: var(--color-accent);
      margin-left: 2px;
      vertical-align: middle;
      animation: blink 0.5s step-start infinite;
    }
    @keyframes blink {
      50% { opacity: 0; }
    }
    ```
- **Skeletons Anti-CLS (Cumulative Layout Shift):**
  - Os carregadores em esqueleto devem espelhar em proporção exata 1:1 a estrutura geométrica dos componentes reais populados. Isso garante que a rolagem inicial e a montagem do componente real não desloquem visualmente a página.
