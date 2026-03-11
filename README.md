# @chikopera/toraload-shared

Shared enums, schemas, types, constants, and WebSocket message definitions used by the Toraload backend, admin, and mobile apps.

## Install (consuming apps)

1. Add the following to your app's `.npmrc`:

```
@chikopera:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

> The PAT needs at least the `read:packages` scope. For CI, use `${{ secrets.GITHUB_TOKEN }}`.

2. Install the package:

```bash
pnpm add @chikopera/toraload-shared
```

## Development (this repo)

```bash
pnpm install
pnpm build      # compile to dist/
```

## Publishing

The package is automatically published to [GitHub Packages](https://github.com/CHIKOPERA?tab=packages) on every push to `master` via the GitHub Actions workflow.

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
