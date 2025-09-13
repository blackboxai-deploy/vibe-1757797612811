'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/hooks/useTasks';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TaskItem } from '@/components/TaskItem';
import { TaskStats } from '@/components/TaskStats';

export function TaskManager() {
  const {
    tasks,
    categories,
    filter,
    stats,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    deleteCompletedTasks,
    setFilter
  } = useTasks();

  const [showAddForm, setShowAddForm] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <TaskStats stats={stats} />

      {/* Main Task Interface */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mes Tâches</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {stats.total} total
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {stats.completed} terminées
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                {stats.active} en cours
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={deleteCompletedTasks}
              disabled={stats.completed === 0}
              className="text-sm"
            >
              Supprimer terminées
            </Button>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              + Nouvelle tâche
            </Button>
          </div>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="mb-6">
            <AddTaskForm
              categories={categories}
              onSubmit={(title, description, categoryId, priority, dueDate) => {
                addTask(title, description, categoryId, priority, dueDate);
                setShowAddForm(false);
              }}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        {/* Task Filters */}
        <Tabs
          value={filter.status}
          onValueChange={(value) => setFilter({ ...filter, status: value as any })}
          className="mb-6"
        >
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="all" className="text-sm">
              Toutes ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="active" className="text-sm">
              En cours ({stats.active})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-sm">
              Terminées ({stats.completed})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-4">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucune tâche trouvée
                </h3>
                <p className="text-gray-500">
                  Créez votre première tâche pour commencer !
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  categories={categories}
                  onToggle={toggleTask}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-3 mt-4">
            {tasks.filter(t => !t.completed).length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Toutes les tâches terminées !
                </h3>
                <p className="text-gray-500">
                  Excellent travail ! Créez de nouvelles tâches pour continuer.
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  categories={categories}
                  onToggle={toggleTask}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3 mt-4">
            {tasks.filter(t => t.completed).length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⏳</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucune tâche terminée
                </h3>
                <p className="text-gray-500">
                  Les tâches terminées apparaîtront ici.
                </p>
              </div>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  categories={categories}
                  onToggle={toggleTask}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}