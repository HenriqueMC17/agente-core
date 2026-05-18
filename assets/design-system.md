# Design System - Portfolio Henrique Monteiro Cardoso

## 1. Identidade Visual (Estética e Vibe)

A estética deve refletir **minimalismo tecnológico, precisão de engenharia e autoridade visual**, inspirada nos padrões premium de Vercel, Linear, Raycast e Stripe. A interface deve transparecer limpeza, foco total no conteúdo técnico, e maturidade no craft de UI. Não queremos "visual padrão".

## 2. Paleta de Cores (Dark Mode Nativo)

- **Background Principal:** `#0A0A0A` (Preto profundo, quase oled)
- **Background Secundário (Cards/Banners):** `#111111` ou gradientes lineares extremamente sutis `(#0A0A0A para #1A1A1A)`
- **Bordas e Separadores:** `#1A1A1A` ou `rgba(255, 255, 255, 0.08)` (Para dar demarcação de containers de forma imperceptível)
- **Texto Primário:** `#FAFAFA` (Branco quebrado para conforto, não `#FFFFFF`)
- **Texto Secundário / Descritivo:** `#A1A1AA` (Zinc-400 do Tailwind)
- **Acentos (Highlights):** Azul corporativo ou cores pontuais (dependendo do context do logo/vibe de Vercel e Stripe, ex: `#0070F3` ou glow branco)
- **Efeitos Especiais (Glow):** Sombras e reflexos borrados sob interações com `rgba(255, 255, 255, 0.05)` a `0.1`.

## 3. Tipografia

- **Fonte de Leitura (Display e Body):** `Inter` ou `Geist`
  - Utilizada para títulos magnéticos (Headline Hero), descrições de seção e textos de blog.
  - Tracking/Letter-spacing ajustado (ex: `-0.02em` em títulos grandes para aspecto mais coeso).
- **Fonte Técnica/Dados:** `JetBrains Mono`
  - Utilizada para datas na timeline, números de métricas, trechos de código e badges técnicas.

## 4. UI Components e Práticas (Shadcn UI e Radix)

- **Shapes:** Cantos levemente arredondados (`border-radius: 8px` ou `12px` para cards maiores, e `6px` para botões) unindo a neutralidade do stripe com a estética da Linear.
- **Glassmorphism:** Uso moderado. Painéis flutuantes ou navbar podem ter `backdrop-filter: blur(12px)` e fundos translúcidos (`bg-black/50`).
- **Estados Vazios e Loading:** Esqueletos animados de forma clean e messages inspiradoras. Sem componentes genéricos.

## 5. Microinterações e UX (Framer Motion)

- **Transições de Página:** Suaves (ex: `opacity 0 -> 1` e `y: 10 -> 0`).
- **Navegação (Locomotive/Lenis):** Scroll extremamente fluido e inercial.
- **Hover Effects Magnéticos:** Botões que seguem levemente o cursor em CTAs primários, _glow effects_ que revelam bordas num grid Bento de skills ou dashboard de projetos.
- **Responsividade (Mobile-First Absoluta):** As grids de dashboard e navegação devem empilhar graciosamente, com botões táteis possuindo um _hit target_ mínimo de `44px`.
