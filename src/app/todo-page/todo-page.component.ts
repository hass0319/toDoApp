import { Task, Filter } from '../task';
import { TodoService } from '../todo.service';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, map, combineLatest} from 'rxjs';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
})
export class TodoPageComponent implements OnInit {

  private _tasks$ = new BehaviorSubject <Task[]> ([]);
  tasks$!: Observable<Task[]>;

  filteredTasks$!: Observable<Task[]>


  filter: Filter = 'all';
  tasks: Task[] = [];

  constructor(
    private todoService: TodoService,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    this.todoService.getTodos();
    this.filteredTasks$ = combineLatest ([
      this.todoService.tasks$,
      this.todoService.filter$
    ]).pipe(
      map( ([tasks, filter]) =>
        tasks.filter(t =>
          !t.deleted && (
            (filter === "all") ||
            (filter === "active" && !t.completed) ||
            (filter === "completed" && t.completed)
          )
        )
      )
    );
  }

  // get FilteredTasks$(): Observable<Task[]> {
  //   return this.filteredTasks$.pipe(
  //     map(tasks => tasks || [])
  //   );
  // }

  // loadTodos(){
  //   this.todoService.getTodos(10).subscribe(response => {
  //     this.tasks = response.todos;
  //     this.filterTasks();
  //   })
  // }

  // onFilterChange(f: Filter) {
  //   this.filter = f;
  //   this.filterTasks();
  // }

  // private filterTasks(){
  //   this.visibleTasks = this.tasks.filter(t =>
  //     !t.deleted &&(
  //       (this.filter === 'all' )||
  //       (this.filter === 'active'    && !t.completed) ||
  //       (this.filter === 'completed' &&  t.completed)
  //     )
  //   ).sort((a, b) => (a.completed === b.completed) ? 0 : (a.completed ? 1 : -1));
  // }

  // onNewTask(task: Task) {
  //   this.todoService.addTodo(task).subscribe()
  // }

  // onToggle (task: Task){
  //   // Ensure task.id is defined before calling updateTodo
  //   if (typeof task.id === 'undefined') {
  //     console.error('Task id is undefined. Cannot update task.');
  //     return;
  //   }
  //   const done = this.todoService.updateTodo(task.id, { completed: !task.completed });

  //   done.subscribe (updatedTask => {
  //     this.tasks = this.tasks.map( t => t.id === updatedTask.id ?
  //       updatedTask : t );
  //     this.filterTasks();
  //   })
  // }

  // onDelete(task: Task) {
  //   if (typeof task.id === 'undefined') {
  //     console.error('Task id is undefined. Cannot update task.');
  //     return;
  //   }
  //   this.todoService.deleteTodo(task.id).subscribe();
  // }
    // if (task.id <=150) {
    //   () => {
    //     this.tasks = this.tasks.filter( t => t.id !== task.id?
    //       {...t, deleted:true} : t );
    //       this.filterTasks();
    //   });
    // } else {
    //   this.tasks = this.tasks.filter(t => t.id !== task.id);
    //   this.filterTasks();
    // }


  // onUpdate(updated: Task) {
  //   if (typeof updated.id === 'undefined') {
  //     console.error('Task id is undefined. Cannot update task.');
  //     return;
  //   }
  //   const update = this.todoService.updateTodo(updated.id, updated);
  //   update.subscribe();
  // }

    // if (updated.id <=150) {
    //   const update =this.todoService.updateTodo(updated.id, updated);
    //   update.subscribe(apiTask =>{
    //     this.tasks = this.tasks.map( t =>
    //       t.id === apiTask.id ? apiTask : t );
    //     this.filterTasks();
    //   });
    // }else {
    //   this.tasks = this.tasks.map(t =>
    //     t.id === updated.id ? { ...t, ...updated } : t );
    //   this.filterTasks();
    // }
  }

