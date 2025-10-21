# 🔄 Migration vers Nouveau Compte GitHub

## Étape 1 : Créer le Nouveau Repository

1. **Se connecter** à votre nouveau compte GitHub
2. Aller sur : [https://github.com/new](https://github.com/new)
3. **Remplir** :
   - Repository name : `the.ultimate.closers`
   - Description : `The Ultimate Closers - Closing éthique & IA consciente`
   - Visibilité : **Public** ou **Private** (votre choix)
   - ⚠️ **NE PAS** cocher "Initialize with README" (le projet existe déjà)
4. Cliquer sur **"Create repository"**

## Étape 2 : Copier l'URL du Nouveau Repository

GitHub vous montrera une page avec l'URL, quelque chose comme :

```
https://github.com/VOTRE-NOUVEAU-USERNAME/the.ultimate.closers.git
```

**Copier cette URL** (vous en aurez besoin à l'étape suivante)

## Étape 3 : Changer le Remote (automatisé)

Remplacer `VOTRE-NOUVEAU-USERNAME` par votre vrai username GitHub dans la commande ci-dessous.

```bash
# Voir le remote actuel
git remote -v

# Retirer l'ancien remote
git remote remove origin

# Ajouter le nouveau remote (REMPLACER VOTRE-NOUVEAU-USERNAME)
git remote add origin https://github.com/VOTRE-NOUVEAU-USERNAME/the.ultimate.closers.git

# Vérifier
git remote -v
```

## Étape 4 : Push vers le Nouveau Repository

```bash
# Push tout l'historique
git push -u origin main

# Push tous les tags (si vous en avez)
git push --tags
```

✅ **C'est fait !** Votre projet est maintenant sur votre nouveau compte GitHub.

---

## 🔧 Mise à Jour des Configurations

Après la migration, mettez à jour ces fichiers :

### 1. README.md

Ligne "Issues GitHub" → changer l'URL vers votre nouveau repo

### 2. DEPLOYMENT.md

Ligne "GitHub Issues" → changer l'URL vers votre nouveau repo

### 3. LOVABLE.md

Ligne "Issues GitHub" → changer l'URL vers votre nouveau repo

### 4. .github/dependabot.yml

Ligne `reviewers:` → changer vers votre nouveau username

```bash
# Après avoir modifié ces fichiers :
git add .
git commit -m "docs: Update GitHub URLs to new account"
git push origin main
```

---

## 🎯 Reconnecter les Services

### Vercel

1. Aller sur Vercel Dashboard
2. Settings → Git Integration
3. Reconnect → Sélectionner le nouveau repository
4. Redéployer

### Lovable

1. Aller sur Lovable Dashboard
2. Settings → Git Integration
3. Reconnect → Sélectionner le nouveau repository

---

## ✅ Checklist

- [ ] Nouveau repository créé sur GitHub
- [ ] Remote changé localement
- [ ] Code pushé vers nouveau repo
- [ ] URLs mises à jour dans la documentation
- [ ] Vercel reconnecté (si déjà configuré)
- [ ] Lovable reconnecté (si déjà configuré)

---

**Besoin d'aide ?** Demandez-moi à chaque étape !
