# Security Standards

## 📌 Visão Geral

Regulamenta o conceito inegociável de **Safe by Design**. A engenharia de segurança de vulnerabilidades jamais deve ser uma validação pós-desenvolvimento; ela é aplicada já em conjunto estrutural da codificação de soluções e infraestrutura.

---

## 🛡️ 1. Proteção Universal e Validações

- **Trust No Input (Zero Trust Base):**
  - Qualquer dado externo ou oriundo de API, URL Params, Body ou Client-side **DEVE** ser sanitizado, parseado e estritamente validado por Schemas tipados (como Zod, Joi, Pydantic) antes de entrar nas camadas internas do sistema.
  - Jamais injete diretamente raw SQL na engine. Uso mandatário de Queries parametrizadas ou Object-Relational/Query Builders puros para prevenção absoluta de SQL Injection.
- **Mitigação de Cross-Site:** Sanitização unânime de Output visual contra ataques XSS.
- **Privilégios Mínimos Admissíveis:** Acessos à rede, DB Accounts e IAMs de nuvem devem usar credenciais isoladas com read/write permitidos restritos à tarefa executada.

---

## 🔐 2. Governança de Credenciais e Segredos (Secrets)

- **Hard-code Zero:** NUNCA submeta para repositórios (commits Git) tokens de APIs, Chaves Assíncronas Privadas (JWT Secrets, PKIs), IDs de clientes críticos e Senhas de Database. (Violation Trigger 🔴 imediato na camada de Agentes).
- Toda configuração sensitiva deverá ser requisitada perante arquivos `.env` ignorados no manifesto, Cofres de Segredos ou via Injetores de Pipeline em plataformas CI/CD.
- **Auditoria Contínua (Pre-Deploy):** Projetos finalizados passarão ativamente pelos scripts de vulnerabilidade designados (como `security_scan.py` e `dependency_analyzer.py`), devendo quebrar o build imediatamente mediante anomalias não resolvidas.

---

## 🪟 3. Deploy de 5 Fases Mínimas (Infra/Safety)

Para arquiteturas em lançamento de ciclo-vivo, respeitar rigorosamente as etapas mandatórias:

1.  **Analítico Local** (`lint_runner.py` e Types checks sem bypass).
2.  **Schema Match** (`schema_validator.py` assegurando persistência no DB).
3.  **Segurança e Dependências** (Rastreio de `npm audit` ou similar para prevenir poisoning de módulos).
4.  **Integração Automatizada** (`test_runner.py` sem regressão de cobertura do pipeline mestre).
5.  **Revisão Final & Deploy.**

---

## 🛑 4. Políticas de Skills (Ofensivas e Defensivas)

**Ofensivas (The "Red Line"):**
Skills projetadas para exploits, pentest ou simulação de ataques devem possuir obrigatoriamente um _Disclaimer_ alertando o agente para **sempre pedir confirmação prévia** do usuário antes de rodar qualquer gatilho. O uso autônomo é vetado.

**Defensivas:**
Ferramentas de hardening, auditoria e monitoramento não devem realizar upload de dados sensíveis para servidores de terceiros sem aviso e devem ser _read-only_ por padrão.
