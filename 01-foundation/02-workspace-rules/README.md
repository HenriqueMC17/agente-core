# 02-workspace-rules

## 🎯 Propósito

Fornecer diretrizes de atuação ancoradas no **contexto do domínio, infraestrutura e projeto ativo**. Orienta como aplicar as Global Rules dentro das limitações e disciplinas específicas.

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

Funciona como o **Módulo Local de Adaptação** (Tier 1 Local). Ele injeta a sensibilidade adequada no agente – sabendo que criar uma API requer abordagens diferentes de pintar uma interface React.

## 📂 Natureza dos Arquivos

Manuais técnicos e delimitadores de contexto estrutural.

- `frontend-rules.md`: Regras de UI/UX sistêmico, acessibilidade, state-management local e componentes.
- `backend-rules.md`: Regras de isolamento de processo, logs e tratamento de carga e processos daemons.
- `fullstack-rules.md`: Acoplamento e limites (boundaries) entre camada de serviço e camada de apresentação (BFF, SSR, tráfego de tipos).
- `api-design-rules.md`: Como desenhar contratos RESTful, gRPC ou GraphQL duráveis.
- `database-rules.md`: Normalização vs desnormalização, particionamento e indexação.

## ⚙️ Diretrizes de Manutenção e Evolução

- **Uso:** Invocados em Tempo Real (JIT - Just in Time) assim que o agente compreende o contexto local do arquivo sendo aberto ou gerado.
- **Evolução:** Alterados dinamicamente com as mudanças em paradigmas de componentes ou APIs dentro da arquitetura local.

## 🔗 Relação com Outras Camadas

- Implementam a especialidade tecnológica descrita no `06-tech-stacks`.
- Funcionam sujeitos à autoridade matriz do `01-global-rules`.
