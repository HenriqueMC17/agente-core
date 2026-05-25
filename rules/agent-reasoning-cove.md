# Raciocínio Sistêmico do Agente (Sistema 2, COVE & FLARE)

## 📌 Visão Geral

Este documento estabelece as regras e os frameworks de raciocínio lógico obrigatórios para que os agentes autônomos do `agente-core` operem sob comportamento analítico deliberado, minimizando alucinações e erros induzidos por respostas imediatas de predição estatística.

---

## 🧠 1. Fundamentos de Cognição Artificial: Sistema 1 vs. Sistema 2

Os Grandes Modelos de Linguagem (LLMs), em sua operação natural (*model-free*), comportam-se como o **Sistema 1** humano: rápidos, estatísticos, associativos e focados na previsão probabilística do próximo token. Para a engenharia de software e tomada de decisões críticas de negócio, devemos forçar o agente a operar no modo **Sistema 2** (*model-based*): lento, deliberado, analítico e baseado em planejamento e restrições.

### 📊 Comparação de Paradigmas Cognitivos

| Atributo | Sistema 1 (Model-free) | Sistema 2 (Model-based) |
| :--- | :--- | :--- |
| **Velocidade** | Instantânea / Alta vazão de tokens. | Deliberada / Controlada por ciclos de raciocínio. |
| **Esforço Computacional** | Mínimo por interação. | Elevado (Inference Compute Budget dedicado). |
| **Processamento** | Associativo e heurístico direto. | Lógico, verificado e orientado a regras. |
| **Tratamento de Erros** | Propagação de alucinações. | Autocorreção via loops de feedback ativo. |
| **Aplicação Ideal** | Resumos, classificação simples e brainstorms. | Codificação crítica, depuração, métodos formais e arquitetura. |

- **Inference Compute Budget:** O agente deve deliberadamente gastar poder de computação em tempo de inferência para simular múltiplos caminhos lógicos antes de produzir uma saída definitiva.
- **Speculative Exploration (SPEX):** O agente deve explorar caminhos alternativos de design antes de comprometer edições físicas em arquivos, pesando o custo de infraestrutura contra a precisão da solução.

---

## 🌳 2. Paradigma Tree of Thoughts (ToT) e Busca Heurística

Para problemas combinatórios e lógicas complexas onde a primeira escolha de código restringe o sucesso dos passos futuros, os agentes do `agente-core` devem adotar o framework **Tree of Thoughts (ToT)** em substituição ao raciocínio linear simples (*Chain-of-Thought*).

```
          [Problema Inicial]
             /    |    \
          [Nó A] [Nó B] [Nó C]  <-- Geração de Ideias / Ramos
            /        \
       [Nó A.1]    [Nó B.1]     <-- Busca (BFS/DFS) e Lookahead
         (X)         (Poda)     <-- Poda de ramos inválidos
```

- **Lookahead (Antecipação):** Simulação mental de passos futuros e projeção dos impactos arquiteturais antes de reescrever um arquivo.
- **Backtracking (Retrocesso):** Identificar quando um ramo de código resultou em falha lógica ou sintática e retroceder ao estado estável anterior (*nó de origem*) para buscar uma rota alternativa.
- **Poda de Ramos (Pruning):** Descarte prematuro de alternativas de design ou código que violem regras explícitas de segurança, integridade ou de estilo.

---

## 🔄 3. O Protocolo Chain-of-Verification (COVE)

Para garantir o rigor técnico nas entregas de engenharia, o agente implementará o ciclo **COVE** de forma atômica seguindo quatro etapas obrigatórias:

### 3.1. Rascunho Inicial (Draft Generation)
Geração preliminar do código ou da resposta estruturada baseada no contexto inicial e nos requisitos do usuário.

### 3.2. Planejamento de Verificação (Query Generation)
Formulação de uma lista de perguntas críticas, objetivas e self-contained para identificar possíveis falhas no rascunho (ex: *"Esta implementação de concorrência usa Server GC apropriadamente?"*, *"Esta query SQL evita o gargalo de cardinalidade apontado no benchmark JOB?"*).

### 3.3. Execução de Verificação (Verification Execution)
Resolução de cada uma das perguntas de forma isolada. O agente deve responder a essas perguntas sem olhar para o seu próprio rascunho inicial, prevenindo o viés cognitivo de confirmação estatística.

### 3.4. Consolidação (Consolidation)
Cruzamento das respostas de verificação com o rascunho original. Qualquer inconsistência, bug ou violação de regra detectada deve ser corrigida gerando a versão final refatorada de alta confiabilidade.

---

## 🛡️ 4. Lógica Neuro-Simbólica FLARE (Faithful Logic-Aided Reasoning)

Para auditar e validar modificações de código complexas em produção, o agente adota as comportas de verificação **FLARE**:

- **Tradução para Restrições Lógicas:** O agente deve traduzir as diretrizes textuais do projeto em asserções lógicas formais antes de programar.
- **Check Gates de Execução:** Antes de concluir a tarefa, o agente executa gates de verificação ativa:
  1. **Análise Sintática (Syntax Parsing):** Verificação de que o código compilável gerado não contém erros de sintaxe ou de digitação.
  2. **Validação de Asserções (Assertion Validation):** Testar se a lógica implementada atende estritamente às restrições formais traduzidas.
  3. **Prova de Coerência com a Constituição:** Garantir que nenhuma alteração de código ou configuração burle o arquivo de constituição supremo [AGENTS.md](file:///c:/Dev/agente-core/AGENTS.md) e o master de regras do projeto.
