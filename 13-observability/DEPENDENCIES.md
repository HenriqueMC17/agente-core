# 13-observability - Mapeamento de Dependências de Observabilidade e Métricas Operacionais

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

- Camada de Execução (`06-execution-layer`) para coletar métricas a nível de máquina.
- Motor de Contexto (`02-context-engine`) para monitorar eficiência de compressão de prompts.

---

> [!TIP]
> **Controle de Débito Técnico:**
> A adição de qualquer dependência externa deve ser precedida de uma análise rigorosa de impacto em custos de inferência, latência e segurança Zero-Trust. Evite acoplamentos desnecessários.
