# 🎨 Guide d'utilisation du MCP Figma avec Cursor

> Comment utiliser le plugin "Cursor Talk To Figma" pour importer votre design dans le code

---

## ✅ Prérequis

1. ✅ **Figma Desktop** installé (pas la version navigateur)
2. ✅ **Plugin "Cursor Talk To Figma"** installé dans Figma
3. ✅ **MCP Figma** actif dans Cursor (déjà fait ✓)
4. ✅ **Compte connecté** : abdenacer.maredj@theultimateclosers.com ✓

---

## 🚀 Étapes d'utilisation

### 1. Préparer votre fichier Figma

#### A. Créer le fichier

1. Ouvrez **Figma Desktop**
2. Créez un nouveau fichier : **"The Ultimate Closers - Design System"**
3. Organisez en **Pages** :
   - 📐 Design System (tokens, composants)
   - 🏠 Homepage (sections complètes)
   - 📱 Mobile Views
   - 🎨 Components Library

#### B. Importer les tokens

**Méthode rapide (5 min) :**

1. Installez les fonts :

   - [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
   - [Inter](https://fonts.google.com/specimen/Inter)

2. Créez les **7 couleurs principales** :

   - Primary : `#0D4D44`
   - Secondary : `#E9C46A`
   - Accent : `#A855F7`
   - Background : `#F5F0E8`
   - Foreground : `#0D4D44`
   - Muted : `#EDEDED`
   - Border : `#D6E5E3`

3. Créez les **6 text styles** :
   - Heading/Hero (Playfair, Bold, 72px)
   - Heading/Section (Playfair, Bold, 48px)
   - Heading/Card (Playfair, Bold, 24px)
   - Body/Large (Inter, Regular, 18px)
   - Body/Base (Inter, Regular, 16px)
   - Body/Small (Inter, Regular, 14px)

**Méthode avec plugin (automatique) :**

1. Installez **"Tokens Studio for Figma"**
2. Plugins → Tokens Studio → Settings → Import
3. Importez `figma-export/design-tokens.json`
4. ✨ Tous les tokens sont créés automatiquement !

---

### 2. Lancer le plugin MCP

1. Ouvrez votre fichier Figma
2. **Plugins** → **Cursor Talk To Figma**
3. Le plugin affiche : **"Server running on port 3055"**
4. Laissez le plugin **ouvert** pendant que vous travaillez

---

### 3. Utiliser les commandes MCP dans Cursor

#### A. Vérifier la connexion

```
Demandez à Cursor : "Vérifie ma connexion Figma"
```

L'IA va exécuter `mcp_Figma_whoami()` et confirmer votre compte.

#### B. Explorer votre fichier

**Obtenir la structure d'une page :**

1. Dans Figma, cliquez sur une **page** ou **frame**
2. Clic droit → **Copy link to selection**
3. Vous obtenez : `https://figma.com/design/ABC123XYZ/FileName?node-id=1-2`

Dites à Cursor :

```
"Montre-moi la structure de ce design Figma :
https://figma.com/design/ABC123XYZ/FileName?node-id=1-2"
```

L'IA va :

- Extraire `fileKey` = `ABC123XYZ`
- Extraire `nodeId` = `1:2` (transforme `1-2` en `1:2`)
- Exécuter `mcp_Figma_get_metadata()` pour voir la structure XML

#### C. Générer du code depuis un composant

1. Dans Figma, sélectionnez un composant (ex: Button)
2. Copiez le lien
3. Demandez :

```
"Génère le code React + Tailwind pour ce composant Figma :
https://figma.com/design/ABC123XYZ/FileName?node-id=5-123"
```

L'IA va :

- Exécuter `mcp_Figma_get_design_context()`
- Analyser les styles, textes, layouts
- Générer le code TypeScript + React + TailwindCSS
- Respecter les tokens de votre design system

#### D. Prendre un screenshot

```
"Prends un screenshot de cette section Figma :
https://figma.com/design/ABC123XYZ/FileName?node-id=10-50"
```

L'IA va :

- Exécuter `mcp_Figma_get_screenshot()`
- Afficher l'image du composant
- Vous permettre de valider visuellement

---

## 🎯 Exemples pratiques

### Exemple 1 : Créer le composant Hero

**Dans Figma :**

1. Créez une frame "Hero" (1440×900)
2. Ajoutez :
   - Background avec image + gradient
   - Badge avec icon Sparkles
   - H1 Title (style Heading/Hero)
   - Subtitle (style Body/Large)
   - 2 Buttons
   - Scroll indicator
3. Clic droit → Copy link

**Dans Cursor :**

```
"Voici mon design Hero section :
https://figma.com/design/ABC123XYZ/TheUltimateClosers?node-id=15-200

Génère le composant React suivant :
- TypeScript + Next.js 14
- TailwindCSS (utilise les tokens du design system)
- Structure : apps/web/src/components/Hero.tsx
- Inclus les animations (fade-in, float, particle-float)
- Responsive (mobile, tablet, desktop)
"
```

L'IA va :

1. Lire votre design Figma
2. Analyser les couleurs, fonts, spacings
3. Mapper aux tokens Tailwind existants
4. Générer le code avec les bonnes classes
5. Inclure les animations définies dans `tailwind.config.ts`

### Exemple 2 : Créer un système de Cards

**Dans Figma :**

1. Créez un Component "Card"
2. Ajoutez des **Variants** :
   - Type: Default, Hover, Active
   - Size: Small, Medium, Large
3. Utilisez **Component Properties** pour :
   - `withIcon` (boolean)
   - `title` (text)
   - `description` (text)
4. Copy link du composant principal

**Dans Cursor :**

```
"Génère le composant Card avec variants depuis Figma :
https://figma.com/design/ABC123XYZ/TheUltimateClosers?node-id=20-100

Utilise class-variance-authority (CVA) comme dans ui/button.tsx
Inclus tous les variants et states
"
```

L'IA va :

- Détecter tous les variants Figma
- Créer un composant avec CVA
- Définir les variants TypeScript
- Mapper les propriétés Figma aux props React

### Exemple 3 : Audit d'un composant existant

**Vous avez déjà un composant dans le code :**

```
"Compare mon composant Hero.tsx avec ce design Figma :
https://figma.com/design/ABC123XYZ/TheUltimateClosers?node-id=15-200

Dis-moi :
- Les différences de couleurs
- Les espacements qui ne matchent pas
- Les fonts incorrectes
- Les animations manquantes
"
```

L'IA va :

1. Lire le design Figma
2. Lire `apps/web/src/components/Hero.tsx`
3. Comparer token par token
4. Lister les écarts

---

## 🔥 Astuces Pro

### 1. Nommage dans Figma

**Bonne pratique :**

```
✅ Hero/Desktop
✅ Hero/Mobile
✅ Button/Primary/Default
✅ Button/Primary/Hover
✅ Card/Service/Large
```

**À éviter :**

```
❌ Frame 123
❌ Rectangle 5
❌ Untitled
```

L'IA comprend mieux les noms structurés !

### 2. Auto Layout partout

Utilisez **Auto Layout** dans Figma pour que l'IA génère :

- Flexbox correct (`flex`, `flex-col`)
- Espacements précis (`gap-4`, `space-y-6`)
- Alignements (`items-center`, `justify-between`)

### 3. Component Properties

Utilisez les **Component Properties** Figma :

- Boolean → Props React boolean
- Text → Props React string
- Instance Swap → Slots React

### 4. Styles réutilisables

Créez des **Color Styles** et **Text Styles** plutôt que des valeurs en dur.

L'IA va mapper :

- `Primary` → `text-primary` ou `bg-primary`
- `Heading/Hero` → `font-playfair text-7xl font-bold`

### 5. Annotations

Ajoutez des **notes** dans Figma pour l'IA :

```
💡 Animation : fade-in 0.6s
💡 Hover : scale-105
💡 Mobile : hidden md:block
```

---

## 🎨 Workflow complet

### Phase 1 : Design System (1 fois)

1. ✅ Importez les tokens (déjà fait dans `figma-export/`)
2. ✅ Créez les composants de base (Button, Card, Badge)
3. ✅ Testez la génération de code avec 1 composant
4. ✅ Ajustez si nécessaire

### Phase 2 : Sections (itératif)

Pour chaque section (Hero, Mission, Services, etc.) :

1. 🎨 **Designez dans Figma**

   - Utilisez les composants du design system
   - Auto Layout pour la structure
   - Nommez clairement

2. 🔗 **Copiez le lien Figma**

3. 💬 **Demandez à Cursor**

   ```
   "Génère cette section depuis Figma : [lien]
   Fichier : apps/web/src/components/[Nom].tsx
   Framework : Next.js + TypeScript + TailwindCSS"
   ```

4. ✅ **Vérifiez le code généré**

   - Tokens corrects ?
   - Responsive ?
   - Animations incluses ?

5. 🔄 **Itérez si besoin**
   ```
   "Ajoute l'animation fade-in au titre"
   "Rends ce composant responsive"
   "Utilise lg:grid-cols-4 au lieu de grid-cols-3"
   ```

### Phase 3 : Synchronisation continue

Quand vous modifiez le design :

1. 🎨 Modifiez dans Figma
2. 💬 Dites à Cursor :
   ```
   "Mon design Hero a changé, mets à jour le composant :
   [nouveau lien Figma]"
   ```
3. ✅ L'IA compare et met à jour uniquement ce qui a changé

---

## 🛠️ Commandes utiles

### Exploration

```bash
"Montre-moi toutes les pages de ce fichier Figma"
"Liste tous les composants dans cette page"
"Quelle est la structure de cette frame ?"
```

### Génération

```bash
"Génère le code de ce composant"
"Convertis cette section Figma en React"
"Crée un composant TypeScript depuis ce design"
```

### Comparaison

```bash
"Compare le design Figma avec le code actuel"
"Quelles sont les différences entre Figma et Hero.tsx ?"
"Vérifie que les couleurs matchent le design system"
```

### Assets

```bash
"Extrais les images de cette section"
"Liste tous les assets utilisés"
"Prends un screenshot de chaque variant"
```

---

## ⚠️ Limitations

### Ce que le MCP Figma peut faire :

- ✅ Lire les designs (structure, styles, textes)
- ✅ Générer du code React/TypeScript
- ✅ Prendre des screenshots
- ✅ Analyser les tokens (couleurs, fonts, spacings)
- ✅ Comparer design vs code

### Ce qu'il ne peut PAS faire :

- ❌ Modifier votre fichier Figma
- ❌ Créer des composants dans Figma
- ❌ Exporter des assets automatiquement
- ❌ Publier des librairies Figma

Pour modifier Figma, utilisez Figma Desktop directement.

---

## 🆘 Troubleshooting

### Le plugin ne se connecte pas

1. Vérifiez que **Figma Desktop** est ouvert (pas le navigateur)
2. Relancez le plugin dans Figma
3. Vérifiez le port 3055 (doit être libre)

### L'IA ne trouve pas mon design

1. Copiez le lien depuis Figma (**Copy link to selection**)
2. Vérifiez que le lien contient `node-id=`
3. Le fichier doit être accessible à votre compte

### Le code généré ne correspond pas

1. Vérifiez que vous avez créé les **Color Styles** et **Text Styles**
2. Utilisez **Auto Layout** dans Figma
3. Nommez vos layers clairement
4. Précisez les contraintes à l'IA :
   ```
   "Utilise exactement les tokens de tailwind.config.ts"
   "Respecte la structure de apps/web/src/components/ui/button.tsx"
   ```

### Erreur "Unauthorized"

1. Vérifiez votre connexion :
   ```
   "Vérifie ma connexion Figma avec whoami"
   ```
2. Si ce n'est pas le bon compte, reconnectez-vous dans Figma Desktop

---

## 📚 Ressources

### Documentation

- [Figma MCP Plugin](https://www.figma.com/community/plugin/cursor-talk-to-figma)
- [Règles Design System](.cursor/rules/figma_design_system.md)
- [Tokens JSON](figma-export/design-tokens.json)
- [Structure Composants](figma-export/components-structure.json)

### Templates Figma

- [The Ultimate Closers Design System](figma-export/TEMPLATE-FIGMA-MANUEL.md)
- [Guide Import Simple](figma-export/GUIDE-IMPORT-FIGMA.md)

### Code

- [Tailwind Config](../apps/web/tailwind.config.ts)
- [CSS Variables](../apps/web/src/app/globals.css)
- [Composants UI](../apps/web/src/components/ui/)

---

## 🎉 Vous êtes prêt !

Maintenant vous pouvez :

1. ✨ Designer dans Figma avec les tokens du projet
2. 🔗 Copier le lien d'un composant/section
3. 💬 Demander à Cursor de générer le code
4. ✅ Obtenir du code React + TypeScript + TailwindCSS parfaitement aligné
5. 🔄 Itérer rapidement design ↔ code

**Design to Code en quelques secondes ! ⚡**

---

**Bon design !** 🎨✨

_Créé le ${new Date().toLocaleDateString('fr-FR')} pour The Ultimate Closers_

