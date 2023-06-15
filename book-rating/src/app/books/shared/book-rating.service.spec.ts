import { TestBed } from '@angular/core/testing';

import { BookRatingService } from './book-rating.service';
import { Book } from './book';

describe('BookRatingService', () => {
  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    // Arrange
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRatingService);
    // Alternative
    // service = new BookRatingService();

    book = {
      isbn: '123',
      title: '',
      description: '',
      price: 4,
      rating: 3
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should rate up a book by one', () => {
    // Act
    const ratedBook = service.rateUp(book);

    // Assert
    expect(ratedBook.rating).toBe(4); // nicht: book.rating + 1
  });

  // TODO: Tests implementieren
  it('should rate down a book by one', () => {
    const ratedBook = service.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not rate higher than 5', () => {
    book.rating = 5;
    const ratedBook = service.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });

  it('should not rate lower than 1', () => {
    // Arrange
    book.rating = 1;

    // Act
    const ratedBook = service.rateDown(book);

    // Assert
    expect(ratedBook.rating).toBe(1);
  });

});
