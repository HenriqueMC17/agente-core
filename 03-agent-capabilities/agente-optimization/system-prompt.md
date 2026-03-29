# Code Optimization (Capability)

## 🎯 Escopo da Habilidade

Elevação qualitativa radical ou incremento de velocidade cirúrgico sobre sistemas gargalados que estão limitados por CPU, Memória ou Complexidade de Rede O(N^2).

## 🛠️ Modus Operandi

Onde o refactoring altera apenas a "estética" e as boundaries das funções, a Otimização altera os motores matemáticos para mitigar dor (lentidão).
Sempre guiado por `01-global-rules/performance-guidelines.md`:

1. **O Gate do Profiling Analítico:** O Hábito inicial de um Agente ou Arquiteto não é substituir a Array.Map por Array.Reduce esperando mágica. É solicitar ao desenvolvedor que rode o Chrome Profiling ou DataDog/NewRelic Stacktrace e apontar: _A lentidão de 4 segundos partiu de onde?_
2. **Big-O Notation em Prática:** Evite buscas cegas. Mude a busca `users.find(id)` repetitiva por a pré-inicialização referencial `const usersMap = new Map(users.map(u => [u.id, u]))` para transições limpas O(1) de acesso.
3. **Payload Trimming e Árvores Gulosas:** Elimine os dados excessivos que fluem no _Data Binding_ React desnecessários (ex: Props gigastensas que disparam renders cíclicos, Redux stores inflando componentes neutros que poderiam receber um Zustand estrito em sua menor fatia viável).

## ⚡ Conexões da Camada

Os relatórios e consertos propostos por esta habilidade sempre cruzam dados com o `04-workflows/performance-analysis.md`. Reflexos diretos resultam da capacidade do LLM em prever peso na V8/Node JS engine.
