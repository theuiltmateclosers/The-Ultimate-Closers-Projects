# 🔄 GUIDE DE RESTAURATION D'URGENCE

## ⚠️ **ATTENTION : SAUVEGARDE CRÉÉE**

Une sauvegarde complète de l'ancienne structure Vite a été créée dans le dossier `backup-vite-structure/`.

## 📁 **CONTENU DE LA SAUVEGARDE**

```
backup-vite-structure/
├── src/                    # Dossier source Vite complet
│   ├── App.tsx
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   └── assets/
├── index.html             # Point d'entrée Vite
├── vite.config.ts         # Configuration Vite
├── tsconfig.app.json      # Configuration TypeScript
└── components.json        # Configuration shadcn/ui
```

## 🚨 **RESTAURATION D'URGENCE**

### **Méthode 1 : Script PowerShell (Recommandé)**
```powershell
# Exécuter le script de restauration
.\RESTORE-VITE-STRUCTURE.ps1
```

### **Méthode 2 : Restauration Manuelle**
```powershell
# Restaurer le dossier src
Remove-Item -Recurse -Force src -ErrorAction SilentlyContinue
Copy-Item -Recurse -Force backup-vite-structure/src .

# Restaurer les fichiers de configuration
Copy-Item -Force backup-vite-structure/index.html .
Copy-Item -Force backup-vite-structure/vite.config.ts .
Copy-Item -Force backup-vite-structure/tsconfig.app.json .
Copy-Item -Force backup-vite-structure/components.json .
```

### **Méthode 3 : Restauration Git (Si commité)**
```bash
# Si vous avez commité avant la suppression
git checkout HEAD~1 -- src/
git checkout HEAD~1 -- index.html
git checkout HEAD~1 -- vite.config.ts
git checkout HEAD~1 -- tsconfig.app.json
git checkout HEAD~1 -- components.json
```

## ✅ **VÉRIFICATION POST-RESTAURATION**

1. **Vérifiez que les fichiers sont restaurés :**
   ```powershell
   Test-Path src/App.tsx
   Test-Path index.html
   Test-Path vite.config.ts
   ```

2. **Testez le développement local :**
   ```bash
   pnpm dev
   ```

3. **Vérifiez le site en production :**
   - Visitez `https://theultimateclosers.com`
   - Vérifiez que le site fonctionne

## 🗑️ **NETTOYAGE (Après Vérification)**

Une fois que vous êtes sûr que tout fonctionne :

```powershell
# Supprimer la sauvegarde (ATTENTION : IRREVERSIBLE)
Remove-Item -Recurse -Force backup-vite-structure
Remove-Item -Force RESTORE-VITE-STRUCTURE.ps1
Remove-Item -Force RESTORE-VITE-STRUCTURE.md
```

## 📞 **SUPPORT**

Si la restauration ne fonctionne pas :

1. **Vérifiez** que le dossier `backup-vite-structure/` existe
2. **Vérifiez** que les fichiers sont présents dans la sauvegarde
3. **Contactez** le support technique
4. **Utilisez** Git pour revenir à un commit précédent

---

**Date de création :** $(Get-Date)  
**Statut :** Sauvegarde complète créée ✅
