# @toraload/shared

Shared enums, schemas, types, constants, and WebSocket message definitions used by the Toraload backend, admin, and mobile apps.

## Install

```bash
pnpm install
```

## Build

```bash
pnpm build
```

The compiled output is written to `dist/`.

## Usage

This package is consumed as a Git submodule in each app repo. After cloning an app repo, run:

```bash
git submodule update --init --recursive
cd shared && pnpm install && pnpm build
```

## Exports

| Path | Contents |
|------|----------|
| `@toraload/shared` | All exports (enums, schemas, types, constants, websocket) |
| `@toraload/shared/payment-methods` | Pesepay payment method utilities |
| `@toraload/shared/enums` | All domain enums |
| `@toraload/shared/schemas` | Zod validation schemas |
| `@toraload/shared/types` | Domain TypeScript interfaces |
| `@toraload/shared/constants` | Business constants |
| `@toraload/shared/websocket` | WebSocket message types |
