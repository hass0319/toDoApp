import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() tasks: Task[] = [];
  // @Output() onToggle = new EventEmitter<Task>();
  // @Output() onDelete = new EventEmitter<Task>();
  // @Output() onUpdate = new EventEmitter<Task>();
}
