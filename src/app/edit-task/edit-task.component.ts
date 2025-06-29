import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input() task!: Task;
  @Output() save     = new EventEmitter<Task>();
  @Output() cancel   = new EventEmitter<void>();

  editTitle!: string;
  editPriority!: number;

  constructor() { }

  ngOnInit(): void {
    this.editTitle    = this.task.title;
    this.editPriority = this.task.priority !== undefined ? this.task.priority : 0;
  }

  onSave() {
    const updated: Task = {
      ...this.task,
      title: this.editTitle.trim(),
      priority: this.editPriority
    };
  this.save.emit(updated);
}

onCancel() {
  this.cancel.emit();
}

}
