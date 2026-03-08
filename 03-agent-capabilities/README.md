# 03-agent-capabilities

## 🎯 Propósito

Definir explicitamente **as habilidades e capacidades operacionais** que o agente é qualificado para executar. É o portfólio funcional da entidade.

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

É a **camada de Autoconsciência**. Ensina aos sistemas externos (e ao próprio LLM) o escopo daquilo que ele está apto a ingerir, refatorar e analisar.

## 📂 Natureza dos Arquivos

Descrições de "Skillsets" contendo protocolos sobre como abordar operações intelectuais densas.

- `system-design.md`: Habilidade de desenhar blocos e transações a partir de rascunhos verbais.
- `code-review.md`: Prática de leitura defensiva, detecção de code smells e proposição de otimizações.
- `debugging.md`: Protocolos lógicos de troubleshooting, isolando de side-effects.
- `optimization.md`: Técnicas de refino para Big-O notation, payload reduction e query shaping.
- `refactoring.md`: Como transformar Legacy Code em Clean Code sem quebra de testes sistêmicos.

## ⚙️ Diretrizes de Manutenção e Evolução

- **Manutenção:** Atualizar este repositório toda vez que o modelo de linguagem (LLM) da base receber uma atualização de contexto significativo ou MCP.
- **Evolução:** Ao adicionar novas habilidades (ex: _Design de Banco Relacional do Zero_), um arquivo para a _Capability_ deve ser mapeado.

## 🔗 Relação com Outras Camadas

- Estas habilidades utilizam os `04-workflows` como forma física de execução no mundo/repositório.
- A aplicação da habilidade baseia-se profundamente no material de referência em `05-knowledge-base`.
