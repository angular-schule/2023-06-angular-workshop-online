import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EMPTY, debounceTime, distinctUntilChanged, filter, iif, mergeMap, switchMap } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });

  books$ = this.searchControl.valueChanges.pipe(
    filter(e => e.length >= 3),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(term => this.bs.search(term))
    /*switchMap(term => iif(
      () => term.length >= 3,
      this.bs.search(term),
      EMPTY
    ))*/
  );

  constructor(private bs: BookStoreService) {}
}
