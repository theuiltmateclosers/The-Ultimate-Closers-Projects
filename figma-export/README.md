# 🎨 Figma Export - The Ultimate Closers

Ce dossier contient les fichiers d'export du design system pour Figma.

## 📦 Fichiers disponibles

### 1. `design-tokens.json`

**Design Tokens** au format Figma compatible.

**Comment l'utiliser :**

1. Installez le plugin **"Tokens Studio for Figma"** (anciennement Figma Tokens)
2. Dans Figma, ouvrez le plugin
3. Importez le fichier `design-tokens.json`
4. Tous les tokens (couleurs, typographie, espacements) seront automatiquement créés

**Contenu :**

- ✅ Couleurs (Primary, Secondary, Accent, etc.)
- ✅ Typographie (Playfair Display, Inter)
- ✅ Espacements (4px, 8px, 16px, etc.)
- ✅ Border radius
- ✅ Ombres et glows
- ✅ Durées d'animation

---

### 2. `components-structure.json`

**Structure complète** des composants du site.

**Comment l'utiliser :**

- Documentation de référence pour créer vos composants Figma
- Structure organisationnelle : Layout → Sections → UI Components
- Descriptions détaillées de chaque composant
- Variants et états pour chaque élément

**Contenu :**

- ✅ Layout (Header, Footer)
- ✅ Sections (Hero, Mission, Services, etc.)
- ✅ UI Components (Button, Card, Badge)
- ✅ Breakpoints responsive
- ✅ Animations

---

## 🚀 Guide d'import dans Figma

### Méthode 1 : Tokens Studio (Recommandé)

1. **Installer le plugin**

   - Ouvrez Figma
   - Menu Plugins → Browse plugins
   - Recherchez "Tokens Studio for Figma"
   - Installez

2. **Importer les tokens**

   - Ouvrez votre fichier Figma
   - Plugins → Tokens Studio
   - Settings → Import
   - Sélectionnez `design-tokens.json`
   - Cliquez "Import"

3. **Utiliser les tokens**
   - Tous les tokens sont maintenant disponibles
   - Couleurs : Sélectionnez un élément → Dans le panneau de couleur, vous verrez vos tokens
   - Typographie : Pareil pour les tailles de texte
   - Espacements : Utilisez les tokens pour les marges/paddings

### Méthode 2 : Import manuel des couleurs

1. **Créer des Color Styles**

   - Dans Figma, créez un rectangle
   - Appliquez la couleur `#0D4D44` (primary)
   - Clic droit sur la couleur → Create Style
   - Nommez "primary"
   - Répétez pour toutes les couleurs du fichier tokens

2. **Créer des Text Styles**
   - Créez un texte
   - Appliquez "Playfair Display", Bold, 48px
   - Clic droit → Create Style
   - Nommez "Heading/Hero"
   - Répétez pour les autres styles

---

## 🎯 Workflow Design → Code

### 1. Créer dans Figma

- Utilisez les tokens importés
- Créez vos composants
- Organisez avec Auto Layout
- Nommez clairement les layers

### 2. Exporter les assets

```bash
# Images
Export en WebP (optimisé web)
Résolution: @2x pour Retina

# Icônes
Export en SVG
Stroke: Outline
```

### 3. Générer le code

- Utilisez le plugin "Figma to Code"
- Ou partagez le lien Figma avec le dev
- Les tokens garantissent la cohérence

---

## 📐 Design System actuel

### Couleurs principales

- **Primary** : `#0D4D44` (Vert Malachite)
- **Secondary** : `#E9C46A` (Or/Doré)
- **Accent** : `#A855F7` (Violet IA)
- **Background** : `#F5F0E8` (Beige clair)

### Typographie

- **Headings** : Playfair Display (Serif, élégant)
- **Body** : Inter (Sans-serif, moderne)

### Espacements

- Base : Multiples de 4px
- Container : max-width 1400px, padding 2rem
- Sections : padding vertical 24 (96px)

### Breakpoints

- Mobile : < 768px
- Tablet : 768px - 1024px
- Desktop : > 1024px
- 2XL : > 1400px

---

## 🔄 Synchronisation Design ↔ Code

### Modifications côté Figma → Code

1. Modifiez votre design dans Figma
2. Exportez les nouveaux tokens si nécessaire
3. Partagez le lien Figma
4. Le dev implémente les changements

### Modifications côté Code → Figma

1. Si le design system change dans le code
2. Mettez à jour `design-tokens.json`
3. Ré-importez dans Figma via Tokens Studio
4. Tous les composants se mettent à jour automatiquement

---

## 📚 Ressources

### Plugins Figma recommandés

- **Tokens Studio** : Gestion des design tokens
- **Figma to Code** : Export vers React/HTML
- **Anima** : Export interactif
- **Content Reel** : Contenu de test
- **Unsplash** : Images placeholder

### Documentation

- [Tokens Studio Guide](https://docs.tokens.studio/)
- [Figma Best Practices](https://www.figma.com/best-practices/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🆘 Besoin d'aide ?

### Problèmes courants

**Les tokens ne s'importent pas :**

- Vérifiez la version du plugin Tokens Studio
- Assurez-vous que le fichier JSON est valide
- Essayez de redémarrer Figma

**Les couleurs ne correspondent pas :**

- Vérifiez le mode colorimétrique (RGB/HSL)
- Assurez-vous d'utiliser le même espace colorimétrique

**Les fonts ne s'affichent pas :**

- Installez les fonts sur votre système :
  - [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
  - [Inter](https://fonts.google.com/specimen/Inter)

---

**Créé le :** ${new Date().toLocaleDateString('fr-FR')}
**Version :** 1.0.0
**Projet :** The Ultimate Closers - Closing éthique & IA consciente









