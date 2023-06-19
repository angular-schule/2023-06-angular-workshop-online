import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { of } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    const ratingMock = {
      rateUp: (b: Book) => b
    };

    const storeMock = {
      getAll: () => of([])
    };

    TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        // BRS ersetzen: Immer, wenn jemand BRS anfordert,
        // wird stattdessen ratingMock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock },
        { provide: BookStoreService, useValue: storeMock },
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    // Zugriff auf das DOM-Element
    // fixture.nativeElement.querySelector('p').textContent

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for component.doRateUp()', () => {
    // Arrange
    // BRS anfordern, tatsächlich ist das aber unser ratingMock
    const service = TestBed.inject(BookRatingService);

    // Testbuch
    const testBook = { isbn: '123' } as Book; // Type Assertion

    // ratingMock überwachen (spyOn ersetzt die Methode)
    // spyOn(service, 'rateUp').and.callFake(b => b);
    // spyOn(service, 'rateUp').and.returnValue(testBook);
    spyOn(service, 'rateUp').and.callThrough();

    // Act
    component.doRateUp(testBook);

    // Assert
    expect(service.rateUp).toHaveBeenCalled()
    expect(service.rateUp).toHaveBeenCalledTimes(1);
    expect(service.rateUp).toHaveBeenCalledWith(testBook);
    expect(service.rateUp).toHaveBeenCalledOnceWith(testBook);
  });
});
