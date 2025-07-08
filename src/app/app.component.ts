import { Task, Filter } from './task';
// import { TodoService } from './todo.service';
// import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
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
