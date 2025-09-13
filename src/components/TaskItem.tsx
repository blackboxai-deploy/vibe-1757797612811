'use client';

import { useState } from 'react';
import { Task, TaskCategory, TaskPriority, PRIORITY_COLORS, PRIORITY_LABELS } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TaskItemProps {
  task: Task;
  categories: TaskCategory[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, categories, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editCategoryId, setEditCategoryId] = useState(task.category.id);
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleSave = () => {
    const selectedCategory = categories.find(cat => cat.id === editCategoryId) || categories[0];
    
    onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      category: selectedCategory,
      priority: editPriority
    });
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditCategoryId(task.category.id);
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const isOverdue = task.dueDate && new Date() > task.dueDate && !task.completed;

  return (
    <Card className={`p-4 transition-all duration-200 hover:shadow-md ${
      task.completed 
        ? 'bg-gray-50 border-gray-200' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    } ${isOverdue ? 'border-l-4 border-l-red-500' : ''}`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="mt-1 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
        />

        <div className="flex-1 space-y-2">
          {isEditing ? (
            /* Edit Mode */
            <div className="space-y-3">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Titre de la tâche"
                className="font-medium"
              />
              
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description (optionnelle)"
                rows={2}
              />

              <div className="flex flex-wrap gap-2">
                <Select value={editCategoryId} onValueChange={setEditCategoryId}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${category.color}`} />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={editPriority} onValueChange={(value) => setEditPriority(value as TaskPriority)}>
                  <SelectTrigger className="w-32">
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

              <div className="flex gap-2">
                <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                  Sauvegarder
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  Annuler
                </Button>
              </div>
            </div>
          ) : (
            /* Display Mode */
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className={`font-medium ${
                  task.completed 
                    ? 'line-through text-gray-500' 
                    : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                
                <div className="flex items-center gap-2">
                  {/* Priority Badge */}
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${PRIORITY_COLORS[task.priority]}`}
                  >
                    {PRIORITY_LABELS[task.priority]}
                  </Badge>

                  {/* Actions */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    disabled={task.completed}
                    className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                  >
                    ✏️
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(task.id)}
                    className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                  >
                    🗑️
                  </Button>
                </div>
              </div>

              {task.description && (
                <p className={`text-sm ${
                  task.completed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {task.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                {/* Category */}
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${task.category.color}`} />
                  <span>{task.category.name}</span>
                </div>

                {/* Due Date */}
                {task.dueDate && (
                  <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
                    Échéance: {formatDate(task.dueDate)}
                  </span>
                )}

                {/* Created Date */}
                <span>
                  Créée: {formatDate(task.createdAt)}
                </span>

                {/* Updated Date */}
                {task.updatedAt.getTime() !== task.createdAt.getTime() && (
                  <span>
                    Modifiée: {formatDate(task.updatedAt)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}