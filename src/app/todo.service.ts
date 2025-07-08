import { Task, Filter } from './task';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _tasks$ = new BehaviorSubject <Task[]> ([]);
    tasks$ = this._tasks$.asObservable();

  private _editingTaskId$ = new BehaviorSubject <number | null> (null);
  editingTaskId$ = this._editingTaskId$.asObservable();

  private _filter$ = new BehaviorSubject <Filter> ('all');
  filter$ = this._filter$.asObservable();

  private apiUrl= 'https://dummyjson.com/todos';

  constructor(private http: HttpClient) { }

  // getTodos (limit: number = 10){
  //   this.http.get<{ todos: Task[] }>(`${this.apiUrl}?limit=${Number(limit)}`).subscribe(response => this._tasks$.next(response.todos));
  // }

  getTodos (limit: number = 10): Observable<{ todos: Task[] }> {
    const req = this.http.get<{ todos: Task[] }>(`${this.apiUrl}?limit=${Number(limit)}`);
    return req.pipe(
      tap(response => this._tasks$.next(response.todos))
    );
  }

  addTodo(todo: Partial<Task>): Observable<Task> {
    const req = this.http.post<Task>(this.apiUrl + '/add', todo)
    return req.pipe(
      tap(newTask => {
        const currentTask = this._tasks$.value;
        this._tasks$.next([...currentTask, newTask])
      })
    );
  }

  updateTodo(id: number, todo: Partial<Task>): Observable<Task> {
    const req = this.http.put<Task>(`${this.apiUrl}/${id}`,todo)
    return req.pipe(
      tap(updatedTask => {
        const currentTask = this._tasks$.value;
        const updatedList = currentTask.map( t => t.id === id ? updatedTask :t);
        this._tasks$.next(updatedList);
      })
    );
  }

  deleteTodo(id: number): Observable<any> {
    const req = this.http.delete(`${this.apiUrl}/${id}`);
    return req.pipe(
      tap(deleted => {
        const currentTask = this._tasks$.value;
        const filtered = currentTask.filter(t => t.id !== id);
        this._tasks$.next(filtered);
      })
    );
  }

  SetEditingTaskId (id: number | null){
    this._editingTaskId$.next(id);
  }

  applyFilter(filter: Filter) {
    this._filter$.next(filter);
  }
}
