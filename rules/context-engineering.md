# Guia de Engenharia de Contexto e RdR

## 📌 Visão Geral

Este documento estabelece as diretrizes obrigatórias para a estruturação, compressão e gerenciamento de contexto nos sistemas baseados em LLM do `agente-core`. Nosso objetivo é sair da programação intuitiva (*Vibe Coding*) para um método determinístico baseado em engenharia de precisão.

---

## 📉 1. Lost-in-the-Middle e Context Rot (Degradação de Contexto)

Embora os modelos modernos de inteligência artificial suportem janelas de contexto massivas (1M+ tokens), testes empíricos de comportamento demonstram que a precisão e a capacidade de atenção (*Retrieval Accuracy*) dos modelos começam a degradar drasticamente após **32.000 tokens**. 

- **Attention Dilution (Diluição de Atenção):** Informações redundantes, arquivos irrelevantes ou logs extensos dispersam a atenção do modelo. Isso resulta no esquecimento de instruções cruciais posicionadas no meio do prompt (Curva em U de Atenção).
- **Minimum Viable Context (MVC):** É obrigatória a aplicação do princípio do Mínimo Contexto Viável. Forneça ao modelo apenas as assinaturas, código-fonte e regras diretamente relacionados à tarefa atual. Elimine ruídos, arquivos temporários e logs desnecessários para maximizar o sinal e reduzir os custos de tokens. Siga as orientações em [Strategic Manual_ Context Engineering for High-Reliability Enterprise Applications.md](file:///c:/Dev/Docs/Guia%20de%20Engenharia%20de%20Prompt/Strategic%20Manual_%20Context%20Engineering%20for%20High-Reliability%20Enterprise%20Applications.md).
- **Observabilidade de Desvios (Drift):** Para rastreamento de desvios comportamentais e baselines estatísticos de resposta, siga as métricas do [The Architect’s Blueprint_ A Master Guide to AI Evaluation & Observability.md](file:///c:/Dev/Docs/Guia%20de%20Engenharia%20de%20Prompt/The%20Architect’s%20Blueprint_%20A%20Master%20Guide%20to%20AI%20Evaluation%20&%20Observability.md).

---

## 📊 2. Estrutura de Ordenação e Distribuição de Atenção

Para contrabalancear a atenuação de atenção nas partes centrais do prompt, organize a pilha de contexto seguindo uma distribuição de pesos e posições bem-definida:

| Posição no Prompt | Tipo de Conteúdo | Função Estratégica |
| :--- | :--- | :--- |
| **Início (Primazia)** | Regras Críticas, Restrições de Segurança e Padrões Visuais | Protege o comportamento do agente contra injeções adversárias de prompts indiretos e desvios comportamentais (Efeito de Primazia). |
| **Meio** | Documentação do Projeto, Assinaturas Técnicas, Exemplos *Few-shot* | Fornece grounding operacional estático e conceitual. Se o modelo esquecer pequenos detalhes técnicos, o impacto na lógica global é mitigável. |
| **Fim (Recência)** | Estado do Sistema, Código Modificando, Tarefa Imediata e Logs | Aproveita o viés de recência do modelo para focar na resposta direta e na ação final que ele deve realizar. |

---

## 🧱 3. Isolamento Estrutural via Tags XML

A separação de instruções, dados e metadados no contexto deve ser feita obrigatoriamente por meio de **Tags XML**. Abstrata e limpa, a estruturação em XML é lida de forma extremamente eficiente pelos mecanismos de atenção dos transformadores de última geração, isolando dados e comandos com precisão de parser.

### tags XML Padronizadas e Suas Funções

- `<rules>`: Contém as regras do sistema, restrições comportamentais e limites operacionais invariáveis.
- `<system_state>`: Metadados sobre o estado atual do workspace (sistema operacional, branch Git, ferramentas disponíveis).
- `<source_code>`: O código-fonte existente que é alvo de análise ou refatoração. Sempre especifique o caminho absoluto no atributo `path` da tag (ex: `<source_code path="file:///c:/path/to/file">`).
- `<examples>`: Blocos de exemplos curtos (*few-shot*) demonstrando a estrutura exata da saída esperada.
- `<validation_logs>`: Logs de compilador, testes unitários ou auditorias estáticas para orientar correções.
- `<instruction>`: A instrução ativa imediata solicitada pelo usuário no loop de execução.

### Exemplo de Prompt Scaffolding Estruturado

```xml
<rules>
[Regras de segurança e diretrizes de design APCA/Geist]
</rules>

<system_state>
OS: Windows 11
Workspace: c:\Dev\agente-core
</system_state>

<source_code path="file:///c:/Dev/agente-core/rules/database-rules.md">
[Código-fonte real]
</source_code>

<validation_logs>
[Saída de erro ou stack trace]
</validation_logs>

<instruction>
Refatore a query na linha 42 para evitar o estouro de Heap.
</instruction>
```

---

## 🌐 4. Do RAG ao Retrieval-driven Reasoning (RdR)

Em cenários complexos de engenharia, superamos a abordagem ingênua de RAG (busca de similaridade por cosseno em vetores de chunks de texto que são colados diretamente no prompt). Adotamos o framework **Retrieval-driven Reasoning (RdR)**, no qual a busca é integrada a uma cadeia de verificação de fatos e raciocínio explícito.

```text
[Busca Semântica/Híbrida] ──> [Filtragem por Relevância] ──> [Cadeia de Raciocínio (CoT)] ──> [Consolidação Logica]
```

### Protocolo Operacional do RdR

1. **Recuperação Estruturada:** Busca ativa na base de dados por palavras-chave técnicas, códigos e metadados históricos de forma cruzada.
2. **Avaliação Crítica de Relevância:** Filtragem estrita dos trechos recuperados. Fragmentos de documentação desatualizados ou inconsistentes com a versão atual da biblioteca são descartados antes de irem para o contexto.
3. **Grounding no Contexto de Trabalho:** O modelo fundamenta cada afirmação técnica citando a origem explícita do arquivo (`file:///...`) ou seção técnica recuperada, eliminando inferências especulativas baseadas na memória de pré-treino.
4. **Verificação de Fatos Interna:** Cruzar os dados recuperados com as restrições formais da arquitetura do projeto. Se houver discrepância, a regra local do projeto (`rules/`) prevalece sobre a documentação externa.

---

## 🧠 5. Arquiteturas de Memória em Escala Corporativa (Mem0 LOCOMO)

O resgate de informações históricas e o controle de amnésia cognitiva de longo prazo devem ser orquestrados através de estruturas hierárquicas de memória.

- **Topologias de Memória:** Classifique e persista dados de acordo com os tradeoffs econômicos descritos no [Master Guide_ The Five Architectures of AI Agent Memory.md](file:///c:/Dev/Docs/Rules%20e%20Workflows/Master%20Guide_%20The%20Five%20Architectures%20of%20AI%20Agent%20Memory.md).
- **Gerenciamento de Context Layer (Pattern 5):** A otimização de cache e a diminuição em até 90% do consumo de tokens devem seguir o plano estratégico detalhado no [Enterprise Context Layer Governance Plan_ Transitioning to Pattern 5 Organizational Memory.md](file:///c:/Dev/Docs/Rules%20e%20Workflows/Enterprise%20Context%20Layer%20Governance%20Plan_%20Transitioning%20to%20Pattern%205%20Organizational%20Memory.md).

---

## ⚙️ 6. Calibração do Nível de Esforço (Effort Param)

Configure o esforço de raciocínio da API baseado na complexidade intrínseca da tarefa:

- **xhigh / max (Esforço Máximo):** Obrigatório para engenharia de arquitetura de software, depuração de concorrência complexa e refatorações em larga escala.
- **high:** Padrão para geração de código tipado, migrações simples e auditorias de segurança de primeiro nível.
- **medium / low:** Adequado para tarefas de compilação conceitual de logs, análise gramatical de textos e geração de respostas diretas.
