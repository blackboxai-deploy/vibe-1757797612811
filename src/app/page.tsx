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

      {/* Hero Image */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md h-48 bg-white rounded-xl shadow-lg overflow-hidden">
          <img 
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d120e3cf-9aab-4aeb-b0ad-2739a8d42710.png" 
            alt="Interface moderne de gestion de tâches avec cartes colorées et graphiques de progression"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                    <div class="text-center">
                      <div class="text-4xl mb-2">✅</div>
                      <p class="text-gray-600">Gestionnaire de Tâches</p>
                    </div>
                  </div>
                `;
              }
            }}
          />
        </div>
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