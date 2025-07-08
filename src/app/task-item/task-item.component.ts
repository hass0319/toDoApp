import { Task } from '../task';
import { Observable, map } from 'rxjs';
import { TodoService } from '../todo.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})

export class TaskItemComponent implements OnInit {

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.isEditing$ = this.todoService.editingTaskId$.pipe(
      map(editingId => editingId === this.task.id)
    );
  }

  @Input()  task!: Task;
  isEditing$!: Observable<boolean>

  startEdit() {
    this.todoService.SetEditingTaskId(this.task.id!);
  }

  toggleComplete(){
    if (this.task.id !== undefined){
      this.todoService.updateTodo(
        this.task.id!, {
          ...this.task,
          completed: !this.task.completed
        }).subscribe();
    }else {
      console.error('Task id is undefined. Cannot update todo.');
    }
  }

  cancelEdit() {
    this.todoService.SetEditingTaskId(null);
  }

  deleteTask() {
    if (this.task.id !== undefined){
      this.todoService.deleteTodo(this.task.id).subscribe();
    }else {
      console.error('Task id is undefined. Cannot update todo.');
    }
  }
}

// @Output() onToggle = new EventEmitter<Task>();
// @Output() onDelete = new EventEmitter<Task>();
// @Output() onUpdate = new EventEmitter<Task>();
// editing = false;

// startEdit() {
// this.editing = true;
// }

// saveEdit(updated: Task) {
// this.onUpdate.emit(updated);
// this.editing = false;
// }

// cancelEdit() {
// this.editing = false;
// }

// editTodo: string = "";


// startEdit() {
//   this.editing = true;
//   this.editTodo = this.task.todo;
// }

// saveEdit() {
//   const trimmed = this.editTodo.trim();
//   if (trimmed) {
//     this.onUpdate.emit({...this.task, todo: trimmed});
//     this.editing = false;
//   }
// }
