# Entidades de Domínio e Modelagem de Dados Abstrata

## 📌 Contexto

Um banco mal desenhado no dia zero condena toda a aplicação no segundo semestre. Este material determina a fundação tática de Normalização e Soft-Design Patterns.

---

## 🏛️ 1. Paradigma do Auditor/Temporalidade e Soft-Deletes

- Entidades ricas de sistema central DEBEM ser criadas na Base por default contendo campos estruturais imutáveis: `Created_At (Timestamp)`, `Updated_At (Mutante nas tabelas)` e, por definição, o preceito do `Deleted_At/Is_Deleted`.
- Dados cruciais (Contratos, Perfis, Extratos e Pedidos) **NÃO DEVEM JAMAIS SOFRER O DELETE IMPERATIVO SQL**. Marque sua omissão nas queries lógicas por `where deleted_at is null` em nível de Base do ORM global para sumir dos Eyes Front-End. O DBA/Backups guardam para contendas financeiras nativamente a Entidade inativa.

## 🗝️ 2. Tipologia Transacional Global e PKs

- **Primary Keys Inteiras Crescentes vs UUIDs:** Chaves longas de String como Inteiros `Auto-Increment=1,2,3...` da V1 do projeto expõem concorrentes ou Hackers Scrapers sobre todo volume contábil ou URLs `/users/1000 => users/1001/` ID Fáceis/Públicos.
- ID Incremental Integer Fica isolado e confinado pro Backend local para buscas e ForeignKeys nativas mais leves B-Tree e Relações do Join, gerando performance pura. Mas na Edge do DTO Frontend Client-Side RestFul, um UUID Unico V4/V7 exposto e criptografável que transacionalmente traduz na ID integer para a Tabela nativa do Join.
- Use Types Enum Enums Enclapsulados em Bancos para Status Mutáveis (Status= `DRAFT, PENDING, ACTIVE, CLOSED`), forçando consistência que Front-Ends vagos String não devem digitar via Text puro. Estruture e mape a Tabela.
