# 06-tech-stacks

## 🎯 Propósito

Servir como o roteamento tático e referencial de **Conhecimento Tecnológico e Idiomático**. Este espaço confina a semântica correta de linguagens e ecossistemas isolando seus domínios, evitando a contaminação conceitual durante codificações autônomas.

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

A Camada de Isolamento de Domínio (Tier Tech). Limita proativamente o agente com base no cenário que está desenvolvendo (e.g. O agente sabe que Redux não resolve dores de banco local e que Prisma não roda cruamente no Edge V8/WASM).

## 📂 Natureza dos Arquivos e Subdiretórios

Divisão taxionômica modular com focos profundos.

- `frontend/`: Domínio dos navegadores, React, Next.js, arquitetura de UI Component, Vite, Accessibility.
- `backend/`: Node.js, V8 profiling, Inversão de Controle, mensagerias (Nest, Kafka, gRPC), Java Spring.
- `databases/`: ACID, Relacionais (PostgreSQL + Prisma), Documentais (MongoDB), Modelagem de Entidades.
- `infrastructure/`: Conteinerização de imagem leve, Infraestrutura serverless, e Cloud (AWS / Vercel Edge).

## ⚙️ Diretrizes de Manutenção e Evolução

- **Segregação:** O conhecimento inserido em uma documentação sobre Express/Fastify jamais deve impactar uma documentação sobre design reativo em React.
- **Uso:** A leitura isolada melhora drasticamente o contexto temporal e a atenção referencial por token. Sempre liste as particularidades de Type-Checking por infraestrutura.
- **Evolução:** Ao atualizar versões majotárias (ex: Next.js 14 -> 15), revisar e aposentar velhos paradigmas (Pages router -> App router).

## 🔗 Relação com Outras Camadas

- É sujeito à taxonomia da `02-workspace-rules`.
- Interage fortemente com os módulos isolados de cada IDE configurada localmente no `10-rules`.
