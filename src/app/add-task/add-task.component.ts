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

  newTask: Partial<Task> = {
    userId: 1,
    id: this.randomId,
    todo: '',
    createdAt: new Date(),
    completed: false,
    deleted: false,
    // priority: 1,
  };

  onAddTask() {
    const todo = (this.newTask.todo ?? '').trim();
    if (!todo) return;

    this.taskAdded.emit({
      ...this.newTask,
      userId: 1,
      id: this.randomId,
      todo,
      createdAt: new Date(),
      completed: false,
      deleted: false,
    });

    this.newTask = {
      todo: '',
      createdAt: new Date(),
      // priority: 1,
      completed: false,
      deleted: false,
      userId: 1,
    };
  }
}
