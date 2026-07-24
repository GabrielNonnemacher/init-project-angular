---
name: angular-service
description: Cria serviços Angular para API, estado ou lógica de domínio. Use quando o usuário pedir serviços, integração HTTP ou regras de negócio.
---

# Skill: Serviço Angular

## Quando usar

- Integração REST/GraphQL
- Estado compartilhado entre componentes
- Lógica de domínio reutilizável

## Checklist

1. Nome: `<Recurso>Service` em `features/<feature>/services/` ou `core/services/`.
2. `@Injectable({ providedIn: 'root' })` salvo escopo de feature justificado.
3. Injetar `HttpClient` via `inject(HttpClient)`.
4. Métodos retornam `Observable<T>`; nomes descritivos (`getUsers`, `createUser`).
5. Tipos em arquivos `.model.ts` ou interfaces colocalizadas.
6. Erros: deixar propagar ou mapear para tipo de domínio; documentar retry se houver.

## Template mínimo

```typescript
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExampleService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/examples';

  getAll(): Observable<ExampleDto[]> {
    return this.http.get<ExampleDto[]>(this.baseUrl);
  }
}
```

## Core vs Feature

| Tipo | Local | Exemplo |
|------|-------|---------|
| Global | `core/services/` | AuthService, ThemeService |
| Feature | `features/x/services/` | UsersService |
