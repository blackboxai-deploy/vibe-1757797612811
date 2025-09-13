#!/bin/bash

# 🚀 Script de Création Automatique - TaskMaster App
# Ce script recrée automatiquement l'application complète

echo "🎯 Création de TaskMaster - Application de Gestion de Tâches"
echo "================================================"

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Installez Node.js 18+ d'abord."
    exit 1
fi

# Vérifier pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installation de pnpm..."
    npm install -g pnpm
fi

# Créer le projet Next.js
echo "🏗️  Création du projet Next.js avec TypeScript et Tailwind..."
npx create-next-app@latest taskmaster-app --typescript --tailwind --app --eslint --src-dir --use-pnpm

cd taskmaster-app

# Installer les dépendances
echo "📚 Installation des dépendances..."
pnpm add @hookform/resolvers @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip class-variance-authority clsx cmdk date-fns embla-carousel-react input-otp lucide-react next-themes react-day-picker react-hook-form react-resizable-panels recharts sonner tailwind-merge vaul zod

# Initialiser shadcn/ui
echo "🎨 Configuration de shadcn/ui..."
npx shadcn@latest init -d

# Ajouter les composants shadcn
echo "🧩 Ajout des composants UI..."
npx shadcn@latest add button card input textarea select checkbox badge progress tabs label

echo "✅ Installation terminée !"
echo ""
echo "📁 Prochaines étapes :"
echo "1. cd taskmaster-app"
echo "2. Copiez tous les fichiers .tsx et .ts depuis le projet de démonstration"
echo "3. pnpm dev pour démarrer en développement"
echo "4. pnpm build && pnpm start pour la production"
echo ""
echo "🌐 URL de démonstration : https://sb-62grytrrjneb.vercel.run"
echo "📖 Consultez INSTALLATION_GUIDE.md pour les détails complets"