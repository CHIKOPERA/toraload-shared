# @toraload/shared

Shared enums, schemas, types, constants, and WebSocket message definitions used by the Toraload backend, admin, and mobile apps.

## Install (consuming apps)

1. Add the following to your app's `.npmrc`:

```
@toraload:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

> The PAT needs at least the `read:packages` scope. For CI, use `${{ secrets.GITHUB_TOKEN }}`.

2. Install the package:

```bash
pnpm add @toraload/shared
```

## Development (this repo)

```bash
pnpm install
pnpm build      # compile to dist/
```

## Publishing

The package is automatically published to [GitHub Packages](https://github.com/orgs/toraload/packages) on every push to `master` via the GitHub Actions workflow.

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
