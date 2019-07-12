import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import * as randomWords from 'random-words';

export interface IEntry {
  id: string;
  name: string;
  description: string;
  status: string;
  coolColumn: string;
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  readonly data: Observable<IEntry> = this.generateRandomWords();

  generateRandomWords() {
    const _data = [];
    const _elementsToCreate = 10000;

    for (let i = 0; i < _elementsToCreate; i++) {
      _data.push({
        id: i.toString(),
        name: randomWords({exactly: 3, join: ' '}),
        description: randomWords({exactly: 100, join: ' '}),
        status: ['new', 'submitted', 'failed'][Math.floor(Math.random() * 3)],
        coolColumn: ''
      });
    }

    return from(_data);
  }
}
