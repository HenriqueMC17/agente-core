# Frontend Workspace Rules

## 📌 Visão Geral

Diretrizes mandatórias para desenvolvimento client-side, aplicáveis a qualquer ambiente que manipule a abstração de tela, reatividade do usuário e DOM rendering (Web, React Native).

---

## 🎨 1. Componentização e Design System

- **Componentes "Dumb" vs "Smart" (Container/Presentational):**
  - Seja implacável na separação. Componentes visuais (`Button`, `Card`, `Modal`) não fazem fetching de dados, não sabem de onde a _Promise_ vem, e não têm conexão com `Zustand`/`Redux`/`Context`. Eles apenas recebem `props` e disparam `callbacks`.
  - Os Hooks ou "Containers/Pages" são os únicos autorizados a injetar estado massivo, carregar rotas filhas e gerenciar `try/catch`.
- **Tamanho Ciclomático:** Se um arquivo `.tsx` ou `.jsx` passar de 200 linhas de renderização, isole parte de sua lógica em SubComponentes fechados ou abstraia funcionalidades cognitivas longas para _Custom Hooks_ locais (ex: `useAuthForm.ts`).

---

## ⚡ 2. Reatividade e Ciclo de Vida

- **Efeitos Colaterais (useEffect):**
  - Minimize-os vigorosamente. A vasta maioria das sincronizações de UI pode ser feita inferindo estado _durante a renderização_ (Derived State) ou amarrada estritamente aos Event Handlers de onClick/onSubmit.
  - Se usar fetchers, prefira abstrações reativas puras como `React Query` (SWR), que abstraem cacheamento, pooling e controle de corrida com Stale-while-Revalidate, evitando _race conditions_.
- **Memoização Agressiva/Condicional:** Não aplique `useMemo` ou `useCallback` preventivamente em todo lugar. Aplique quando: 1) o custo computacional do _derived data_ for genuinamente alto ou 2) para preservar referências de callback que causam re-rendering de listas complexas de filhos _memoizados_.

---

## 💅 3. Estilização e Acessibilidade (A11y)

- **System First (Tailwind / CSS-in-JS):** Estilos arbitrários não são bem-vindos (por ex: `p-[17px]`). Use a balança e a paleta do Design System (`p-4` = 16px).
- **Acessibilidade não é feature:** Uso mandatório e fluído de marcações semânticas (`<nav>`, `<main>`, `<article>`, `<button>` e não `<div onClick...>`).
  - Foque sempre no `tabIndex` e navegação de teclado por toda a interface corporativa. Forneça rótulos invisíveis (como `sr-only`) interativamente e ARIA-labels dinâmicos com a transição de loading/foco.
