import React from 'react';
import { CheckCircle2, XCircle, Edit2, Trash2 } from 'lucide-react';
import type { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onEditTask: (task: Task) => void;
}

export function TaskList({ tasks, onDeleteTask, onToggleStatus, onEditTask }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    const daysOrder = [
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
      'Domingo',
    ];
    const dayDiff = daysOrder.indexOf(a.dayOfWeek) - daysOrder.indexOf(b.dayOfWeek);
    if (dayDiff === 0) {
      return a.time.localeCompare(b.time);
    }
    return dayDiff;
  });

  const groupedTasks = sortedTasks.reduce((acc, task) => {
    if (!acc[task.dayOfWeek]) {
      acc[task.dayOfWeek] = [];
    }
    acc[task.dayOfWeek].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedTasks).map(([day, dayTasks]) => (
        <div key={day} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 px-4 py-2">
            <h3 className="text-lg font-semibold text-white">{day}</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {dayTasks.map((task) => (
              <li key={task.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => onToggleStatus(task.id)}
                      className={`${
                        task.status === 'completed'
                          ? 'text-green-500 hover:text-green-600'
                          : 'text-gray-400 hover:text-gray-500'
                      }`}
                    >
                      {task.status === 'completed' ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <XCircle className="h-5 w-5" />
                      )}
                    </button>
                    <div className={task.status === 'completed' ? 'line-through text-gray-500' : ''}>
                      <p className="font-medium">{task.time}</p>
                      <p className="text-gray-600">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEditTask(task)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}