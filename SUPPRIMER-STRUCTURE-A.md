# 🗑️ Guide de suppression de la Structure A (Vite/Lovable)

## ⚠️ IMPORTANT : Testez d'abord !

**NE SUPPRIMEZ PAS** la structure A avant d'avoir vérifié que la structure B (Next.js) fonctionne parfaitement !

---

## ✅ Checklist avant suppression

Vérifiez que tout fonctionne dans `apps/web` :

- [ ] `cd apps/web && pnpm dev` démarre sans erreur
- [ ] Site accessible sur `http://localhost:3000`
- [ ] Toutes les pages s'affichent correctement
- [ ] Navigation fonctionne
- [ ] Sélecteur de langue fonctionne (FR/EN/DAR)
- [ ] Images s'affichent correctement
- [ ] Animations fonctionnent
- [ ] Page `/legal` accessible
- [ ] Design responsive testé
- [ ] Aucune erreur dans la console

---

## 🗂️ Fichiers et dossiers à supprimer

Une fois que tout fonctionne, vous pouvez supprimer :

### PowerShell (Windows)

```powershell
# Supprimer le dossier src/ (Vite/React)
Remove-Item -Recurse -Force src

# Supprimer les fichiers de configuration Vite
Remove-Item -Force index.html
Remove-Item -Force vite.config.ts
Remove-Item -Force tsconfig.app.json

# Supprimer les fichiers Lovable
Remove-Item -Force lovable.config.json
Remove-Item -Force LOVABLE.md

# Supprimer les configurations en double (racine vs apps/web)
Remove-Item -Force tailwind.config.ts
Remove-Item -Force postcss.config.js
Remove-Item -Force components.json

# Optionnel : Supprimer les documentations de migration
Remove-Item -Force DEPLOIEMENT-ULTRA-SIMPLE.md
Remove-Item -Force FIX-CREDENTIALS.md
Remove-Item -Force INSTRUCTIONS-FINALES.md
Remove-Item -Force MULTI-ACCOUNTS.md
Remove-Item -Force MIGRATION-GITHUB.md
```

### Bash/Linux/MacOS

```bash
# Supprimer le dossier src/ (Vite/React)
rm -rf src

# Supprimer les fichiers de configuration Vite
rm -f index.html vite.config.ts tsconfig.app.json

# Supprimer les fichiers Lovable
rm -f lovable.config.json LOVABLE.md

# Supprimer les configurations en double
rm -f tailwind.config.ts postcss.config.js components.json

# Optionnel : Supprimer les documentations de migration
rm -f DEPLOIEMENT-ULTRA-SIMPLE.md FIX-CREDENTIALS.md INSTRUCTIONS-FINALES.md
rm -f MULTI-ACCOUNTS.md MIGRATION-GITHUB.md
```

---

## 📊 Structure AVANT suppression

```
the.ultimate.closers/
├── apps/
│   ├── web/                    ✅ GARDER (Next.js)
│   └── api/                    ✅ GARDER (NestJS)
├── packages/                   ✅ GARDER
├── public/                     ✅ GARDER (pour GitHub Pages si besoin)
├── src/                        ❌ SUPPRIMER
├── index.html                  ❌ SUPPRIMER
├── vite.config.ts              ❌ SUPPRIMER
├── lovable.config.json         ❌ SUPPRIMER
├── tsconfig.app.json           ❌ SUPPRIMER
├── tailwind.config.ts          ❌ SUPPRIMER (en double)
├── postcss.config.js           ❌ SUPPRIMER (en double)
├── components.json             ❌ SUPPRIMER (en double)
└── ... autres fichiers         ✅ GARDER
```

---

## 📊 Structure APRÈS suppression

```
the.ultimate.closers/
├── apps/
│   ├── web/                    ✅ Structure Next.js
│   │   ├── public/
│   │   │   ├── assets/
│   │   │   └── favicon.svg
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── contexts/
│   │   │   └── lib/
│   │   ├── package.json
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   └── api/                    ✅ Structure NestJS
├── packages/                   ✅ Packages partagés
├── public/                     ✅ Public racine (optionnel)
├── package.json                ✅ Racine monorepo
├── pnpm-workspace.yaml         ✅ Config pnpm
├── vercel.json                 ✅ Config Vercel
├── README.md                   ✅ Documentation
├── DEPLOYMENT.md               ✅ Documentation
├── SECURITY.md                 ✅ Documentation
└── MIGRATION-COMPLETE.md       ✅ Ce guide
```

---

## 🔄 Mettre à jour le package.json racine (Optionnel)

Si vous souhaitez nettoyer le `package.json` de la racine :

```json
{
  "name": "the-ultimate-closers",
  "version": "1.0.0",
  "description": "The Ultimate Closers - Monorepo Next.js + NestJS",
  "private": true,
  "scripts": {
    "dev:web": "pnpm -C apps/web dev",
    "dev:api": "pnpm -C apps/api start:dev",
    "build:web": "pnpm -C apps/web build",
    "build:api": "pnpm -C apps/api build",
    "build": "pnpm build:web && pnpm build:api",
    "test": "pnpm -C apps/web test && pnpm -C apps/api test"
  },
  "keywords": ["monorepo", "nextjs", "nestjs", "security", "closing", "ia", "ethique"],
  "author": "The Ultimate Closers",
  "license": "UNLICENSED"
}
```

---

## 🎯 Vérifications post-suppression

Après la suppression, vérifiez que :

1. **Build fonctionne** :

   ```bash
   pnpm build:web
   ```

2. **Aucune erreur TypeScript** :

   ```bash
   cd apps/web && pnpm lint
   ```

3. **Vercel peut déployer** :
   ```bash
   vercel deploy --prod
   ```

---

## 💾 Backup (Recommandé)

Avant de supprimer, créez un backup :

```bash
# Créer une branche de backup
git checkout -b backup-structure-vite
git add -A
git commit -m "Backup: Structure Vite avant suppression"
git push origin backup-structure-vite

# Retourner à main
git checkout main
```

---

## 🚀 Après la suppression

1. **Commit les changements** :

   ```bash
   git add -A
   git commit -m "feat: Migration complète vers Next.js, suppression structure Vite"
   git push
   ```

2. **Redéployer** :

   ```bash
   vercel deploy --prod
   ```

3. **Mettre à jour la documentation** :
   - Mettre à jour `README.md` si nécessaire
   - Supprimer les références à Vite/Lovable

---

## 🔗 Liens utiles

- Documentation Next.js : https://nextjs.org/docs
- Vercel Deployment : https://vercel.com/docs
- Figma MCP : Pour continuer à vérifier le design
- Webflow MCP : Pour continuer à vérifier le design

---

## 📞 En cas de problème

Si quelque chose ne va pas après la suppression :

1. **Restaurer depuis le backup** :

   ```bash
   git checkout backup-structure-vite
   ```

2. **Ou annuler le dernier commit** :
   ```bash
   git reset --hard HEAD~1
   ```

---

**⚠️ Rappel** : Ne supprimez RIEN tant que la structure Next.js n'est pas 100% fonctionnelle !

---

_Guide créé le ${new Date().toLocaleDateString('fr-FR')}_
