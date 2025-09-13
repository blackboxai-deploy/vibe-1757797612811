# 🚀 Guide de Déploiement - TaskMaster App

## 📋 Structure du Projet

```
taskmaster-app/
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── components.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── TaskManager.tsx
│   │   ├── TaskItem.tsx
│   │   ├── AddTaskForm.tsx
│   │   ├── TaskStats.tsx
│   │   └── ui/ (composants shadcn/ui)
│   ├── hooks/
│   │   └── useTasks.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── taskStorage.ts
│   └── types/
│       └── task.ts
└── public/
    └── (fichiers statiques)
```

## 🌐 **Option 1 : Déploiement Vercel (Recommandé)**

### Étape 1 : Créer un nouveau projet
1. Allez sur [vercel.com](https://vercel.com)
2. Créez un compte gratuit
3. Cliquez sur "New Project"

### Étape 2 : Uploader les fichiers
1. Choisissez "Upload" ou connectez GitHub
2. Uploadez tous les fichiers du projet
3. Vercel détectera automatiquement Next.js

### Étape 3 : Configuration
```bash
# Build Command
npm run build

# Output Directory
.next

# Install Command
npm install
```

### Étape 4 : Déploiement
- Cliquez sur "Deploy"
- Votre site sera disponible à une URL comme `https://votre-app.vercel.app`

---

## 🚀 **Option 2 : Déploiement Netlify**

### Étape 1 : Préparation
1. Allez sur [netlify.com](https://netlify.com)
2. Créez un compte gratuit

### Étape 2 : Configuration Next.js pour Netlify
Ajoutez dans `next.config.ts` :
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### Étape 3 : Build et Deploy
```bash
npm run build
```
- Uploadez le dossier `out/` sur Netlify

---

## 🖥️ **Option 3 : Serveur Local/VPS**

### Installation sur serveur
```bash
# Cloner le projet
git clone <votre-repo>
cd taskmaster-app

# Installer les dépendances
npm install

# Build de production
npm run build

# Démarrer en production
npm start
```

### Avec PM2 (pour maintenir en ligne)
```bash
npm install -g pm2
pm2 start npm --name "taskmaster" -- start
pm2 save
pm2 startup
```

---

## 📱 **Option 4 : GitHub Pages (Static)**

### Configuration pour GitHub Pages
1. Dans `next.config.ts` :
```typescript
const nextConfig = {
  output: 'export',
  basePath: '/nom-de-votre-repo',
  assetPrefix: '/nom-de-votre-repo/'
}
```

2. Créer `.github/workflows/deploy.yml` :
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

---

## 🔧 **Fichiers de Configuration Essentiels**

### package.json
```json
{
  "name": "taskmaster-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    // (toutes les dépendances de votre projet)
  }
}
```

---

## 🚀 **Déploiement Instantané (Recommandation)**

**VERCEL est le plus simple :**

1. **Créer un compte** : [vercel.com](https://vercel.com)
2. **Import GitHub** : Connectez votre repo GitHub
3. **Deploy automatique** : Vercel s'occupe de tout
4. **URL personnalisée** : `https://taskmaster-app.vercel.app`

### Avantages Vercel :
✅ **Gratuit** pour les projets personnels
✅ **HTTPS automatique** et CDN global
✅ **Déploiement automatique** à chaque push Git
✅ **Optimisé** pour Next.js
✅ **Analytics** intégrés
✅ **Domaine personnalisé** possible

---

## 📋 **Checklist de Déploiement**

- [ ] Tous les fichiers copiés
- [ ] Dependencies installées (`npm install`)
- [ ] Build réussi (`npm run build`)
- [ ] Test local (`npm start`)
- [ ] Plateforme de déploiement choisie
- [ ] Configuration des variables d'environnement
- [ ] Test du site déployé
- [ ] Domaine personnalisé configuré (optionnel)

---

## 🆘 **Besoin d'Aide ?**

Si vous rencontrez des problèmes :
1. **Vérifiez les logs** de build
2. **Consultez la documentation** de votre plateforme
3. **Testez localement** avant de déployer
4. **Vérifiez les variables** d'environnement

**Support communautaire :**
- [Discord Next.js](https://nextjs.org/discord)
- [Vercel Support](https://vercel.com/support)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)