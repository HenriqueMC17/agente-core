# 04-workflows - Arquitetura de Fluxos de Trabalho Padronizados (BMAD)

## 🏛️ Visão Estrutural e Arquitetural

A arquitetura de Workflows atua como a 'Fábrica de Processos' do repositório.
Ela organiza as fases de desenvolvimento de forma totalmente sequencial e rastreável, impedindo pulos de etapas críticas de garantia de qualidade.

### 📐 Diagrama de Fluxo e Componentes Semânticos

```mermaid
graph TD
    A["Fluxos de Trabalho Padronizados (BMAD)"] --> B["Políticas de Governança"]
    B --> C["Motor de Validação Sintática"]
    C --> D["Execução Sandboxed local"]
    D -->|Validação Concluída| E["Feedback e Entrega"]
```

---

## 🛡️ Guardrails e Integridade Estrutural
Toda alteração de arquitetura sob este domínio deve respeitar os seguintes guardrails:
1.  **Imutabilidade Sintática**: Nenhuma estrutura de pasta interna pode ser criada sem a prévia validação sintática do linter do repositório.
2.  **Clean Architecture**: Seguir o isolamento de dependências, garantindo que as regras de negócio nunca dependam de implementações físicas ou frameworks temporários.
3.  **Visual DNA Consistency**: Integração contínua com especificações visuais para impedir desalinhamento estético em interfaces (Vibe Checking).

---

> [!IMPORTANT]
> **Soberania da Arquitetura:**
> Esta especificação técnica deve ser mantida livre de alucinações. Alterações nesta estrutura devem ser registradas exclusivamente através de ADRs (Architecture Decision Records) aprovadas pelo supervisor de engenharia humano.
