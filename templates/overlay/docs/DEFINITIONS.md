# Definições — __PROJECT_NAME__

Documento de referência para humanos e agentes. Mantenha atualizado conforme o projeto evolui.

## Objetivo do projeto

_Descreva aqui o propósito da aplicação._

## Personas / usuários

_Quem usa o sistema e quais são os fluxos principais._

## Bounded contexts (features)

| Feature | Responsabilidade |
|---------|------------------|
| _ex.: auth_ | _Login, logout, refresh token_ |
| _ex.: dashboard_ | _Visão geral pós-login_ |

## Contratos de API

_Base URL, autenticação, formato de erro padrão._

## Decisões arquiteturais (ADR resumido)

| Data | Decisão | Motivo |
|------|---------|--------|
| _hoje_ | Standalone + lazy routes | Alinhado ao Angular moderno e tree-shaking |

## Dependências aprovadas

_Liste libs extras permitidas além do Angular CLI (ex.: NgRx, Tailwind)._

---

Gerado por [init-project-angular](https://www.npmjs.com/package/init-project-angular).
