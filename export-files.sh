#!/bin/bash

# Script d'export pour TaskMaster App
echo "🚀 Création de l'archive TaskMaster..."

# Créer un dossier temporaire pour l'export
mkdir -p taskmaster-export

# Copier tous les fichiers essentiels
echo "📁 Copie des fichiers de configuration..."
cp package.json taskmaster-export/
cp next.config.ts taskmaster-export/
cp tailwind.config.ts taskmaster-export/ 2>/dev/null || echo "tailwind.config.ts non trouvé"
cp tsconfig.json taskmaster-export/
cp components.json taskmaster-export/
cp postcss.config.mjs taskmaster-export/ 2>/dev/null || echo "postcss.config.mjs non trouvé"
cp README.md taskmaster-export/ 2>/dev/null || echo "README.md non trouvé"

echo "📂 Copie des dossiers source..."
cp -r src taskmaster-export/ 2>/dev/null || echo "Dossier src non trouvé"
cp -r public taskmaster-export/ 2>/dev/null || echo "Dossier public non trouvé"

echo "📋 Copie des fichiers de documentation..."
cp TODO.md taskmaster-export/ 2>/dev/null || echo "TODO.md non trouvé"
cp EXPORT-GUIDE.md taskmaster-export/ 2>/dev/null || echo "EXPORT-GUIDE.md non trouvé"

echo "📦 Création de l'archive..."
tar -czf taskmaster-app-source.tar.gz taskmaster-export/

echo "🧹 Nettoyage..."
rm -rf taskmaster-export

echo "✅ Archive créée : taskmaster-app-source.tar.gz"
echo "📊 Taille du fichier :"
ls -lh taskmaster-app-source.tar.gz

echo ""
echo "🎉 Export terminé !"
echo "👉 Téléchargez le fichier 'taskmaster-app-source.tar.gz'"
echo "👉 Ou suivez le guide dans EXPORT-GUIDE.md"