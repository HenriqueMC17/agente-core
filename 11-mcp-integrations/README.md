# 11-mcp-integrations

## 🎯 Propósito

Governar a arquitetura de **Model Context Protocol (MCP)** e conexões seguras de agentes terceiros com APIs e subsistemas de alta complexidade. Opera como a fronteira de interoperabilidade autônoma.

## 🏗️ Papel na Arquitetura (@agente-senior-fullstack)

O Gateway de Comunicação API (Tier I/O). É por esta via que o Agente lê bases externas sem hard-coding, se comunica com banco de dados, Figma, Webhooks de CI/CD, e orquestra ferramentas dinâmicas de modo isolado.

## 📂 Natureza dos Arquivos

Configurações estritas declarativas.

- Declarações declarativas de conexões (ex: Servidores MCP de Supabase, Context7, Figma).
- Manuais de integração operacional para ferramentas em N8N (automação de workflows terceiros via webhook seguro).
- Metadados e esquemas JSON que vinculam local machine interfaces mapeando os Endpoints disponíveis.

## ⚙️ Diretrizes de Segurança, Uso e Evolução

- **CRÍTICO:** JAMAIS salve _Hard-Coded API Keys_, JWTs ou _Secrets_ expostas em repositórios (`.md`, `.json`, `.ts`). Injete unicamente via DotEnv (`.env`) da máquina local gerenciada de forma imutável ou Secret Managers globais.
- Ao atualizar ou instalar novos servidores MCP (Model Context Protocol), mapeie os payloads e limites funcionais deles. Evite servidores sem suporte oficial se houver concorrência de features de seguranca.

## 🔗 Relação com Outras Camadas

- Interage frontalmente na execução de relatórios ou ações ditadas pelas orientações contidas passivamente no diretório das `09-skills`.
- Trabalha em união e subserviência ao design estratégico e restrições impostas no `07-ai-integration`.
