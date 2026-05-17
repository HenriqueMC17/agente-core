# 10-rules-engine - Matriz de Responsabilidade (RACIs) de Motor de Regras e Linters Sintáticos

## 🎭 Alocação de Papéis no Ciclo SDLC

- **Validator Agent**: Auditar e rejeitar alterações de código que não respeitem a integridade das regras sintáticas estritas.
- **Developer Agent**: Resolver alertas apontados pelo motor de regras antes de solicitar revisões.

---

## 🤝 Protocolo de Acordo e Confiança (Supervisor-Agente)
- O agente autônomo opera sob o **Secure Mode** (Terminal Sandbox com allow-list de comandos).
- Qualquer comando executado localmente que saia do escopo permitido requer autorização via terminal interativo.
- A tomada de decisão arquitetural macro é responsabilidade conjunta, sendo a validação de código delegada inteiramente ao linter automático e ao supervisor humano.

---

> [!WARNING]
> **Segurança Zero-Trust:**
> Nenhuma chave de API ou credencial deve ser exposta ou manipulada diretamente por qualquer papel. O uso de secrets deve ser restrito exclusivamente a cofres criptografados gerenciados pelo módulo `15-security`.
