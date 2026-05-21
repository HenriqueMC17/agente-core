# 🎨 KNOWLEDGE BASE: Design Engineering — Padrões de Interface 2026

> **Domínio:** Frontend / Design Engineering  
> **Categoria:** Referência Operacional  
> **Fonte:** Protocolo de Excelência em Interface — Docs 2026

---

## 1. A Filosofia: Design como Engenharia

Em 2026, a interface de um SaaS de alto nível é uma **manifestação visual da integridade dos dados e da segurança do sistema**. Design não é decoração — é protocolo de confiança.

> "A excelência visual não é decorativa; é um indicador da integridade da engenharia subjacente — sinalizando que a segurança, a performance e a gestão de dados possuem o mesmo rigor aplicado ao alinhamento de um pixel."

**Blueprint Aesthetic:** Grades matemáticas visíveis + baixa opacidade = proxy cognitivo de segurança e confiabilidade.

---

## 2. Sistema de Espaçamento: 8px Base

| Elemento | Desktop | Mobile | Objetivo |
|---|---|---|---|
| Grid de Blueprint | 16px / 32px | 16px | Rigor técnico e scaffold |
| Gutter Size | 24px | 16px | Ritmo respiratório do layout |
| Layout Padding | 24px - 64px | 16px - 24px | Clareza cognitiva |
| Micro-espaçamento | 4px / 8px | 4px / 8px | Agrupamento lógico |

**Regra:** Variações apenas por ajuste óptico (±1px) quando percepção humana superar geometria pura.

---

## 3. Tipografia Técnica

- **Fonte principal:** `Geist` (design suíço, legibilidade extrema) ou `SF Pro`
- **Dados e tabelas:** `Geist Mono` obrigatório + `font-variant-numeric: tabular-nums`
- **Headlines:** `font-weight: 600+`
- **Contraste:** Padrão **APCA** (Advanced Perceptual Contrast Algorithm) — mais preciso que WCAG 2

---

## 4. Dark Mode Premium (Padrão 2026)

```css
/* ⛔ PROIBIDO: preto puro */
/* ✅ ESCALA DE CAMADAS: */

--layer-0-base:     #0D0D0D;  /* Fundo primário da aplicação */
--layer-1-card:     #1A1A1A;  /* Superfícies de conteúdo */
--layer-2-elevated: #2D2D2D;  /* Modais e menus flutuantes */
```

**Iluminação de superfície no escuro:**
- Sombras tradicionais são ineficazes no dark mode
- Use **Crisp Borders**: `border: 1px solid rgba(255,255,255,0.08)`
- Combine com **Layered Shadows** (mínimo 2 camadas: luz ambiente + luz direta)

---

## 5. Glassmorphism 2.0 para IA

Sinaliza **conteúdo gerado ou transitório** (ideal para outputs de AI):

```css
/* ✅ PARÂMETROS CORRETOS */
backdrop-filter: blur(12px);  /* Entre 12px-20px */
background: rgba(255, 255, 255, 0.08);  /* Opacidade 8%-15% */
translateZ(0);  /* Force GPU acceleration */
will-change: transform;  /* Evitar jank no scroll */

/* ⛔ PROIBIDO */
transition: all;  /* Liste propriedades explicitamente */
/* ✅ CORRETO: */
transition: opacity 200ms ease, transform 200ms ease;
```

**Suporte para browsers legados:**
```css
@supports (backdrop-filter: blur(12px)) {
  .glass-element { backdrop-filter: blur(12px); }
}
/* Fallback: background sólido com opacidade maior */
.glass-element { background: rgba(30, 30, 30, 0.95); }
```

---

## 6. Padrões de Interação e Feedback

### Streaming Text (saídas de IA)
```css
/* Cursor de atividade — obrigatório para streaming */
.ai-cursor::after {
  content: '|';
  animation: blink 500ms step-end infinite;  /* 500ms exato */
}
@keyframes blink {
  50% { opacity: 0; }
}
```

### Skeleton Loading
- Skeletons devem **espelhar dimensões exatas** do conteúdo final (Zero CLS)
- Animação: shimmer com gradiente linear

### Indicadores de Confiança para IA
| Nível | Indicador | Cor |
|---|---|---|
| Alta confiança (>85%) | Badge percentual + fonte citada | Verde |
| Média confiança (60-85%) | Badge âmbar | Âmbar |
| Baixa confiança (<60%) | Warning explícito + revisão humana | Vermelho |

---

## 7. Engenharia de Animação

**Seleção de biblioteca por caso de uso:**

| Biblioteca | Uso | Trade-off |
|---|---|---|
| **GSAP** | Timelines complexas, scroll sequences | Bundle pesado |
| **Framer Motion** | Transições de estado de componentes | React-only |
| **Motion One** | Performance crítica, bundle-size priority | API menor |

**Física de mola nativa (CSS):**
```css
/* linear() para física de mola sem JavaScript */
transition: transform 400ms linear(0, 0.063, 0.25, 0.563, 0.875, 1.063, 1.125, 1.094, 1.031, 0.984, 1);
```

**Regras de duração:**
- Micro-interações (hover, click): **100ms - 300ms**
- Contadores de KPI, page transitions: **500ms - 1000ms**
- ⛔ **PROIBIDO:** Scrolljacking — animações vinculadas à posição do scroll, nunca à sua física

---

## 8. Interfaces AI-First

### Generative UI
```typescript
// Vercel AI SDK — Tool Calling para componentes dinâmicos
// A IA escolhe qual componente React renderizar baseada no contexto
const tools = {
  showChart: tool({
    description: 'Renderize um gráfico de barras',
    parameters: z.object({ data: z.array(z.number()) }),
    execute: async ({ data }) => <BarChart data={data} />
  }),
  showTable: tool({
    description: 'Renderize uma tabela de dados',
    parameters: z.object({ rows: z.array(z.object({})) }),
    execute: async ({ rows }) => <DataTable rows={rows} />
  })
}
```

### Inteligência Ambiente
- Dashboards adaptativos que reorganizam widgets por contexto
- **Regra imutável:** Toda mudança automática deve ser **visível, reversível e explicável**

---

## 9. Checklist Deploy Ready

```
□ APCA Contrast: texto sobre Glassmorphism atende contraste perceptual?
□ Safe Areas: layout respeita notches e áreas de segurança do sistema?
□ Streaming: cursor de atividade (500ms) presente no final do texto?
□ Skeletons: dimensões batem 1:1 com conteúdo final (Zero CLS)?
□ GPU-Accel: blur usa translateZ(0) ou will-change: transform?
□ Focus Mgmt: foco retorna ao local correto após fechar modais?
□ Data Display: números em tabelas usam fontes tabulares (Geist Mono)?
□ Translate: termos técnicos marcados com translate="no"?
□ Hydration: inputs mantêm valor e foco após carga inicial?
□ Physics: transições usam linear() easing ou biblioteca de física?
```

---

> **Fonte:** *Protocolo de Excelência em Interface: Diretrizes de Governança e Design Engineering*  
> e *Relatório de Perspectiva Tecnológica: O Ecossistema Frontend e o Design de Prestígio em 2026*
