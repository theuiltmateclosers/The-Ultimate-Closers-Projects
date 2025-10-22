# 🎨 React-to-Figma MCP

> **MCP Server pour convertir automatiquement du code React/HTML en designs Figma**

بسم الله - Créé pour The Ultimate Closers

---

## 🚀 Fonctionnalités

- ✅ **Capture automatique** de votre site React en localhost
- ✅ **Extraction des styles** (couleurs, fonts, spacing, layout)
- ✅ **Conversion en structures Figma** (frames, components, text, etc.)
- ✅ **Création automatique** dans votre fichier Figma via API
- ✅ **Support responsive** (Mobile, Tablet, Desktop)
- ✅ **CLI facile** à utiliser
- ✅ **MCP Server** pour intégration avec Cursor AI

---

## 📦 Installation

```bash
cd mcp-react-to-figma
pnpm install
pnpm build
```

---

## ⚙️ Configuration

1. **Créez un fichier `.env`** :

```bash
cp .env.example .env
```

2. **Obtenez votre Figma Access Token** :

   - Allez sur https://www.figma.com/developers/api#access-tokens
   - Générez un token
   - Copiez dans `.env` → `FIGMA_ACCESS_TOKEN=...`

3. **Obtenez votre File Key** :
   - Ouvrez votre fichier Figma
   - URL : `https://figma.com/design/ABC123XYZ/...`
   - Le File Key = `ABC123XYZ`
   - Copiez dans `.env` → `FIGMA_FILE_KEY=ABC123XYZ`

---

## 🎯 Utilisation

### Mode CLI

```bash
# Convertir une URL complète
react-to-figma import --url http://localhost:3000

# Convertir une section spécifique
react-to-figma import --url http://localhost:3000 --selector "#hero"

# Convertir plusieurs sections
react-to-figma import --url http://localhost:3000 --sections hero,mission,services

# Mode verbose
react-to-figma import --url http://localhost:3000 --verbose
```

### Mode MCP Server

```bash
# Lancer le serveur MCP
pnpm start

# Le serveur écoute sur le port 3056
# Utilisez-le avec Cursor AI
```

### Avec Cursor AI

Une fois le serveur MCP lancé :

```
"Importe la section Hero de http://localhost:3000 dans Figma"
"Convertis toute ma homepage en design Figma"
"Crée un design Figma à partir de mon composant Button"
```

---

## 🛠️ Outils MCP Disponibles

### `import_react_to_figma`

Convertit du code React/HTML en design Figma

**Paramètres :**

- `url` : URL du site (ex: http://localhost:3000)
- `selector` : Sélecteur CSS optionnel (ex: #hero, .section)
- `pageName` : Nom de la page Figma à créer (défaut: "Imported from React")
- `createComponents` : Créer des components Figma (défaut: true)

**Exemple :**

```json
{
  "url": "http://localhost:3000",
  "selector": "#hero",
  "pageName": "Hero Section",
  "createComponents": true
}
```

### `analyze_react_structure`

Analyse la structure d'un site React sans créer dans Figma

**Paramètres :**

- `url` : URL du site
- `selector` : Sélecteur CSS optionnel

**Retour :**

```json
{
  "sections": [...],
  "colors": [...],
  "fonts": [...],
  "components": [...]
}
```

---

## 📐 Architecture

```
mcp-react-to-figma/
├── src/
│   ├── index.ts              # MCP Server entry point
│   ├── cli.ts                # CLI interface
│   ├── core/
│   │   ├── capture.ts        # Puppeteer DOM capture
│   │   ├── analyzer.ts       # Style extraction & analysis
│   │   ├── converter.ts      # DOM → Figma structure
│   │   └── figma-client.ts   # Figma API integration
│   ├── utils/
│   │   ├── logger.ts         # Logging utilities
│   │   ├── validator.ts      # Input validation
│   │   └── helpers.ts        # Helper functions
│   └── types/
│       ├── figma.ts          # Figma types
│       └── dom.ts            # DOM types
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🎓 Comment ça marche

### Étape 1 : Capture

```
Puppeteer lance votre site
    ↓
Capture le DOM complet
    ↓
Screenshot de chaque section
```

### Étape 2 : Analyse

```
Extraction des styles computed
    ↓
Détection de la structure (flex, grid)
    ↓
Identification des composants
```

### Étape 3 : Conversion

```
DOM Elements → Figma Nodes
    ↓
Styles CSS → Figma Properties
    ↓
Hiérarchie HTML → Tree Figma
```

### Étape 4 : Création

```
API Figma
    ↓
Création des frames
    ↓
Ajout des layers
    ↓
Application des styles
```

---

## 🔄 Workflow Complet

```
Code React
    ↓
react-to-figma import
    ↓
Design dans Figma
    ↓
Modifications visuelles
    ↓
mcp_Figma_get_design_context (MCP Figma existant)
    ↓
Code amélioré
```

**Boucle bidirectionnelle : Code ↔ Figma ↔ Code** 🔄

---

## 🚧 Limitations Actuelles (MVP)

- ⚠️ Pas de support pour les animations CSS complexes
- ⚠️ Images : importées comme rectangles avec fill image
- ⚠️ SVG : convertis en images raster
- ⚠️ Canvas/WebGL : non supportés
- ⚠️ iframes : non capturés

**À venir dans v2.0 :**

- Support des animations
- SVG natif
- Détection automatique des variants
- Auto-sync temps réel

---

## 🤝 Contribution

Ce projet est open source ! Contributions bienvenues.

---

## 📄 License

MIT - The Ultimate Closers

---

## 🆘 Troubleshooting

### "Cannot connect to Figma"

→ Vérifiez votre `FIGMA_ACCESS_TOKEN` dans `.env`

### "Puppeteer failed to launch"

→ Installez les dépendances système :

```bash
# Ubuntu/Debian
sudo apt-get install -y chromium-browser

# macOS
brew install chromium
```

### "Invalid selector"

→ Vérifiez que le sélecteur existe dans votre page

---

**Créé avec ❤️ pour révolutionner le workflow Design ↔ Code**

بسم الله الرحمن الرحيم




