# 🚀 Déploiement ULTRA RAPIDE sur Vercel (5 minutes)

## ✅ Étape 1 : Créer un Compte (1 min)

1. Aller sur : **[https://vercel.com/signup](https://vercel.com/signup)**
2. Cliquer sur **"Continue with GitHub"**
3. Autoriser Vercel

## ✅ Étape 2 : Importer le Projet (1 min)

1. Cliquer sur **"Add New..." → "Project"**
2. Chercher et sélectionner : **`the.ultimate.closers`**
3. Cliquer sur **"Import"**

## ✅ Étape 3 : Configurer (2 min)

### Dans la page de configuration :

**Framework Preset** : Next.js ✅ (détecté auto)

**Root Directory** : Cliquer sur **"Edit"** → Sélectionner **`apps/web`**

**Build Command** : 
```bash
pnpm build
```

**Install Command** :
```bash
pnpm install
```

**Output Directory** : 
```
.next
```

### Variables d'Environnement (optionnel)
Cliquer sur **"Environment Variables"** et ajouter :
```
NEXT_PUBLIC_API_URL = https://api.theultimateclosers.com
```

## ✅ Étape 4 : Déployer ! (2 min)

1. Cliquer sur le gros bouton bleu **"Deploy"**
2. Attendre 2-3 minutes ⏱️
3. 🎉 **C'est en ligne !**

Vous obtiendrez une URL comme : `votre-projet.vercel.app`

---

## 🌐 Étape 5 : Connecter Votre Domaine (5 min)

### Dans Vercel :

1. Aller dans votre projet → **Settings** → **Domains**
2. Entrer : `theultimateclosers.com`
3. Cliquer sur **"Add"**

### Vercel vous donnera des instructions. Chez votre registrar (ex: Namecheap, GoDaddy) :

#### Configuration DNS à ajouter :

```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

### Attendre 5-30 minutes
Votre site sera accessible sur **theultimateclosers.com** !

---

## ✨ C'est Tout !

Maintenant, chaque fois que vous faites `git push`, Vercel déploiera automatiquement ! 🚀

### Test Local Avant Push

```bash
cd apps/web
pnpm install
pnpm build
pnpm start
```

Si ça marche localement, ça marchera sur Vercel !

---

## 🆘 Problème ?

### Build échoue sur Vercel
→ Vérifier les logs : Vercel Dashboard → votre projet → Deployments → dernière tentative → View Logs

### Site ne charge pas
→ Attendre 5 minutes après le premier déploiement
→ Vider le cache : Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

### Domaine ne se connecte pas  
→ Attendre 24-48h pour propagation DNS
→ Vérifier avec : [https://dnschecker.org](https://dnschecker.org)

---

## 💡 Astuce Pro

Pour forcer un redéploiement :
```bash
git commit --allow-empty -m "chore: redeploy"
git push
```

**Besoin d'aide ?** Regardez les logs Vercel, tout est expliqué !

