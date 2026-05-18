# 🔌 CONECTOR DE INTEGRAÇÃO DO GOOGLE STITCH MCP (`stitch-mcp.md`)

O conector **Google Stitch MCP** estabelece uma ponte semântica direta entre o motor de raciocínio de IA e uma tela de design visual (*Visual UI Canvas*). Ele permite que o agente gere layouts, crie e gerencie design systems, aplique tokens visuais e colha código de interface real sem intervenção manual.

---

## 📐 1. Visão Geral da Arquitetura

O Stitch opera no ecossistema como o **Single Source of Truth (SSoT)** visual. A comunicação segue a topologia de barramento de eventos do Model Context Protocol:

```
┌──────────────┐         Model Context Protocol         ┌──────────────┐
│  Agente IA   │ ◄────────────────────────────────────► │  Canvas UI   │
│ (Antigravity)│   Sincronização de Tokens/Telas        │(Google Stitch)│
└──────┬───────┘                                        └──────┬───────┘
       │                                                       │
       ▼                                                       ▼
 [AGENTS.md] Constituição                               [DESIGN.md] Tokens
```

---

## 🛠️ 2. Referência de Ferramentas (Tooling Schema)

O servidor Stitch MCP disponibiliza as seguintes ferramentas corporativas para manipulação em tempo real da interface gráfica:

### Gestão de Projetos e Estrutura
*   **`mcp_stitch_create_project`**: Cria um novo container lógico de projeto para design e código.
*   **`mcp_stitch_get_project`**: Recupera dados topológicos e referências de telas de um projeto ativo.
*   **`mcp_stitch_list_projects`**: Lista todos os workspaces sob a governança da conta.

### Engenharia Gerativa de Telas
*   **`mcp_stitch_generate_screen_from_text`**: Instancia uma nova tela baseando-se em especificações semânticas textuais.
*   **`mcp_stitch_get_screen`**: Recupera os metadados e os nós estáticos de uma tela específica do canvas.
*   **`mcp_stitch_list_screens`**: Mapeia todas as telas contidas em um projeto.
*   **`mcp_stitch_edit_screens`**: Aplica refatorações visuais (edição por prompt) a uma ou mais telas em lote.
*   **`mcp_stitch_generate_variants`**: Cria alternativas de layout e A/B testing para caminhos de tela selecionados.

### Design System e Sincronização de Tokens
*   **`mcp_stitch_create_design_system`**: Inicializa uma fundação visual configurando cores (APCA), fontes e roundness.
*   **`mcp_stitch_upload_design_md`**: Faz o upload do arquivo `DESIGN.md` bruto para conversão direta em tokens de estilo.
*   **`mcp_stitch_create_design_system_from_design_md`**: Gera a fundação visual a partir do upload do `DESIGN.md`.
*   **`mcp_stitch_update_design_system`**: Altera configurações de Branding, Dark Mode e Materiais (Liquid Glass).
*   **`mcp_stitch_list_design_systems`**: Mapeia os design systems ativos corporativos e globais.
*   **`mcp_stitch_apply_design_system`**: Propaga e renderiza as mudanças de design em todas as telas selecionadas.

---

## 💎 3. Fluxo de Trabalho Design-to-Code Corporativo

A esteira de montagem de telas entre Stitch e o workspace segue o roteiro de 4 etapas:

1.  **Fundação Visual (`DESIGN.md`):**
    O arquiteto humano ou o agente escreve a especificação técnica de branding no arquivo `DESIGN.md` (conforme as diretivas de APCA e Grade de 8px em `AGENTS.md`).
2.  **Sincronização MCP:**
    O agente executa `upload_design_md` e `create_design_system_from_design_md` para sincronizar os tokens com a nuvem do Stitch.
3.  **Geração e Edição de Telas:**
    Utilizando prompts altamente estruturados, o agente invoca `generate_screen_from_text` para instanciar as telas principais, utilizando as ferramentas `edit_screens` e `generate_variants` para calibrar o alinhamento visual de bento grids e contraste de cores.
4.  **Colheita de Código:**
    Os nós gráficos validados são convertidos pelo motor de IA em código limpo, reativo e tipado em TypeScript, sendo escritos diretamente em `/modules`.

---

## 🔒 4. Sandboxing e Variáveis de Controle

*   **Token Exigido:** `STITCH_API_KEY` (injetado via variável de ambiente do host).
*   **ID do Projeto Corporativo:** `4044680601076201931` (associado a esta suite operacional).
*   **Isolamento Visual:** As telas geradas no canvas não afetam arquivos de código locais até que o agente complete a validação semântica e passe pelo Vibe Check do usuário.
