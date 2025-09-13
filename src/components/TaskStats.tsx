'use client';

import { TaskStats as TaskStatsType } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface TaskStatsProps {
  stats: TaskStatsType;
}

export function TaskStats({ stats }: TaskStatsProps) {
  // Data for pie chart (categories)
  const categoryData = Object.entries(stats.byCategory).map(([name, count]) => ({
    name,
    value: count
  }));

  // Data for bar chart (priorities)
  const priorityData = [
    { name: 'Faible', value: stats.byPriority.low, color: '#6B7280' },
    { name: 'Moyenne', value: stats.byPriority.medium, color: '#F59E0B' },
    { name: 'Haute', value: stats.byPriority.high, color: '#F97316' },
    { name: 'Urgente', value: stats.byPriority.urgent, color: '#EF4444' }
  ];

  // Colors for pie chart
  const COLORS = [
    '#3B82F6', // blue
    '#10B981', // green
    '#8B5CF6', // purple
    '#EF4444', // red
    '#F59E0B', // yellow
    '#6B7280'  // gray
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Overview Cards */}
      <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total des tâches</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="text-4xl opacity-80">📋</div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium">Terminées</p>
            <p className="text-3xl font-bold">{stats.completed}</p>
          </div>
          <div className="text-4xl opacity-80">✅</div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm font-medium">En cours</p>
            <p className="text-3xl font-bold">{stats.active}</p>
          </div>
          <div className="text-4xl opacity-80">⏳</div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm font-medium">Taux de réussite</p>
            <p className="text-3xl font-bold">{stats.completionRate}%</p>
          </div>
          <div className="text-4xl opacity-80">📈</div>
        </div>
      </Card>

      {/* Progress Bar */}
      {stats.total > 0 && (
        <Card className="lg:col-span-4 p-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Progression globale</h3>
              <span className="text-sm font-medium text-gray-600">
                {stats.completed}/{stats.total} tâches
              </span>
            </div>
            <Progress 
              value={stats.completionRate} 
              className="h-3"
            />
            <p className="text-sm text-gray-600">
              {stats.completionRate === 100 
                ? "🎉 Toutes les tâches sont terminées ! Excellent travail !" 
                : `Encore ${stats.active} tâche${stats.active > 1 ? 's' : ''} à terminer.`
              }
            </p>
          </div>
        </Card>
      )}

      {/* Charts */}
      {stats.total > 0 && (
        <>
          {/* Category Distribution */}
          {categoryData.length > 0 && (
            <Card className="lg:col-span-2 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Répartition par catégorie
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}

          {/* Priority Distribution */}
          <Card className="lg:col-span-2 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Répartition par priorité
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityData}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                    {priorityData.map((item, index) => (
                      <Cell key={`cell-${index}`} fill={item.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </>
      )}

      {/* Empty State */}
      {stats.total === 0 && (
        <Card className="lg:col-span-4 p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Prêt à être productif ?
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Créez votre première tâche pour voir vos statistiques et suivre vos progrès. 
            L'organisation commence par un simple clic !
          </p>
        </Card>
      )}
    </div>
  );
}