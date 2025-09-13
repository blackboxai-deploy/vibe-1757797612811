'use client';

import { useState } from 'react';
import { TaskCategory, TaskPriority, PRIORITY_LABELS } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface AddTaskFormProps {
  categories: TaskCategory[];
  onSubmit: (title: string, description: string, categoryId: string, priority: TaskPriority, dueDate?: Date) => void;
  onCancel: () => void;
}

export function AddTaskForm({ categories, onSubmit, onCancel }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const selectedCategory = categoryId || categories[0]?.id;
    const parsedDueDate = dueDate ? new Date(dueDate) : undefined;

    onSubmit(
      title,
      description,
      selectedCategory,
      priority,
      parsedDueDate
    );

    // Reset form
    setTitle('');
    setDescription('');
    setCategoryId(categories[0]?.id || '');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-2xl">✨</div>
        <h3 className="text-lg font-semibold text-gray-900">
          Nouvelle tâche
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <Label htmlFor="task-title" className="text-sm font-medium text-gray-700">
            Titre *
          </Label>
          <Input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Que devez-vous faire ?"
            required
            className="mt-1"
            autoFocus
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="task-description" className="text-sm font-medium text-gray-700">
            Description
          </Label>
          <Textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Détails supplémentaires (optionnel)"
            rows={3}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Category */}
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Catégorie
            </Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Priorité
            </Label>
            <Select value={priority} onValueChange={(value) => setPriority(value as TaskPriority)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          <div>
            <Label htmlFor="due-date" className="text-sm font-medium text-gray-700">
              Échéance
            </Label>
            <Input
              id="due-date"
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1"
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={!title.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Créer la tâche
          </Button>
        </div>
      </form>

      {/* Quick Tips */}
      <div className="mt-4 p-3 bg-white/50 rounded-lg border border-blue-200">
        <p className="text-xs text-gray-600">
          💡 <strong>Astuce :</strong> Utilisez des titres clairs et définissez des échéances 
          pour rester organisé. Les tâches urgentes seront mises en évidence automatiquement.
        </p>
      </div>
    </Card>
  );
}