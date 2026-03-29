# React Standards & Paradigms

## 📌 Contexto

As convenções estritas para a arquitetura orgânica de bibliotecas visuais usando a base nativa (Vanilla React Hooks).

---

## ⚡ 1. Arquitetura de Componentes

O ecossistema é regido pelo desacoplamento:

- **Presentation Layer (`UI`):** O componente enxerga as `props`, a base visual e emite _events_. Não usa hook assíncrono profundo (ex: o clássico `fetch()`). Renderizam na velocidade da luz e são fáceis do Jest documentar e do Storybook mostrar.
- **Container / Page Layer:** Controla a fiação inteligente. Executa chamadas assíncronas do React Query, administra Zustand, trata a Promessa carregada, lida com erro em `Error Boundaries` nativos, devolvendo e despachando ao component de View "Dumb".

## 🪝 2. Disciplina de State e Custom Hooks

- **"Lifting State Up" Controlado:** Mova estado pro PAI se o Irmão precisar, ou direto no global/Zustand se muitos primos acessam. Porém, NUNCA suba o status de `<input value>` que pisca rápido da criança em estado global massivo ou para o pai lá do topo, porque vai _renderizar a página inteira iterativamente 60 vezes a cada letra no Input text_.
- Custom Hooks: Extraia regras de negócio como `useAuthRole()`, ou formatadores pesados de datas do componente visual e mova pro encapsulamento da hook separada.

## 🖼️ 3. Efeitos Colaterais Reprováveis

- Jamais use um `useEffect` para sincronizar dois estados derivados:
  - ❌ `useEffect(() => { setFullName(first + last) }, [first, last])` -> Causa dupla renderização suja e delay lag visual.
  - ✅ `const fullName = first + last` -> Estado Derivado Mestre limpo e eficiente no pipeline sincrônico de renders.
