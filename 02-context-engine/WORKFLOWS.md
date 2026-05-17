# 02-context-engine - Procedimentos Operacionais e Workflows de Motor de Contexto e Gerenciamento de Memória Activa

## 🚀 Fluxos de Trabalho Passo a Passo

- compressão automática de logs de execução antigos em sumários de texto compactos.
- Roteamento semântico de payloads de prompts baseado na relevância do arquivo modificado na IDE.

---

## 🛠️ Comandos CLI e Triggers do Sistema
As ações deste módulo são orquestradas ou ativadas através dos seguintes comandos de automação local:

| Comando / Trigger | Ator Responsável | Efeito / Efeito Colateral Esperado |
| :--- | :--- | :--- |
| `structural-validator.ps1` | Validator Agent | Varredura completa da estrutura física de pastas contra anomalias. |
| `auto-doc-generator.ps1` | Orchestrator / Tooling | Atualiza e reconstrói o índice global semântico do repositório. |
| `activate-skills.bat` | Executor Agent | Atualiza e injeta as referências de habilidades no catálogo local. |

---

> [!IMPORTANT]
> **Rastreabilidade dos Processos:**
> Cada execução de workflow deve registrar seu rastro de raciocínio no arquivo `task.md` ativo do workspace, garantindo auditoria em tempo real e permitindo o rollback seguro se falhas forem detectadas na fase de QA.
