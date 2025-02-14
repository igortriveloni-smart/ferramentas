import React, { useState } from 'react';
import { Key, Copy, RefreshCw, Trash2 } from 'lucide-react';
import type { PasswordConfig } from '../types';

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

export default function PasswordGenerator() {
  const [config, setConfig] = useState<PasswordConfig>({
    length: 12,
    quantity: 1,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecial: false
  });

  const [passwords, setPasswords] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generatePasswords = () => {
    let chars = '';
    if (config.includeUppercase) chars += CHAR_SETS.uppercase;
    if (config.includeLowercase) chars += CHAR_SETS.lowercase;
    if (config.includeNumbers) chars += CHAR_SETS.numbers;
    if (config.includeSpecial) chars += CHAR_SETS.special;

    if (!chars) {
      setPasswords(['Selecione pelo menos uma opção']);
      return;
    }

    const newPasswords = Array.from({ length: config.quantity }, () => {
      let password = '';
      for (let i = 0; i < config.length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
      }
      return password;
    });

    setPasswords(newPasswords);
    setCopiedIndex(null);
  };

  const copyToClipboard = async (password: string, index: number) => {
    if (password && password !== 'Selecione pelo menos uma opção') {
      await navigator.clipboard.writeText(password);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const clearPasswords = () => {
    setPasswords([]);
    setCopiedIndex(null);
  };

  return (
    <div>
      <div className="flex items-center mb-8">
        <Key className="h-8 w-8 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Gerador de Senhas</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tamanho da Senha: {config.length}
              </label>
              <input
                type="range"
                min="8"
                max="32"
                value={config.length}
                onChange={(e) => setConfig({ ...config, length: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade de Senhas
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={config.quantity}
                onChange={(e) => setConfig({ ...config, quantity: Math.min(10, Math.max(1, parseInt(e.target.value) || 1)) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.includeUppercase}
                onChange={(e) => setConfig({ ...config, includeUppercase: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Letras Maiúsculas</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.includeLowercase}
                onChange={(e) => setConfig({ ...config, includeLowercase: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Letras Minúsculas</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.includeNumbers}
                onChange={(e) => setConfig({ ...config, includeNumbers: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Números</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.includeSpecial}
                onChange={(e) => setConfig({ ...config, includeSpecial: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Caracteres Especiais</span>
            </label>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={generatePasswords}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Gerar Senhas
            </button>
            {passwords.length > 0 && (
              <button
                onClick={clearPasswords}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                title="Limpar senhas"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {passwords.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-medium text-gray-900">Senhas Geradas</h2>
            <div className="space-y-2">
              {passwords.map((password, index) => (
                <div key={index} className="relative">
                  <input
                    type="text"
                    readOnly
                    value={password}
                    className="w-full p-3 pr-20 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <button
                      onClick={() => copyToClipboard(password, index)}
                      className={`p-2 ${copiedIndex === index ? 'text-green-500' : 'text-gray-500 hover:text-blue-600'}`}
                      title={copiedIndex === index ? 'Copiado!' : 'Copiar senha'}
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}