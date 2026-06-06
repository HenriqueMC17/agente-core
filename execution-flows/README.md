# ⚙️ [EXECUTION FLOWS] — Fluxos de Execução, Rastreabilidade & Runtime de Agentes

## 📌 1. Visão Geral
O diretório `/execution-flows` documenta o runtime prático e os fluxos dinâmicos de execução do ecossistema `agente-core`. Ele descreve como a inteligência flui através das esteiras.

## 🎯 2. Objetivo da Pasta
Mapear o comportamento dinâmico do sistema durante a atividade operacional, detalhando os diagramas de sequência de chamadas de API, ciclos de sono de agentes (Sleep Cycles) e processamento assíncrono.

## 🧠 3. Contexto Operacional
Tanto engenheiros humanos encarregados de otimizar a latência quanto agentes de IA analisando o comportamento do próprio runtime recorrem a este diretório para diagnosticar problemas de concorrência ou transição de estados.

## 🏗️ 4. Arquitetura da Estrutura
O diretório divide-se nos seguintes diagramas de fluxo de execução:
*   `execution-flows-readme.md` — Painel centralizador de fluxos de execução dinâmica.
*   `sleep-cycle-flow.md` — Fluxo detalhado do ciclo de sono e consolidação de memória de longo prazo dos agentes de IA.

## 🛡️ 5. Responsabilidades
*   **Rastreabilidade de Chamadas:** Mapear a ordem exata de processamento e comunicação de pacotes de dados em runtime.
*   **Otimização de Latência:** Identificar gargalos operacionais e etapas de concorrência ineficientes.
*   **Gestão de Recursos:** Garantir que processos em background (como Sleep Cycles) executem sem vazamento de memória ou CPU.

## 🔄 6. Fluxos Relacionados
*   **Sleep Cycles de Agentes:** Ao final de sessões longas de engenharia, a esteira do agente é suspensa, disparando assincronamente a consolidação de novas competências em arquivos `.md` permanentes.

## ⚙️ 7. Integrações
*   **OpenTelemetry / Jaeger / Zipkin:** Prontidão arquitetural para rastreabilidade distribuída de chamadas de APIs cognitivas.

## 📦 8. Dependências
*   **`ai-systems/`**: Os fluxos dinâmicos documentados descrevem o comportamento prático das topologias de agentes definidas conceitualmente em `/ai-systems`.

## 🎨 9. Padrões Utilizados
*   **Asynchronous Message Passing:** Comunicação assíncrona entre agentes via mensageria para evitar travamento de runtime.
*   **State Machine Pattern:** Controle granular do estado dos agentes (Active, Thinking, Idle, Sleeping).

## 📜 10. Convenções
*   Todas as transições de estado complexas de agentes em background devem ser descritas utilizando diagramas de sequência Mermaid detalhados.
*   Nenhum processo de Sleep Cycle ou consolidação de memória pode bloquear a thread principal de interação com o desenvolvedor.

## 🔗 11. Relação com Outras Áreas
*   [**`/ai-systems`**](file:///c:/Dev/agente-core/ai-systems) — Define a topologia conceitual que realiza as chamadas e fluxos dinâmicos deste diretório.
*   [**`/workflows`**](file:///c:/Dev/agente-core/workflows) — Fornece os gatilhos sequenciais que iniciam as rotinas dinâmicas de runtime aqui especificadas.

## 🛠️ 12. Exemplos de Uso
Um desenvolvedor Staff de IA, ao planejar otimizar o tempo de resposta do robô cognitivo, abre `sleep-cycle-flow.md` para realocar as tarefas pesadas de compressão de contexto para horários de baixa atividade.

## 💡 13. Boas Práticas
*   Documente de forma clara as janelas temporais de execução de rotinas em background para evitar sobrecarga simultânea em servidores compartilhados.
*   Sempre preveja caminhos de interrupção imediata (*Graceful Shutdown*) para processos assíncronos em caso de cancelamento da sessão pelo usuário.

## 🚨 14. Troubleshooting
*   *Problema: O agente aparenta "esquecer" informações aprendidas na sessão anterior após reiniciar.*
    *   *Solução:* Verifique o diagrama de sequência em `sleep-cycle-flow.md`. Uma falha na consolidação do arquivo de memória persistente durante a fase de Sleep indica necessidade de aumentar o timeout do script de dumping semântico.

## 🚀 15. Roadmap Evolutivo
*   **Q3 2026:** Monitoramento dinâmico de latência de runtime de agentes com visualização em tempo real de gargalos cognitivos (Cognitive Latency Profiler).
*   **Q4 2026:** Orquestração autônoma e descentralizada de Sleep Cycles de agentes que se auto-ajustam com base em picos de demanda de infraestrutura global.
