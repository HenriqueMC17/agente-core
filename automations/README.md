# ⚙️ [AUTOMATIONS] — Automações de Infraestrutura, Scripts Operacionais & Code Gen

## 📌 1. Visão Geral
O diretório `/automations` contém os scripts executáveis (PowerShell, Bash, Python) responsáveis por automatizar a manutenção de infraestrutura, geração de documentação e rotinas recorrentes do repositório `agente-core`.

## 🎯 2. Objetivo da Pasta
Fornecer utilitários robóticos eficientes para eliminar trabalho repetitivo (*toil*), assegurando a auto-recuperação do repositório, consistência de layout e geração de artefatos de governança sem intervenção humana manual.

## 🧠 3. Contexto Operacional
Os pipelines de integração e os agentes executam ativamente os scripts contidos nas subpastas deste diretório para auditar a árvore de arquivos, compilar estatísticas de skills e sincronizar dependências lógicas.

## 🏗️ 4. Arquitetura da Estrutura
O ecossistema de automações está organizado como segue:
*   `automation-tools/auto-doc-generator.ps1` — Script PowerShell de alta performance para consolidação automatizada de documentação e geração de índices globais markdown.

## 🛡️ 5. Responsabilidades
*   **Redução de Toil:** Automatizar a escrita e atualização de sumários e árvores de arquivos do projeto.
*   **Auditabilidade:** Manter trilhas de logs estruturados de geração de código.
*   **Garantia de Padrões:** Forçar formatação e higienização tipográfica em arquivos gerados.

## 🔄 6. Fluxos Relacionados
*   **SDLC de Engenharia:** Conectado à esteira de build. O gerador automático de documentação é acionado ao final de cada alteração aprovada em pull request.

## ⚙️ 7. Integrações
*   **Local CLI / Task Runners:** Integração nativa com scripts locais para execução manual rápida via comandos simples.

## 📦 8. Dependências
*   **PowerShell 7+ / Python 3.10+**: Exigido para a execução das ferramentas de script semântico e geração.

## 🎨 9. Padrões Utilizados
*   **Fail-Safe Scripting:** Tratamento robusto de exceções e caminhos alternativos para garantir que erros locais de execução não corrompam a base de dados documental principal.

## 📜 10. Convenções
*   Todos os scripts utilitários devem possuir logs informativos detalhados impressos no console no formato estruturado JSON ou Key-Value limpo.
*   Scripts destrutivos ou de limpeza em massa exigem a flag explícita `--force` ou aprovação em prompt interativo local.

## 🔗 11. Relação com Outras Áreas
*   [**`/workflows`**](file:///c:/Dev/agente-core/workflows) — Mapeia o momento exato de execução destas automações nas esteiras.
*   [**`/internal-tools`**](file:///c:/Dev/agente-core/internal-tools) — Armazena utilitários complementares de manutenção e ativação de competências de agentes.

## 🛠️ 12. Exemplos de Uso
Para atualizar a árvore de arquivos markdown de documentação do ecossistema localmente, o desenvolvedor executa no console PowerShell:
`.\automations\automation-tools\auto-doc-generator.ps1 -Verbose`

## 💡 13. Boas Práticas
*   Sempre valide argumentos de entrada nos scripts para evitar injeções ou deleções em diretórios não mapeados.
*   Mantenha caminhos de execução relativos à raiz do repositório para assegurar a portabilidade entre plataformas Windows e Linux.

## 🚨 14. Troubleshooting
*   *Problema: O script auto-doc-generator.ps1 falha por política de execução do Windows.*
    *   *Solução:* Execute `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process` no terminal powershell antes de iniciar a automação.

## 🚀 15. Roadmap Evolutivo
*   **Q3 2026:** Migração total de scripts PowerShell complexos para orquestração agêntica Python nativa com suporte a embeddings semânticos.
*   **Q4 2026:** Pipeline de auto-correção de scripts (self-healing scripts) que se adaptam dinamicamente a mudanças de APIs locais.
