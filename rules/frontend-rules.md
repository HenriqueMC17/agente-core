# Frontend Workspace Rules

## 📌 Visão Geral

Este documento estabelece as diretrizes mandatórias para desenvolvimento client-side, aplicáveis a qualquer ambiente que manipule a abstração de tela, reatividade do usuário, estilização e renderização do DOM (Web, Mobile).

---

## 🏗️ 1. Arquitetura de Componentes e Renderização Server-Side

- **React Server Components (RSC):**
  - Adote o paradigma RSC para otimizar o tamanho do bundle no cliente e proteger a comunicação de dados.
  - **Server Components (Padrão):** Devem ser a escolha inicial para renderização de conteúdo estático ou dados buscados diretamente na camada de banco/serviço. Permitem realizar consultas e acessar segredos de API diretamente no servidor, impedindo que vazem para o cliente.
  - **Client Components (`'use client'`):** Utilize estritamente nas folhas da árvore de componentes onde há interatividade (manipuladores de eventos, hooks de estado como `useState`/`useEffect` ou APIs de navegador). Mantenha o estado interativo no menor nível possível.
- **Astro e Islands Architecture:**
  - Para portais e páginas focadas em marketing, documentação ou e-commerce onde a performance de carregamento inicial é crítica, prefira a arquitetura Astro Islands.
  - Carregue o HTML estático por padrão e injete interatividade isolada apenas nos componentes dinâmicos (ilhas) sob demanda (`client:visible`, `client:idle`, `client:only`).

---

## ⚡ 2. Hidratação e Performance do DOM

- **Modern Rehydration Adaptive Hydration (MRAH):**
  - Minimize o tempo de interatividade (TTI) em portais grandes atrasando a hidratação de componentes fora da tela ou não interativos.
  - Implemente hidratação dinâmica baseada na rolagem de página (Viewport intersection) ou no foco do usuário. Evite que scripts de hidratadores pesados travem a thread principal do navegador durante o carregamento inicial.
- **Prevenção de Hydration Mismatches:**
  - Garanta que o HTML gerado no servidor seja idêntico ao renderizado no primeiro passo no cliente.
  - É proibido usar objetos globais como `window` ou `document`, ou datas baseadas no relógio local do cliente durante a renderização inicial do servidor. Caso precise de dados do cliente, execute-os dentro de um hook `useEffect` ou use componentes dinâmicos com SSR desabilitado.

---

## 💅 3. Estilização e Tailwind CSS v4

- **Compilador Baseado em Rust:**
  - O ecossistema deve adotar o Tailwind CSS v4 para obter tempos de compilação ultrarrápidos graças ao motor escrito em Rust.
- **Eliminação do `tailwind.config.js`:**
  - Em conformidade com o Tailwind v4, configurações de temas, fontes, cores e extensões devem ser feitas diretamente no arquivo CSS principal utilizando diretivas de folha de estilo nativas (como `@theme`, `@utility`).
  - Evite arquivos de configuração JS pesados que atrasam pipelines de build.
- **Design System e Consistência Visual:**
  - Utilize apenas tokens aprovados pelo sistema de design. Classes arbitrárias fora da escala de 8px (ex: `w-[233px]` ou `p-[11px]`) são terminantemente proibidas, a menos que sejam validadas por um caso de uso aprovado.

---

## 🔒 4. Segurança em JavaScript e Manipulação Segura de Dados

- **Prevenção de Prototype Pollution:**
  - Em cenários onde dados JSON externos ou dinâmicos são mesclados de forma recursiva, proteja o código contra poluição de protótipo de JavaScript.
  - Ao usar objetos como dicionários ou tabelas hash dinâmicas, crie-os com `Object.create(null)` para garantir que eles não herdem propriedades do protótipo padrão de `Object` (ex: `__proto__`, `constructor`).
  - Congele protótipos em bibliotecas críticas ou valide esquemas rigorosamente usando ferramentas de validação de tipagem como Zod.

---

## ♿ 5. Acessibilidade (A11y) como Requisito de Projeto

- **HTML Semântico:** Utilize tags HTML semânticas adequadas (`<main>`, `<nav>`, `<article>`, `<header>`, `<button>`) em vez de divs com manipuladores de clique artificiais.
- **Navegabilidade por Teclado:** Elementos interativos devem suportar focabilidade limpa, anéis de foco visuais de alta legibilidade (`outline-offset`) e navegação lógica via tecla Tab.
- **APCA Contrast:** Elementos textuais e de interface devem seguir as diretrizes do APCA (Advanced Perceptual Contrast Algorithm), garantindo contraste dinâmico perceptivo adequado para diferentes tamanhos e pesos de fonte.
