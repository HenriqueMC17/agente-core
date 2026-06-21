# Frontend Workspace Rules

## 📌 Visão Geral

Este documento estabelece as diretrizes mandatórias para desenvolvimento client-side, aplicáveis a qualquer ambiente que manipule a abstração de tela, reatividade do usuário, estilização e renderização do DOM (Web, Mobile).

Para discussões detalhadas sobre ecossistemas CSS, infraestrutura e segurança de navegadores, consulte o compêndio em [Programação Web](file:///c:/Dev/Docs/Programação%20Web).

---

## 🏗️ 1. Arquitetura de Componentes e Renderização Server-Side

- **React Server Components (RSC) & Framework Selection:**
  - Adote o paradigma RSC para otimizar o tamanho do bundle no cliente e proteger a comunicação de dados.
  - **Server Components (Padrão):** Devem ser a escolha inicial para renderização de conteúdo estático ou dados buscados diretamente na camada de banco/serviço. Permitem realizar consultas e acessar segredos de API diretamente no servidor, impedindo que vazem para o cliente.
  - **Client Components (`'use client'`):** Utilize estritamente nas folhas da árvore de componentes onde há interatividade (manipuladores de eventos, hooks de estado como `useState`/`useEffect` ou APIs de navegador). Mantenha o estado interativo no menor nível possível.
  - Para uma análise comparativa de tomadas de decisão arquitetural entre SPAs clássicas, Next.js e Astro, consulte o [Technical Evaluation Report_ Enterprise JavaScript Framework Selection (2026 Strategy).md](file:///c:/Dev/Docs/Programação%20Web/Technical%20Evaluation%20Report_%20Enterprise%20JavaScript%20Framework%20Selection%20(2026%20Strategy).md).
- **Astro e Islands Architecture:**
  - Para portais e páginas focadas em marketing, documentação ou e-commerce onde a performance de carregamento inicial é crítica, prefira a arquitetura Astro Islands.
  - Carregue o HTML estático por padrão e injete interatividade isolada apenas nos componentes dinâmicos (ilhas) sob demanda (`client:visible`, `client:idle`, `client:only`).

---

## ⚡ 2. Hidratação e Performance do DOM

- **O Gargalo da Main Thread e o Interactivity Gap:**
  - Toda interface reativa deve ser otimizada para diminuir o tempo em que a página fica visualmente carregada mas sem resposta aos cliques (o *Interactivity Gap*). Entenda os limites do processamento da Main Thread e o contraste entre Hidratação Reativa tradicional e a Resumabilidade O(1) no guia [Beyond the Visual_ The Invisible Engine of Modern Web Interactivity.md](file:///c:/Dev/Docs/Desenvolvimento%20de%20Software/Beyond%20the%20Visual_%20The%20Invisible%20Engine%20of%20Modern%20Web%20Interactivity.md).
- **Modern Rehydration Adaptive Hydration (MRAH):**
  - Minimize o tempo de interatividade (TTI) em portais grandes atrasando a hidratação de componentes fora da tela ou não interativos.
  - Implemente hidratação dinâmica baseada na rolagem de página (Viewport intersection) ou no foco do usuário. Evite que scripts de hidratadores pesados travem a thread principal do navegador durante o carregamento inicial. Para a especificação completa desta arquitetura modular, consulte [Technical Specification_ Modular Rendering & Adaptive Hydration (MRAH) in React.md](file:///c:/Dev/Docs/Programação%20Web/Technical%20Specification_%20Modular%20Rendering%20&%20Adaptive%20Hydration%20(MRAH)%20in%20React.md).
- **Prevenção de Hydration Mismatches:**
  - Garanta que o HTML gerado no servidor seja idêntico ao renderizado no primeiro passo no cliente.
  - É proibido usar objetos globais como `window` ou `document`, ou datas baseadas no relógio local do cliente durante a renderização inicial do servidor. Caso precise de dados do cliente, execute-os dentro de um hook `useEffect` ou use componentes dinâmicos com SSR desabilitado.

---

## 💅 3. Estilização e Tailwind CSS v4

- **Compilador Baseado em Rust & Modernização:**
  - O ecossistema deve adotar o Tailwind CSS v4 para obter tempos de compilação ultrarrápidos graças ao motor escrito em Rust. A transição e migração da stack devem seguir as etapas documentadas em [Strategic Modernization Plan_ Adopting Tailwind CSS v4 and the React Compiler.md](file:///c:/Dev/Docs/Programação%20Web/Strategic%20Modernization%20Plan_%20Adopting%20Tailwind%20CSS%20v4%20and%20the%20React%20Compiler.md).
- **Eliminação do `tailwind.config.js`:**
  - Em conformidade com o Tailwind v4, configurações de temas, fontes, cores e extensões devem ser feitas diretamente no arquivo CSS principal utilizando diretivas de folha de estilo nativas (como `@theme`, `@utility`), eliminando arquivos de configuração JS pesados.
- **Design System e Consistência Visual:**
  - Utilize apenas tokens aprovados pelo sistema de design. Classes arbitrárias fora da escala de 8px (ex: `w-[233px]` ou `p-[11px]`) são terminantemente proibidas, a menos que sejam validadas por um caso de uso aprovado.

---

## 🔒 4. Segurança em JavaScript e Manipulação Segura de Dados

- **Prevenção de Prototype Pollution:**
  - Em cenários onde dados JSON externos ou dinâmicos são mesclados de forma recursiva, proteja o código contra poluição de protótipo de JavaScript.
  - Ao usar objetos como dicionários ou tabelas hash dinâmicas, crie-os com `Object.create(null)` para garantir que eles não herdem propriedades do protótipo padrão de `Object` (ex: `__proto__`, `constructor`).
  - Congele protótipos em bibliotecas críticas ou valide esquemas rigorosamente usando ferramentas de validação de tipagem como Zod. Para mais diretrizes de segurança de execução no navegador, consulte [Mastering the Web Guard_ A Learner's Guide to Browser Security (SOP, CORS, and CSRF).md](file:///c:/Dev/Docs/Programação%20Web/Mastering%20the%20Web%20Guard_%20A%20Learner's%20Guide%20to%20Browser%20Security%20(SOP,%20CORS,%20and%20CSRF).md).

---

## ♿ 5. Acessibilidade (A11y) como Requisito de Projeto

- **HTML Semântico:** Utilize tags HTML semânticas adequadas (`<main>`, `<nav>`, `<article>`, `<header>`, `<button>`) em vez de divs com manipuladores de clique artificiais.
- **Navegabilidade por Teclado:** Elementos interativos devem suportar focabilidade limpa, anéis de foco visuais de alta legibilidade (`outline-offset`) e navegação lógica via tecla Tab.
- **APCA Contrast:** Elementos textuais e de interface devem seguir as diretrizes do APCA (Advanced Perceptual Contrast Algorithm), garantindo contraste dinâmico perceptivo adequado para diferentes tamanhos e pesos de fonte.
