import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Observer, Subscriber, take, partition, pipe } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './creating.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<string | number>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/

    // of('A', 'B', 'C')
    // from([1,2,3,4,5,6])
    // interval(1000)        // ---0---1---2---3---4--- ...
    // timer(2000)           // ------0|
    // timer(4000, 1000)     // ------------0---1---2---3---4--- ...
    // timer(0, 1000)        // 0---1---2---3---4--- ...

    const myCustomOperator = pipe(
      map((e: number) => e * 3),
      filter(e => e % 2 === 0)
    );

    function myCustomOp2() {
      return function (source$: Observable<number>): Observable<number> {
        return source$.pipe(
          map((e: number) => e * 3),
          filter(e => e % 2 === 0)
        );
      }
    }


    function myCustomOp3(source$: Observable<number>): Observable<number> {
      return source$.pipe(
        map((e: number) => e * 3),
        filter(e => e % 2 === 0)
      );
    }

    timer(0, 1000).pipe(
      map((e: number) => e * 3),
      filter(e => e % 2 === 0),
    ).subscribe({
      next: e => this.log(e),
      error: e => console.log(e),
      complete: () => this.log('COMPLETE')
    });


    /******************************/

    function producer(sub: Subscriber<number>) {
      sub.next(Math.random());

      const result2 = 1;
      sub.next(result2);
      sub.next(100);
      sub.next(111);
      sub.next(222);

      const timer1 = setTimeout(() => sub.next(5), 2000);
      const timer2 = setTimeout(() => sub.complete(), 4000);

      // Teardown Logic // beim unsubscribe()
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      };

    }

    const obs: Observer<number> = {
      next: e => console.log(e),
      error: (e: any) => console.error(e),
      complete: () => console.log('COMPLETE')
    };

    // producer(obs);

    const myObs$ = new Observable(producer);
    const sub = myObs$.subscribe(obs);

    // sub.unsubscribe();




    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
