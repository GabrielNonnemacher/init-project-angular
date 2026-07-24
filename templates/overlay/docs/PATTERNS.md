# Padrões de código — __PROJECT_NAME__

Guia prático complementar às regras em `.cursor/rules/`.

## 1. Organização por feature

Cada domínio vive em `src/app/features/<nome>/`:

```
features/users/
├── pages/
│   └── user-list/
├── components/
│   └── user-card/
├── services/
│   └── users.service.ts
├── models/
│   └── user.model.ts
└── users.routes.ts
```

## 2. Smart vs Dumb

**Smart (container):** injeta serviços, busca dados, trata erros, passa inputs.

**Dumb (presentational):** apenas `@Input` / `@Output`, sem HttpClient.

## 3. Estado

| Cenário | Abordagem |
|---------|-----------|
| Local ao componente | `signal()` / `computed()` |
| Compartilhado simples | Serviço com signals |
| Global complexo | NgRx / NGXS (se aprovado em DEFINITIONS.md) |

## 4. Formulários

- Reactive Forms para formulários não triviais.
- Validators síncronos no form; assíncronos no serviço quando necessário.
- Mensagens de erro no template, não hardcoded no TS.

## 5. Acessibilidade

- Botões e links semânticos (`<button>` vs `<div click>`).
- `aria-label` em ícones interativos.
- Foco visível em modais e drawers.

## 6. Performance

- `OnPush` + imutabilidade ou signals.
- `track` em `@for`.
- Lazy load de rotas e imports pesados.

## 7. Commits (sugestão)

```
feat(users): add user list page
fix(auth): handle expired refresh token
refactor(shared): extract button component
```

---

Gerado por [init-project-angular](https://www.npmjs.com/package/init-project-angular).
