import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task} from '../task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() taskAdded = new EventEmitter<Task>();

  randomId = Math.floor(Math.random() * 1_000_000);

  newTask: Task = {
    todo: '',
    id: this.randomId,
    createdAt: new Date(),
    // priority: 1,
    completed: false,
    deleted: false,
    userId:1
  };

  onAddTask() {
    const todo = this.newTask.todo.trim();
    if (!todo) return;

    this.taskAdded.emit({
      ...this.newTask,
      todo,
      id: this.randomId,
      createdAt: new Date(),
      completed: false,
      deleted: false,
      userId: 1
    });

    this.newTask = {
      todo: '',
      id: this.randomId,
      createdAt: new Date(),
      // priority: 1,
      completed: false,
      deleted: false,
      userId: 1,
    };
  }
}
