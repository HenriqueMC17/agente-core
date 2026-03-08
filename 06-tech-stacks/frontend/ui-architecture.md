# UI Architecture & Design System Integration

## 📌 Contexto

O referencial de Componentização Visual baseada em Design Systems, Tailwind, Headless-UI (Radix / Shadcn) e consistência estética e de escala em todas as plataformas (Figma > React).

---

## 🎨 1. Tokenização Categórica (Design Variables)

- **Zero Estilo Mágico (Hardcode-free):** Nenhuma cor do tipo `#1D3F5E` ou borda `px-17` isolada. No CSS/Tailwind da corporação nós consumimos _Tokens Semânticos_: `bg-brand-primary`, `text-surface-muted`, `border-danger-base`.
- A mudança do Red-500 global não quebra o sistema; o design altera nativamente e as cores relativas (`active`, `hover`, `focus`) seguem-nos algoritmos do CSS `color-mix()`/variáveis CSS3 HSL nativas do Theme Provider local.

## 🧩 2. Headless Components & Patterns de Acessibilidade

- Radix-UI (Componente Raiz): Reuso imperativo de comportamentos A11y não superficiais (WAI-ARIA Focus-Traps).
- Shadcn-UI Patterns: Desembarque as interfaces na pasta de `ui/` e refatore as customizações. Não deixe o sistema parecer o framework puro. Refine bordas, elevações e _ring-focus_ consistentes em botões, `Selects` acessíveis (Dropdown radix acessível a SR e tabulação visual inteligente). Adicione o suporte absoluto à leitura nativa `<nav aria-label="Main Navigation">` em cada marco regional de telas SR-friendly em tags React Semânticas.

## 📱 3. Mobile-First System e Breakpoints Lógicos

- Todo layout React, de grade à tipografia (Clamp Math Scaling Clamp(1rem, 5vw, 2.5rem)), começa sendo feito em 360px (`sm` port).
- `flex-col` mandatório -> O `md/lg:flex-row` reestrutura o arranjo caso aja tela. Sem lógicas abusivas em breakpoints como `max-w-screen` se for para sumir elementos sem propósito. Hide para Desktop as interfaces secundárias focadas pra celular de navegação lateral (burger-menus), e abra barras de top-headers longos na tela Desk. Abstraia _Renderizations conditionally_.
