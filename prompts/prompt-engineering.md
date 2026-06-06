# Prompt Engineering & Cognitive Context Architecture (Edição 2026)

## 📌 Contexto e Filosofia
Em cenários corporativos de 2026, abandonamos o "vibe prompting" manual e puramente intuitivo. A engenharia de prompts evoluiu para uma disciplina matemática e sistemática de **Engenharia de Contexto** e **Otimização Bayesiana de Instruções**, onde a modelagem cognitiva do LLM é programada de forma robusta e otimizada por dados para mitigar alucinações e maximizar a acurácia factual.

---

## 🧠 1. Raciocínio Deliberativo: Sistema 1 vs. Sistema 2

O processamento cognitivo em modelos de linguagem pode ser ativado em dois níveis distintos de complexidade lógica. O agente deve selecionar e orquestrar ativamente o modo de execução ideal para cada tipo de tarefa técnica:

| Dimensão | Sistema 1 (Reativo / Estatístico) | Sistema 2 (Deliberativo / Reflexivo) |
| :--- | :--- | :--- |
| **Mecanismo** | Próximo-token estatístico e intuitivo de baixo custo. | Heurísticas reflexivas: CoT, ToT, SPEX e FLARE. |
| **Custo de Tokens** | Mínimo (apenas o output direto da resposta). | Elevado (tokens substanciais de raciocínio intermediário). |
| **Latência** | Ultrabaixa (tempo real). | Moderada a Alta (tempo de reflexão pré-geração). |
| **Acurácia em Código** | Baixa em lógica complexa; Propensa a alucinações. | Altíssima; Verificação de contorno formal e autodefesa. |
| **Aplicações Ideais** | Autocompletar simples, explicações de APIs triviais. | Refatoração arquitetural, segurança, debugging complexo. |

### 🛠️ Heurísticas do Sistema 2 (Orquestração Ativa)
1. **Chain-of-Thought (CoT) Canônica:** Isolar o raciocínio na tag `<thought>` antes de iniciar qualquer código. O agente analisa o escopo do workspace, mapeia regras de governança e planeja a estrutura modular antes de emitir a resposta.
2. **Tree of Thoughts (ToT):** Explorar múltiplos ramos de decisão simultaneamente, simulando cenários futuros de regressão técnica. Se o ramo de testes falhar, a heurística instrui a voltar para o estado mental original e testar uma abordagem alternativa.
3. **Speculative Exploration (SPEX):** Execução especulativa e paralela de abordagens de código no console local/terminal para verificação empírica imediata antes da consolidação do commit.

---

## 🧪 2. Otimização Bayesiana e Compilação Programática de Prompts

Os prompts em nosso ecossistema de produção deixaram de ser ativos estáticos e lineares escritos à mão. Eles são compilados e otimizados programaticamente com base em conjuntos de dados de treino e métricas de acerto (*Assertions*):

*   **DSPy (Declarative Self-Improving Language Programs):** Em vez de reescrever instruções ad-hoc, as assinaturas e o fluxo de dados dos agentes são formalizados em módulos reutilizáveis (ex: `dspy.Predict`, `dspy.ChainOfThought`).
*   **Otimizador MIPROv2 (Multi-prompt Instruction Proposal Optimizer):** Os prompts constitutivos são otimizados de forma bayesiana. O otimizador propõe, avalia e refina automaticamente as instruções e os exemplos de contexto (few-shot demonstration) com base em métricas de perda de negócio e DORA.
*   **Pipeline de Compilação:**
    ```mermaid
    graph LR
        Signature[Assinatura do Módulo] --> |Dataset + Métricas| DSPy[Compilador DSPy]
        DSPy --> |Otimização Bayesiana MIPROv2| OptPrompt[Prompt Otimizado de Alta Performance]
        OptPrompt --> |Validação Formal| Production[Runtime de Produção]
    ```

---

## 🎨 3. Engenharia de Contexto por XML Semântico

A segmentação e blindagem estrutural de prompts e inputs devem utilizar delimitadores XML semânticos estritos para evitar a degradação de atenção (*Lost-in-the-Middle*) e vazamentos de contexto (*Prompt Injection*).

### Tags Semânticas Obrigatórias
*   `<instruction>`: O comando primário a ser executado pelo modelo.
*   `<context>`: Informações externas, documentos do workspace ou logs de runtime.
*   `<rules>`: Regras restritivas e leis imutáveis do repositório (P0/P1/P2).
*   `<thought>`: Espaço de rascunho de raciocínio deliberativo isolado (Sistema 2).
*   `<logic_check>`: Validação formal baseada em FLARE contra violações de escopo.

```xml
<rules>
- Use caminhos absolutos file:/// no workspace.
- Cobertura de teste mínima: 80%.
</rules>
<context>
O arquivo README.md possui referências na linha 42.
</context>
<instruction>
Atualize os caminhos semânticos de README.md.
</instruction>
<thought>
Análise de dependências: README.md afeta skills.json.
Decisão: Mapear skills antes de aplicar alterações.
</thought>
<logic_check>
As assinaturas de skills.json coincidem. Nenhuma dependência foi quebrada.
</logic_check>
```

---

## 🛑 4. Prevenção Defensiva Contra Alucinações Técnicas

*   **Zero-Shot Restritivo com Punição Explícita:** prompts gerados por agentes devem conter diretivas punitivas contra complacência ("Se a biblioteca ou API solicitada estiver fora de seu escopo, declare explicitamente a ausência e recuse-se a gerar assinaturas fictícias").
*   **RAG-to-RdR (Retrieval-driven Reasoning):** A RAG pura que recupera blocos de código gigante gera ruído contextual e induz alucinações devido ao aumento de tokens obsoletos. A RdR foca em recuperar apenas a **assinatura tipada** e o **catálogo de APIs públicas**, guiando o LLM a raciocinar logicamente a partir de axiomas formais e minimizando a janela para 32k tokens de orçamento ativo.
