import { Task } from '../task';
import { TodoService } from '../todo.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input() task!: Task;
  // @Output() save     = new EventEmitter<Task>();
  // @Output() cancel   = new EventEmitter<void>();

  editTodo: string = "";

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.editTodo = this.task.todo;
  }

  saveEdit() {
    const trimmed = this.editTodo.trim();
    if (trimmed && this.task.id) {
      this.todoService.
      updateTodo(this.task.id, {
        ...this.task, todo: trimmed
      }).
      subscribe(() => {
        this.todoService.SetEditingTaskId(null);
      });
    }
  }

  onCancel() {
    // this.cancel.emit();
    this.todoService.SetEditingTaskId(null);
  }
}


