# Fullstack Workspace Rules

## 📌 Visão Geral

Orientações táticas voltadas a domínios híbridos, onde a linha do cliente e do servidor desvanece de certa forma (Frameworks SSR, Next.js, Remix, Meta-Frameworks), exigindo um pensamento sobre transitar o abismo da rede com menor repetição.

---

## ⚖️ 1. Fronteiras de Tráfego (Boundary Management)

- **Compartilhamento de Tipos:** A principal vantagem Fullstack é o poder do monorepo tipo-seguro. Abstraia Modelos e Interfaces usando _tRPC_, ou compartilhamento via pastas de pacotes (ex: `@shared/validators`). Um schema Zod que valida no formulário do cliente deve rodar identicamente antes de entrar no Controller do Controller do Backend.
- **Renderização Mental Diferenciada:** É rigorosamente exigido do Desenvolvedor (ou Agente AI) não misturar `Local Storage` ou referências à arvore `window/document` global durante invocações assíncronas feitas no lado do Servidor/Edge Runtime. Encapsule bibliotecas "não-universais" através de `dynamic imports` agressivos com ssr false, ou blocos lógicos `typeof window !== 'undefined'`.

---

## 🚂 2. O Roteador de Aplicações de Borda (Edge)

- **Cache Estratégico e Invalidações:** Não use renderização de página inteira sob demanda (SSR cru) a cada _reload_, caso os dados tenham natureza majoritária estática ou de catálogo. Empregue revalidação em segundo plano (Incremental Static Regeneration - ISR, `stale-while-revalidate`) que responde rapidamente no Cache POP/CDN usando `purge` taggeado para atualização passiva da rota focada.
- **Server Actions & RPCs Leves:** Submeta mutações menores diretamente aproveitando _Server Actions_ modernos sem fabricar verbos HTTP customizados cansativos no tráfego das Pastas de API se o modelo mental é de acoplagem rápida "UI > Mutate Function". Lembre-se, contudo, que toda `action/API` fullstack carece da mesma blindagem de auth token/session exigido de um microsserviço padrão.
