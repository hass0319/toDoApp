export interface Task {
  id?:number;
  todo: string;
  createdAt?: Date;
  deleted?: boolean;
  completed: boolean;
  // priority?: number;
  userId?:number;
}

export type Filter = 'all' | 'active' | 'completed';
