# 09-skills - Arquitetura de Habilidades Especializadas e Extensíveis do Agente

## 🏛️ Visão Estrutural e Arquitetural

A arquitetura de Habilidades é altamente modular e extensível.
Cada skill reside em sua própria subpasta contendo o arquivo `SKILL.md` composto por: Metadados estruturados, Regras rígidas, Capacidades essenciais, Exemplos reais de uso e Referências técnicas de apoio.

### 📐 Diagrama de Fluxo e Componentes Semânticos

```mermaid
graph TD
    A["Habilidades Especializadas e Extensíveis do Agente"] --> B["Políticas de Governança"]
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
