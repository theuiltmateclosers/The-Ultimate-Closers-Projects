# 📝 Exemple Concret - Créer une Section Hero avec MCP Figma

> Guide pas-à-pas pour créer votre première section avec Figma + Cursor MCP

---

## 🎯 Objectif

Créer une section **Hero** complète :

- Design dans Figma
- Génération automatique du code React + TailwindCSS
- Intégration dans le projet

**Temps estimé :** 20 minutes

---

## 📐 Étape 1 : Créer le design dans Figma (10 min)

### A. Setup de la frame

1. **Ouvrez Figma Desktop**
2. **Créez une nouvelle Frame** :
   - Nom : `Hero - Desktop`
   - Taille : 1440 × 900 px
   - Fill : #0D4D44 (Primary color)

### B. Ajoutez le contenu

**1. Badge au sommet**

```
Type : Frame avec Auto Layout
Size : Auto × 48px
Padding : 24px horizontal, 12px vertical
Background : Primary avec 20% opacity + Blur 4px
Border : 1px, Secondary color (#E9C46A), 30% opacity
Radius : 9999px (full)

Contenu :
- Icon Sparkles (20×20px, couleur Secondary)
- Gap : 8px
- Texte : "Closing Éthique & IA Consciente"
  - Style : Body/Small
  - Color : Secondary
  - Weight : Medium (500)
```

**2. Titre principal**

```
Type : Text
Content : "Transformez Vos Ventes avec l'Éthique & l'IA"
Style : Heading/Hero
Font : Playfair Display
Size : 72px
Weight : Bold (700)
Color : Background (#F5F0E8)
Line height : 1.2 (86.4px)
Align : Center
Max width : 896px
```

**3. Sous-titre**

```
Type : Text
Content : "Rejoignez la révolution du closing conscient..."
Style : Body/Large
Font : Inter
Size : 20px
Weight : Regular (400)
Color : Background avec 90% opacity
Line height : 1.5 (30px)
Align : Center
Max width : 768px
Margin top : 24px
```

**4. Boutons CTA (Container)**

```
Type : Frame avec Auto Layout
Direction : Horizontal
Gap : 16px
Align : Center
Margin top : 40px

Button 1 (Primary) :
- Text : "Réserver un Appel ✨"
- Background : Secondary (#E9C46A)
- Text color : Primary (#0D4D44)
- Padding : 24px horizontal, 24px vertical
- Border radius : 9999px (full)
- Shadow : lg
- Font : Inter Medium, 16px

Button 2 (Secondary) :
- Text : "Découvrir l'IA Darija"
- Background : Background (#F5F0E8) avec 10% opacity + Blur 4px
- Border : 2px, Secondary color
- Text color : Background (#F5F0E8)
- Padding : 24px horizontal, 24px vertical
- Border radius : 9999px
- Font : Inter Medium, 16px
```

**5. Scroll indicator**

```
Type : Frame
Size : 24 × 40px
Border : 2px, Secondary avec 50% opacity
Border radius : 9999px
Align : Center
Margin top : 64px

Inner dot :
- Size : 4 × 12px
- Fill : Secondary
- Border radius : 9999px
- Position : Top center avec 8px padding
```

### C. Structure finale

```
Hero - Desktop (1440×900)
├── Background (#0D4D44)
├── Container (Auto Layout Vertical, Center)
│   ├── Badge
│   │   ├── Icon Sparkles
│   │   └── Text
│   ├── Title (H1)
│   ├── Subtitle
│   ├── CTA Container (Auto Layout Horizontal)
│   │   ├── Button Primary
│   │   └── Button Secondary
│   └── Scroll Indicator
│       └── Dot
```

### D. Finalisez

1. **Sélectionnez toute la frame** "Hero - Desktop"
2. **Clic droit** → **Copy link to selection**
3. Vous obtenez quelque chose comme :
   ```
   https://figma.com/design/ABC123XYZ456/TheUltimateClosers?node-id=15-200
   ```
4. **Gardez ce lien** pour l'étape suivante ✅

---

## 💻 Étape 2 : Générer le code avec Cursor (2 min)

### A. Ouvrez Cursor

1. Ouvrez le projet dans Cursor
2. Assurez-vous que le plugin Figma MCP est actif dans Figma Desktop

### B. Demandez la génération

**Dans le chat Cursor, tapez :**

```
Génère le composant Hero depuis ce design Figma :
https://figma.com/design/ABC123XYZ456/TheUltimateClosers?node-id=15-200

Spécifications :
- Fichier : apps/web/src/components/Hero.tsx
- Framework : Next.js 14 + TypeScript
- Styling : TailwindCSS (utilise les tokens du design system)
- Structure :
  * Section full-screen avec min-h-screen
  * Container centré avec max-w-4xl
  * Background image : /assets/hero-cosmic.jpg avec gradient overlay
  * Utilise les animations Tailwind : fade-in, float, particle-float
- Responsive :
  * Mobile : text-4xl pour le titre
  * Tablet : text-6xl
  * Desktop : text-7xl
  * Buttons en colonne sur mobile, row sur desktop
- Icônes : lucide-react (Sparkles, ArrowRight)
- Internationalisation : Utilise useLanguage hook pour les textes
```

### C. L'IA va :

1. ✅ Se connecter à Figma via MCP
2. ✅ Lire votre design (structure, couleurs, textes, spacings)
3. ✅ Mapper aux tokens Tailwind existants
4. ✅ Générer le code TypeScript complet
5. ✅ Créer le fichier `apps/web/src/components/Hero.tsx`

### D. Code généré (exemple)

```typescript
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(13, 77, 68, 0.85), rgba(18, 18, 18, 0.9)), url(/assets/hero-cosmic.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-primary/20 backdrop-blur-sm border border-secondary/30">
            <Sparkles className="w-5 h-5 text-secondary animate-glow-pulse" />
            <span className="font-inter text-sm text-secondary font-medium">
              Closing Éthique & IA Consciente
            </span>
          </div>

          {/* Title */}
          <h1 className="font-playfair font-bold text-4xl md:text-6xl lg:text-7xl text-background mb-6 leading-tight">
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-lg md:text-xl text-background/90 mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group"
            >
              {t('hero.cta.primary')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-background/10 backdrop-blur-sm border-2 border-secondary hover:bg-secondary hover:text-primary text-background font-semibold px-8 py-6 rounded-full transition-all"
            >
              {t('hero.cta.secondary')}
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-float">
            <div className="w-6 h-10 border-2 border-secondary/50 rounded-full mx-auto flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-secondary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

---

## ✅ Étape 3 : Vérification et ajustements (5 min)

### A. Vérifiez le code

1. **Ouvrez** `apps/web/src/components/Hero.tsx`
2. **Vérifiez** que :
   - ✅ Les couleurs utilisent les tokens (`text-primary`, `bg-secondary`)
   - ✅ Les fonts sont correctes (`font-playfair`, `font-inter`)
   - ✅ Les tailles sont responsive (`text-4xl md:text-6xl lg:text-7xl`)
   - ✅ Les animations sont présentes (`animate-fade-in`, `animate-float`)
   - ✅ Les icônes sont importées de `lucide-react`

### B. Testez en dev

```bash
cd apps/web
pnpm dev
```

Ouvrez http://localhost:3000 et admirez ! 🎉

### C. Ajustements si nécessaire

**Si quelque chose ne matche pas, dites simplement :**

```
"Le titre est trop petit sur mobile, passe à text-5xl"
"Ajoute plus d'espace entre le badge et le titre (mb-8)"
"Le gradient est trop sombre, augmente l'opacité à 0.75"
```

L'IA ajuste instantanément ! ✨

---

## 🔄 Étape 4 : Itération (optionnel)

### Modifier le design

1. **Retournez dans Figma**
2. **Modifiez** votre design (ex: changez la couleur du badge)
3. **Copiez le nouveau lien**
4. **Dites à Cursor :**
   ```
   "Mon design Hero a changé, mets à jour apps/web/src/components/Hero.tsx :
   [nouveau lien Figma]"
   ```
5. ✅ Le code est mis à jour automatiquement !

---

## 📊 Résultat Final

### Ce que vous avez obtenu :

- ✅ **Design Figma** professionnel et cohérent
- ✅ **Code React** propre et typé
- ✅ **TailwindCSS** avec tokens du design system
- ✅ **Responsive** (mobile, tablet, desktop)
- ✅ **Animations** fluides
- ✅ **Accessibilité** (semantic HTML)
- ✅ **Internationalisation** prête
- ✅ **Performance** optimisée

### Temps passé :

- Design Figma : **10 min**
- Génération code : **30 secondes** ⚡
- Vérifications : **2 min**

**Total : ~15 min au lieu de 2h+ manuellement !**

---

## 🎓 Ce que vous avez appris

1. ✅ Structurer un design dans Figma pour le MCP
2. ✅ Utiliser Auto Layout efficacement
3. ✅ Copier un lien Figma
4. ✅ Demander la génération de code à Cursor
5. ✅ Vérifier et ajuster le résultat
6. ✅ Itérer rapidement entre design et code

---

## 🚀 Prochaines étapes

Répétez ce processus pour :

- [ ] Section Mission (grille 4 colonnes)
- [ ] Section Services (cards avec icônes)
- [ ] Section AI (background sombre)
- [ ] Section Results (métriques)
- [ ] Section Testimonials (témoignages)
- [ ] Section CTA (appel à l'action)
- [ ] Header (navigation)
- [ ] Footer

**À chaque fois :**

1. Design dans Figma (10-15 min)
2. Copier le lien
3. Demander à Cursor
4. Code prêt en 30 secondes ! ⚡

---

## 💡 Astuces pour aller plus vite

### 1. Créez des composants réutilisables

Dans Figma, créez :

- `Component/Button/Primary`
- `Component/Button/Secondary`
- `Component/Card`
- `Component/Badge`

Ensuite, réutilisez-les partout !

### 2. Utilisez les variants

Au lieu de créer 6 boutons différents, créez :

- 1 Component "Button"
- Avec variants : `type` (primary, secondary, ghost)
- Et `size` (sm, md, lg)

L'IA génère automatiquement le code CVA ! 🎯

### 3. Dupliquez et modifiez

- Dupliquez la frame Hero
- Renommez en "Mission"
- Modifiez le contenu
- Régénérez le code

Plus rapide que de repartir de zéro !

---

## ✨ Conclusion

Vous venez de découvrir la puissance du **MCP Figma + Cursor** :

- 🎨 Design visuel dans Figma
- 🤖 IA génère le code parfait
- ⚡ 10x plus rapide qu'avant
- ✅ Zéro erreur de tokens
- 🔄 Synchronisation bidirectionnelle

**Welcome to the future of Design-to-Code ! 🚀**

---

_Exemple créé le ${new Date().toLocaleDateString('fr-FR')}_  
_The Ultimate Closers - Closing éthique & IA consciente_

