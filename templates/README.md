# 📑 [TEMPLATES] — Esqueletos de Código, Modelos Estruturados & Blueprints

## 📌 1. Visão Geral
O diretório `/templates` centraliza os modelos estruturais, esqueletos e *blueprints* do ecossistema `agente-core`. Ele serve como o gabarito formal de escrita de arquivos do repositório.

## 🎯 2. Objetivo da Pasta
Acelerar a criação de novos arquivos e componentes, garantindo consistência estrutural absoluta através de esqueletos pré-configurados para decisões arquiteturais (ADRs), competências agênticas (Skills) e relatórios de auditoria.

## 🧠 3. Contexto Operacional
Sempre que um desenvolvedor ou agente cognitivo autônomo precisar iniciar a redação de um novo artefato ou módulo, ele copia o template correspondente deste diretório para preencher as seções obrigatórias de forma rápida e segura.

## 🏗️ 4. Arquitetura da Estrutura
O diretório armazena os seguintes gabaritos estruturais:
*   `templates-readme.md` — Painel centralizador de modelos e blueprints.
*   `skill-template.md` — Esqueleto markdown formal contendo as seções obrigatórias para especificação de novas competências agênticas.
*   `adr-template.md` — Modelo estruturado para Registros de Decisão Arquitetural (ADRs).
*   `audit-template.md` — Gabarito padronizado para consolidação de logs e relatórios de conformidade técnica e ética.

## 🛡️ 5. Responsabilidades
*   **Padronização Estrutural:** Garantir que todos os arquivos do mesmo tipo contenham idênticas seções e chaves lógicas de legibilidade.
*   **Aceleração de Bootstrap:** Eliminar o atrito inicial de escrita manual de estruturas complexas de documentos.
*   **AI-First Design:** Prover gabaritos otimizados com delimitadores claros e tags XML para processamento rápido por IAs parceiras.

## 🔄 6. Fluxos Relacionados
*   **Geração de Skills em Sleep Cycles:** O gerador de competências agênticas utiliza obrigatoriamente `skill-template.md` para formatar suas novas habilidades compiladas no final de cada sessão.

## ⚙️ 7. Integrações
*   **IDE Code Snippets:** Integração simples para conversão dos gabaritos deste diretório em atalhos rápidos de digitação em editores corporativos.

## 📦 8. Dependências
*   **`standards/`**: Os esqueletos devem refletir e impor os padrões tipográficos, semânticos e de engenharia detalhados nos manuais de standards.

## 🎨 9. Padrões Utilizados
*   **Boilerplate Optimization:** Esqueletos limpos, com comentários claros no formato `<SEÇÃO_A_PREENCHER>` ou equivalentes XML para facilitar o preenchimento por humanos e robôs.

## 📜 10. Convenções
*   Nenhum novo esqueleto deve ser introduzido sem a aprovação preliminar do comitê de arquitetura de governança técnica.
*   Esqueletos modificados devem manter compatibilidade retroativa com os artefatos já gerados anteriormente no repositório.

## 🔗 11. Relação com Outras Áreas
*   [**`/modules`**](file:///c:/Dev/agente-core/modules) — Consome `skill-template.md` para catalogar suas habilidades dinâmicas.
*   [**`/technical-decisions`**](file:///c:/Dev/agente-core/technical-decisions) — Consome `adr-template.md` para documentar suas escolhas e trade-offs.

## 🛠️ 12. Exemplos de Uso
Um desenvolvedor Staff, prestes a submeter um novo registro de decisão sobre a troca do motor de barramento MCP, copia a estrutura de `adr-template.md` para um novo arquivo na pasta de decisões técnicas, poupando tempo de formatação manual.

## 💡 13. Boas Práticas
*   Mantenha os esqueletos desprovidos de lógica de negócios estática desnecessária, focando puramente nas chaves estruturais e descrições semânticas.
*   Sempre forneça uma seção explicativa inicial dentro do próprio template detalhando os pré-requisitos para o preenchimento de cada bloco de dados.

## 🚨 14. Troubleshooting
*   *Problema: O assistente autônomo gerou um relatório que falhou no parser de relatórios da esteira.*
    *   *Solução:* Valide se o esqueleto utilizado em `audit-template.md` sofreu modificações conceituais que corromperam os delimitadores esperados no parser e reverta o arquivo para a versão estável anterior.

## 🚀 15. Roadmap Evolutivo
*   **Q3 2026:** Geração automática e dinâmica de esqueletos com base na análise semântica das novas stacks tecnológicas introduzidas no repositório.
*   **Q4 2026:** Parser de templates ultra-veloz baseado em WebAssembly integrado nativamente ao ambiente local de sandboxing corporativo.
