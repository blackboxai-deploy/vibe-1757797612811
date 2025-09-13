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