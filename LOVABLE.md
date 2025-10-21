# Configuration Lovable pour The Ultimate Closers

## 🔗 Lien du projet

[https://lovable.dev/projects/764836c7-4acb-4f95-864f-ce0a767d6c78](https://lovable.dev/projects/764836c7-4acb-4f95-864f-ce0a767d6c78)

## 📁 Structure Monorepo

Ce projet utilise une architecture monorepo :

- **Frontend** : `apps/web` (Next.js 14 avec App Router)
- **Backend** : `apps/api` (NestJS 10)

Lovable doit être configuré pour pointer vers le dossier `apps/web` pour le frontend.

## ⚙️ Configuration Lovable

### 1. Framework Settings

- **Framework** : Next.js
- **Node Version** : 20.x
- **Package Manager** : pnpm 9

### 2. Build Settings

```bash
# Install Command
pnpm install

# Build Command
cd apps/web && pnpm build

# Dev Command
pnpm -C apps/web dev

# Output Directory
apps/web/.next

# Root Directory
./
```

### 3. Variables d'Environnement

Dans Lovable, ajoutez ces variables d'environnement :

| Variable                   | Valeur                               | Description                |
| -------------------------- | ------------------------------------ | -------------------------- |
| `NEXT_PUBLIC_API_URL`      | `https://api.theultimateclosers.com` | URL de l'API en production |
| `NEXT_PUBLIC_SENTRY_DSN`   | _(optionnel)_                        | Sentry pour monitoring     |
| `NEXT_PUBLIC_ANALYTICS_ID` | _(optionnel)_                        | Google Analytics ID        |

### 4. Connecter GitHub à Lovable

1. Aller sur [https://lovable.dev/projects/764836c7-4acb-4f95-864f-ce0a767d6c78](https://lovable.dev/projects/764836c7-4acb-4f95-864f-ce0a767d6c78)
2. Cliquer sur **Settings** → **Git Integration**
3. Connecter le repository : `istmeank/the.ultimate.closers`
4. Sélectionner la branche : `main`
5. Configurer le chemin racine : `apps/web`

### 5. Déploiement Automatique

Une fois connecté à GitHub, Lovable déploiera automatiquement :

- ✅ À chaque push sur `main`
- ✅ À chaque merge de Pull Request
- ✅ Previews pour chaque PR

## 🔒 Sécurité

Le frontend Next.js inclut :

- **CSP strict** avec nonce dynamique
- **Headers de sécurité** (HSTS, X-Frame-Options, X-Content-Type-Options)
- **Rate limiting** géré par l'API
- **CORS** configuré

Ces configurations sont dans `apps/web/src/middleware.ts` et fonctionneront automatiquement sur Lovable.

## 🚀 Déploiement Manuel

Si vous voulez forcer un redéploiement :

1. Aller sur Lovable → **Deployments**
2. Cliquer sur **Redeploy**

Ou via commit :

```bash
git commit --allow-empty -m "chore: trigger Lovable deployment"
git push origin main
```

## 📊 Monitoring

### Performance

- Lovable fournit automatiquement des métriques de performance
- Vérifier les Core Web Vitals dans l'interface Lovable

### Logs

- Les logs d'application sont disponibles dans **Deployments** → **View Logs**
- Pour des logs détaillés, ajouter Sentry (voir variables d'environnement)

## 🐛 Troubleshooting

### Build échoue

**Problème** : `pnpm: command not found`
**Solution** : Vérifier que Lovable utilise pnpm 9. Aller dans Settings → Build & Deploy → Package Manager

### CSP bloque des ressources

**Problème** : Scripts externes bloqués
**Solution** : Mettre à jour `apps/web/src/middleware.ts` pour ajouter les domaines autorisés

### Variables d'environnement manquantes

**Problème** : `NEXT_PUBLIC_API_URL is not defined`
**Solution** : Ajouter la variable dans Lovable Settings → Environment Variables

## 📝 Notes Importantes

1. **Monorepo** : Lovable doit pointer vers `apps/web` spécifiquement
2. **pnpm Workspace** : Le fichier `pnpm-workspace.yaml` à la racine gère les dépendances
3. **Hot Reload** : Fonctionne en dev via `pnpm -C apps/web dev`
4. **API Locale** : Pour le dev local, l'API tourne sur `http://localhost:4000`

## 🔄 Workflow Recommandé

1. **Développer localement** :

   ```bash
   pnpm install
   pnpm dev:web    # Frontend sur :3000
   pnpm dev:api    # API sur :4000
   ```

2. **Tester** :

   ```bash
   pnpm build:web
   pnpm test
   ```

3. **Commit & Push** :

   ```bash
   git add .
   git commit -m "feat: votre feature"
   git push origin main
   ```

4. **Lovable déploie automatiquement** ✨

## 📞 Support

- **Lovable Support** : [https://lovable.dev/support](https://lovable.dev/support)
- **Documentation Lovable** : [https://docs.lovable.dev](https://docs.lovable.dev)
- **Issues GitHub** : [https://github.com/istmeank/the.ultimate.closers/issues](https://github.com/istmeank/the.ultimate.closers/issues)
