---
name: angular-component
description: Cria ou refatora componentes Angular standalone seguindo os padrões do projeto. Use quando o usuário pedir componentes, páginas ou UI Angular.
---

# Skill: Componente Angular

## Quando usar

- Criar novo componente, página ou layout
- Refatorar componente existente para OnPush / signals
- Dividir smart/dumb components

## Checklist

1. Confirmar se é **page** (rota) ou **component** reutilizável.
2. Colocar em `features/<feature>/pages/` ou `features/<feature>/components/`.
3. Usar `standalone: true` e declarar todos os imports no `@Component`.
4. Preferir `input()` / `output()` (signal API) em componentes novos.
5. `ChangeDetectionStrategy.OnPush` por padrão.
6. Arquivos: `.component.ts`, `.component.html`, `.component.__STYLE_EXT__`.
7. Seletor: `app-<nome-kebab>`.
8. Gerar spec básico se o projeto já usa testes.

## Template mínimo

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-feature',
  standalone: true,
  templateUrl: './my-feature.component.html',
  styleUrl: './my-feature.component.__STYLE_EXT__',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyFeatureComponent {}
```

## Anti-patterns

- Lógica HTTP direto no componente → mover para serviço
- `@Input()` mutável sem necessidade → usar signals ou imutabilidade
- Módulos NgModule em código novo → preferir standalone
