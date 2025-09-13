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