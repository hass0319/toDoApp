import { Component, OnInit } from '@angular/core';
import { Task, Filter } from './task';
import { DatePipe } from '@angular/common';

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

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.filterTasks();
  }

  onNewTask(task: Task) {
    this.tasks = [...this.tasks, task];
    this.filterTasks();
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
    );
        // .sort((a, b) => (a.completed === b.completed) ? 0 : (a.completed ? 1 : -1));
  }

  onToggle (task: Task){
    // task.completed = !task.completed;
    this.tasks = this.tasks.map( t => t=== task?
      {...t, completed: !t.completed}:
      t );
    this.filterTasks();
  }

  onDelete(task: Task) {
    // this.tasks = this.tasks.filter(t => t !== task);
    // task.deleted = true
    this.tasks = this.tasks.map( t => t=== task?
      {...t, deleted:true}:
      t );
    this.filterTasks();
  }

  onUpdate(updated: Task) {
    // this.tasks = this.tasks.map(t =>
    //   t === this.tasks.find(x => x.createdAt === updated.createdAt && x.title === t.title)
    //     ? updated
    //     : t
    // );

    this.tasks = this.tasks.map( t =>
      t.createdAt === updated.createdAt?
      updated:
      t );
    this.filterTasks();
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
