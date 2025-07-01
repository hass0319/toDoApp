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

  editTodo: string = "";
  // editPriority!: number;

  constructor() { }

  ngOnInit(): void {
    this.editTodo    = this.task.todo;
    // this.editPriority = this.task.priority !== undefined ? this.task.priority : 0;
    // this.editPriority = this.task.priority ?? 1;
  }

  saveEdit() {
    const trimmed = this.editTodo.trim();
    if (trimmed) {
      this.save.emit({...this.task, todo: trimmed});
    }
    //     const updated: Task = {
    //       ...this.task,
    //       todo: this.editTitle.trim(),
    //       // priority: this.editPriority
    //     };
  }

  onCancel() {
    this.cancel.emit();
  }
}


