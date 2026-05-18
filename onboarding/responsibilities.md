# 00-governance - Matriz de Responsabilidade (RACIs) de Governança Global e Princípios de Engenharia

## 🎭 Alocação de Papéis no Ciclo SDLC

- **Architect Agent**: Garantir conformidade com os princípios da Clean Architecture e Feature-Sliced Design.
- **Validator Agent**: Assegurar cobertura de teste mínima de 80% e aplicar regras estritas da Constituição.
- **Supervisor Humano**: Validar desvios de design e assinar releases de produção.

---

## 🤝 Protocolo de Acordo e Confiança (Supervisor-Agente)
- O agente autônomo opera sob o **Secure Mode** (Terminal Sandbox com allow-list de comandos).
- Qualquer comando executado localmente que saia do escopo permitido requer autorização via terminal interativo.
- A tomada de decisão arquitetural macro é responsabilidade conjunta, sendo a validação de código delegada inteiramente ao linter automático e ao supervisor humano.

---

> [!WARNING]
> **Segurança Zero-Trust:**
> Nenhuma chave de API ou credencial deve ser exposta ou manipulada diretamente por qualquer papel. O uso de secrets deve ser restrito exclusivamente a cofres criptografados gerenciados pelo módulo `15-security`.
