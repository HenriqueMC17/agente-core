# 17-future-expansion - Matriz de Responsabilidade (RACIs) de Expansão Futura e Auto-Evolução do Sistema

## 🎭 Alocação de Papéis no Ciclo SDLC

- **Architect Agent**: Desenhar os diagramas futuros do ecossistema, prever gargalos de performance e propor extensões e ADRs de longo prazo.
- **Supervisor Humano**: Validar e autorizar o roadmap tecnológico de evolução autônoma de competências do agente.

---

## 🤝 Protocolo de Acordo e Confiança (Supervisor-Agente)
- O agente autônomo opera sob o **Secure Mode** (Terminal Sandbox com allow-list de comandos).
- Qualquer comando executado localmente que saia do escopo permitido requer autorização via terminal interativo.
- A tomada de decisão arquitetural macro é responsabilidade conjunta, sendo a validação de código delegada inteiramente ao linter automático e ao supervisor humano.

---

> [!WARNING]
> **Segurança Zero-Trust:**
> Nenhuma chave de API ou credencial deve ser exposta ou manipulada diretamente por qualquer papel. O uso de secrets deve ser restrito exclusivamente a cofres criptografados gerenciados pelo módulo `15-security`.
