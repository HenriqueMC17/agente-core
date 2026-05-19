# 📦 [MODULES] — Módulos Funcionais, Competências Cognitivas & Skills de Agentes

## 📌 1. Visão Geral
O diretório `/modules` é o coração das competências dinâmicas do ecossistema `agente-core`. Ele armazena as habilidades executáveis e operacionais geradas por agentes cognitivos.

## 🎯 2. Objetivo da Pasta
Centralizar, catalogar e estruturar as competências cognitivas (*Skills*) geradas de forma autônoma pelos robôs de IA (como o agente `antigravity`), fornecendo instruções operacionais claras em formato markdown (`SKILL.md`) altamente indexáveis.

## 🧠 3. Contexto Operacional
Sempre que um agente cognitivo recebe um objetivo de engenharia complexo, ele varre os catálogos deste diretório para identificar se já possui uma competência pré-compilada aplicável à tarefa ou se necessita desenvolver uma nova habilidade local.

## 🏗️ 4. Arquitetura da Estrutura
O diretório armazena milhares de competências estruturadas de forma semântica:
*   `antigravity-awesome-skills-claude/` — Repositório de competências especializadas desenvolvidas de forma autônoma pelo agente principal.
*   `modules-concept.md` — Visão teórica da arquitetura de carregamento dinâmico de skills por agentes de runtime.

## 🛡️ 5. Responsabilidades
*   **Encapsulamento de Competências:** Garantir que cada skill de agente possua entradas, saídas e descrições semânticas de alta precisão.
*   **Modularidade:** Evitar duplicação desnecessária de lógica cognitiva em runtime.
*   **Indexação Semântica:** Prover descrições de fácil localização para ferramentas de busca RAG rápidas.

## 🔄 6. Fluxos Relacionados
*   **Sleep Cycles de Agentes:** Durante a fase de Sleep, o agente de IA compila o aprendizado acumulado em novas competências duradouras gravadas fisicamente neste diretório.

## ⚙️ 7. Integrações
*   **Model Context Protocol Servers:** Integração nativa que expõe o catálogo de competências como ferramentas usáveis por LLMs corporativos em tempo real.

## 📦 8. Dependências
*   **`execution-flows/`**: Conexão estreita com o fluxo dinâmico de sleep cycle, que governa o dump físico de skills na pasta.

## 🎨 9. Padrões Utilizados
*   **Competency-Based Engineering (CBE):** Design de software focado em competências auto-contidas e descritivas para facilitação de execução de tarefas agênticas.

## 📜 10. Convenções
*   Cada subdiretório de competência deve possuir obrigatoriamente um arquivo `SKILL.md` contendo escopo, exemplos de payload de entrada/saída, regras e tratamento de exceções.
*   Devido ao tamanho massivo da base de skills em diretórios profundos, pesquisas recursivas devem ignorar a pasta física profunda para controle racional de tokens de contexto.

## 🔗 11. Relação com Outras Áreas
*   [**`/templates`**](file:///c:/Dev/agente-core/templates) — Fornece os esqueletos formais markdown para a escrita padronizada de novas competências.
*   [**`/examples`**](file:///c:/Dev/agente-core/examples) — Fornece exemplos reais de uso prático de skills instaladas.

## 🛠️ 12. Exemplos de Uso
O agente cognitivo principal, ao deparar-se com a necessidade de otimizar consultas complexas no ClickUp, lê a skill correspondente em `antigravity-awesome-skills-claude` para carregar o payload JSON exato no seu runtime.

## 💡 13. Boas Práticas
*   Mantenha cada arquivo de skill isolado e puramente focado em uma única responsabilidade funcional.
*   Evite caminhos estáticos ou dependências físicas rígidas dentro dos scripts de competências, favorecendo variáveis de ambiente padronizadas.

## 🚨 14. Troubleshooting
*   *Problema: O agente de IA falha ao carregar uma skill dinâmica de seu repositório local.*
    *   *Solução:* Valide o esquema estrutural do arquivo `SKILL.md` correspondente e execute o script local de diagnóstico de skills para apontar quebras de formato JSON nas tags de payload.

## 🚀 15. Roadmap Evolutivo
*   **Q3 2026:** Mutação dinâmica de competências em runtime (Self-Adapting Skills) adaptadas de acordo com falhas detectadas em suítes de testes automatizados locais.
*   **Q4 2026:** Hub descentralizado de compartilhamento de competências agênticas corporativas seguras através de criptografia híbrida pós-quântica.
