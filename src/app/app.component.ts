import { Component, OnInit } from '@angular/core';
import { Task, Filter } from './task';
import { DatePipe } from '@angular/common';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[DatePipe]
})

export class AppComponent implements OnInit {

  filter: Filter = 'all';
  tasks: Task[] = [];
  visibleTasks: Task[] = [];

  constructor(
    private datePipe: DatePipe,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.filterTasks();
    this.loadTodos();
  }

  loadTodos(){
    this.todoService.getTodos(10).subscribe(response => {
      this.tasks = response.todos;
      this.filterTasks();
    })
  }

  onNewTask(task: Task) {
    this.todoService.addTodo(task).subscribe(newTask => {
      this.tasks = [...this.tasks, newTask];
      this.filterTasks();
    })
  }

  onFilterChange(f: Filter) {
    this.filter = f;
    this.filterTasks();
  }

  private filterTasks(){
    this.visibleTasks = this.tasks.filter(t =>
      !t.deleted &&(
        this.filter === 'all' ||
        (this.filter === 'active'    && !t.completed) ||
        (this.filter === 'completed' &&  t.completed)
      )
    ).sort((a, b) => (a.completed === b.completed) ? 0 : (a.completed ? 1 : -1));
  }

  onToggle (task: Task){
    // Ensure task.id is defined before calling updateTodo
    if (typeof task.id === 'undefined') {
      console.error('Task id is undefined. Cannot update task.');
      return;
    }
    const done = this.todoService.updateTodo(task.id, { completed: !task.completed });

    done.subscribe (updatedTask => {
      this.tasks = this.tasks.map( t => t.id === updatedTask.id ?
        updatedTask : t );
      this.filterTasks();
    })
  }

  onDelete(task: Task) {
    // this.tasks = this.tasks.filter(t => t !== task);
    // task.deleted = true

    if (typeof task.id === 'undefined') {
      console.error('Task id is undefined. Cannot update task.');
      return;
    }
    if (task.id <=150) {
      this.todoService.deleteTodo(task.id).subscribe(() => {
        this.tasks = this.tasks.filter( t => t.id !== task.id?
          {...t, deleted:true} : t );
          this.filterTasks();
      });
    } else {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
      this.filterTasks();
    }
  }

  onUpdate(updated: Task) {
    // this.tasks = this.tasks.map(t =>
    //   t === this.tasks.find(x => x.createdAt === updated.createdAt && x.title === t.title)
    //     ? updated
    //     : t
    // );
    if (typeof updated.id === 'undefined') {
      console.error('Task id is undefined. Cannot update task.');
      return;
    }

    if (updated.id <=150) {
      const update =this.todoService.updateTodo(updated.id, updated);
      update.subscribe(apiTask =>{
        this.tasks = this.tasks.map( t =>
          t.id === apiTask.id ? apiTask : t );
        this.filterTasks();
      });
    }else {
      this.tasks = this.tasks.map(t =>
        t.id === updated.id ? { ...t, ...updated } : t );
      this.filterTasks();
    }
  }
}


    // {  title: "Clean Room",
    //   createdAt: new Date(),
    //   deleted: false,
    //   completed: false,
    //   // duration: 2,
    //   priority: 2,
    // },
    // {  title: "Groceries",
    //   createdAt: new Date('medium'),
    //   deleted: false,
    //   completed: false,
    //   // duration: 1,
    //   priority: 3,
    // },
    // {  title: "Meal Prep",
    //   createdAt: new Date('medium'),
    //   deleted: false,
    //   completed: false,
    //   // duration: 1,
    //   priority: 1,
    // },


      // newTask: Task = {
  //   title: "",
  //   createdAt: new Date(),
  //   priority: 1,
  //   completed: false,
  //   deleted: false,
  // }

  // onAddTask(task: Task){
  //   const trimmed: string = this.newTask.title.trim()
  //   if (!trimmed) {
  //     alert("Please enter a task");
  //     return;
  //   }

  //   this.tasks.push({
  //     ...task,
  //     title: trimmed,
  //     createdAt: new Date(),
  //     priority: this.newTask.priority,
  //     completed: false,
  //     deleted: false,
  //   });

  //   // console.log("task added: " + this.newTask.title)
  //   // console.log("task added: " + this.newTask.createdAt)
  //   // console.log("task added: " + this.newTask.priority)

  //   this.newTask = {
  //     title: '',
  //     createdAt: new Date(),
  //     priority: 1,
  //     completed: false,
  //     deleted: false
  //   };
  // }

  // prioritySort(): Task[]{
  //   return this.tasks.sort((a, b) => {
  //     if (a.priority === undefined || b.priority === undefined) {
  //       return 0; // If priority is not defined, do not change order
  //     }
  //     return (a.priority - b.priority);
  //   });
  // }
