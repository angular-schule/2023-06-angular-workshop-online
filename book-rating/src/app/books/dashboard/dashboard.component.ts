import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Book } from '../shared/book';
import { BookComponent } from "../book/book.component";
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [NgFor, BookComponent]
})
export class DashboardComponent {

  lastChange = signal(Date.now());
  // lastChange = Date.now();
  lastChangeSeconds = computed(() => this.lastChange() / 1000);

  rating = signal(5);
  starsArray = computed(() => new Array(this.rating));

  books: Book[] = [];

  // private rs = inject(BookRatingService);

  constructor(private rs: BookRatingService) {
    this.books = [
      {
        isbn: '123',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        rating: 5,
        price: 42.9
      },
      {
        isbn: '456',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        rating: 4,
        price: 36.9
      }
    ];
  }

  updateLastChange() {
    // this.lastChange = Date.now();
    this.lastChange.set(Date.now());
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book) {
    this.books = this.books.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    });

    // [1,2,3,4,5,6].map(e => e * 10) // [10, 20, 30, 40, 50, 60]
    // [1,2,3,4,5,6].filter(e => e !== 3) // [1, 2, 4, 5, 6]


  }
}

