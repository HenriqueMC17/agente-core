# Next.js App Router (13+) Conventions

## 📌 Contexto

Ecossistema restrito de Meta-framework focado em Edge Runtimes, Invalidação Reativa Server-Side, Server Components (React SSR/RSC) e Client Boundaries agressivamente bem cortados.

---

## 🧱 1. Server Components vs Client Components

- Todo componente em App Router é `Server Component` (RSC) nativamente e, ali, código roda seguro em backend Node/Edge (escondendo tokens sem JWT exposer de rede/DOM).
- "Use Client" no cabeçalho só se as props lidarem inexoravelmente com gatilhos iterativos de `onClick`, ciclo de hooks de DOM reativo como o `useEffect / useState`, Custom Hooks de contexto (React.Context / Zustand provider) e Browser APIs Web (`window`/`localStorage`).
- O limite e cruzamento são chaves de ouro: Um "Client Component Pai" (`'use client'`) contamina sua render tree filho virando JS despachado à rede, não o encha com sub-componentes massivos vazios que poderiam ser RSC puros e repassados por propriedade `<Children>`.

## 💾 2. Invalidação (Caching, Revalidate & Tagging)

Next Cache é notoriamente complexo e globalmente agressivo:

- Toda chamada global nativa de API Rest Fetch da Next App é Cached _Para Sempre_ se nada for declarado (Data-Cache).
- Gerenciamento explícito: Caso os dados flutuem no CMS base ou banco, defina a chamada Next de fetch com `{ next: { revalidate: 3600 } }` (Time-Based ISR de 1 hora) ou amarrada ativamente `{ tags: ['blog_posts'] }`, assim as Routes da API em painel de gerência admin podem despachar `revalidateTag(blog_posts)` limpando a Vercel CDN On-demand ativamente. Não limpe todo roteador inteiro no admin do software aleatoriamente!

## 🔗 3. Server Actions como Mutações (Formulários Puros)

- Utilize as `async function update(formData: FormData) { 'use server' }` restritas a Forms nativos ao invés das antigas extensões de API endpoints no diretório API Pages `/pages/api/` quando tratar de input orgânico leve do usuário (Likes, Envios de perfil, Check-ins).
- Atenção Mestra 🚨: Uma Next Server Action **é uma Rota API Pública exposta na Nuvem!** Confirme quem chama: A função Action _DEVE_ chamar a session de cookies na primeira linha para extrair IDs de acesso validado com lib de auth e travar spoofings remotos ilegais.
