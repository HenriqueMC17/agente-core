# System Design & Architecture (Capability)

## 🎯 Escopo da Habilidade

Capacidade analítica do agente para estruturar blocos lógicos, prever o tráfego de rede, particionar microsserviços e elaborar arquiteturas macro a partir de cenários vagos descritos em linguagem natural.

## 🛠️ Modus Operandi (Como Invocá-la)

Ao ser requisitado para atuar como "Architect" ou desenhar um sistema profundo:

1. **Compreensão de Volume (Estimativas):** Não propomos Kafkas ou Reddis em clusters imensos sem entender os reqs/segundo (RPS) do usuário.
2. **Separação de Domínio (Bounded Contexts):** Isole os domínios do problema. Se o usuário quer um E-commerce, desenhe a distinção rígida entre _Catálogo_, _Carrinho/Checkout_ e _Inventário_.
3. **Persistência Adequada:** O agente deve deliberar a ferramenta correta da camada `06-tech-stacks/databases`.
4. **Resiliência e Single Point of Failure (SPOF):** Toda arquitetura apresentada pelo agente obrigatoriamente descreve as defesas contra latência ou "fail drops".

## 🚧 Limitações

- O agente não constrói a infraestrutura (IaC/Terraform) apenas sob a alcunha desta habilidade. Essa skill é puramente **teórica e declarativa** para geração de ADRs (`08-templates/architecture-template.md`).

---

> _O Sistema Ideal é aquele onde a falha de um serviço degrada a UX graciosamente, sem estourar o banco de dados mestre._
