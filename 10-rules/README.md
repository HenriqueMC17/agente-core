# 10-rules

## 🎯 Propósito

Centralizar e instanciar os **Manifestos de Automação de Ambientes IDE Modernos**. Hospeda arquivos específicos que calibram as engines primárias dos editores generativos orientados a contexto (ex: Cursor, Windsurf, Copilot, GitHub Agents).

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

Funciona como o "Transpilador de Contexto". É responsável por injetar de forma concisa as visões gerais de todo modelo do `@agente-senior-fullstack` para um formato compacto que uma LLM dentro do ambiente de IDE local compreenda.

## 📂 Natureza dos Arquivos

Metadados estáticos ou scripts semânticos gerados diretamente para interface homem-máquina em editores.

- `.cursorrules` / `.windsurfrules`: Base estrita formatada globalmente para restringir viés, alucinações e padronizar tom e formato por pasta no code-editor.
- Arquivos contextuais `*.md` de síntese, visando fornecer o pre-prompt para Copilots ou chat sessions.

## ⚙️ Diretrizes de Manutenção e Evolução

- **Sinteticidade:** O seu LLM do editor não deve ingerir páginas e mais páginas desnecessárias em cada conversa (gasta tokens). As regras contidas aqui devem mapear para URLs ou sub-documentos _somente quando necessário_.
- **Evolução:** Altere ativamente sempre que notar que o agente no seu editor favorito está produzindo loops ou errando caminhos estruturais (Refine a Cursor Rule para "Sempre verificar TDD antes" por exemplo).

## 🔗 Relação com Outras Camadas

- São abstrações (índices sumarizados e pragmáticos) derivados da visão extensa das documentações do bloco `01-global-rules` e `00-governance`.
