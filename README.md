# toraload-shared

Shared enums, schemas, types, constants, and WebSocket message definitions used by the Toraload backend, admin, and mobile apps.

## Install (consuming apps)

For public npmjs installs nothing special is required. From any consuming project run:

```bash
pnpm add toraload-shared
```

## Development (this repo)

```bash
pnpm install
pnpm build      # compile to dist/
```

## Publishing

The package is automatically published to npmjs on every push to `main` via GitHub Actions. Before first publish you must:

1. Create an npm account (https://www.npmjs.com/signup)
2. Create an automation token on https://www.npmjs.com/settings/<your-username>/tokens
3. Add the token to this repo's GitHub secrets as `NPM_TOKEN`

The workflow uses `NPM_TOKEN` to publish. The package is published as public, so installing it does not require authentication.

## Exports

| Path | Contents |
|------|----------|
| `@chikopera/toraload-shared` | All exports (enums, schemas, types, constants, websocket) |
| `@chikopera/toraload-shared/payment-methods` | Pesepay payment method utilities |
| `@chikopera/toraload-shared/enums` | All domain enums |
| `@chikopera/toraload-shared/schemas` | Zod validation schemas |
| `@chikopera/toraload-shared/types` | Domain TypeScript interfaces |
| `@chikopera/toraload-shared/constants` | Business constants |
| `@chikopera/toraload-shared/websocket` | WebSocket message types |
