# Governança de Pull Requests Gerados por IA

## 📌 Visão Geral

Este documento estabelece as normas técnicas, filosóficas e operacionais obrigatórias para a submissão, revisão e aprovação de código gerado ou assistido por inteligência artificial no ecossistema do `agente-core`.

---

## 🛡️ 1. O Imperativo Estratégico: Mitigando o "Acceleration Whiplash"

A governança de inteligência artificial não é um processo burocrático de conformidade, mas sim uma blindagem operacional indispensável contra o **Acceleration Whiplash** (Efeito Chicote da Aceleração).

> [!WARNING]
> **Acceleration Whiplash:** Dados consolidados do setor apontam que a alta adoção de ferramentas de IA sem processos estritos de governança correlaciona-se diretamente com o declínio da qualidade do código de produção e com um aumento exponencial de incidentes em runtime. O ganho de velocidade inicial (vazão de código) é rapidamente anulado pelo retrabalho e por débitos técnicos complexos.

O papel deste documento é garantir que a produtividade acelerada da IA seja sustentada por portões de qualidade rigorosos, transformando a automação agêntica em um ativo estratégico estável.

---

## 🌿 2. O Antipadrão de Delegação de Revisão e Prevenção de Burnout

> [!CAUTION]
> **É terminantemente proibida a submissão de Pull Requests (PRs) contendo código gerado por IA que não tenha sido revisado linha por linha pelo próprio autor.**
> 
> Delegar a revisão de blocos densos de código gerado por IA para outros engenheiros humanos sem verificação prévia do autor é considerado um desperdício grave do tempo cognitivo da equipe. O autor do PR deve atuar como o supervisor técnico imediato da IA. 
> 
> A revisão manual prévia diminui drasticamente a carga cognitiva de quem revisa, eliminando o desgaste operacional e prevenindo o burnout da equipe de engenharia.

---

## 📦 3. Diretrizes de Comunicação e Commits Atômicos

Para garantir a legibilidade do histórico do repositório Git, toda alteração assistida por IA deve seguir um fluxo rigoroso de commits atômicos:

- **Atomicidade de Commit:** Cada commit deve representar uma única alteração lógica delimitada (ex: adicionar um índice, criar um hook de dados, corrigir uma tipagem). Commits gigantes do tipo *"refactoring entire application"* são proibidos.
- **Convenção de Commit Semântico:** commits devem ser nomeados utilizando formatos claros e padronizados:
  - `feat(componente):` para novas funcionalidades.
  - `fix(componente):` para correções de bugs.
  - `docs(componente):` para alterações de documentação.
  - `refactor(componente):` para refatorações que não alteram comportamento externo.
- **Tamanho Limite do PR:** Recomenda-se que PRs gerados por IA não ultrapassem **300 linhas de código alteradas**, facilitando a revisão minuciosa.

---

## 📊 4. Evidências de Validação Manual e Logs de Execução

O desenvolvedor (ou agente) deve obrigatoriamente anexar na descrição do Pull Request as provas de validação física da alteração efetuada:

- **Logs de Compilação Local:** Copie e cole trechos da saída do terminal provando que o código compila perfeitamente sem avisos (*warnings*) críticos ou erros.
- **Métricas de Testes Unitários:** Anexe os relatórios de execução dos testes com a taxa de aprovação (que deve ser de **100%**) e cobertura de código.
  - Exemplo de bloco no PR:
    ```
    [TEST RUN STATUS] Passed: 24, Failed: 0, Duration: 1.2s
    [COVERAGE STATUS] Stmts: 94.2%, Branch: 88.5%
    ```
- **Provas Visuais para UI:** Para qualquer alteração que modifique layouts visuais, é obrigatório o anexo de screenshots ou gravações em formato GIF/MP4 demonstrando a interatividade e a ausência de Cumulative Layout Shift (CLS).

---

## 🚨 5. Governança de Deploy e Restrições de Merge

- **Proibição de Merge Autônomo por Agente:**
  - Os agentes inteligentes possuem permissões para ler e escrever arquivos, rodar testes locais e criar Pull Requests. 
  - No entanto, **nenhum agente de IA está autorizado a mesclar (merge) um PR na branch principal (`main` / `master`) de forma autônoma**. O merge requer obrigatoriamente a revisão ativa, aprovação formal e acionamento manual de um engenheiro humano.
