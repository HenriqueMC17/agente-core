# 16-runtime - Matriz de Responsabilidade (RACIs) de Runtime de Alta Performance e Microserviços Edge

## 🎭 Alocação de Papéis no Ciclo SDLC

- **Orchestrator Agent**: Garantir o provisionamento adequado de recursos e a integridade de execução do microsserviço.
- **Developer Agent**: Escrever código sem vazamento de memória e compatível com as especificações estritas do motor Bun/Node.js.

---

## 🤝 Protocolo de Acordo e Confiança (Supervisor-Agente)
- O agente autônomo opera sob o **Secure Mode** (Terminal Sandbox com allow-list de comandos).
- Qualquer comando executado localmente que saia do escopo permitido requer autorização via terminal interativo.
- A tomada de decisão arquitetural macro é responsabilidade conjunta, sendo a validação de código delegada inteiramente ao linter automático e ao supervisor humano.

---

> [!WARNING]
> **Segurança Zero-Trust:**
> Nenhuma chave de API ou credencial deve ser exposta ou manipulada diretamente por qualquer papel. O uso de secrets deve ser restrito exclusivamente a cofres criptografados gerenciados pelo módulo `15-security`.
