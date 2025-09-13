# 📄 TaskMaster - Code Source Complet

## 🎯 Application de Gestion de Tâches - Tous les Fichiers

---

## 📁 Structure du Projet

```
taskmaster-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/          # Composants shadcn (générés automatiquement)
│   │   ├── TaskManager.tsx
│   │   ├── TaskItem.tsx
│   │   ├── AddTaskForm.tsx
│   │   └── TaskStats.tsx
│   ├── hooks/
│   │   └── useTasks.ts
│   ├── lib/
│   │   ├── utils.ts     # Généré par shadcn
│   │   └── taskStorage.ts
│   └── types/
│       └── task.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── components.json      # Configuration shadcn
└── next.config.ts
```

---

## 🔧 1. Types TypeScript (src/types/task.ts)

```typescript
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: TaskCategory;
  priority: TaskPriority;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface TaskCategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface TaskFilter {
  status: 'all' | 'active' | 'completed';
  category?: string;
  priority?: TaskPriority;
}

export interface TaskStats {
  total: number;
  completed: number;
  active: number;
  byCategory: Record<string, number>;
  byPriority: Record<TaskPriority, number>;
  completionRate: number;
}

export const DEFAULT_CATEGORIES: TaskCategory[] = [
  { id: 'work', name: 'Travail', color: 'bg-blue-500', icon: '💼' },
  { id: 'personal', name: 'Personnel', color: 'bg-green-500', icon: '🏠' },
  { id: 'shopping', name: 'Shopping', color: 'bg-purple-500', icon: '🛒' },
  { id: 'health', name: 'Santé', color: 'bg-red-500', icon: '❤️' },
  { id: 'learning', name: 'Apprentissage', color: 'bg-yellow-500', icon: '📚' },
  { id: 'other', name: 'Autre', color: 'bg-gray-500', icon: '📝' }
];

export const PRIORITY_COLORS = {
  low: 'text-gray-500 bg-gray-100',
  medium: 'text-yellow-600 bg-yellow-100',
  high: 'text-orange-600 bg-orange-100',
  urgent: 'text-red-600 bg-red-100'
} as const;

export const PRIORITY_LABELS = {
  low: 'Faible',
  medium: 'Moyenne',
  high: 'Haute',
  urgent: 'Urgente'
} as const;
```

---

## 💾 2. Gestion du Stockage (src/lib/taskStorage.ts)

```typescript
import { Task, TaskCategory, DEFAULT_CATEGORIES } from '@/types/task';

const TASKS_STORAGE_KEY = 'todo-app-tasks';
const CATEGORIES_STORAGE_KEY = 'todo-app-categories';

export class TaskStorage {
  static getTasks(): Task[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
      if (!tasksJson) return [];
      
      const tasks = JSON.parse(tasksJson);
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined
      }));
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  }

  static saveTasks(tasks: Task[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

  static getCategories(): TaskCategory[] {
    if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
    
    try {
      const categoriesJson = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (!categoriesJson) {
        this.saveCategories(DEFAULT_CATEGORIES);
        return DEFAULT_CATEGORIES;
      }
      
      return JSON.parse(categoriesJson);
    } catch (error) {
      console.error('Error loading categories:', error);
      return DEFAULT_CATEGORIES;
    }
  }

  static saveCategories(categories: TaskCategory[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  }

  static generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  static exportData(): string {
    const tasks = this.getTasks();
    const categories = this.getCategories();
    
    return JSON.stringify({
      tasks,
      categories,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }

  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.tasks) {
        this.saveTasks(data.tasks);
      }
      
      if (data.categories) {
        this.saveCategories(data.categories);
      }
      
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  static clearAllData(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(TASKS_STORAGE_KEY);
    localStorage.removeItem(CATEGORIES_STORAGE_KEY);
  }
}
```

---

## 🎣 3. Hook Personnalisé (src/hooks/useTasks.ts)

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, TaskCategory, TaskFilter, TaskStats, TaskPriority } from '@/types/task';
import { TaskStorage } from '@/lib/taskStorage';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<TaskCategory[]>([]);
  const [filter, setFilter] = useState<TaskFilter>({ status: 'all' });
  const [loading, setLoading] = useState(true);

  // Load data on component mount
  useEffect(() => {
    setTasks(TaskStorage.getTasks());
    setCategories(TaskStorage.getCategories());
    setLoading(false);
  }, []);

  // Save tasks whenever they change
  useEffect(() => {
    if (!loading) {
      TaskStorage.saveTasks(tasks);
    }
  }, [tasks, loading]);

  const addTask = useCallback((
    title: string,
    description: string = '',
    categoryId: string,
    priority: TaskPriority = 'medium',
    dueDate?: Date
  ) => {
    const category = categories.find(cat => cat.id === categoryId) || categories[0];
    
    const newTask: Task = {
      id: TaskStorage.generateId(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      category,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate
    };

    setTasks(prev => [...prev, newTask]);
  }, [categories]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed, updatedAt: new Date() }
        : task
    ));
  }, []);

  const deleteCompletedTasks = useCallback(() => {
    setTasks(prev => prev.filter(task => !task.completed));
  }, []);

  const addCategory = useCallback((name: string, color: string, icon?: string) => {
    const newCategory: TaskCategory = {
      id: TaskStorage.generateId(),
      name: name.trim(),
      color,
      icon
    };

    setCategories(prev => {
      const updated = [...prev, newCategory];
      TaskStorage.saveCategories(updated);
      return updated;
    });
  }, []);

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter.status === 'active' && task.completed) return false;
    if (filter.status === 'completed' && !task.completed) return false;
    if (filter.category && task.category.id !== filter.category) return false;
    if (filter.priority && task.priority !== filter.priority) return false;
    return true;
  });

  // Calculate statistics
  const stats: TaskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
    byCategory: tasks.reduce((acc, task) => {
      acc[task.category.name] = (acc[task.category.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byPriority: tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {
      low: 0,
      medium: 0,
      high: 0,
      urgent: 0
    }),
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    categories,
    filter,
    stats,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    deleteCompletedTasks,
    addCategory,
    setFilter
  };
}
```

---

## 📱 4. Layout Principal (src/app/layout.tsx)

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskMaster - Gestionnaire de Tâches',
  description: 'Une application moderne pour gérer vos tâches quotidiennes avec style',
  keywords: ['tâches', 'productivité', 'organisation', 'gestionnaire'],
  authors: [{ name: 'TaskMaster Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✅</text></svg>" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 min-h-screen`}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          {children}
        </div>
      </body>
    </html>
  );
}
```

---

## 🏠 5. Page d'Accueil (src/app/page.tsx)

```typescript
'use client';

import { TaskManager } from '@/components/TaskManager';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          TaskMaster
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Organisez votre vie avec style. Gérez vos tâches, suivez vos progrès, 
          et atteignez vos objectifs avec notre interface moderne et intuitive.
        </p>
      </div>

      {/* Main Task Manager */}
      <TaskManager />

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 border-t border-gray-200 pt-8">
        <p className="mb-2">
          Conçu avec ❤️ pour votre productivité
        </p>
        <p className="text-sm">
          TaskMaster - Votre compagnon de productivité quotidienne
        </p>
      </footer>
    </main>
  );
}
```

---

*[La suite du code serait trop longue pour ce format - référez-vous aux fichiers individuels créés précédemment pour TaskManager.tsx, TaskItem.tsx, AddTaskForm.tsx, et TaskStats.tsx]*

---

## 📋 Instructions d'Utilisation

### 1️⃣ **Création du Projet**
```bash
# Créer le projet Next.js
npx create-next-app@latest taskmaster-app --typescript --tailwind --app --eslint --src-dir --use-pnpm
cd taskmaster-app
```

### 2️⃣ **Installation des Dépendances**
```bash
# Installer toutes les dépendances
pnpm add @hookform/resolvers @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip class-variance-authority clsx cmdk date-fns embla-carousel-react input-otp lucide-react next-themes react-day-picker react-hook-form react-resizable-panels recharts sonner tailwind-merge vaul zod

# Configurer shadcn/ui
npx shadcn@latest init -d
npx shadcn@latest add button card input textarea select checkbox badge progress tabs label
```

### 3️⃣ **Copier les Fichiers**
- Copiez tous les fichiers TypeScript dans leur dossier respectif
- Respectez la structure exacte indiquée

### 4️⃣ **Lancement**
```bash
# Développement
pnpm dev

# Production
pnpm build && pnpm start
```

---

## 🎉 Résultat Final

Une application complètement fonctionnelle avec :
- ✅ Interface moderne et responsive
- ✅ Gestion complète des tâches (CRUD)  
- ✅ Statistiques visuelles avec graphiques
- ✅ Persistence des données
- ✅ Système de catégories et priorités
- ✅ Filtres avancés
- ✅ Design professionnel

**Démo en ligne :** https://sb-62grytrrjneb.vercel.run