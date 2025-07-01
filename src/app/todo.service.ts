import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl= 'https://dummyjson.com/todos';

  constructor(private http: HttpClient) { }

  getTodos (limit: number = 10): Observable<{ todos: Task[] }> {
    return this.http.get<{ todos: Task[] }>(`${this.apiUrl}?limit=${Number(limit)}`);
  }

  addTodo(todo: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl + '/add', todo);
  }

  updateTodo(id: number, todo: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`,todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
