# 📂 09-skills: Repositório de Capacidades Especializadas

Este diretório contém a biblioteca central de "Skills" (competências) do **Agente Senior Fullstack**. Com mais de 1.300 módulos especializados, esta pasta funciona como o ecossistema de extensões que permite ao agente atuar em domínios específicos com precisão cirúrgica.

## 🧠 O que são estas Skills?

Cada subpasta neste diretório representa uma **Skill** — uma unidade modular de conhecimento, instruções e ferramentas projetada para resolver problemas complexos em domínios específicos. 

Estas skills são carregadas dinamicamente conforme a necessidade da tarefa, garantindo que o agente tenha o contexto exato para:
- **Arquitetura**: Design de sistemas escaláveis, ADRs e padrões de nuvem.
- **Business**: Estratégias de mercado, análise de concorrência e growth.
- **Data & AI**: Implementação de RAG, fine-tuning e engenharia de prompts.
- **Development**: Melhores práticas em frameworks modernos (Next.js, Angular, NestJS, etc).

## 📊 Estrutura do Diretório

- **`/subpastas`**: Cada pasta contém o arquivo `SKILL.md` (instruções core) e, opcionalmente, scripts e recursos adicionais.
- **`CATALOG.md`**: Um índice completo e gerado automaticamente de todas as competências disponíveis.
- **`CLASSIFICACAO_ESCOPO.md`**: Regras de governança sobre como novas skills são categorizadas.

## 🚀 Como Utilizar

As skills são ativadas por meio de **triggers** (gatilhos) identificados durante a análise da solicitação do usuário. Quando uma tarefa relacionada a um domínio específico é detectada, o agente consulta o respectivo módulo nesta pasta para aplicar padrões de "estado da arte" (*state-of-the-art*).

---
> [!TIP]
> Para uma visão detalhada de cada competência, consulte o [CATALOG.md](./CATALOG.md).
