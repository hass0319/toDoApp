import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()  task!: Task;
  @Output() onToggle = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<Task>();
  @Output() onUpdate = new EventEmitter<Task>();

  editing = false;

  startEdit() {
    this.editing = true;
  }

  saveEdit(updated: Task) {
    this.onUpdate.emit(updated);
    this.editing = false;
  }

  cancelEdit() {
    this.editing = false;
  }
}
