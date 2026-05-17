# 04-workflows - Mapeamento de Dependências de Fluxos de Trabalho Padronizados (BMAD)

## 🔗 Dependências Internas (Ecosystem Matrix)

Este módulo interage diretamente com as seguintes camadas internas do repositório `agente-core`:

| Módulo Interno | Tipo de Relação | Objetivo da Integração |
| :--- | :--- | :--- |
| **00-governance** | Dependência Forte | Respeitar as diretrizes constitucionais e limites de qualidade. |
| **01-foundation** | Dependência Média | Submeter-se às regras do workspace e padrões globais sintáticos. |
| **09-skills** | Acoplamento Fraco | Ativar dinamicamente habilidades modulares do catálogo especializado. |
| **10-rules-engine** | Dependência Crítica | Validação de integridade sintática e testes automáticos de linter. |

---

## 📦 Dependências Externas (Tech Stack 2026)

- Ferramental interno (`12-tooling`) para ativação de scripts e validação estrutural.
- Camada de Observabilidade (`13-observability`) para registrar os tempos de execução de cada estágio.

---

> [!TIP]
> **Controle de Débito Técnico:**
> A adição de qualquer dependência externa deve ser precedida de uma análise rigorosa de impacto em custos de inferência, latência e segurança Zero-Trust. Evite acoplamentos desnecessários.
