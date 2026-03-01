---
description: 📘 POLÍTICA DE GOVERNANÇA TÉCNICA
---

Padrões Globais de Engenharia de Software

Versão: 1.0
Classificação: Interno – Engenharia
Escopo: Todos os sistemas, serviços, APIs, pipelines e artefatos produzidos pela organização

1. OBJETIVO

Estabelecer diretrizes obrigatórias para:

Arquitetura de sistemas

Desenvolvimento de software

Segurança e compliance

Observabilidade

Qualidade e testes

Gestão de mudanças

Evolução tecnológica

Esta política visa garantir:

Escalabilidade organizacional

Redução de risco técnico

Sustentabilidade de longo prazo

Conformidade regulatória

Excelência operacional

2. PRINCÍPIOS FUNDAMENTAIS
2.1 Domínio como Centro Estratégico

O modelo de domínio é o núcleo do sistema.

O domínio não depende de frameworks, bibliotecas externas ou infraestrutura.

Regras de negócio devem ser explícitas, testáveis e isoladas.

2.2 Regra de Dependência

Dependências devem apontar para camadas mais internas.

Infraestrutura implementa contratos definidos pelo domínio.

Nenhuma camada externa pode impor decisões arquiteturais ao domínio.

2.3 Arquitetura Orientada a Evolução

O sistema deve permitir extensão sem modificação estrutural.

Decisões arquiteturais devem minimizar acoplamento transversal.

Toda abstração deve ter justificativa técnica mensurável.

3. MODELO ARQUITETURAL OBRIGATÓRIO
3.1 Separação de Camadas

O sistema deve respeitar separação explícita entre:

Domínio

Aplicação (orquestração de casos de uso)

Infraestrutura (implementações técnicas)

Interface/Entrega (HTTP, mensageria, UI, CLI, etc.)

3.2 Proibições Arquiteturais

É estritamente proibido:

Lógica de negócio em controllers

Acesso direto a banco fora da camada apropriada

Compartilhamento implícito de estado global

Dependência circular entre módulos

4. PADRÕES DE ENGENHARIA
4.1 Princípios Obrigatórios

Todos os sistemas devem aplicar:

SRP – Responsabilidade Única

OCP – Aberto para extensão

LSP – Substituição comportamental válida

ISP – Interfaces específicas

DIP – Inversão de dependência

4.2 Modularidade

Módulos devem ser coesos e semanticamente definidos.

Comunicação intermodular deve ocorrer exclusivamente por contratos explícitos.

Não é permitido diretórios genéricos sem responsabilidade clara.

5. GOVERNANÇA DE CÓDIGO
5.1 Padrões Obrigatórios

Tipagem estrita habilitada.

Proibido uso de tipos imprecisos (any, object genérico).

Proibido “magic numbers”.

Proibido lógica condicional extensiva baseada em tipo quando polimorfismo é aplicável.

5.2 Revisão de Código

Todo Pull Request deve:

Ter justificativa técnica clara.

Descrever impacto arquitetural.

Ser aprovado por ao menos um engenheiro sênior.

Passar por validação automatizada (CI).

6. SEGURANÇA E COMPLIANCE
6.1 Princípios de Segurança

Todo input externo deve ser validado.

Sanitização é obrigatória nas fronteiras do sistema.

Aplicação do princípio do menor privilégio.

Secrets nunca devem ser versionados.

Logs não devem conter dados sensíveis.

6.2 Gestão de Vulnerabilidades

Dependências devem ser auditadas regularmente.

Atualizações críticas de segurança são mandatórias.

CVEs críticos exigem correção prioritária.

7. QUALIDADE E TESTES
7.1 Estratégia de Testes

Ordem de prioridade:

Testes de domínio

Testes de casos de uso

Testes de integração

Testes end-to-end

7.2 Requisitos

Testes devem ser determinísticos.

Proibido dependência de ordem de execução.

Mocks apenas quando necessário.

Cobertura mínima recomendada: 80%, sem substituir análise qualitativa.

8. OBSERVABILIDADE E CONFIABILIDADE
8.1 Logs

Logs estruturados.

Correlação por request-id.

Classificação por nível (DEBUG, INFO, WARN, ERROR).

8.2 Métricas Obrigatórias

Latência

Taxa de erro

Throughput

Uso de recursos

8.3 Resiliência

Estratégias de retry devem ser controladas.

Circuit breaker quando aplicável.

Timeouts explícitos obrigatórios.

9. PERFORMANCE E ESCALABILIDADE

Não realizar otimização prematura.

Toda otimização deve ser baseada em métrica.

Complexidade algorítmica deve ser analisada.

Evitar N+1 queries.

Avaliar impacto de IO e serialização.

10. GESTÃO DE DEPENDÊNCIAS

Toda nova dependência deve ser justificada tecnicamente.

Avaliar:

Maturidade

Comunidade

Segurança

Sustentabilidade

Proibido adicionar dependências para resolver problemas triviais.

11. CONTROLE DE MUDANÇAS
11.1 Versionamento

Versionamento semântico obrigatório.

Breaking changes devem ser documentadas.

APIs públicas devem manter compatibilidade retroativa quando possível.

11.2 Gestão de Branches

main → Produção

develop → Integração

feature/*

hotfix/*

Commits devem ser atômicos e semanticamente claros.

12. DOCUMENTAÇÃO TÉCNICA

Obrigatório documentar:

Decisões arquiteturais (ADR)

Modelos de domínio

Contratos públicos

Fluxos críticos

Documentação deve evoluir junto com o código.

13. RISCO TÉCNICO E DÍVIDA TÉCNICA

Dívida técnica deve ser rastreada.

Não é permitido acúmulo silencioso de débito estrutural.

Refatorações estruturais devem ser planejadas.

Código legado deve ter plano de modernização.

14. CONFORMIDADE

Esta política é mandatória para todos os times de engenharia.

Exceções:

Devem ser formalmente justificadas.

Devem conter análise de risco.

Devem ser aprovadas por liderança técnica.

15. RESPONSABILIDADE

Arquitetos: Garantir aderência estrutural.

Engenheiros Sênior: Garantir qualidade técnica.

Engenharia: Cumprir integralmente as diretrizes.

Liderança Técnica: Manter atualização desta política.