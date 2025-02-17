import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Calendar, Key, Users } from 'lucide-react';
import Home from './pages/Home';
import WeeklySchedule from './pages/WeeklySchedule';
import PasswordGenerator from './pages/PasswordGenerator';
import ClientManager from './pages/ClientManager';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Agenda Semanal
              </Link>
              <Link
                to="/password-generator"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600"
              >
                <Key className="h-5 w-5 mr-2" />
                Gerador de Senhas
              </Link>
              <Link
                to="/client-manager"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600"
              >
                <Users className="h-5 w-5 mr-2" />
                Gerenciador de Clientes
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<WeeklySchedule />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/client-manager" element={<ClientManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;