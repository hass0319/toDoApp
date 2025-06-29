import { Component, Output, EventEmitter } from '@angular/core';
import { Filter } from "../task";

@Component({
  selector: 'app-filter-tasks',
  templateUrl: './filter-tasks.component.html',
  styleUrls: ['./filter-tasks.component.css']
})
export class FilterTasksComponent{

  constructor() { }

  @Output() filterChanged = new EventEmitter<Filter>();

  selectedFilter: Filter = "all";
  filters: Filter[] = ['all','active','completed'];

  onFilterChange(filter: 'all'|'active'|'completed') {
    this.selectedFilter = filter;
    this.filterChanged.emit(filter);
  }
}
