# 06-tech-stacks / frontend

## 🎯 Propósito

Armazenar e unificar os conhecimentos, design patterns de interface, regras de otimização de bundle e convenções técnicas aplicadas estritamente ao **desenvolvimento client-side (Frontend)**.

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

É o módulo de isolamento tecnológico frontend. Quando o agente atua em contextos visuais, interativos ou de roteamento no browser, as diretrizes aqui contidas restringem o plano de ação, evitando sugestões irreais ou com antipatterns sistêmicos.

## 📂 Natureza dos Arquivos

- Refinamentos arquiteturais de UI (Microfrontends, FSD - Feature Sliced Design, Atomic Design).
- Convenções de bibliotecas específicas como React, Next.js ou Vite.
- Estratégias de Gestão de Estado Global vs Local.
- Padrões de CSS/Tailwind, Web Vitals, Edge Rendering (SSR/SSG).

## ⚙️ Diretrizes de Manutenção e Uso

- Todo scaffolding de um novo app frontend (e.g. `npx create-next-app`) deve referenciar estas regras antes e após criação.
- As diretrizes não substituem as regras universais de Clean Code do `01-global-rules`, mas as complementam (Clean Code em React).

## 🔗 Relação com Outras Camadas

- É sujeito à taxonomia da `02-workspace-rules/frontend-rules.md`.
- Conecta-se diretamente aos designs providenciados pelos `11-mcp-integrations` (Figma MCP).
