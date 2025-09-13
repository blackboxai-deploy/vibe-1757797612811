# 📦 TaskMaster - Guide d'Installation Complète

## 🎯 Application de Gestion de Tâches Moderne

Cette application est une démonstration complète d'un gestionnaire de tâches avec interface moderne, statistiques visuelles, et persistence des données.

---

## 🚀 Installation Rapide

### 1️⃣ **Prérequis**
```bash
# Node.js 18+ et pnpm
node --version  # Doit être 18.0.0 ou plus récent
npm install -g pnpm
```

### 2️⃣ **Cloner et Installer**
```bash
# Créer le dossier du projet
mkdir taskmaster-app
cd taskmaster-app

# Initialiser le projet Next.js
npx create-next-app@latest . --typescript --tailwind --app

# Installer les dépendances supplémentaires
pnpm add @hookform/resolvers @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip class-variance-authority clsx cmdk date-fns embla-carousel-react input-otp lucide-react next-themes react-day-picker react-hook-form react-resizable-panels recharts sonner tailwind-merge vaul zod
```

### 3️⃣ **Configuration shadcn/ui**
```bash
# Initialiser shadcn/ui
npx shadcn@latest init

# Ajouter les composants nécessaires
npx shadcn@latest add button card input textarea select checkbox badge progress tabs label
```

---

## 📁 Structure des Fichiers

### **Types et Utilitaires**
1. `src/types/task.ts` - Définitions TypeScript
2. `src/lib/taskStorage.ts` - Gestion du localStorage
3. `src/hooks/useTasks.ts` - Hook personnalisé

### **Composants**
4. `src/app/layout.tsx` - Layout principal
5. `src/app/page.tsx` - Page d'accueil
6. `src/components/TaskManager.tsx` - Gestionnaire principal
7. `src/components/TaskItem.tsx` - Composant tâche individuelle
8. `src/components/AddTaskForm.tsx` - Formulaire d'ajout
9. `src/components/TaskStats.tsx` - Statistiques et graphiques

---

## 🛠️ Commandes de Développement

```bash
# Développement
pnpm dev

# Build production
pnpm build

# Démarrer en production
pnpm start

# Linting
pnpm lint
```

---

## 🌟 Fonctionnalités Principales

### ✅ **Gestion des Tâches**
- Créer, modifier, supprimer des tâches
- Marquer comme terminé/en cours
- Système de priorités (Faible, Moyenne, Haute, Urgente)
- Catégories avec couleurs (Travail, Personnel, Shopping, etc.)
- Dates d'échéance avec alertes visuelles

### 📊 **Tableaux de Bord**
- Statistiques en temps réel
- Graphiques interactifs (camembert et barres)
- Barre de progression globale
- Métriques de productivité

### 💾 **Persistence**
- Sauvegarde automatique en localStorage
- Récupération au rechargement
- Import/Export des données

### 🎨 **Interface**
- Design moderne avec Tailwind CSS
- Composants shadcn/ui élégants
- Interface responsive (mobile/desktop)
- Animations fluides

---

## 🔧 Configuration Avancée

### **Variables d'Environnement** (.env.local)
```env
# Optionnel - pour analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optionnel - pour sentry
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### **Personnalisation des Catégories**
Modifiez `src/types/task.ts` pour ajouter vos catégories :
```typescript
export const DEFAULT_CATEGORIES: TaskCategory[] = [
  { id: 'custom', name: 'Ma Catégorie', color: 'bg-pink-500', icon: '🎨' },
  // ... autres catégories
];
```

---

## 🚀 Déploiement

### **Vercel (Recommandé)**
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

### **Netlify**
```bash
# Build
pnpm build

# Déployer le dossier .next
# Via Netlify Dashboard ou CLI
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📚 Technologies Utilisées

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **shadcn/ui** - Composants UI
- **Recharts** - Graphiques
- **React Hook Form** - Gestion formulaires
- **Zod** - Validation données
- **Date-fns** - Manipulation dates

---

## 🔍 Résolution de Problèmes

### **Erreurs communes :**

**1. Erreur de build TypeScript**
```bash
# Vérifier la configuration
cat tsconfig.json
# Reinstaller les types
pnpm add -D @types/react @types/node
```

**2. Erreurs shadcn/ui**
```bash
# Réinitialiser shadcn
rm components.json
npx shadcn@latest init
```

**3. Problèmes de style**
```bash
# Vérifier Tailwind
cat tailwind.config.js
# Rebuilder les styles
rm -rf .next && pnpm dev
```

---

## 📞 Support

### **Ressources utiles :**
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### **Structure du code :**
- Code modulaire et commenté
- Hooks personnalisés réutilisables
- Gestion d'erreurs robuste
- Tests unitaires possibles avec Jest/Vitest

---

## 🎉 Prêt à Utiliser !

Une fois installé, votre application sera disponible sur `http://localhost:3000`

**Fonctionnalités immédiatement utilisables :**
✅ Interface complètement fonctionnelle
✅ Sauvegarde automatique des données
✅ Statistiques en temps réel
✅ Design responsive
✅ Prêt pour la production

Bon développement ! 🚀