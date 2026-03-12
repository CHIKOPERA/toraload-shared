# Migrating from Git Submodule to `@chikopera/toraload-shared`

Follow these steps in each project (backend, admin, mobile) to replace the shared submodule with the npm package.

---

## 1. Create a GitHub Personal Access Token (PAT)

> Skip this if you already have one with `read:packages` scope.

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give it a name (e.g. `toraload-packages-read`)
4. Check the scope: `read:packages`
5. Click **Generate token** and copy it — you won't see it again

---

## 2. Add `.npmrc` to the consuming project

Create or update `.npmrc` in the **root of the project**:

```
@chikopera:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
```

Replace `YOUR_GITHUB_PAT` with the token from step 1.

> **Important:** Add `.npmrc` to `.gitignore` if it contains a real token. For CI/CD, use an environment variable instead (see step 6).

---

## 3. Install the package

```bash
pnpm add @chikopera/toraload-shared
```

---

## 4. Remove the submodule

```bash
# 1. Deinitialise the submodule
git submodule deinit -f shared

# 2. Remove it from .git/modules
rm -rf .git/modules/shared

# 3. Remove the submodule directory and entry from .gitmodules
git rm -f shared
```

Then delete any remaining references to `shared` in `.gitmodules` if the file still exists.

---

## 5. Update imports

Find and replace the old submodule import paths with the package name.

| Old (submodule) | New (package) |
|---|---|
| `from '../../shared'` | `from '@chikopera/toraload-shared'` |
| `from '../../shared/types'` | `from '@chikopera/toraload-shared/types'` |
| `from '../../shared/enums'` | `from '@chikopera/toraload-shared/enums'` |
| `from '../../shared/schemas'` | `from '@chikopera/toraload-shared/schemas'` |
| `from '../../shared/constants'` | `from '@chikopera/toraload-shared/constants'` |
| `from '../../shared/websocket'` | `from '@chikopera/toraload-shared/websocket'` |
| `from '../../shared/payment-methods'` | `from '@chikopera/toraload-shared/payment-methods'` |

Use VS Code's **Find & Replace across files** (`Ctrl+Shift+H`) to do this quickly.

---

## 6. CI/CD — Add the token as a secret

The token must be available in your deployment pipeline without being committed to git.

### GitHub Actions

1. Go to your project repo → **Settings → Secrets and variables → Actions**
2. Add a new secret: `PACKAGES_TOKEN` with your PAT value
3. Add this step to your workflow **before** `pnpm install`:

```yaml
- name: Set up .npmrc for GitHub Packages
  run: |
    echo "@chikopera:registry=https://npm.pkg.github.com" >> .npmrc
    echo "//npm.pkg.github.com/:_authToken=${{ secrets.PACKAGES_TOKEN }}" >> .npmrc
```

### Railway / Render / other platforms

Add these as **environment variables** on the platform, then add a pre-install script or inject them via a startup command:

```bash
echo "@chikopera:registry=https://npm.pkg.github.com" >> .npmrc
echo "//npm.pkg.github.com/:_authToken=$PACKAGES_TOKEN" >> .npmrc
```

---

## 7. Verify

```bash
pnpm install
pnpm typecheck   # or pnpm build — should compile without errors
```

---

## Keeping up to date

When `@chikopera/toraload-shared` releases a new version, update it like any other package:

```bash
pnpm update @chikopera/toraload-shared
```
