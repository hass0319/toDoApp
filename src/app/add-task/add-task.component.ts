import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Task} from '../task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {}


  // randomId = Math.floor(Math.random() * 1_000_000);

  newTask: Partial<Task> = {
    userId: 1,
    // id: this.randomId,
    todo: '',
    // createdAt: new Date(),
    completed: false,
    deleted: false,
    // // priority: 1,
  };

  onAddTask() {
    const todo = (this.newTask.todo ?? '').trim();
    if (!todo) return;
    this.todoService.addTodo(this.newTask).subscribe();
  }
}
