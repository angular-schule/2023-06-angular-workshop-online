import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent {
  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ]
    }),
    description: new FormControl('', { nonNullable: true }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.min(1),
        Validators.max(5)
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.min(0)]
    })
  });

  submitForm() {
    // TODO
  }
}


/*
TODO
- Fehlermeldungen anzeigen
  - "ist ungültig"
  - "ist zu kurz" (konkreter Fehler)
- Button
- Button deaktivieren
- abschicken
- Buch anlegen HTTP
- bei Erfolg
  - Meldung
  - zurücksetzen
  - navigieren
- bei Misserfolg: Fehler anzeigen

*/
