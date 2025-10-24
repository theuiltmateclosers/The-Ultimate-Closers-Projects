# 🔄 SCRIPT DE RESTAURATION D'URGENCE - STRUCTURE VITE
# Ce script restaure l'ancienne structure Vite en cas de problème

Write-Host "🔄 RESTAURATION DE LA STRUCTURE VITE..." -ForegroundColor Yellow
Write-Host "⚠️  ATTENTION: Ceci va écraser la structure actuelle!" -ForegroundColor Red

# Demander confirmation
$confirmation = Read-Host "Êtes-vous sûr de vouloir restaurer l'ancienne structure Vite? (oui/non)"
if ($confirmation -ne "oui") {
    Write-Host "❌ Restauration annulée." -ForegroundColor Red
    exit
}

Write-Host "🔄 Restauration en cours..." -ForegroundColor Green

# Restaurer le dossier src
if (Test-Path "backup-vite-structure/src") {
    Write-Host "📁 Restauration du dossier src..." -ForegroundColor Blue
    Remove-Item -Recurse -Force src -ErrorAction SilentlyContinue
    Copy-Item -Recurse -Force backup-vite-structure/src .
    Write-Host "✅ Dossier src restauré" -ForegroundColor Green
} else {
    Write-Host "❌ Sauvegarde du dossier src introuvable" -ForegroundColor Red
}

# Restaurer index.html
if (Test-Path "backup-vite-structure/index.html") {
    Write-Host "📄 Restauration d'index.html..." -ForegroundColor Blue
    Copy-Item -Force backup-vite-structure/index.html .
    Write-Host "✅ index.html restauré" -ForegroundColor Green
} else {
    Write-Host "❌ Sauvegarde d'index.html introuvable" -ForegroundColor Red
}

# Restaurer vite.config.ts
if (Test-Path "backup-vite-structure/vite.config.ts") {
    Write-Host "⚙️ Restauration de vite.config.ts..." -ForegroundColor Blue
    Copy-Item -Force backup-vite-structure/vite.config.ts .
    Write-Host "✅ vite.config.ts restauré" -ForegroundColor Green
} else {
    Write-Host "❌ Sauvegarde de vite.config.ts introuvable" -ForegroundColor Red
}

# Restaurer tsconfig.app.json
if (Test-Path "backup-vite-structure/tsconfig.app.json") {
    Write-Host "📝 Restauration de tsconfig.app.json..." -ForegroundColor Blue
    Copy-Item -Force backup-vite-structure/tsconfig.app.json .
    Write-Host "✅ tsconfig.app.json restauré" -ForegroundColor Green
} else {
    Write-Host "❌ Sauvegarde de tsconfig.app.json introuvable" -ForegroundColor Red
}

# Restaurer components.json
if (Test-Path "backup-vite-structure/components.json") {
    Write-Host "🎨 Restauration de components.json..." -ForegroundColor Blue
    Copy-Item -Force backup-vite-structure/components.json .
    Write-Host "✅ components.json restauré" -ForegroundColor Green
} else {
    Write-Host "❌ Sauvegarde de components.json introuvable" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 RESTAURATION TERMINÉE!" -ForegroundColor Green
Write-Host "📋 Prochaines étapes:" -ForegroundColor Yellow
Write-Host "   1. Vérifiez que le site fonctionne sur theultimateclosers.com" -ForegroundColor White
Write-Host "   2. Si tout fonctionne, vous pouvez supprimer le dossier backup-vite-structure" -ForegroundColor White
Write-Host "   3. Si problème, contactez le support" -ForegroundColor White
Write-Host ""
Write-Host "💡 Pour tester localement: pnpm dev" -ForegroundColor Cyan
