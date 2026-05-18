# DevOps Practices & Architecture

## 📌 Contexto

Cultura e catálogo estrito das rotinas de fluxo do código entre a branch Master/Main e o servidor de clientes em produção sem estresse (Boring Deployments).

---

## 🏗️ 1. Infra as Code (IaC) e Imutabilidade

- Servidores não são "Pet/Bichinhos de Estimação" onde entra-se no SSH para instalar versão do Node via apt-get e rezar. Eles são "Cattle/Gado" (Descartáveis).
- Todo ambiente vivo (Node.js/Next) DEVE girar dentro de uma imagem imutável descrita via `Dockerfile` leve (`alpine`/`distroless`) ou Serverless Function. Alterações não acontecem na máquina viva; faz-se nova imagem -> derruba máquina velha -> levanta nova.
- Definições da Nuvem em AWS CloudFormation, Pulumi ou Terraform.

## 📊 2. "Shift-Left" na Pipeline CI/CD (GitHub Actions / GitLab)

- A verificação de desastres (`01-global-rules`) acontece no PR, antes de mesclar o topo.
- O Node Builder roda ali (na VM do Github), valida as bibliotecas `npm audit`, levanta a pipeline de Code Coverage (Jest) antes do aval final do Agente/Human.
- **Fail Fast Pipeline:** Se o _Linter_ (`ESLint`) explodir no Passo 1, o passo 2 (_Tests_) nem roda. Paralelizar Testes longos E2E e unitários para dropar o tempo médio de pipeline.

## 👁️ 3. Observabilidade Universal

- O código que gera receita não opera no escuro. Adote o The Three Pillars:
  - **Logs:** Pino/Winston formatados no JSON Standard. PIIs limpos. Sem stacktraces crus de erro vazando chaves nas respostas HTTP (exponha um Guid/UUID referenciando a AWS CloudWatch logs do cliente).
  - **Metrics & Telemetry:** Promethues/Grafana extraindo CPU Loads e Memory Heaps, Vitals via Datadog.
  - **Tracing (OpenTelemetry):** Segue o RequestID do Header desde quando o usuário clicou no Next.js (borda) até quando o Gateway de Pagamento respondeu à chamada RPC na API. Fundamental em arquitetura distribuída.
