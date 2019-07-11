import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { count, skip, take } from 'rxjs/operators';

@Component({
  selector: 'ne-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  @Input() page: string;
  @Input() pageSize: string;
  @Input() collection: Observable<any>;
  @Input() maxPages: string;
  @Output() pagedResults = new EventEmitter<any>();
  collectionSize = 0;

  constructor() { }

  ngOnInit() {
    this.collection.pipe( count( i => this.collectionSize = i ))
      .subscribe( observableItemQty => this.collectionSize = observableItemQty);

    // Initial load
    this.paging();
  }

  paging() {
    const _pagedResults = [];
    this.collection.pipe(
      skip((+this.page - 1) * +this.pageSize),
      take(+this.pageSize)
    ).subscribe(
      row => {
        _pagedResults.push( row );
      },
      undefined,
      () => this.pagedResults.emit(_pagedResults)
    );
  }

}
