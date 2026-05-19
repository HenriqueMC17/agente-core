# 📝 [PROMPTS] — Engenharia de Instruções, Templates de Contexto & Metaprompts

## 📌 1. Visão Geral
O diretório `/prompts` atua como o repositório de engenharia de instruções do ecossistema `agente-core`. Ele armazena as diretrizes e metaprompts que moldam as capacidades cognitivas, tom de voz e rigor analítico das IAs.

## 🎯 2. Objetivo da Pasta
Centralizar, controlar a versão e documentar todas as instruções base, metaprompts de sistema e templates utilizados pelos agentes para garantir estabilidade cognitiva e evitar regressões de comportamento em atualizações de LLM.

## 🧠 3. Contexto Operacional
Sempre que um agente de IA inicia uma sessão ou executa uma tarefa especializada (como análise de logs ou codificação), o runtime injeta os prompts adequados deste diretório na janela de mensagens do modelo.

## 🏗️ 4. Arquitetura da Estrutura
O diretório está estruturado com os seguintes metaprompts e guias:
*   `system-prompts/README.md` — Painel centralizador de metaprompts.
*   `system-prompts/developer-agent-v1.txt` — Instruções base estritas para agentes codificadores autônomos.
*   `system-prompts/metaprompt-pqc.txt` — Metaprompt de sistema focado em criptografia pós-quântica e segurança matemática.
*   `system-prompts/metaprompt-pro-max.txt` — Metaprompt avançado para raciocínio lógico e resolução de quebra-cabeças técnicos complexos.
*   `agent-profile.md` — Definição do perfil, personalidade e limitações comportamentais do agente.
*   `guidelines-system.md` — Diretrizes gerais de engenharia de prompt do repositório.

## 🛡️ 5. Responsabilidades
*   **Controle de Alucinação:** Impor barreiras linguísticas e lógicas estritas contra a geração de código ou fatos falsos.
*   **Consistência Cognitiva:** Assegurar que diferentes modelos (Claude, GPT, Gemini) respondam com padrões operacionais e estéticos idênticos.
*   **Versionamento Seguro:** Monitorar alterações de tom e prioridade operacional nas instruções dos agentes.

## 🔄 6. Fluxos Relacionados
*   **Metodologia FLARE:** Integração ativa nos metaprompts corporativos para exigir etapas de verificação e checagem de fatos lógicos durante a geração.

## ⚙️ 7. Integrações
*   **Prompt Registry / LangChain Hub:** Sincronização automatizada com repositórios de prompts corporativos centralizados na nuvem.

## 📦 8. Dependências
*   **`governance/`**: Alinhamento imediato com as leis éticas e regulatórias corporativas ditadas nos manuais de conformidade.

## 🎨 9. Padrões Utilizados
*   **Few-Shot Prompting:** Inclusão de exemplos concretos de payloads e retornos esperados dentro dos metaprompts de desenvolvedor.
*   **XML Tagging:** Utilização de delimitadores semânticos XML (ex: `<thinking>`, `<output>`) para guiar a estrutura de raciocínio das IAs.

## 📜 10. Convenções
*   Nenhum metaprompt de sistema deve induzir o agente a ignorar diretrizes éticas ou regras P0 de governança em tempo de execução.
*   Modificações em prompts estruturais requerem testes de regressão semântica na suíte sandbox antes da aprovação em branch de produção.

## 🔗 11. Relação com Outras Áreas
*   [**`/ai-systems`**](file:///c:/Dev/agente-core/ai-systems) — Consome estes prompts para inicializar os sistemas cognitivos integrados.
*   [**`/rules`**](file:///c:/Dev/agente-core/rules) — Fornece as premissas lógicas de runtime que os prompts de sistema devem impor formalmente.

## 🛠️ 12. Exemplos de Uso
Um engenheiro de prompt, ao otimizar a velocidade de escrita dos agentes, edita `system-prompts/developer-agent-v1.txt` para incluir novas regras de brevidade e links markdown absolutos obrigatórios.

## 💡 13. Boas Práticas
*   Mantenha os prompts livres de instruções redundantes que apenas aumentam o custo de tokens sem alterar o comportamento do modelo.
*   Sempre utilize delimitadores estruturados claros para separar instruções de sistema de dados inseridos dinamicamente por usuários.

## 🚨 14. Troubleshooting
*   *Problema: O agente de IA começa a gerar respostas excessivamente prolixas ou ignorar links markdown absolutos.*
    *   *Solução:* Recarregue a versão base estável de `system-prompts/developer-agent-v1.txt` e execute testes comparativos de prompt em sandbox.

## 🚀 15. Roadmap Evolutivo
*   **Q3 2026:** Otimização autônoma de prompts com base em métricas de conversão e assertividade de código (A/B testing cognitivo automatizado).
*   **Q4 2026:** Geração automática e customização de prompts sob demanda para cada tipo específico de linguagem de programação ou stack tecnológica detectada no repositório.
