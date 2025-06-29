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

  newTask: Task = {
    title: '',
    createdAt: new Date(),
    priority: 1,
    completed: false,
    deleted: false
  };

  add() {
    const title = this.newTask.title.trim();
    if (!title) { return; }

    this.taskAdded.emit({
      ...this.newTask,
      title,
      createdAt: new Date(),
      completed: false,
      deleted: false
    });

    // reset for next entry
    this.newTask = {
      title: '',
      createdAt: new Date(),
      priority: 1,
      completed: false,
      deleted: false
    };
  }

}
