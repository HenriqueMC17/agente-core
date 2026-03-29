# Node.js Architecture Conventions

## 📌 Contexto

Como os processos, threads (Event Loop isolado e libuv), gerências de pacotes locais (NPM/PM2/Docker) interagem em um servidor focado em alto desempenho.

---

## 🌐 1. Asynchronous I/O Não-bloqueante

Node.js não é multithread nativo simples para lógicas massivas em rotas HTTP de request.

- **Risco Primário:** Funções gulosas síncronas (`JSON.parse()` em array de 50MB, arrays compridas processadas sincronicamente com criptografia forte na pipeline). Isto bloqueia a _Main Thread_ travando todos os requisitantes do servidor.
- **Execução Ideal:** Jogue a descriptografia em CPU de Arquivos massivos ou parses brutais para Background usando "Child Processes", `Worker Threads`, Streams de pedaços pequenos (`fs.createReadStream()`) isolando as travas.

## 📦 2. Padrões de Servidor

- Fastify & Express MVC (Ou NestJS DDD Framework). O Servidor API obedece ao Singleton Router com isolamento e IoC claro. O arquivo `server.ts`/`index.ts` é leviano, inicializa Banco, Sockets e Rotas.
- Global Error Catchers imperativos: A aplicação NUNCA fechará o contêiner PM2 ou Docker caso exista Promise sem catch:
  - `process.on('unhandledRejection', (e)...)`
  - `process.on('uncaughtException', (e)...)` com fechamento Gracioso obrigatório.

## 🛡️ 3. Segregação do Ambiente e Config (The 12-Factor App)

- O Repositório e o Build devem ser puros de contexto do SO. Tudo que muda por servidor (S3_Bucket_Name, API_KEYS, Host_Port) deve fluir em tipagem segura extraída ativamente na raiz do App (Zod Validation) do ambiente nativo `.env`. Se o sistema faltar variável A em Prod, ele para instantaneamente de rodar no script de Build Validation, avisando que falhou config estrito, e não estoura silenciosamente pro cliente 12 horas depois em um loop perdido.
