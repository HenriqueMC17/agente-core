# 07-ai-orchestration - Matriz de Responsabilidade (RACIs) de Orquestração Cognitiva Avançada (ToT e CoVe)

## 🎭 Alocação de Papéis no Ciclo SDLC

- **Orchestrator Agent**: Conduzir o fluxo cognitivo, expandir a árvore de decisão e consolidar o código final livre de alucinações.
- **Reviewer Agent**: Atuar como o crítico implacável que valida a coerência lógica de cada nó de decisão.

---

## 🤝 Protocolo de Acordo e Confiança (Supervisor-Agente)
- O agente autônomo opera sob o **Secure Mode** (Terminal Sandbox com allow-list de comandos).
- Qualquer comando executado localmente que saia do escopo permitido requer autorização via terminal interativo.
- A tomada de decisão arquitetural macro é responsabilidade conjunta, sendo a validação de código delegada inteiramente ao linter automático e ao supervisor humano.

---

> [!WARNING]
> **Segurança Zero-Trust:**
> Nenhuma chave de API ou credencial deve ser exposta ou manipulada diretamente por qualquer papel. O uso de secrets deve ser restrito exclusivamente a cofres criptografados gerenciados pelo módulo `15-security`.
