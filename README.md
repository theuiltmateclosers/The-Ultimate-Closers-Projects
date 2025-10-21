# The Ultimate Closers

> Closing éthique & IA consciente – Monorepo sécurisé avec Next.js 14 & NestJS 10

## 🏗️ Architecture

```
the-ultimate-closers/
├─ apps/
│  ├─ web/            # Next.js 14 (App Router)
│  └─ api/            # NestJS 10 (REST API)
├─ packages/
│  └─ eslint-config/  # Configuration ESLint partagée
├─ .github/workflows/ # CI/CD (CodeQL, Semgrep, OSV, Preview)
├─ pnpm-workspace.yaml
└─ README.md
```

## 🔒 Fonctionnalités de Sécurité

### Frontend (Next.js)

- ✅ **CSP strict** avec nonce dynamique (`'strict-dynamic'`)
- ✅ **Headers de sécurité** : HSTS, X-Frame-Options, X-Content-Type-Options, Permissions-Policy
- ✅ **Referrer-Policy** : `strict-origin-when-cross-origin`
- ✅ Middleware Next.js pour injection automatique des headers
- ✅ Support TypeScript strict

### Backend (NestJS)

- ✅ **Helmet.js** : Protection des headers HTTP
- ✅ **Rate limiting** : 300 requêtes / 15 minutes par défaut
- ✅ **CORS** configuré avec whitelist de domaines
- ✅ **Compression** gzip automatique
- ✅ Endpoints `/health` et `/ready` pour monitoring
- ✅ Guard d'authentification JWT (placeholder)
- ✅ Support TypeScript strict

### CI/CD & Scans de Sécurité

- ✅ **CodeQL** : Analyse statique hebdomadaire + sur chaque PR
- ✅ **Semgrep** : SAST rapide avec règles `p/ci`
- ✅ **OSV Scanner** : Détection de vulnérabilités dans les dépendances (quotidien)
- ✅ **Preview Deployments** : Vercel (web) + Docker GHCR (API)

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 20.x
- pnpm 9.x

```bash
# Installation des dépendances
pnpm install

# Démarrer le frontend (dev)
pnpm -C apps/web dev

# Démarrer l'API (dev)
pnpm -C apps/api start:dev
```

### URLs de développement

- **Frontend**: http://localhost:3000
- **API**: http://localhost:4000
- **API Health**: http://localhost:4000/health

## 🏗️ Build & Production

```bash
# Build tout le monorepo
pnpm -C apps/web build
pnpm -C apps/api build

# Production
pnpm -C apps/web start
pnpm -C apps/api start:prod
```

### Docker (API)

```bash
docker build -t tuc-api -f apps/api/Dockerfile .
docker run -p 4000:4000 tuc-api
```

## 🔐 Variables d'Environnement

### API (`apps/api/.env`)

```env
PORT=4000
# TODO: Ajouter JWT_SECRET, DATABASE_URL, etc.
```

### Web (`apps/web/.env.local`)

```env
NEXT_PUBLIC_API_URL=https://api.theultimateclosers.com
# TODO: Ajouter Sentry DSN, Analytics IDs, etc.
```

**⚠️ IMPORTANT** : Ne jamais commit de fichiers `.env` ! Tous sont exclus via `.gitignore`.

## 🛡️ Checklist de Sécurité

### Avant le déploiement en production :

- [ ] Configurer JWT dans `apps/api/src/guards/auth.guard.ts`
- [ ] Ajouter les domaines réels dans CSP (`apps/web/src/middleware.ts`)
- [ ] Configurer Sentry / monitoring (Datadog, New Relic, etc.)
- [ ] Activer les secrets GitHub :
  - `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (si Vercel)
  - Variables d'environnement pour l'API (DATABASE_URL, etc.)
- [ ] Configurer les webhooks de scan (optional: report-uri pour CSP)
- [ ] Tester les endpoints `/health` et `/ready` en production
- [ ] Vérifier que HSTS est actif (max-age=31536000)
- [ ] Audit final avec `npm audit` / `pnpm audit`

## 📊 Vérification Post-Déploiement

### Frontend

1. Ouvrir DevTools → Network → Headers
2. Vérifier la présence de :
   - `Content-Security-Policy` avec `nonce-`
   - `Strict-Transport-Security`
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`

### API

```bash
# Health check
curl https://api.theultimateclosers.com/health

# Ready check
curl https://api.theultimateclosers.com/ready

# Vérifier les headers
curl -I https://api.theultimateclosers.com/health
```

## 🧪 Tests

```bash
# Tests frontend
pnpm -C apps/web test

# Tests API
pnpm -C apps/api test

# Coverage
pnpm -C apps/api test:cov
```

## 📦 Gestion des Dépendances

```bash
# Ajouter une dépendance au frontend
pnpm -C apps/web add <package>

# Ajouter une dépendance à l'API
pnpm -C apps/api add <package>

# Mettre à jour toutes les dépendances
pnpm update -r
```

## 🔄 Workflow de Contribution

1. Créer une branche depuis `main`
2. Développer et tester localement
3. Créer une Pull Request
4. Les workflows CI s'exécutent automatiquement :
   - CodeQL (SAST)
   - Semgrep (règles de sécurité)
   - OSV Scanner (vulnérabilités)
   - Build & tests
   - Preview deployment (si configuré)
5. Merger après validation

## 📚 Documentation Technique

### CSP (Content Security Policy)

Le middleware Next.js génère un nonce unique par requête et l'injecte dans :

- L'en-tête CSP (`script-src 'nonce-XXX'`)
- Le header `x-nonce` accessible via `headers().get('x-nonce')`

Pour charger un script externe avec le nonce :

```tsx
<Script id="analytics" nonce={nonce} src="https://cdn.example.com/script.js" />
```

### Rate Limiting API

Configuration par défaut : 300 requêtes / 15 minutes.
Pour personnaliser par route, utiliser un guard dédié :

```typescript
@UseGuards(StrictRateLimitGuard)
@Post('auth/login')
```

### Authentification JWT (TODO)

Le `AuthGuard` est un placeholder. Implémenter :

1. Validation du token JWT (signature, expiration)
2. Extraction des scopes/roles
3. Vérification des permissions par route

## 🐛 Dépannage

### Erreur CSP "refused to execute inline script"

→ Vérifier que le nonce est bien passé au composant `<Script>`

### API retourne 429 (Too Many Requests)

→ Rate limit atteint, attendre ou ajuster la config dans `main.ts`

### Build échoue avec erreur TypeScript

→ Vérifier les versions de TypeScript dans tous les `package.json`

## 📞 Support

Pour toute question ou problème de sécurité, contacter : security@theultimateclosers.com

## 📄 Licence

Propriétaire – The Ultimate Closers © 2025
