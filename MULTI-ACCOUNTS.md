# 🔄 Utiliser Plusieurs Comptes GitHub

## ✅ Configuration Actuelle

Vous pouvez maintenant utiliser **deux comptes GitHub** :

- **`istmeank`** : Vos autres projets (credentials conservées)
- **`theuiltmateclosers`** : Ce projet (The Ultimate Closers)

---

## 🎯 Comment Ça Marche

### Pour CE projet (The Ultimate Closers) :

```bash
# Le remote inclut le username
https://theuiltmateclosers@github.com/theuiltmateclosers/The-Ultimate-Closers-Projects.git
```

Git utilisera automatiquement le bon compte grâce au username dans l'URL.

### Pour vos AUTRES projets :

Ils continuent à utiliser `istmeank` normalement !

---

## 🚀 Push avec le Nouveau Compte

### Méthode 1 : Personal Access Token (Plus Simple)

1. **Créer un token** : [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)

   - Se connecter avec **`theuiltmateclosers`**
   - Note : `The Ultimate Closers - Local`
   - Cocher : ✅ `repo` (tout)
   - **Copier le token** généré

2. **Push** :

   ```bash
   git push -u origin main
   ```

   Quand demandé :

   - Password : **Coller le TOKEN** (pas le mot de passe)

3. **Token sauvegardé** → Plus jamais de problème ! ✅

---

### Méthode 2 : SSH (Meilleure pour le Long Terme)

#### Configuration SSH Multi-Comptes

**Étape 1** : Générer une clé SSH pour le nouveau compte

```bash
ssh-keygen -t ed25519 -C "votre-email@example.com" -f ~/.ssh/id_ed25519_theuiltmateclosers
# Appuyer sur Entrée 2 fois (pas de passphrase)
```

**Étape 2** : Copier la clé publique

```bash
cat ~/.ssh/id_ed25519_theuiltmateclosers.pub
# Copier TOUT le texte
```

**Étape 3** : Ajouter sur GitHub

1. Aller sur : [https://github.com/settings/ssh/new](https://github.com/settings/ssh/new)
2. Se connecter avec **`theuiltmateclosers`**
3. Title : `Windows PC - The Ultimate Closers`
4. Key : Coller la clé
5. **Add SSH key**

**Étape 4** : Configurer SSH pour utiliser la bonne clé

Créer/éditer `~/.ssh/config` :

```bash
# Compte 1 : istmeank (par défaut)
Host github.com-istmeank
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519

# Compte 2 : theuiltmateclosers
Host github.com-theuiltmateclosers
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_theuiltmateclosers
```

**Étape 5** : Changer le remote en SSH

```bash
git remote remove origin
git remote add origin git@github.com-theuiltmateclosers:theuiltmateclosers/The-Ultimate-Closers-Projects.git
git push -u origin main
```

✅ **Fini ! Plus de problème de credentials !**

---

## 📋 Workflow Multi-Comptes

### Projets avec `istmeank` :

```bash
git clone https://github.com/istmeank/mon-projet.git
# OU
git remote add origin git@github.com:istmeank/mon-projet.git
```

### Projets avec `theuiltmateclosers` :

```bash
git clone https://theuiltmateclosers@github.com/theuiltmateclosers/mon-projet.git
# OU
git remote add origin git@github.com-theuiltmateclosers:theuiltmateclosers/mon-projet.git
```

---

## 🔧 Troubleshooting

### Problème : Git utilise toujours le mauvais compte

**Solution** : Vérifier le remote

```bash
git remote -v
# Le remote DOIT contenir le username
```

Si ce n'est pas le cas :

```bash
git remote set-url origin https://USERNAME@github.com/USERNAME/REPO.git
```

---

### Problème : Token demandé à chaque push

**Solution** : Activer le credential helper

```bash
git config --global credential.helper manager-core
```

Puis refaire un push → Le token sera sauvegardé.

---

## ✅ Avantages de cette Configuration

- ✅ Garder `istmeank` pour vos anciens projets
- ✅ Utiliser `theuiltmateclosers` pour les nouveaux
- ✅ Pas de conflit entre les comptes
- ✅ Changement automatique selon le projet
- ✅ Credentials séparées et sécurisées

---

## 🎯 Résumé

| Compte                 | Usage                | Méthode                        |
| ---------------------- | -------------------- | ------------------------------ |
| **istmeank**           | Autres projets       | Credentials Windows existantes |
| **theuiltmateclosers** | The Ultimate Closers | Token ou SSH (ce projet)       |

**Tout est prêt !** Créez juste le token et faites le push ! 🚀
