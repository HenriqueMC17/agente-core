# ⚙️ Workspace: Agente Especialista Backend e Dados

Este é um workspace isolado e de alta densidade técnica dedicado ao desenvolvimento Backend, APIs e Infraestrutura de Dados.

## 🎯 Por que Isolado?
Para assegurar a máxima segurança nas definições de arquitetura e otimizar tokens da IA. Este ambiente bloqueia contexto de design visual, CSS, e UI pesada, concentrando-se na estabilidade de rotas, microsserviços, mensageria e I/O de bancos de dados.

## 🛠 Como trabalhar neste nível?
Abra esta pasta diretamente no Cursor ou na sua IDE preferida com suporte a IA (*Open Folder* -> `subagents/agent-backend-data`). A IDE lerá de imediato o `.cursorrules` focado nesse tipo de engenharia estrita.

## 📥 Busca de Conhecimento Dinâmico (fetch_skill)
As vezes você precisará focar em tecnologias menos usuais (ex: GraphQL federation, arquitetura de eventos com Kafka, ou Redis cluster). Esse conhecimento profundo fica armazenado no núcleo raiz do projeto para manter o `.cursorrules` daqui leve.

### Usando o Script de Busca de Skills
Quando se deparar com a necessidade, traga o conhecimento profundo localmente executando:

```bash
python ../../12-internal-tools/scripts/fetch_skill.py <tecnologia_backend>
```

**Exemplo:**
```bash
python ../../12-internal-tools/scripts/fetch_skill.py kafka
```
A skill será trazida do núcleo (`09-skills` / `05-knowledge-base`) para a pasta `subagents/agent-backend-data/.local-skills/`. Imediatamente, o LLM a lerá sem precisar adivinhar regras corporativas de mensageria.
