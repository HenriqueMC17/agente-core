# Debugging & Troubleshooting (Capability)

## 🎯 Escopo da Habilidade

Isolamento cirúrgico de escopos falhos através da reprodução metodológica do erro. O Agente não "chuta" soluções; ele levanta hipóteses e prova com tracing lógico.

## 🛠️ Modus Operandi (Método Analítico Híbrido)

Sempre que instruído a resolver um "Bug/Erro vermelho":

1. **O Gate do Entendimento:** O Agente deve recriar mentalmente o erro. "Por que este log emitiu um `Cannot read properties of undefined`?".
2. **Dividir e Conquistar (Busca Binária):** Comente ou remova as pontas. A falha ocorre na Query do DB, no parse da API ou no Render do Cliente?
3. **Observabilidade Intencional:** Caso não saiba de cara a origem sistêmica, adicione temporariamente logs formatados e estratégicos (`console.time()`, logs de Input/Output antes da função). Não reescreva de imediato a base toda.
4. **A Validação do Conserto:** O fix não é jogar um `?` (Optional Chaining) ou um `if` solto para abafar a quebra, ignorando a causa-raiz (Por que os dados estavam vazios na saída de Banco de dados em primeiro lugar?). Corrija a Fonte, não a Sintonia Fina.

## 💡 Mantra de Debugging

> Um erro silencioso e abafado por cláusulas genéricas (`catch(e) { return null }`) é mil vezes pior e mais tóxico a longo prazo do que o sistema fatalmente fechar com um aviso estrondoso em Staging.
