# Code Review & PR Checklist (Template)

## 📌 Objetivo do PR

> [Uma frase explicando qual problema primário de negócio ou tecnologia essa PR resolve. Responda: O que isso tenta resolver/construir?]

**Issue Associada:** `#ID_ou_Link`

---

## 🧐 1. Auditoria Funcional (Self-Review)

- [ ] O código implementa exatamente a lógica requerida (sem over-engineering)?
- [ ] A build local, o HMR e os Unit Tests estão passando nativamente (verde)?
- [ ] O comportamento novo cobre o _Happy Path_ e as Edge Cases mais comuns identificadas no design?
- [ ] Adicionados testes automatizados que cobrem esse novo pedaço crítico de domínio funcional?

---

## 🛡️ 2. Padrões de Qualidade Global (`01-global-rules`)

- [ ] **Lint & Padrões:** Não constam warnings, variáveis tipadas como "any", funções gigantescas de multi-ação ou console.logs perdidos?
- [ ] **Segurança (Safe by Design):** Dados de usuários têm parsing no limite, Secrets continuam protegidos fora de string-literal local e nenhuma query vaza injeção SQL?
- [ ] **Padrão AAA (Testes):** A bateria de testes manteve _Arrange, Act, Assert_ com nomenclaturas verbais explícitas?
- [ ] **Commits:** Mensagens aderem à tipologia do Conventional Commits sem misturar conserto com adição em um só pacote indecifrável? (Ex: `feat(ui)`, `fix(cache)`).

---

## ⚡ 3. Auditoria de Alta Performance e Arquitetura

- [ ] A UI conta com lazy-loading e bundle enxuto com chunk split caso traga novas libs pesadas?
- [ ] O backend resolve queries em lotes lógicos (`N+1` mitigado) e processa I/O longo assincronamente?
- [ ] Nomenclatura das novas abstrações respeita a camada mental legível (Não usa variável "data1", "funcX", etc)?

---

## 📸 4. Evidências

_[De preferência e obrigatoriedade, se UI, adicione uma Screenshot/Vídeo MP4 atestando responsividade e sucesso.]_

**Antes:** _(Se for Refactor ou Bugfix)_

**Depois:** _(Demonstração clara da features em tela/terminal)_
