# 📦 Installation Guide - React-to-Figma MCP

بسم الله الرحمن الرحيم

---

## 🎯 Prérequis

- **Node.js** >= 18.0.0
- **pnpm** (ou npm/yarn)
- **Figma Account** avec accès API
- **Un site React** en localhost ou accessible

---

## 📝 Étape 1 : Installation des dépendances

```bash
cd mcp-react-to-figma
pnpm install
```

**Dépendances principales :**

- `@modelcontextprotocol/sdk` - SDK MCP
- `puppeteer` - Capture DOM
- `commander` - CLI
- `chalk` + `ora` - Interface CLI

---

## 🔑 Étape 2 : Configuration Figma

### A. Obtenir votre Access Token

1. Allez sur https://www.figma.com/developers/api#access-tokens
2. Cliquez **"Get personal access token"**
3. Donnez un nom : `react-to-figma-mcp`
4. Cliquez **"Generate token"**
5. **Copiez le token** (vous ne pourrez plus le voir après !)

### B. Obtenir votre File Key

1. Ouvrez ou créez un fichier Figma
2. Dans l'URL : `https://figma.com/design/ABC123XYZ/MyFile?node-id=...`
3. Le File Key = `ABC123XYZ` (la partie entre `/design/` et le nom)

### C. Créer le fichier .env

```bash
cp ENV_TEMPLATE .env
```

Éditez `.env` :

```bash
FIGMA_ACCESS_TOKEN=figd_votre_token_de_40_caracteres_ici
FIGMA_FILE_KEY=ABC123XYZ
LOCAL_URL=http://localhost:3000
PORT=3056
DEBUG=false
HEADLESS=true
```

⚠️ **Important :** Ne JAMAIS commit le fichier `.env` !

---

## 🏗️ Étape 3 : Build

```bash
pnpm build
```

Cela compile TypeScript → JavaScript dans le dossier `dist/`

---

## ✅ Étape 4 : Validation

Testez votre configuration :

```bash
pnpm start validate
```

**Résultat attendu :**

```
✓ FIGMA_ACCESS_TOKEN found
✓ FIGMA_FILE_KEY found
✓ Figma connection successful
🔗 File URL: https://figma.com/file/ABC123XYZ
✅ Configuration is valid!
```

Si vous voyez ça, tout est prêt ! ✨

---

## 🚀 Utilisation

### Mode CLI

```bash
# Importer une URL complète
node dist/cli.js import --url http://localhost:3000

# Importer une section spécifique
node dist/cli.js import --url http://localhost:3000 --selector "#hero"

# Analyser la structure (sans créer)
node dist/cli.js analyze --url http://localhost:3000

# Mode verbose
node dist/cli.js import --url http://localhost:3000 --verbose
```

### Mode MCP Server

```bash
# Lancer le serveur
node dist/index.js
```

Le serveur MCP écoute sur stdio et peut être utilisé par Cursor AI.

### Avec Cursor AI

Une fois le serveur lancé, dans Cursor :

```
"Importe http://localhost:3000 dans Figma"
"Convertis la section #hero en design Figma"
"Analyse la structure de mon site React"
```

---

## 🔧 Configuration Avancée

### Options .env supplémentaires

```bash
# Debug mode (logs détaillés)
DEBUG=true

# Browser non-headless (voir le navigateur)
HEADLESS=false

# Port du serveur MCP (si 3056 est occupé)
PORT=3057
```

### Viewport personnalisé

Dans le code, vous pouvez modifier :

```typescript
await capture.navigateTo(url, { width: 1920, height: 1080 });
```

---

## 🧪 Test Rapide

### 1. Lancez votre site React

```bash
cd ../apps/web
pnpm dev
# Site sur http://localhost:3000
```

### 2. Dans un autre terminal

```bash
cd mcp-react-to-figma
node dist/cli.js analyze --url http://localhost:3000
```

Vous devriez voir l'analyse de votre site !

### 3. Importez dans Figma

```bash
node dist/cli.js import --url http://localhost:3000 --selector "#hero"
```

Le JSON Figma sera généré dans la console.

---

## 🐛 Troubleshooting

### "Puppeteer failed to launch"

**macOS :**

```bash
brew install chromium
```

**Ubuntu/Debian :**

```bash
sudo apt-get install -y chromium-browser
```

**Windows :**
Téléchargez Chrome : https://www.google.com/chrome/

### "FIGMA_ACCESS_TOKEN invalid"

- Régénérez un nouveau token sur Figma
- Vérifiez qu'il n'y a pas d'espaces avant/après dans .env
- Le token commence par `figd_`

### "Cannot find module"

```bash
rm -rf node_modules dist
pnpm install
pnpm build
```

### "Element not found"

Le sélecteur CSS est incorrect. Vérifiez avec :

```bash
node dist/cli.js analyze --url YOUR_URL
```

---

## 📦 Installation Globale (Optionnel)

Pour utiliser `react-to-figma` n'importe où :

```bash
pnpm link --global
```

Puis :

```bash
react-to-figma import --url http://localhost:3000
```

---

## 🔄 Mise à jour

```bash
git pull
pnpm install
pnpm build
```

---

## ✅ Checklist Post-Installation

- [ ] Node.js >= 18 installé
- [ ] Dependencies installées (`pnpm install`)
- [ ] Build réussi (`pnpm build`)
- [ ] Fichier `.env` créé et configuré
- [ ] Token Figma valide
- [ ] File Key Figma valide
- [ ] Validation réussie (`node dist/cli.js validate`)
- [ ] Test sur localhost réussi

---

**Si vous avez suivi toutes les étapes, vous êtes prêt ! 🎉**

**Prochain : Testez sur votre projet The Ultimate Closers ! 🚀**

بارك الله فيك





