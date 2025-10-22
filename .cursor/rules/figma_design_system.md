# 🎨 The Ultimate Closers - Règles de Design System Figma

> Document de référence pour l'intégration Figma via MCP (Model Context Protocol)

## 📋 Vue d'ensemble

**Projet:** The Ultimate Closers - Closing éthique & IA consciente  
**Stack:** Next.js 14 + React 18 + TailwindCSS 3.4 + Radix UI  
**Framework CSS:** TailwindCSS avec CSS Variables (HSL)  
**Fonts:** Playfair Display (Headings) + Inter (Body)

---

## 🎨 1. Token Definitions

### Couleurs (HSL Format)

Les couleurs sont définies en HSL dans `apps/web/src/app/globals.css` et utilisées via Tailwind.

#### Couleurs Principales

```css
/* Light Mode */
--primary: 167 69% 18%        /* #0D4D44 - Malachite Deep Green */
--primary-foreground: 0 0% 98% /* #FAFAFA */
--primary-glow: 167 69% 35%    /* Glow effect */

--secondary: 44 73% 66%        /* #E9C46A - Golden Accent */
--secondary-foreground: 167 69% 18%
--gold: 44 73% 66%
--gold-glow: 44 100% 75%

--accent: 271 91% 65%          /* #A855F7 - AI Purple */
--accent-foreground: 0 0% 98%

--background: 44 30% 95%       /* #F5F0E8 - Beige clair */
--foreground: 167 69% 18%      /* #0D4D44 */

--muted: 0 0% 93%              /* #EDEDED */
--muted-foreground: 0 0% 45%   /* #737373 */

--border: 167 20% 85%          /* #D6E5E3 */
--destructive: 0 84.2% 60.2%   /* #EF4444 */
```

#### Mapping Figma

Dans Figma, créez des **Color Styles** avec ces noms :

- `Primary/Default` → #0D4D44
- `Primary/Foreground` → #FAFAFA
- `Secondary/Default` → #E9C46A
- `Secondary/Foreground` → #0D4D44
- `Accent/Default` → #A855F7
- `Accent/Foreground` → #FAFAFA
- `Background` → #F5F0E8
- `Foreground` → #0D4D44
- `Muted/Default` → #EDEDED
- `Muted/Foreground` → #737373
- `Border` → #D6E5E3
- `Destructive` → #EF4444

### Typographie

#### Font Families

```typescript
// tailwind.config.ts
fontFamily: {
  playfair: ['Playfair Display', 'serif'],  // Headings
  inter: ['Inter', 'sans-serif'],            // Body
}
```

#### Font Sizes

```typescript
fontSize: {
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
  '5xl': '48px',
  '6xl': '60px',
  '7xl': '72px',
}
```

#### Text Styles Figma

Créez ces **Text Styles** dans Figma :

**Headings (Playfair Display, Bold 700)**

- `Heading/Hero` → 72px, line-height 1.2
- `Heading/Section` → 48px, line-height 1.25
- `Heading/Subsection` → 36px, line-height 1.3
- `Heading/Card` → 24px, line-height 1.3

**Body (Inter)**

- `Body/XL` → 20px, Regular 400, line-height 1.5
- `Body/Large` → 18px, Regular 400, line-height 1.5
- `Body/Base` → 16px, Regular 400, line-height 1.5
- `Body/Small` → 14px, Regular 400, line-height 1.5
- `Body/XS` → 12px, Regular 400, line-height 1.5

**Body Medium/Semibold**

- Ajouter variants avec weight 500 et 600 si nécessaire

### Spacing System

Base : **Multiples de 4px**

```typescript
spacing: {
  0: '0px',
  1: '4px',      // 0.25rem
  2: '8px',      // 0.5rem
  3: '12px',     // 0.75rem
  4: '16px',     // 1rem
  5: '20px',     // 1.25rem
  6: '24px',     // 1.5rem
  8: '32px',     // 2rem
  10: '40px',    // 2.5rem
  12: '48px',    // 3rem
  16: '64px',    // 4rem
  20: '80px',    // 5rem
  24: '96px',    // 6rem
}
```

Dans Figma : Utilisez **Auto Layout** avec ces espacements.

### Border Radius

```css
--radius: 0.75rem (12px);
```

```typescript
borderRadius: {
  none: '0px',
  sm: '4px',
  base: '6px',
  md: '8px',
  lg: '12px',     // var(--radius)
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
}
```

### Shadows

```typescript
shadows: {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  'glow-gold': '0 0 30px rgba(233, 196, 106, 0.5)',
  'glow-ai': '0 0 30px rgba(168, 85, 247, 0.4)',
}
```

Dans Figma : Créez des **Effect Styles** pour chaque ombre.

---

## 🧩 2. Component Library

### Architecture

```
apps/web/src/components/
├── ui/                    # Composants primitifs (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   └── ... (52+ composants Radix UI)
├── Hero.tsx              # Sections composées
├── Mission.tsx
├── Services.tsx
├── AISection.tsx
├── Results.tsx
├── Testimonials.tsx
├── CTA.tsx
├── Header.tsx
├── Footer.tsx
└── Legal.tsx
```

### Composants UI Principaux

#### Button Component

**Fichier:** `apps/web/src/components/ui/button.tsx`

**Variants:**

```typescript
variant: {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
}

size: {
  default: "h-10 px-4 py-2",    // 40px height
  sm: "h-9 px-3",               // 36px height
  lg: "h-11 px-8",              // 44px height
  icon: "h-10 w-10",
}
```

**States Figma:**

- Default
- Hover (scale-105, brightness adjusted)
- Active
- Disabled (opacity-50)

#### Card Component

**Fichier:** `apps/web/src/components/ui/card.tsx`

**Structure:**

```tsx
<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
  </CardHeader>
  <CardContent />
  <CardFooter />
</Card>
```

**Styles:**

- Background: `bg-card`
- Border: `border border-border`
- Radius: `rounded-lg` (12px)
- Shadow: `shadow-md` ou `shadow-lg`
- Hover: `hover:shadow-xl hover:-translate-y-1`

#### Badge Component

**Fichier:** `apps/web/src/components/ui/badge.tsx`

**Variants:**

```typescript
variant: {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  outline: "text-foreground border border-input",
}
```

---

## 🏗️ 3. Sections Structure

### Hero Section

**Fichier:** `apps/web/src/components/Hero.tsx`

**Éléments:**

1. Background image avec gradient overlay

   - Image: `/assets/hero-cosmic.jpg`
   - Gradient: `linear-gradient(rgba(13, 77, 68, 0.85), rgba(18, 18, 18, 0.9))`
   - Background attachment: `fixed` (parallax)

2. Badge avec Sparkles icon

   - Background: `bg-primary/20 backdrop-blur-sm`
   - Border: `border-secondary/30`
   - Text: "Closing Éthique & IA Consciente"
   - Icon: Sparkles avec animation `glow-pulse`

3. H1 Title

   - Font: Playfair Display Bold
   - Size: 72px (desktop), 48px (tablet), 36px (mobile)
   - Color: `text-background` (#F5F0E8)

4. Subtitle

   - Font: Inter Regular
   - Size: 20px (desktop), 18px (mobile)
   - Color: `text-background/90`

5. CTA Buttons (2)

   - Primary: `bg-secondary` avec hover `scale-105`
   - Secondary: `outline` avec backdrop-blur

6. Scroll indicator

   - Animation `float` (translateY -10px)
   - Border: `border-secondary/50`
   - Inner dot: `bg-secondary` avec `animate-pulse`

7. Particules animées (20)
   - Size: 4px (w-1 h-1)
   - Color: `bg-secondary`
   - Animation: `particle-float` (8-12s duration)
   - Positions: Random

**Layout Figma:**

- Min-height: 100vh
- Padding-top: 80px (header height)
- Content: Center aligned, max-width 896px

### Mission Section

**Éléments:**

- H2 Title (48px, Playfair Display)
- Description text (18px, Inter)
- Grid 4 colonnes (desktop), 2x2 (tablet), 1 col (mobile)
- 4 Value cards avec icons: Heart, Eye, Handshake, Zap

**Card Structure:**

- Icon container: 64px × 64px, `bg-primary/10`, rounded-full
- Title: 20px, Playfair Display Bold
- Text: 16px, Inter Regular
- Hover: `translate-y-1`, `shadow-xl`

### Services Section

**Éléments:**

- H2 Title
- Grid 4 colonnes (1 mobile, 2 tablet, 4 desktop)
- Icons: TrendingUp, Users, LineChart, Bot
- Gradient hover effect: `hover:bg-gradient-to-br from-primary/5 to-secondary/5`

### AI Section

**Background:** `/assets/ai-network.jpg` avec dark overlay

**Éléments:**

- H2 Title (white)
- 3 Feature cards
- Icons: MessageSquare, Database, Brain
- Floating light effects
- Dark theme colors

### Results Section

**Éléments:**

- 3 Metric cards
- Icons: TrendingUp, Shield, Star
- Counter-up animation au scroll
- Citation avec auteur

### Testimonials Section

**Éléments:**

- 3 Testimonial cards (1 col mobile, 3 col desktop)
- Avatar avec initiales (48px rounded-full)
- Quote icon
- Client name + flag emoji
- 5 stars rating

### CTA Section

**Background:** Gradient primary avec blur effects

**Éléments:**

- H2 Title (60px)
- CTA button avec Calendar + ArrowRight icons
- Animated light blobs

### Header

**Éléments:**

- Logo + Sparkles icon
- Navigation: Accueil, Services, IA, Témoignages, Contact
- Language selector (FR/EN/DAR)
- Mobile hamburger menu
- States: Default, Scrolled (bg-background/95 backdrop-blur), Menu Open

**Layout:**

- Height: 80px
- Sticky top
- z-index: 50

### Footer

**Éléments:**

- Logo
- Citation inspirante
- Social links (LinkedIn, Instagram, YouTube)
- Copyright
- Legal links

---

## 🎭 4. Animations

### Keyframes Tailwind

```typescript
keyframes: {
  'fade-in': {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  'fade-in-scale': {
    '0%': { opacity: '0', transform: 'scale(0.95)' },
    '100%': { opacity: '1', transform: 'scale(1)' },
  },
  'glow-pulse': {
    '0%, 100%': { filter: 'drop-shadow(0 0 8px hsl(44, 73%, 66% / 0.4))' },
    '50%': { filter: 'drop-shadow(0 0 20px hsl(44, 73%, 66% / 0.8))' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
  },
  'particle-float': {
    '0%, 100%': { transform: 'translate(0, 0)' },
    '25%': { transform: 'translate(10px, -10px)' },
    '50%': { transform: 'translate(-10px, -5px)' },
    '75%': { transform: 'translate(5px, 10px)' },
  },
}

animation: {
  'fade-in': 'fade-in 0.6s ease-out',
  'fade-in-scale': 'fade-in-scale 0.5s ease-out',
  'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
  float: 'float 3s ease-in-out infinite',
  'particle-float': 'particle-float 8s ease-in-out infinite',
}
```

**Prototypage Figma:**

- Smart Animate entre frames
- Ease in-out curves
- Durées: 300ms (base), 600ms (fade-in), 2-8s (loops)

---

## 📐 5. Responsive Breakpoints

```typescript
screens: {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',  // Container max-width
}
```

### Container

```typescript
container: {
  center: true,
  padding: '2rem',  // 32px
  screens: {
    '2xl': '1400px',
  },
}
```

**Dans Figma:**

- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px
- Desktop Large: 1920px

---

## 🎯 6. Styling Approach

### Méthodologie

- **TailwindCSS Utility-First** : Toutes les classes utilitaires
- **CSS Variables (HSL)** : Thème centralisé dans `globals.css`
- **Class Variance Authority (CVA)** : Variants de composants
- **Tailwind Merge + CLSX** : Merge conditionnel de classes

### Utility Function

```typescript
// apps/web/src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Pattern d'utilisation

```tsx
<Button className={cn('custom-class', condition && 'conditional-class')} />
```

---

## 🎨 7. Icons System

### Bibliothèque : Lucide React

**Installation :** `lucide-react` v0.263.1

**Usage :**

```tsx
import { Sparkles, ArrowRight, Heart, TrendingUp } from 'lucide-react';

<Sparkles className="w-5 h-5 text-secondary" />;
```

**Tailles standards :**

- `w-4 h-4` → 16px (dans buttons)
- `w-5 h-5` → 20px (badges, small icons)
- `w-6 h-6` → 24px (section icons)
- `w-12 h-12` → 48px (large icons)

**Naming Convention :** PascalCase (ex: `MessageSquare`, `TrendingUp`)

**Dans Figma :** Importez les icons depuis [lucide.dev](https://lucide.dev) en SVG

---

## 🖼️ 8. Asset Management

### Structure

```
apps/web/public/
└── assets/
    ├── hero-cosmic.jpg      # Hero background
    ├── ai-network.jpg       # AI Section background
    └── ... (autres assets)
```

### Optimisation

- **Format :** WebP (si possible), sinon JPG/PNG
- **Compression :** Optimisé pour le web
- **Résolution :** @2x pour Retina (ex: 2880px width pour 1440px display)

### Référence dans le code

```tsx
style={{
  backgroundImage: `url(/assets/hero-cosmic.jpg)`,
}}
```

**Dans Figma :** Utilisez les mêmes noms de fichiers comme références

---

## 📦 9. Build & Dependencies

### Framework

- **Next.js 14.2.0** (App Router)
- **React 18.3.1**
- **TypeScript 5.3.3**

### Styling

- **TailwindCSS 3.4.1**
- **tailwindcss-animate 1.0.7**
- **PostCSS 8.4.35**
- **Autoprefixer 10.4.18**

### UI Libraries

- **Radix UI** (52+ composants primitifs)
- **class-variance-authority** (variants)
- **lucide-react** (icons)
- **sonner** (toasts)

### Utilities

- **clsx** + **tailwind-merge** : Class merging
- **date-fns** : Date formatting
- **recharts** : Charts (si analytics)

---

## 🔄 10. Workflow Figma → Code

### 1. Design dans Figma

- Utilisez les Color Styles et Text Styles définis
- Nommez les layers clairement (ex: `Hero/Title`, `Button/Primary`)
- Utilisez Auto Layout avec les espacements du système
- Organisez en Frames par section

### 2. Export des assets

- Images : WebP ou JPG optimisé, @2x
- Icons : SVG, stroke outlined
- Nommez selon la convention : `section-name.jpg`

### 3. Génération de code

Via MCP Figma Tools :

```typescript
// Obtenir le code d'un composant
mcp_Figma_get_design_context({
  fileKey: 'votre-file-key',
  nodeId: '123:456',
  clientFrameworks: 'react,next.js,tailwindcss',
  clientLanguages: 'typescript,javascript',
});

// Obtenir la structure
mcp_Figma_get_metadata({
  fileKey: 'votre-file-key',
  nodeId: '0:1', // Page ID
});

// Screenshot
mcp_Figma_get_screenshot({
  fileKey: 'votre-file-key',
  nodeId: '123:456',
});
```

### 4. Intégration dans le code

- Copiez les tokens dans les CSS variables si modifiés
- Créez les composants dans `apps/web/src/components/`
- Utilisez les composants UI existants comme base
- Respectez la structure des variants (CVA)

---

## 📝 11. Conventions de Nommage

### Fichiers

- Composants : `PascalCase.tsx` (ex: `Hero.tsx`, `AISection.tsx`)
- Utilitaires : `camelCase.ts` (ex: `utils.ts`)
- Styles : `kebab-case.css` (ex: `globals.css`)

### Classes CSS

- Tailwind utilities : `lowercase` avec tirets
- Custom classes : `kebab-case`

### Composants React

- Nom : `PascalCase`
- Props : `camelCase`
- Types : `PascalCase` avec suffix (ex: `ButtonProps`)

### Figma

- Frames : `Section/Name` (ex: `Hero/Mobile`, `Services/Desktop`)
- Components : `Component/Variant` (ex: `Button/Primary`, `Card/Hover`)
- Layers : Descriptifs (ex: `Background Gradient`, `CTA Button`)

---

## 🎓 12. Best Practices

### Figma

1. **Utilisez des composants** pour les éléments réutilisables
2. **Auto Layout partout** pour la responsivité
3. **Variants pour les états** (hover, active, disabled)
4. **Boolean properties** pour les options (withIcon, fullWidth)
5. **Text properties** pour le contenu dynamique
6. **Nommez clairement** tous les layers

### Code

1. **Composants réutilisables** : Évitez la duplication
2. **Props typées** : Utilisez TypeScript strictement
3. **Accessibilité** : ARIA labels, semantic HTML
4. **Performance** : Lazy loading, Image optimization
5. **Responsive** : Mobile-first approach
6. **Dark mode ready** : Utilisez les CSS variables

### MCP Workflow

1. **Toujours vérifier `whoami`** avant d'interagir avec Figma
2. **Utiliser `get_metadata`** pour explorer la structure
3. **`get_design_context` pour le code** de composants spécifiques
4. **`get_screenshot` pour validation** visuelle
5. **Documenter les node IDs** importants

---

## 🚀 13. Quick Start Figma

### Setup Initial

1. **Créer un nouveau fichier Figma** : "The Ultimate Closers"
2. **Installer les fonts** :

   - [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
   - [Inter](https://fonts.google.com/specimen/Inter)

3. **Créer les Color Styles** (voir section 1)
4. **Créer les Text Styles** (voir section 1)
5. **Créer les Effect Styles** (shadows)

### Import des Tokens

**Option 1 : Plugin Tokens Studio**

- Installer "Tokens Studio for Figma"
- Importer `figma-export/design-tokens.json`

**Option 2 : Manuel**

- Suivre le guide dans `figma-export/GUIDE-IMPORT-FIGMA.md`

### Créer les Composants

1. **Button** : 6 variants × 4 sizes = 24 variants
2. **Card** : Header + Content + Footer
3. **Badge** : 4 variants
4. **Avatar** : Avec initiales
5. **Icon Container** : Cercle 48px/64px

### Créer les Sections

1. Frame Desktop (1440px)
2. Frame Tablet (768px)
3. Frame Mobile (375px)
4. Sections : Hero, Mission, Services, AI, Results, Testimonials, CTA
5. Layout : Header (sticky) + Footer

---

## 📚 14. Ressources

### Documentation

- [TailwindCSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/primitives)
- [Next.js](https://nextjs.org/docs)
- [Lucide Icons](https://lucide.dev)
- [Figma MCP](https://www.figma.com/community/plugin/cursor-talk-to-figma)

### Fichiers Projet

- Design Tokens : `figma-export/design-tokens.json`
- Structure Composants : `figma-export/components-structure.json`
- Guide Import : `figma-export/GUIDE-IMPORT-FIGMA.md`
- Tailwind Config : `apps/web/tailwind.config.ts`
- CSS Variables : `apps/web/src/app/globals.css`

---

**Version :** 1.0.0  
**Dernière mise à jour :** ${new Date().toLocaleDateString('fr-FR')}  
**Maintenu par :** The Ultimate Closers Team

