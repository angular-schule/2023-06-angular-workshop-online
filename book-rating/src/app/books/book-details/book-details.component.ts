import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  book?: Book;

  constructor(private route: ActivatedRoute, private bs: BookStoreService) {
    // PULL / synchron
    // const isbn = this.route.snapshot.paramMap.get('isbn'); // books/:isbn

    // PUSH / asynchron
    // TODO: Verschachtelte Subscriptions vermeiden
    this.route.paramMap.subscribe(params => {
      const isbn = params.get('isbn')!; // Non-Null Assertion

      this.bs.getSingle(isbn).subscribe(book => {
        this.book = book;
      });
    });
  }
}
