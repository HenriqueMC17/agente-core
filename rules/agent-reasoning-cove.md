# Raciocínio Sistêmico do Agente (Sistema 2 & COVE)

Este documento estabelece as regras e frameworks de raciocínio lógico obrigatórios para que os agentes autônomos do `agente-core` operem sob comportamento analítico deliberado, minimizando alucinações e erros induzidos por respostas imediatas de predição estatística.

---

## 1. Fundamentos de Cognição Artificial: Sistema 1 vs. Sistema 2

Os Grandes Modelos de Linguagem (LLMs), em sua operação natural (*model-free*), comportam-se como o **Sistema 1** humano: rápidos, estatísticos, associativos e focados na previsão probabilística do próximo token. Para a engenharia de software e tomada de decisões estratégicas de vanguarda, devemos forçar o agente a operar no modo **Sistema 2** (*model-based*): lento, deliberado, analítico e baseado em planejamento e restrições.

### Distinção Arquitetural do Raciocínio:

| Atributo | Sistema 1 (Model-free) | Sistema 2 (Model-based) |
| :--- | :--- | :--- |
| **Velocidade** | Instantânea / Alta vazão de tokens. | Deliberada / Controlada por ciclos. |
| **Esforço Computacional** | Mínimo por interação. | Elevado; planeja caminhos alternativos. |
| **Processamento** | Associativo e heurístico direto. | Lógico, verificado e orientado a regras. |
| **Aplicação Ideal** | Resumos, classificação simples e brainstorms. | Codificação crítica, depuração e arquitetura. |

---

## 2. Paradigma Tree of Thoughts (ToT) e Busca Heurística

Para problemas combinatórios e lógicas complexas onde a primeira escolha de código restringe o sucesso dos passos futuros, os agentes do `agente-core` devem adotar o framework **Tree of Thoughts (ToT)** em substituição ao raciocínio linear simples (*Chain-of-Thought*).

```
          [Problema Inicial]
             /    |    \
          [Nó A] [Nó B] [Nó C]  <-- Geração de Ideias / Ramos
           /        \
      [Nó A.1]    [Nó B.1]     <-- Busca (BFS/DFS) e Lookahead
        (X)         (Poda)     <-- Poda de ramos inválidos
```

*   **Lookahead (Antecipação):** Simulação de passos futuros e projeção dos impactos arquiteturais antes de reescrever um arquivo.
*   **Backtracking (Retrocesso):** Capacidade de identificar quando um ramo de código resultou em falha lógica ou sintática e retroceder ao estado estável anterior (*nó de origem*) para buscar uma rota alternativa.
*   **Poda de Ramos (Pruning):** Descarte prematuro de alternativas de design ou código que violem regras explícitas de segurança, integridade ou de estilo.

---

## 3. O Protocolo Chain-of-Verification (COVE)

Para garantir o rigor técnico nas entregas conceituais e lógicas, o agente implementará o ciclo **COVE** de forma atômica seguindo as seguintes etapas obrigatórias:

### 3.1. Rascunho Inicial (Draft)
Geração preliminar do código ou da resposta estruturada baseada no contexto inicial.

### 3.2. Planejamento de Verificação
O agente gera uma lista de perguntas críticas sobre possíveis falhas do rascunho anterior (ex: *"Esta query pode gerar N+1?"*, *"Há perigo de vazamento de memória com listeners abertos?"*).

### 3.3. Execução Independente
O agente responde a cada uma das perguntas de forma isolada, **sem ler a sua própria resposta do rascunho**, evitando o viés cognitivo de confirmação estatística.

### 3.4. Consolidação da Resposta
Cruzamento das respostas independentes com o rascunho. O código é refatorado para incorporar as correções de todas as discrepâncias detectadas.

---

## 4. Otimização Especulativa (SPEX) e Lógica FLARE

Para auditorias profundas e refatorações estruturais, a operação da inteligência integra a metodologia **FLARE (Faithful Logic-Aided Reasoning and Exploration)**:
*   A IA traduz planos em pseudocódigos lógicos ou regras sintáticas antes de gerar código funcional.
*   Isso garante uma sobreposição formal entre as restrições definidas e o rastro físico de execução gerado pelo agente, assegurando rastreabilidade de conformidade ao desenvolvedor supervisor.
