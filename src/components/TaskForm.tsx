import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react';
import type { Task, DayOfWeek } from '../types';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const DAYS_OF_WEEK: DayOfWeek[] = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo',
];

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>('Segunda-feira');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTask: Task = {
      id: uuidv4(),
      dayOfWeek,
      time,
      description,
      status: 'pending',
    };

    onAddTask(newTask);
    setTime('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-700">
            Dia da Semana
          </label>
          <select
            id="dayOfWeek"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value as DayOfWeek)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            {DAYS_OF_WEEK.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Horário
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Tarefa
        </button>
      </div>
    </form>
  );
}