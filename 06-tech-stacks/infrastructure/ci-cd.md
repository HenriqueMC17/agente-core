# Continuous Integration e Continuous Deployment (CI/CD)

## 📌 Contexto

O Coração das Workflows mecânicas da nuvem. Garante a integridade da entrega das regras base estabelecidas nos domínios do projeto no exato momento que um membro puxa a aba do `git push`. A verificação do pipeline não exige suor orgânico nem confia que o time humano lembrou de tudo à risca.

---

## 🚦 1. Pipeline Estrutural Analítico (Build e Segurança)

O Gatilho acorda todo push para a Main e PRs. Executa as instâncias paralelepipadas no Cloud Builder (Github Actions / GitLab Runners):

- **O Guarda Estático:** Varreduras em paralelo checam se variáveis expuseram nos códigos, disparam os Lint Ciclomáticos estritos (`lint_runner.py`), O Dependency Tree Tracker checa a árvore travando os builds se dependências com Severity-High da CVE Lists existem na branch atual do software.
- O Código deve compilar com `.TS Build` ou Node Transpile/Build puro de Java com sucesso `0` warnings se assim balizado em config sem Types `any` falsos que gerariam null pointer na Web e API.

## 🧪 2. A Fase Testável Onerosa e Deployment Sem Dor

- Inicia o contêiner virtual espelho, a Injeção Fake do Mock Database local do PostGres de teste preenche um seed minúsculo com Docker-compose do GitHub, migra o `Prisma / Hibernate` e lança as suites piramidais com relatórios gerando o Badge visual `100% Tests Pass`.
- Se sucesso for `TRUE`: Muta e versiona a Flag para Docker Registry (`build_23`), faz Swap do Contêiner e envia Webhooks sinalizando pro Chatops (Slack/Teams) à Squad Sênior. Tudo via YAML puramente declarativo das Infraestructure Pipelines para automação mecânica absoluta e segura das Clouds (`04-workflows/release-process.md`).
