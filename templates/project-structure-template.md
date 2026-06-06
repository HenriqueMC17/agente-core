# Estruturação e Scaffolding Fullstack (Feature-Sliced Arch)

## 📌 Contexto

Todo novo microsserviço ou monolito moderno (Next.js/Node) gerado pelo agente precisa seguir um isolamento limpo. Regra principal: A estrutura tem foco no DOMÍNIO e não na CLASSE TÉCNICA (Screaming Architecture).

## 🏙️ Mentalidade de Organização

❌ **Ruim (Foco Técnico):**

```
src/
├── controllers/
├── models/
├── views/
└── services/
```

✅ **Padrão Sênior Sliced (Foco no Valor/Feature):**

```
src/
├── app/                  # Application Layer (Roots, Entrypoints globais)
├── modules/ (ou feat/)   # Módulos estritos e imutáveis da lógica
│   ├── auth/
│   │   ├── api/          # DTOs, Handlers ou Next.js Rotas
│   │   ├── core/         # Domain (Usecases de business login, Entities)
│   │   └── ui/           # Componente React da tela e hooks lógicos isolados
│   │
│   └── payments/
│       ├── api/
│       ├── core/
│       └── ui/
│
├── shared/               # Carga Compartilhada "Dumb"
│   ├── ui/               # Design System (Buttons neutros, Spinners globais)
│   ├── lib/              # Adapters externos (Axios configs, Regex functions)
│   └── config/           # Envs estritos e constants
```

## Como Aplicar o Contexto

- Crie um scaffold seguindo esse formato copiando e renomeando as pastas modulares caso sejam requisitadas pela base `04-workflows/project-bootstrap.md`.
- Garanta que dependências sejam UNIDIRECIONAIS: `app/` pode importar `modules/`. `modules/` pode importar `shared/`. `shared/` não importa `app/` nem `modules/` e `modules/auth` JAMAIS deve cruzar com `modules/payments` acopladamente (apenas se for via events/mediators ou através de um modulo wrapper).
