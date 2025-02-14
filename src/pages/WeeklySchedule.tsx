import React, { useState, useEffect } from 'react';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { Calendar } from 'lucide-react';
import type { Task } from '../types';

export default function WeeklySchedule() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  };

  const handleEditTask = (taskToEdit: Task) => {
    console.log('Edit task:', taskToEdit);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Calendar className="h-8 w-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Agenda Semanal</h1>
        </div>
      </div>

      <div className="space-y-8">
        <TaskForm onAddTask={handleAddTask} />
        
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onToggleStatus={handleToggleStatus}
          onEditTask={handleEditTask}
        />
      </div>
    </div>
  );
}