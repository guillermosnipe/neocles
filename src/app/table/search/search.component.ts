import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { IEntry } from '../table.service';

@Component({
  selector: 'ne-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input() collection: Observable<any>;
  @Output() filteredDataCollection = new EventEmitter<Observable<any>>();
  @Output() filterIsEmpty = new EventEmitter<boolean>();
  searchField: FormControl;
  searches: string[] = [];

  ngOnInit() {
    this.searchField = new FormControl();
    this.searchField.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
    .subscribe(
      (searchTerm: string) => {
        const _filteredData = [];

        if (searchTerm !== '') {
          console.log(searchTerm);
          this.collection.pipe(
            filter((row: IEntry) => {
              return Object.values(row).some( (key: string) => key.indexOf(searchTerm) !== -1);
            })
          ).subscribe(
            (row) => {
              _filteredData.push(row);
            },
            undefined,
            () => {
              this.filteredDataCollection.emit(from(_filteredData));
            }
          );
        } else {
          this.filterIsEmpty.emit(true);
        }
      }
    );
  }

}
