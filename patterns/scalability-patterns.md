# Scalability Patterns

## 📌 Contexto

O guia teórico absoluto perante crescimento de carga/tráfego e os reflexos colaterais dessa adoção nas camadas de Arquitetura.

---

## 🏎️ Modelagem Clássica e E-Axis (Scaling de Instâncias)

- **Scale Out (Horizontal):** O foco base de todas nossas APIs. Projetos (NodeJS/Java) devem ser fundamentalmente _Stateless_ (sem carregar senhas em memória contínua, guardando estados críticos ou JWTs revogáveis no Redis central - Não numa array global do server 1).
- Tráfegos maciços geram Containers Idênticos. O Cloud balancer (AWS ALB proxy) cuidará do redirecionamento round-robin para todos.

## 🗄️ Database Taming (Scaling do Persistente)

Banco de dados não gosta de escalar horizontalmente na premissa trivial.

1. **Caching Agressivo Peremptório (Edge Cache ou Redis):** Se você ler os dados de uma entidade rara/pesada do catálogo milhares de vezes à toa no Postgres, use _Read Through_ Redis. Mas tenha uma política de _TTL_ ou Invalidação forte com Tags (`stale-while-revalidate`) no Edge Network CDN para conteúdos editoriais ou lojas.
2. **Separação de Leituras e Escritas (CQRS):** O _Master_ do Cluster Relacional processa escritas e replica ativamente os blocos lógicos pros Nodes _Slaves/Replicas_ de Read. A API direciona os `GET` só pras Réplicas de leitura, aliviando o cérebro das mutações pesadas do Core do servidor Master.
3. **Sharding/Particionamento:** Só pense em _Sharding_ do DataBase no patamar Enterprise 4.0 (Multitenancy Colossal). Dividir bancos por Tenants fisicamente pode ser letal em termos analíticos.

## ⚡ Asynch e Background Jobs

Os eixos dos fluxos bloqueantes devem virar Pub/Sub: O cliente posta a demanda ("Renderizar nota fiscal"). A API só empurra a demanda para uma _Queue_ na fila local ou na rede do AWS (SQS/Rabbit) e retorna logo: `HTTP 202 Accepted`.
O worker independente consome, constrói e emite via _Webhook_ ou _WebSocket_ o resultado na máquina servidora final do Cliente. Não force o usuário de fato (Loading UI da Home) a aguardar o servidor baixar arquivos e processá-los na main thread síncrona do Controller.
