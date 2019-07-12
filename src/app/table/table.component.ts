import { Component, OnInit } from '@angular/core';
import { TableService, IEntry } from './table.service';

import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'ne-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit {

  constructor(private dataService: TableService) {
    this.fetchedData = this.dataService.data;
  }

  options = {
    page: 1,
    pageSize : 20,
    maxPages : 5
  };

  fetchedData: Observable<IEntry>;
  data: IEntry[] = [];

  ngOnInit() {
    this.fetchedData
    .pipe(
      take(this.options.pageSize)
    )
    .subscribe( row => this.data.push( row ));
    // this.loadData(this.fetchedData, this.data, this.options.pageSize);
  }

  loadData(data$, renderedDataArray, pageSize) {
    data$
    .pipe(
      take(pageSize)
    )
    .subscribe( row => this.data.push( row ));
  }

  getPagedData(data) {
    this.data = data;
  }

  getFilteredData(data) {
    console.log('getFilteredData');
    this.fetchedData = data;
    this.loadData(data, this.data, this.options.pageSize);
  }

  resetData() {
    this.fetchedData = this.dataService.data;
  }

  // helpers
  trackByFn(index) {
    return index;
  }
}
