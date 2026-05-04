# Architecture & Engineering Specification

## 1. Visão Geral da Stack Tecnológica

- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript (Strict Mode)
- **Estilização:** TailwindCSS
- **Componentes Base:** Shadcn UI + Radix UI
- **Animações:** Framer Motion
- **Ícones:** Lucide Icons
- **Conteúdo Blog/Artigos:** MDX (next-mdx-remote ou library nativa contentlayer/mdx)
- **Linting & Code Quality:** ESLint, Prettier, Husky (opcional pre-commit)

## 2. Princípios Adotados

- **Clean Architecture:** Desacoplamento entre interface, estado de UI e regras de conteúdo.
- **SOLID / Separation of Concerns:** Componentes de página (UI) não devem fazer data fetching pesado; serviços à parte puxam e formatam dados de APIs externas (como a do Github para a home do portfólio).
- **KISS & DRY:** Código modularizável, reutilizável (botões base, tipografia base, etc).
- **Performance:** Imagens servidas com `next/image` otimizadas; dynamic imports (`next/dynamic`) para animações pesadas no first load.
- **SEO & Otimização:** Metadata API no Next.js App Router para Title, OpenGraph, Twitter Cards, _Schema.org_ via Ld-Json, Sitemap generation.

## 3. Estrutura de Rotas e Internacionalização (i18n)

Deverá ser utilizado roteamento por sub-path `/pt` e `/en` com base em `middleware.ts`.

```text
/
├── /[lang]/
│   ├── /page.tsx               # Home Page, contendo a Master Page do Portfólio
│   ├── /blog/                  # Seção de Artigos
│   │   ├── /page.tsx
│   │   └── /[slug]/page.tsx    # Entradas MDX
│   └── /projects/
│       └── /[slug]/page.tsx    # Modal/Página Detalhada de Projetos
```

## 4. Árvore de Diretórios Sugerida

```text
portfolio-profissional/
├── .agent/                    # Regras e workflows de inteligência e base
├── app/                       # App Router (Rotas e Layouts)
│   ├── [lang]/                # Páginas e views internacionalizadas
│   ├── api/                   # Serverless Functions (caso necessário para enviar form de contato)
│   └── globals.css            # Variáveis globais Tailwind
├── components/                # UI Elements (Base)
│   ├── ui/                    # Componentes gerados pelo shadcn
│   └── shared/                # Componentes globais (Navbar, Footer)
├── sections/                  # Container das dobras principais
│   ├── hero/
│   ├── about/
│   ├── experience/
│   ├── projects/
│   └── contact/
├── lib/                       # Utilidades (funções cn, data fetchers, formatação)
├── locales/                   # Dicionários JSON de n8n
│   ├── en.json
│   └── pt.json
├── content/                   # MDX files / Blog posts
│   └── posts/
└── public/                    # Assets estáticos, fontes locais, open-graph imagens
```

## 5. Schemas de Dados (Integrações & CMS local)

Para manter simplicidade, vamos usar Types locais para representar dados estruturados do portfólio, especialmente do GitHub Hub de projetos.

```typescript
// types/project.ts
export interface Project {
  id: string;
  title: string;
  category:
    | "Front-end"
    | "Arquitetura"
    | "Automação"
    | "Dashboards"
    | "Hardware";
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  isFeatured: boolean;
  metrics?: string[]; // Ex: ["Lighthouse 100", "5 sec build time"]
}

// types/experience.ts
export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  isCurrent: boolean;
  description: string[];
}
```

## 6. Pipeline de Server Components vs Client Components

Por padrão, no Next.js App Router, todas as páginas em `app/` e seções em `sections/` devem ser **Server Components** (sem hook `use client`) para maximizar SEO, Zero JavaScript Client Bundle.
Apenas microcomponentes interativos, como formulários (`contact-form`), galerias dinâmicas com filtragem (`projects-grid-filter`) ou nós que utilizam Framer Motion (`framer-motion-wrapper`/`animated-timeline`) receberão a tag `"use client"`.
