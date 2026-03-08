# Decision Framework

> **Princípio Base:** Classifique o impacto de novas demandas. Se não atender a critérios estratégicos de retorno técnico ou negócio, a tarefa deve ser repensada ou delegada.

---

## Matriz de Prioridade

Antes de iniciar desenvolvimentos pesados, utilize esta matriz para avaliar o impacto estrutural.

### Critérios de Impacto

| #   | Critério              | Peso  | Descrição                                                                                 |
| --- | --------------------- | ----- | ----------------------------------------------------------------------------------------- |
| 1   | **Escala**            | Alto  | Pode ser replicado/automatizado para o futuro sem envolvimento direto iterativo?          |
| 2   | **Gera ativo**        | Alto  | Produz uma biblioteca, código genérico, script ou ferramenta independente?                |
| 3   | **Qualidade Técnica** | Médio | Fortalece a segurança, velocidade ou estabilidade do produto?                             |
| 4   | **ROI (Renda/Valor)** | Médio | Gera receita direta, reduz custos ou melhora KPIs estruturais do projeto?                 |
| 5   | **Domínio Raro**      | Alto  | Cria um fosso competitivo (moat) em skills que a IA ou devs iniciantes ainda não dominam? |

---

## Avaliador Automático de Tarefas (Template)

### Tarefa/Funcionalidade: _[ Nome da Feature / Refactor ]_

| Critério          | Atende?         | Justificativa |
| ----------------- | --------------- | ------------- |
| Escala            | ⬜ Sim / ⬜ Não |               |
| Gera ativo        | ⬜ Sim / ⬜ Não |               |
| Qualidade Técnica | ⬜ Sim / ⬜ Não |               |
| ROI/Valor         | ⬜ Sim / ⬜ Não |               |
| Domínio Raro      | ⬜ Sim / ⬜ Não |               |

**Critérios atendidos:** `_ / 5`

### Decisão Arquitetural:

- [ ] ✅ **Executar com prioridade máxima** — atende a 3 ou mais critérios de Alto/Médio impacto.
- [ ] ⚠️ **Questionar a abordagem** — atende a poucos critérios. Pergunte: "Pode ser mais simples?" ou "Existe ferramenta pronta?".
- [ ] ❌ **Recusar / Redesenhar** — Baixo impacto, não gera valor em escala, pode gerar mais dívida técnica do que solução real.
