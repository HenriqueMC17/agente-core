# 07-ai-integration

## 🎯 Propósito

Fornecer guias operacionais que definem **como a Inteligência Artificial e Múltiplos Agentes** são estruturados, instanciados e consumidos na base do projeto. Representa a gestão da sua própria força computacional generativa.

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

Camada Metacognitiva. Afina o motor de Inteligência do repositório garantindo predição de qualidade durante _pair-programming_ com LLMs e gerenciando contextos limitados.

## 📂 Natureza dos Arquivos

Práticas estritas de _Prompt Engineering_, arquitetura baseada em inferência e uso de sub-agentes autônomos para refatoração de código e análise passiva.

- `prompt-engineering.md`: Modelos como Chain-of-Thought e técnicas pragmáticas para contornar falhas comuns (alucinação lógica/bibliotecas falsas).
- `ai-assisted-development.md`: Formato em que IA acelera e se encaixa em TDD, documentação inline e análise de pull-requests.
- `agent-orchestration.md`: Processos para isolar tarefas e despachar em instâncias filhas (e/ou automações que rodam agentes simultâneos sobre o repositório).

## ⚙️ Diretrizes de Manutenção e Evolução

- **Evolução Contínua:** Este é provavelmente o diretório mais volátil com o avanço tecnológico mensal em IAs baseadas em código (Geração RAG, Memória de Longo Prazo nativa, AntiGravity tools etc).
- **Uso:** Leitura obrigatória caso você precise configurar sub-sistemas de avaliação ou agentes isolados que consumam esse repositório sob demanda.

## 🔗 Relação com Outras Camadas

- Complementar extremo à diretriz autônoma do `03-agent-capabilities`.
- As integrações dependem de orquestrações locais controladas pela sintaxe do `11-mcp-integrations`.
