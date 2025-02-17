import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Key, Users } from 'lucide-react';

export default function Home() {
  const apps = [
    {
      title: 'Agenda Semanal',
      description: 'Gerencie suas tarefas e compromissos semanais',
      icon: Calendar,
      path: '/',
      color: 'bg-blue-500'
    },
    {
      title: 'Gerador de Senhas',
      description: 'Crie senhas seguras e personalizadas',
      icon: Key,
      path: '/password-generator',
      color: 'bg-green-500'
    },
    {
      title: 'Gerenciador de Clientes',
      description: 'Gerencie seus clientes e usuários',
      icon: Users,
      path: '/client-manager',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo ao Sistema de Gestão
          </h1>
          <p className="text-xl text-gray-600">
            Escolha uma das ferramentas abaixo para começar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {apps.map((app) => (
            <Link
              key={app.path}
              to={app.path}
              className="transform transition-all duration-200 hover:scale-105"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className={`${app.color} p-6 flex justify-center`}>
                  <app.icon className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {app.title}
                  </h3>
                  <p className="text-gray-600">{app.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}