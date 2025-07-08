import { Task, Filter } from "../task";
import { TodoService } from "../todo.service";
import { Component, OnInit } from '@angular/core';
// import { Observable, } from 'rxjs';


@Component({
  selector: 'app-filter-tasks',
  templateUrl: './filter-tasks.component.html',
  styleUrls: ['./filter-tasks.component.css']
})
export class FilterTasksComponent implements OnInit{
  // filteredTasks$!: Observable<Task[]>

  selectedFilter: Filter = "all";
  filters: Filter[] = ['all','active','completed'];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    // this.filteredTasks$ = combineLatest ([
    //   this.todoService.tasks$,
    //   this.todoService.filter$
    // ]).pipe(
    //   map( ([tasks, filter]) =>
    //     tasks.filter(t =>
    //       !t.deleted && (
    //         (filter === "all") ||
    //         (filter === "active" && !t.completed) ||
    //         (filter === "completed" && t.completed)
    //       )
    //     )
    //   )
    // );
  }

  onFilterChange(filter: Filter) {
    this.selectedFilter = filter;
    this.todoService.applyFilter(filter);
  }
}
