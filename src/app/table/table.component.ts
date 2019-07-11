import {Component, OnInit} from '@angular/core';
import * as randomWords from 'random-words';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface IEntry {
  name: string;
  description: string;
  status: string;
}

@Component({
  selector: 'ne-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  data: IEntry[];
  page = 1;
  pageSize = 20;
  maxPages = 10000 / this.pageSize;
  emptyArray = new Array(1000);
  filteredData: IEntry[];

  searchField: FormControl;
  searches: string[] = [];

  constructor() {}

  ngOnInit() {
    this.searchField = new FormControl();
    this.searchField.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(filter => {
      this.page = 1;
      const terms = this.normalizeSearchTerms(filter);
      this.populateFilteredData(filter);
      this.getResults(terms);
    });

    this.data = [];

    for (let i = 0; i < 10000; i++) {
      this.data.push({
        name: randomWords({exactly: 3, join: ' '}),
        description: randomWords({exactly: 100, join: ' '}),
        status: ['new', 'submitted', 'failed'][Math.floor(Math.random() * 3)]
      });
    }

    this.populateFilteredData('');

  }
  // ng imit ends

  // Data related functions
  populateFilteredData(filter) {
    if (!filter) {
      this.filteredData = this.data.slice();
    }

    this.filteredData = this.filterResults(filter);
  }

  filterResults(filter) {
    return this.data.filter(entry => {
      return Object.values(entry).some(key => key.indexOf(filter) !== -1);
    });
  }

  normalizeSearchTerms(term) {
    const terms = term.split(',').filter(elem => elem !== '');
    return terms;
  }

  getResults(terms) {
    if (!terms.length) { return; }
    let _data: IEntry[];
    terms.forEach(term => _data = [...this.filterResults(term)]);
    this.filteredData = _data;
  }

  // Pager
  nextPage() {
    this.page = ( (this.page + 1) <= this.maxPages ) ? this.page + 1 : 1;
  }

  prevPage() {
    this.page = ( (this.page - 1) === 0 ) ? this.maxPages : this.page - 1;
  }


  // helpers

  trackByFn(index) {
    return index;
  }

}
