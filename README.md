# init-project-angular

CLI para criar projetos Angular com definições, padrões e skills pré-configurados para o [Cursor](https://cursor.sh) IDE.

O que esta ferramenta faz:

- Gera um novo projeto Angular usando `@angular/cli`
- Aplica regras e padrões de projeto no `.cursor/rules/`
- Configura skills de agente AI no `.cursor/skills/`
- Cria documentação de referência em `docs/`

## Pré-requisitos

- Node.js >= 18
- npm

## Uso

### Modo interativo

```bash
npx init-project-angular
```

O CLI irá perguntar:

1. Nome do projeto
2. Pasta de destino
3. Estilo (CSS ou SCSS)
4. Se deseja Angular Router
5. Se deseja componentes standalone
6. Se deseja habilitar SSR
7. Se deseja pular `npm install`

### Modo não-interativo (opções via CLI)

```bash
npx init-project-angular \
  --name meu-app \
  --directory meu-app \
  --style scss \
  --routing \
  --standalone \
  --skip-install
```

## Opções

| Opção | Descrição | Padrão |
| --- | --- | --- |
| `-n, --name <name>` | Nome do projeto | (obrigatório) |
| `-d, --directory <dir>` | Pasta de destino | (igual ao nome) |
| `--style <style>` | `css` ou `scss` | `scss` |
| `--no-routing` | Desabilitar Angular Router | habilitado |
| `--no-standalone` | Desabilitar componentes standalone | habilitado |
| `--ssr` | Habilitar SSR (Angular Universal) | desabilitado |
| `--skip-install` | Pular `npm install` | desabilitado |
| `-V, --version` | Mostra a versão | - |
| `-h, --help` | Mostra ajuda | - |

## Arquivos adicionados

Após a criação, o projeto terá os seguintes arquivos adicionais:

```
.cursor/
  rules/
    angular-patterns.mdc    # Padrões de código Angular
    project-definitions.mdc # Definições do projeto
  skills/
    angular-component/      # Skill para criar componentes
    angular-service/        # Skill para criar serviços
docs/
  DEFINITIONS.md            # Glossário e definições
  PATTERNS.md               # Padrões de código Angular
```

## Desenvolvimento

### Instalar dependências

```bash
npm install
```

### Scripts disponíveis

| Script | Descrição |
| --- | --- |
| `npm run build` | Compila o TypeScript |
| `npm run dev` | Compila em watch mode |
| `npm test` | Roda os testes (vitest) |
| `npm run test:watch` | Roda testes em watch mode |
| `npm run lint` | Verifica lint com ESLint |
| `npm run lint:fix` | Corrige problemas de lint |
| `npm run format` | Formata código com Prettier |
| `npm run format:check` | Verifica formatação |
| `npm run check` | Roda lint + format check + testes |

### Testar localmente

```bash
npm run build
node dist/cli.js
```

## Licença

[MIT](LICENSE) - Gabriel Nonnemacher
