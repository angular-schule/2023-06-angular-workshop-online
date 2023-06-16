import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, NgIf } from '@angular/common';
import { Book } from '../shared/book';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [NgIf, RatingComponent, CurrencyPipe],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {
  // hier dürfen Daten von der Elternkomponente hineinfließen
  // von oben nach unten
  @Input({ required: true }) book?: Book;

  @Input() minRating = 0;
  @Input() maxRating = 10;

  // hier dürfen Daten zur Elternkomponente fließen
  // von unten nach oben
  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  doRateUp() {
    this.rateUp.emit(this.book);
  }

  doRateDown() {
    this.rateDown.emit(this.book);
  }
}
