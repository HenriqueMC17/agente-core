# 01-foundation - Matriz de Responsabilidade (RACIs) de Fundação e Regras do Workspace

## 🎭 Alocação de Papéis no Ciclo SDLC

- **Executor Agent**: Seguir à risca as regras de formatação e arquitetura de pastas.
- **Validator Agent**: Rejeitar pull requests que violem regras semânticas globais do Git.

---

## 🤝 Protocolo de Acordo e Confiança (Supervisor-Agente)
- O agente autônomo opera sob o **Secure Mode** (Terminal Sandbox com allow-list de comandos).
- Qualquer comando executado localmente que saia do escopo permitido requer autorização via terminal interativo.
- A tomada de decisão arquitetural macro é responsabilidade conjunta, sendo a validação de código delegada inteiramente ao linter automático e ao supervisor humano.

---

> [!WARNING]
> **Segurança Zero-Trust:**
> Nenhuma chave de API ou credencial deve ser exposta ou manipulada diretamente por qualquer papel. O uso de secrets deve ser restrito exclusivamente a cofres criptografados gerenciados pelo módulo `15-security`.
