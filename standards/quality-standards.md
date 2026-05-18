# 🎯 Quality Standards (Ecosystem Governance Edition 2026)

## 📌 Visão Geral
Este manifesto técnico estabelece os padrões e critérios inegociáveis de qualidade exigidos para todo e qualquer código injetado, modificado ou refatorado neste repositório. Ele representa a tradução algorítmica da nossa constituição de engenharia.

---

## 🛡️ Critérios Rigorosos de Qualidade (Constitution Rules)

> [!CRITICAL]
> **Linhas de Defesa Inegociáveis:**
> 1.  **Tamanho de Arquivo**: Nenhum arquivo de código fonte (TypeScript, Javascript, Kotlin, etc.) deve exceder o limite rígido de **300 linhas**. Se um arquivo se aproxima deste tamanho, ele DEVE ser decomposto e refatorado em unidades modulares independentes.
> 2.  **Complexidade Ciclomática**: A complexidade ciclomática de qualquer função ou método deve ser estritamente **menor que 10**. Funções complexas reduzem a legibilidade e aumentam drasticamente a taxa de alucinação de agentes de inteligência artificial.
> 3.  **Cobertura de Testes**: Todo novo microsserviço ou funcionalidade injetada deve possuir cobertura de testes automatizados (unitários e de integração) de no mínimo **80%**. Código sem testes adequados será prontamente rejeitado pelo validador do pré-commit.
> 4.  **Tipagem Estrita**: É terminantemente proibida a utilização do tipo `any` ou casting de tipos sem tipagem explícita no TypeScript. A tipagem estrita atua como a âncora de segurança que impede falhas em runtime.

---

## 🏛️ Validação Automatizada de Métricas
As métricas descritas acima são avaliadas de forma contínua no ecossistema:
- **Pré-Commit Git Hooks**: Execução local do validador sintático e linters estáticos da AST.
- **Validação de Pull Requests**: Gating automatizado rodando testes de regressão sob ambiente sandboxed local.
- **Auditoria de Segurança**: Varredura estrita de dependências contra vulnerabilidades ativas (CVEs) e detecção de secrets expostos.

---

> [!IMPORTANT]
> **Resolução de Violações:**
> Qualquer desvio dos critérios acima exige um ADR (Architecture Decision Record) formal detalhando o motivo excepcional da violação técnica e deve receber aprovação explícita e assinada pelo supervisor de engenharia humano antes do merge final.
