# 🚀 Guide de Déploiement GRATUIT

## ❌ Problème : Page Blanche

Votre domaine affiche une page blanche car l'ancien workflow GitHub Pages ne supporte pas le nouveau monorepo Next.js.

**Solution** : Utiliser Vercel (gratuit et optimal pour Next.js)

---

## ✅ Solution Recommandée : Vercel (GRATUIT)

### Pourquoi Vercel ?
- ✅ **100% GRATUIT** pour projets personnels
- ✅ Créé par l'équipe Next.js
- ✅ Déploiement automatique depuis GitHub
- ✅ Support natif des monorepos
- ✅ CDN mondial ultra-rapide
- ✅ HTTPS automatique
- ✅ Domaine personnalisé gratuit
- ✅ Preview deployments pour chaque PR

---

## 📋 Étapes de Déploiement (5 minutes)

### 1. Créer un compte Vercel

1. Aller sur [https://vercel.com/signup](https://vercel.com/signup)
2. S'inscrire avec votre compte GitHub (recommandé)
3. Autoriser Vercel à accéder à vos repos

### 2. Importer le Projet

1. Cliquer sur **"Add New Project"**
2. Sélectionner le repository : `istmeank/the.ultimate.closers`
3. Vercel détectera automatiquement Next.js

### 3. Configurer le Monorepo

Dans les **Build Settings** :

```
Framework Preset: Next.js
Root Directory: apps/web
Build Command: pnpm build
Output Directory: .next
Install Command: pnpm install
Node.js Version: 20.x
```

### 4. Variables d'Environnement (Optionnel)

Ajouter si nécessaire :
- `NEXT_PUBLIC_API_URL` = `https://api.theultimateclosers.com`

### 5. Déployer !

1. Cliquer sur **"Deploy"**
2. Attendre 2-3 minutes ⏱️
3. Votre site sera sur : `votre-projet.vercel.app`

### 6. Connecter Votre Domaine

1. Dans le projet Vercel → **Settings** → **Domains**
2. Ajouter : `theultimateclosers.com`
3. Vercel vous donnera des instructions DNS :

**Chez votre registrar de domaine :**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Attendre 5-10 minutes pour la propagation DNS
5. ✅ Votre site sera en ligne !

---

## 🎨 Alternative : Lovable + Vercel

Si vous utilisez déjà Lovable, vous pouvez :

**Option A** : Lovable pour le développement, Vercel pour la production
- Développer sur Lovable
- Push sur GitHub → déploiement auto sur Vercel

**Option B** : Uniquement Lovable
- Configurer Lovable avec le monorepo (voir LOVABLE.md)
- Connecter votre domaine dans Lovable Settings

---

## 🆓 Autres Options GRATUITES

### Pour le Frontend (Next.js)

| Plateforme | Gratuit | Domaine Custom | CDN | Build Time |
|------------|---------|----------------|-----|------------|
| **Vercel** ⭐ | ✅ Illimité | ✅ Oui | ✅ Global | Rapide |
| **Netlify** | ✅ 300 min/mois | ✅ Oui | ✅ Global | Moyen |
| **Cloudflare Pages** | ✅ Illimité | ✅ Oui | ✅ Global | Rapide |

### Pour l'API (NestJS) - Plus tard

Quand votre API sera prête :

| Plateforme | Gratuit | Notes |
|------------|---------|-------|
| **Render** | ✅ 750h/mois | Dort après 15 min d'inactivité |
| **Railway** | ✅ $5 crédit/mois | Puis payant |
| **Fly.io** | ✅ Limité | 3 micro VMs |

---

## 🔧 Configuration Actuelle

### Fichiers Ajoutés
- ✅ `vercel.json` - Configuration Vercel optimale
- ✅ `DEPLOYMENT.md` - Ce guide
- ❌ `.github/workflows/static.yml` - Supprimé (causait la page blanche)

### Structure pour Vercel
```
the-ultimate-closers/
├─ apps/
│  └─ web/              ← Vercel déploie ce dossier
│     ├─ src/
│     ├─ package.json
│     └─ next.config.js
└─ vercel.json          ← Configuration
```

---

## 🐛 Troubleshooting

### Page toujours blanche après déploiement
1. Vérifier que le build passe (Vercel → Deployments → View Logs)
2. Vérifier les variables d'environnement
3. Vérifier la configuration DNS

### Erreur de build
```bash
# Tester localement d'abord
cd apps/web
pnpm install
pnpm build
```

### Domaine ne se connecte pas
- Attendre 24-48h pour propagation DNS complète
- Vérifier les enregistrements DNS avec : [https://dnschecker.org](https://dnschecker.org)

---

## 📊 Workflow Recommandé

```mermaid
graph LR
    A[Développement Local] --> B[Git Push]
    B --> C[GitHub]
    C --> D[Vercel Auto Deploy]
    D --> E[theultimateclosers.com]
```

1. **Développer** localement : `pnpm dev:web`
2. **Tester** : `pnpm build:web`
3. **Commit** : `git commit -m "feat: ..."`
4. **Push** : `git push origin main`
5. **Vercel déploie automatiquement** en 2-3 minutes ! ⚡

---

## ✨ Avantages de cette Solution

- 🆓 **100% Gratuit**
- ⚡ **Ultra rapide** (CDN mondial)
- 🔒 **Sécurisé** (HTTPS automatique)
- 🔄 **CI/CD automatique**
- 📊 **Analytics inclus**
- 🌍 **Domaine personnalisé**
- 💚 **Zero configuration**

---

## 📞 Besoin d'Aide ?

Si vous avez des problèmes pendant la configuration :
1. Vérifier les logs Vercel : [Deployment Logs]
2. GitHub Issues : [Créer une issue](https://github.com/istmeank/the.ultimate.closers/issues)
3. Discord Vercel : [vercel.com/discord](https://vercel.com/discord)

---

## 🎯 Prochaines Étapes

1. ✅ **Maintenant** : Déployer sur Vercel (5 min)
2. ✅ **Ensuite** : Connecter le domaine (10 min)
3. ⏳ **Plus tard** : Déployer l'API quand elle sera prête

**Votre site sera en ligne en moins de 15 minutes !** 🚀

