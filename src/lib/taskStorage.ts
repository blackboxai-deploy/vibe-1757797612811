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
        // Initialize with default categories
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