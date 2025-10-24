# ⚡ Quick Start - React-to-Figma MCP

**بسم الله - Get started in 5 minutes !**

---

## 🚀 Installation Express (5 min)

```bash
# 1. Install dependencies
cd mcp-react-to-figma
pnpm install

# 2. Create .env file
cp ENV_TEMPLATE .env

# 3. Edit .env with your Figma credentials
# FIGMA_ACCESS_TOKEN=your_token
# FIGMA_FILE_KEY=your_file_key

# 4. Build
pnpm build

# 5. Validate
node dist/cli.js validate
```

✅ **Si ça affiche "Configuration is valid", c'est bon !**

---

## 🎯 Premier Test (2 min)

### Test 1 : Analyser votre site

```bash
# Lancez votre site dans un autre terminal
cd ../apps/web && pnpm dev

# Analysez-le
node dist/cli.js analyze --url http://localhost:3000
```

**Résultat attendu :** Liste des couleurs, fonts, structure ✅

### Test 2 : Convertir une section

```bash
node dist/cli.js import \
  --url http://localhost:3000 \
  --selector "#hero" \
  --page-name "Hero Section"
```

**Résultat attendu :** JSON Figma dans la console ✅

---

## 📋 Importer dans Figma (3 min)

### Option A : Plugin "JSON to Figma"

1. Ouvrez Figma
2. Plugins → Browse → Cherchez "JSON to Figma"
3. Installez
4. Copiez le JSON généré
5. Plugins → JSON to Figma → Collez
6. ✨ Votre design apparaît !

### Option B : Manuel (si pas de plugin)

Le JSON montre la structure exacte :

- Créez les frames manuellement
- Suivez les dimensions indiquées
- Appliquez les couleurs listées

---

## 💡 Exemples d'utilisation

### Import d'une page complète

```bash
node dist/cli.js import --url http://localhost:3000
```

### Import de sections spécifiques

```bash
# Hero
node dist/cli.js import --url http://localhost:3000 --selector "#hero"

# Mission
node dist/cli.js import --url http://localhost:3000 --selector "#mission"

# Services
node dist/cli.js import --url http://localhost:3000 --selector "#services"
```

### Mode verbose (debugging)

```bash
node dist/cli.js import --url http://localhost:3000 --verbose
```

---

## 🔄 Workflow Recommandé

```
1. Design initial dans Figma (manuel)
         ↓
2. Code React dans votre projet
         ↓
3. Modifications visuelles → Test avec react-to-figma
         ↓
4. Import JSON dans Figma
         ↓
5. Affinage dans Figma
         ↓
6. Génération code avec MCP Figma existant
         ↓
7. Boucle Design ↔ Code
```

---

## 🎨 Pour The Ultimate Closers

### Importer toutes les sections

```bash
# Hero
node dist/cli.js import --url http://localhost:3000 --selector "#hero" --page-name "Hero"

# Mission
node dist/cli.js import --url http://localhost:3000 --selector ".mission-section" --page-name "Mission"

# Services
node dist/cli.js import --url http://localhost:3000 --selector ".services-section" --page-name "Services"

# AI Section
node dist/cli.js import --url http://localhost:3000 --selector ".ai-section" --page-name "AI"

# Results
node dist/cli.js import --url http://localhost:3000 --selector ".results-section" --page-name "Results"

# Testimonials
node dist/cli.js import --url http://localhost:3000 --selector ".testimonials-section" --page-name "Testimonials"

# CTA
node dist/cli.js import --url http://localhost:3000 --selector ".cta-section" --page-name "CTA"
```

---

## 🔧 Commandes Utiles

```bash
# Valider config
node dist/cli.js validate

# Analyser (rapide, sans conversion)
node dist/cli.js analyze --url URL

# Import complet
node dist/cli.js import --url URL

# Import section spécifique
node dist/cli.js import --url URL --selector SELECTOR

# Mode MCP Server (pour Cursor)
node dist/index.js
```

---

## ⚠️ Troubleshooting Express

**❌ "Cannot find module"**
→ `pnpm build`

**❌ "FIGMA_ACCESS_TOKEN not set"**
→ Vérifiez `.env`

**❌ "Element not found"**
→ Vérifiez le sélecteur CSS avec `analyze`

**❌ "Puppeteer failed"**
→ Installez Chrome/Chromium

---

## 🎉 Vous êtes prêt !

**3 commandes pour commencer :**

```bash
pnpm install && pnpm build
node dist/cli.js validate
node dist/cli.js analyze --url http://localhost:3000
```

**Si les 3 fonctionnent, tout est parfait ! 🚀**

---

بارك الله فيك

Pour plus de détails : voir `INSTALLATION.md` et `README.md`





