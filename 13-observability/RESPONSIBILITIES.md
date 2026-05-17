# 13-observability - Matriz de Responsabilidade (RACIs) de Observabilidade e Métricas Operacionais

## 🎭 Alocação de Papéis no Ciclo SDLC

- **Observer Agent**: Monitorar a saúde do sistema de orquestração de IA, alertar desvios de consumo financeiro e identificar latências severas.
- **Reviewer Agent**: Analisar logs de falhas em busca de padrões de alucinação de código e propor ajustes no prompt de contexto.

---

## 🤝 Protocolo de Acordo e Confiança (Supervisor-Agente)
- O agente autônomo opera sob o **Secure Mode** (Terminal Sandbox com allow-list de comandos).
- Qualquer comando executado localmente que saia do escopo permitido requer autorização via terminal interativo.
- A tomada de decisão arquitetural macro é responsabilidade conjunta, sendo a validação de código delegada inteiramente ao linter automático e ao supervisor humano.

---

> [!WARNING]
> **Segurança Zero-Trust:**
> Nenhuma chave de API ou credencial deve ser exposta ou manipulada diretamente por qualquer papel. O uso de secrets deve ser restrito exclusivamente a cofres criptografados gerenciados pelo módulo `15-security`.
