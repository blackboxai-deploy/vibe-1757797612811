# 🚀 TaskMaster - Guide de Démarrage Rapide

## ⚡ **Déploiement Ultra-Rapide (2 minutes)**

### **🔥 Option 1: Vercel (Recommandée)**

1. **Allez sur [vercel.com](https://vercel.com)**
2. **Connectez-vous avec GitHub**
3. **Cliquez sur "New Project"**
4. **Importez ce repository ou uploadez les fichiers**
5. **Cliquez sur "Deploy"**
6. **✅ Votre site est en ligne !**

### **🐙 Option 2: Netlify**

1. **Allez sur [netlify.com](https://netlify.com)**
2. **Drag & drop le dossier du projet**
3. **Build command:** `npm run build`
4. **Publish directory:** `.next`
5. **✅ Site déployé !**

---

## 💻 **Installation Locale**

```bash
# 1. Téléchargez et extraire l'archive
tar -xzf taskmaster-app-source.tar.gz
cd taskmaster-export

# 2. Installez les dépendances
npm install

# 3. Lancez en mode développement
npm run dev

# 4. Ouvrez http://localhost:3000
```

---

## 📁 **Fichiers Inclus**

### **✅ Code Source Complet**
- `src/app/` - Pages Next.js
- `src/components/` - Composants React
- `src/hooks/` - Hooks personnalisés
- `src/lib/` - Utilitaires
- `src/types/` - Types TypeScript

### **✅ Configuration**
- `package.json` - Dépendances
- `next.config.ts` - Configuration Next.js
- `tsconfig.json` - Configuration TypeScript
- `components.json` - Configuration shadcn/ui

### **✅ Documentation**
- `TODO.md` - Liste des tâches accomplies
- `EXPORT-GUIDE.md` - Guide détaillé
- `QUICK-START.md` - Ce guide

---

## 🛠️ **Commandes Principales**

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production  
npm run start    # Serveur de production
npm run lint     # Vérification du code
```

---

## 🎯 **Personnalisation Rapide**

### **Changer les couleurs:**
- Modifiez `src/app/globals.css`
- Utilisez les classes Tailwind CSS

### **Ajouter des catégories:**
- Éditez `src/types/task.ts`
- Modifiez `DEFAULT_CATEGORIES`

### **Modifier le titre:**
- Éditez `src/app/layout.tsx`
- Changez le `title` et `description`

---

## 📞 **Support**

**🌐 Application en ligne:** [https://sb-62grytrrjneb.vercel.run](https://sb-62grytrrjneb.vercel.run)

**Technologies utilisées:**
- Next.js 15 + TypeScript
- Tailwind CSS + shadcn/ui
- React Hooks + Recharts
- localStorage pour la persistence

**🎉 Votre application TaskMaster est prête à être déployée !**