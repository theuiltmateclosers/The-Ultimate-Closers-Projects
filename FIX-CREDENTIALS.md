# 🔐 Résoudre le Problème de Credentials GitHub

## ❌ Erreur Actuelle

```
remote: Permission to theuiltmateclosers/The-Ultimate-Closers-Projects.git denied to istmeank.
fatal: unable to access 'https://github.com/theuiltmateclosers/The-Ultimate-Closers-Projects.git/': The requested URL returned error: 403
```

**Problème** : Git utilise toujours l'ancien compte `istmeank` au lieu du nouveau `theuiltmateclosers`.

---

## ✅ Solution Rapide (Windows)

### Option 1 : Via le Gestionnaire d'Identifications Windows

1. **Ouvrir le Gestionnaire d'Identifications** :

   - Appuyer sur `Windows` + `R`
   - Taper : `control /name Microsoft.CredentialManager`
   - Appuyer sur `Entrée`

2. **Supprimer les anciennes credentials GitHub** :

   - Cliquer sur **"Informations d'identification Windows"**
   - Chercher `git:https://github.com`
   - Cliquer dessus → **"Supprimer"**

3. **Réessayer le push** :

   ```bash
   git push -u origin main
   ```

   → Une fenêtre va s'ouvrir pour vous connecter avec **`theuiltmateclosers`**

---

### Option 2 : Via Terminal (Plus rapide)

```bash
# Dire à Git d'oublier les credentials
git config --global --unset credential.helper

# Reconfigurer
git config --global credential.helper manager-core

# Réessayer le push
git push -u origin main
```

→ Une fenêtre va s'ouvrir pour vous reconnecter

---

### Option 3 : Utiliser un Personal Access Token (Recommandé)

**Étape 1** : Créer un Token sur GitHub

1. Aller sur : [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)
2. Se connecter avec **`theuiltmateclosers`**
3. **Remplir** :
   - Note : `The Ultimate Closers - Local Dev`
   - Expiration : `90 days` (ou `No expiration`)
   - Cocher : ✅ **`repo`** (toutes les sous-options)
4. Cliquer **"Generate token"**
5. **COPIER LE TOKEN** (vous ne le reverrez plus !)

**Étape 2** : Utiliser le Token pour pusher

```bash
# Quand il demande le mot de passe, coller le TOKEN à la place
git push -u origin main

# Username: theuiltmateclosers
# Password: [COLLER LE TOKEN ICI]
```

---

## 🚀 Commandes Complètes (Copy-Paste)

### Solution Rapide via Terminal :

```bash
# 1. Nettoyer les credentials
git config --global --unset credential.helper
git config --global credential.helper manager-core

# 2. Configurer votre nouveau compte
git config --global user.name "theuiltmateclosers"
git config --global user.email "votre-email@example.com"

# 3. Pusher (fenêtre de connexion va s'ouvrir)
git push -u origin main
```

---

## ⚡ Solution ULTRA RAPIDE avec SSH (Recommandé long terme)

### Si vous voulez éviter ce problème à l'avenir :

**Étape 1** : Générer une clé SSH

```bash
ssh-keygen -t ed25519 -C "votre-email@example.com"
# Appuyer sur Entrée 3 fois (pas de passphrase pour simplifier)
```

**Étape 2** : Copier la clé publique

```bash
cat ~/.ssh/id_ed25519.pub
# Copier tout le texte qui s'affiche
```

**Étape 3** : Ajouter sur GitHub

1. Aller sur : [https://github.com/settings/ssh/new](https://github.com/settings/ssh/new)
2. Title : `Mon PC Windows`
3. Key : Coller la clé copiée
4. Cliquer **"Add SSH key"**

**Étape 4** : Changer le remote en SSH

```bash
git remote remove origin
git remote add origin git@github.com:theuiltmateclosers/The-Ultimate-Closers-Projects.git
git push -u origin main
```

✅ **Plus jamais de problème de credentials !**

---

## 🎯 Quelle Solution Choisir ?

| Solution                            | Temps | Difficulté | Recommandé Pour  |
| ----------------------------------- | ----- | ---------- | ---------------- |
| **Option 1 : Gestionnaire Windows** | 2 min | Facile     | Débutants        |
| **Option 2 : Terminal**             | 1 min | Facile     | Utilisateurs Git |
| **Option 3 : Token**                | 3 min | Moyen      | Sécurité accrue  |
| **SSH** ⭐                          | 5 min | Moyen      | Usage long terme |

---

## 📝 Ma Recommandation

**Pour MAINTENANT** : Option 2 (Terminal - le plus rapide)
**Pour APRÈS** : Configurer SSH pour éviter ce problème à l'avenir

---

## ❓ Toujours Bloqué ?

Essayez cette commande qui force l'authentification :

```bash
git push https://theuiltmateclosers@github.com/theuiltmateclosers/The-Ultimate-Closers-Projects.git main
```

Vous devrez entrer votre mot de passe GitHub (ou Token si 2FA activé).

---

**Prêt ?** Essayez l'Option 2 (Terminal) en premier ! 🚀
