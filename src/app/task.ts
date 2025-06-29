export interface Task {
  title: string;
  createdAt: Date;
  deleted: boolean;
  completed: boolean;
  // duration?: number;
  priority?: number;
}

export type Filter = 'all' | 'active' | 'completed';
