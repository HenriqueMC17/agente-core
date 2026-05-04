# 08-templates

## 🎯 Propósito

Servir como o **Repositório Central de Estruturas Reutilizáveis**. Consolida e automatiza a geração de novos artefatos, reduzindo a variância (humana e da IA) garantindo obediência absoluta aos padrões arquiteturais pré-determinados.

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

Camada de Produtividade Base (Tier Factory). Ao instanciar processos de design ou documentação, elimina a necessidade de "adivinhar" o que a empresa exige.

## 📂 Natureza dos Arquivos

Artefatos "Fill in the Blanks" com cabeçalhos consistentes.

- `architecture-template.md`: Base para relatórios e Architecture Decision Records (ADRs).
- `project-structure-template.md`: Pastas padrões geradas ao dar scaffold em novos workspaces.
- `code-review-template.md`: O checklist final para avaliação contínua em PRs.
- `documentation-template.md`: Readme ou Swagger Docs baseline para projetos expostos/APIs.
- `Code_Snippets/`: Abstrações consolidadas prontas para copy/paste ou invocação nativa.

## ⚙️ Diretrizes de Manutenção e Evolução

- **Uso:** Todo processo ou desenvolvedor que inicie um artefato de alto-nível deve necessariamente clonar os modelos hospedados aqui, ou então reprová-lo de pronto na pipeline. Evita-se alucinação contendo formato avulso.
- **Evolução:** Ao sentir atrito frequente ou repetição mental em relatar bugs gerenciais ou modelagens CRUD repetitivas, extraia a interface constante e congele-a neste diretório.

## 🔗 Relação com Outras Camadas

- É o "output literal" provindo em sua grande maioria das restrições conceituais dos `04-workflows`.
- Interação total com os recursos englobados pelo `05-knowledge-base`.
