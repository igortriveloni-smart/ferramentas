export interface Task {
  id: string;
  dayOfWeek: string;
  time: string;
  description: string;
  status: 'pending' | 'completed';
}

export type DayOfWeek = 'Segunda-feira' | 'Terça-feira' | 'Quarta-feira' | 'Quinta-feira' | 'Sexta-feira' | 'Sábado' | 'Domingo';

export interface PasswordConfig {
  length: number;
  quantity: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSpecial: boolean;
}

export interface Client {
  id: string;
  name: string;
  totalUsers: number;
  activeUsers: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}