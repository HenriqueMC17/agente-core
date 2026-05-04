# Performance Guidelines

## 📌 Visão Geral

Adotamos o princípio nativo de **Performance by Default**. Interfaces trancadas, vazamentos de memória e infraestrutura lenta são inaceitáveis.

---

## 🚀 1. Padrões de Métrica Essenciais

- **Medir antes de otimizar:** Não confie inteiramente na adivinhação teórica. Ao pressentir ou detectar lentidão, isole profilagens e traces de telemetria baseados em instrumentações antes de refatorar de cabo a rabo.
- **Target Metrics (2025 Standards):**
  - Arquiteturas Web Frontend obrigatoriamente se pautam em torno dos pilares Core Web Vitals (Largest Contentful Paint - LCP optimizado; Cumulative Layout Shift - CLS próximo a 0; Interaction to Next Paint - INP reativo).
  - O backend e camadas de API em carga não devem tolerar lentidão bloqueadora global das _event-loops_ ou latências frias incontroladas.

---

## 📦 2. Carga e Concorrência

- **E/S (I/O) Não Bloqueante:** Funções pesadas, I/O bound e requisições de rede NUNCA devem travar interfaces lógicas dos servidores (`await` em fluxos paralelos ao invés de em sequência - _Promise.all()_ e abordagens análogas).
- **Tamanho do Bundle (Frontend e Mobile JS):** Dependências gordas não devem ir para os artefatos de build. Promova tree-shaking ativo, code-splitting agressivo baseado em chunking assíncrono das rotas principais, e analise o output de build (ex: via `bundle_analyzer.py`) prevenindo inclusão de código inutilizado na pipeline.
- **Lazy Loading Exigentemente:** Mídias com alto bit-rate, bibliotecas gráficas secundárias (como scripts de Analytics densos) e imagens complexas sofrem delegação estrita de _Lazy Load_.

---

## 📊 3. Resiliência a Big Data no Transporte (Querying)

- Nunca traga toda e qualquer informação se há meios de filtrá-las antes da borda local. Uso obrigatório de Paginações, Seleções ecléticas com GraphQL ou DB Selects limitados.
- O processamento e contagem primária de estatística massiva pertencem à otimização da base de dados, não convertendo matrizes iterativas longas sobre memória RAM da camada web servidora para contar listas.
