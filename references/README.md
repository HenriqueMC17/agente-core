# 📖 [REFERENCES] — Referências de Negócio, Documentos Legais & Histórico de Projetos

## 📌 1. Visão Geral
O diretório `/references` centraliza as referências de negócios, relatórios de auditorias passadas, manuais de produtos parceiros e bases de conhecimento legadas do ecossistema `agente-core`. Ele é o baú de tesouros informativos do projeto.

## 🎯 2. Objetivo da Pasta
Preservar o histórico e o contexto de negócio que motivou o desenvolvimento do projeto original, armazenando documentos originais e diretrizes de governança externas.

## 🧠 3. Contexto Operacional
Sempre que engenheiros Staff, gerentes de produto humanos ou assistentes autônomos cognitivos precisarem justificar decisões de arquitetura de negócio ou revisar especificações e escopos de projetos passados, recorrem aos arquivos deste diretório.

## 🏗️ 4. Arquitetura da Estrutura
O diretório armazena materiais de referência e documentos em formatos diversos:
*   `references-readme.md` — Índice consolidado e catálogo de documentos de referência histórica.
*   `references-architecture.md` — Descrição histórica da planta e design de negócio que inspirou o core atual.
*   `audit-results-original.docx` — Arquivo contendo a auditoria inicial corporativa bruta que mapeou os primeiros desvios lógicos.
*   `docs-antigos/` — Diretório contendo bases documentais legadas.

## 🛡️ 5. Responsabilidades
*   **Preservação Histórica:** Garantir que o contexto original de negócio do projeto permaneça acessível a qualquer geração de desenvolvedores.
*   **Suporte a RAGs:** Prover insumos informativos adicionais de alta qualidade para enriquecer a base de conhecimento de IAs de desenvolvimento local.
*   **Transparência Institucional:** Armazenar contratos e relatórios originais de consultorias de auditoria de conformidade.

## 🔄 6. Fluxos Relacionados
*   **Auditorias Periódicas:** Relatórios brutos resultantes de inspeções de terceiros são arquivados nesta pasta após a conclusão do ciclo de análise.

## ⚙️ 7. Integrações
*   **Document Parsers (Python docx reader):** Integração com scripts de processamento automático de texto para converter arquivos de formatos proprietários (ex: docx) em markdown legível por IAs.

## 📦 8. Dependências
*   **`audits/`**: Conexão lógica imediata com a pasta de auditorias ativas do repositório, que consome as referências descritas neste diretório para fins comparativos.

## 🎨 9. Padrões Utilizados
*   **Historical Archive Design:** Organização arquivística clara, com divisões estritas entre documentos ativos de referência e subpastas de documentos antigos deprecados.

## 📜 10. Convenções
*   Arquivos em formatos binários proprietários (como `.docx` ou `.pdf`) devem vir acompanhados, quando possível, de seus sumários textuais markdown equivalentes para facilitar a leitura imediata em sandboxes agênticos.
*   Documentos contendo dados corporativos confidenciais ou segredos industriais devem seguir as políticas de proteção descritas no regulamento ético de governança.

## 🔗 11. Relação com Outras Áreas
*   [**`/audits`**](file:///c:/Dev/agente-core/audits) — Consome o histórico e os relatórios originais deste diretório em auditorias recorrentes do ecossistema.
*   [**`/governance`**](file:///c:/Dev/agente-core/governance) — Baliza as premissas de ética corporativa que justificam as escolhas arquivadas aqui.

## 🛠️ 12. Exemplos de Uso
Um desenvolvedor Staff, encarregado de comprovar que certa vulnerabilidade identificada anteriormente foi tratada, abre os relatórios em `audit-results-original.docx` utilizando o script local de parser de texto para extrair a métrica antiga.

## 💡 13. Boas Práticas
*   Mantenha subpastas de arquivos legados devidamente demarcadas com o prefixo `legacy` ou `antigo` para evitar confusões operacionais.
*   Forneça links markdown locais absolutos a partir de outros arquivos de governança apontando para os documentos deste diretório como comprovação de conformidade.

## 🚨 14. Troubleshooting
*   *Problema: O script de leitura de DOCX falha ao ler o arquivo audit-results-original.docx por problemas de decodificação.*
    *   *Solução:* Valide se você possui a biblioteca python-docx devidamente instalada em sandbox local ou utilize o arquivo txt de sumário pré-gerado correspondente.

## 🚀 15. Roadmap Evolutivo
*   **Q3 2026:** Conversão automática e indexação vetorial instantânea (RAG pipeline) de todos os materiais binários de referência depositados no diretório.
*   **Q4 2026:** Integração com blockchain privada corporativa para assegurar a imutabilidade absoluta de relatórios de auditoria antigos depositados.
