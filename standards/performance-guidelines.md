# Performance Guidelines

## 📌 Visão Geral

Adotamos o princípio nativo de **Performance by Default**. Interfaces travadas, latências de inferência altas, vazamentos de memória e uso ineficiente de CPU/GPU são considerados falhas graves de engenharia.

---

## ⚙️ 1. Localidade de Memória e Eficiência de CPU

Para workloads de alta performance e processamento de sistemas (especialmente no ecossistema C/C++, Rust e Zig), a estrutura física dos dados deve respeitar a arquitetura do hardware moderno:

- **Cache Locality (L1/L2/L3 Cache):**
  - O hardware moderno é ordens de magnitude mais rápido que a memória RAM. Para evitar falhas de cache (*cache misses*), os dados devem ser organizados sequencialmente na memória sempre que possível.
  - **Arrays lineares (Contíguos):** Devem ser a escolha primária em vez de estruturas encadeadas baseadas em ponteiros (como árvores complexas ou listas ligadas), que forçam a CPU a realizar buscas de endereço dispersas na memória (*pointer chasing*).
- **Alinhamento de Memória:**
  - Garanta que variáveis e estruturas estejam alinhadas com os limites de palavra da CPU (ex: 64-bit/8-byte). Dados não alinhados forçam a CPU a realizar múltiplos ciclos de leitura para acessar um único dado.

---

## 🤖 2. Desagregação de Serving de LLM (Prefill vs. Decode)

Ao arquitetar ou interagir com infraestruturas de computação cognitiva baseadas em Modelos de Linguagem, a infraestrutura deve ser otimizada para as duas fases distintas de inferência:

- **Fase de Prefill (Computação-Intensa):**
  - O processamento inicial do prompt (onde toda a entrada de contexto é lida em paralelo).
  - Exige alto paralelismo computacional da GPU (intensa em FLOPs). Recomenda-se direcionar para nós de computação com alto poder de processamento bruto de matrizes.
- **Fase de Decode (Largura de Banda-Intensa):**
  - A geração sequencial de tokens (um por um, onde o token anterior serve de entrada para o próximo).
  - É severamente limitada pela largura de banda de memória da GPU (*Memory Bandwidth Bound*).
- **Estratégia de Desagregação:**
  - Para sistemas em escala, utilize pipelines que separam fisicamente os clusters de servidores de **Prefill** dos servidores de **Decode** (ex: *vLLM Disaggregated Serving*). Isso evita que requisições longas de prefill monopolizem e causem atraso (*queue lag*) na geração de tokens de outras consultas ativas.

---

## 🎨 3. Otimização de Renderização Gráfica: G-Buffer vs. Visibility Buffer

Para aplicações ricas em 2D/3D (WebGPU, WebGL, aplicações desktop nativas), as pipelines de shaders devem ser configuradas para maximizar a taxa de quadros e reduzir o uso de largura de banda de vídeo (VRAM):

- **G-Buffer (Deferred Rendering):**
  - Salva todos os atributos geométricos (posição, normais, cores, materiais) em texturas pesadas separadas para computar a iluminação depois.
  - **Gargalo:** Consumo extremo de largura de banda de memória de vídeo, gerando sobrecarga em aparelhos mobile e navegadores.
- **Visibility Buffer (Modern Alternative):**
  - Salva apenas identificadores mínimos de geometria (ID do triângulo e ID da malha) em um buffer simples de alta performance.
  - A iluminação e os dados de pixel são calculados sob demanda apenas para os pixels visíveis.
  - **Diretriz:** Priorize a abordagem de Visibility Buffer para portais web interativos e dashboards 3D complexos. Isso reduz drasticamente a pegada de memória da GPU e elimina o desperdício de sombreamento em partes invisíveis da tela (*Overdraw*).

---

## 🌐 4. Target Metrics (Web & API Performance)

- **Core Web Vitals:**
  - **LCP (Largest Contentful Paint):** < 1.2s
  - **INP (Interaction to Next Paint):** < 100ms
  - **CLS (Cumulative Layout Shift):** < 0.05
- **Concurrency & Event Loop:**
  - Nunca bloqueie a Thread principal. Computações pesadas de CPU no backend (Node.js/Python) devem ser delegadas para Worker Threads ou microsserviços especializados.
