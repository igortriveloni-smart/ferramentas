import React, { useState, useEffect } from 'react';
import { Users, Plus, Search, MoreVertical, UserCheck, UserX, Edit } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import type { Client } from '../types';

export default function ClientManager() {
  const [clients, setClients] = useState<Client[]>(() => {
    const savedClients = localStorage.getItem('clients');
    return savedClients ? JSON.parse(savedClients) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [newClient, setNewClient] = useState({
    name: '',
    totalUsers: 0,
    activeUsers: 0
  });

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const handleAddOrUpdateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      setClients(clients.map(client => 
        client.id === editingClient.id 
          ? {
              ...editingClient,
              name: newClient.name,
              totalUsers: newClient.totalUsers,
              activeUsers: newClient.activeUsers,
              updatedAt: new Date().toISOString()
            }
          : client
      ));
      setEditingClient(null);
    } else {
      const client: Client = {
        id: uuidv4(),
        name: newClient.name,
        totalUsers: newClient.totalUsers,
        activeUsers: newClient.activeUsers,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setClients([...clients, client]);
    }
    setNewClient({ name: '', totalUsers: 0, activeUsers: 0 });
    setShowForm(false);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setNewClient({
      name: client.name,
      totalUsers: client.totalUsers,
      activeUsers: client.activeUsers
    });
    setShowForm(true);
  };

  const toggleClientStatus = (id: string) => {
    setClients(clients.map(client => {
      if (client.id === id) {
        return {
          ...client,
          status: client.status === 'active' ? 'inactive' : 'active',
          updatedAt: new Date().toISOString()
        };
      }
      return client;
    }));
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Gerenciador de Clientes</h1>
        </div>
        <button
          onClick={() => {
            setEditingClient(null);
            setNewClient({ name: '', totalUsers: 0, activeUsers: 0 });
            setShowForm(!showForm);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {editingClient ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
          </h2>
          <form onSubmit={handleAddOrUpdateClient} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome do Cliente
              </label>
              <input
                type="text"
                id="name"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="totalUsers" className="block text-sm font-medium text-gray-700">
                  Total de Usuários
                </label>
                <input
                  type="number"
                  id="totalUsers"
                  value={newClient.totalUsers}
                  onChange={(e) => setNewClient({ ...newClient, totalUsers: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="activeUsers" className="block text-sm font-medium text-gray-700">
                  Usuários Ativos
                </label>
                <input
                  type="number"
                  id="activeUsers"
                  value={newClient.activeUsers}
                  onChange={(e) => setNewClient({ ...newClient, activeUsers: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  min="0"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingClient(null);
                  setNewClient({ name: '', totalUsers: 0, activeUsers: 0 });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                {editingClient ? 'Atualizar' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuários
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Atualização
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {client.activeUsers} / {client.totalUsers}
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.round((client.activeUsers / client.totalUsers) * 100)}% ativos
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleClientStatus(client.id)}
                      className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                        client.status === 'active'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {client.status === 'active' ? (
                        <>
                          <UserCheck className="h-4 w-4 mr-1" />
                          Ativo
                        </>
                      ) : (
                        <>
                          <UserX className="h-4 w-4 mr-1" />
                          Inativo
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(client.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEditClient(client)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    Nenhum cliente encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}