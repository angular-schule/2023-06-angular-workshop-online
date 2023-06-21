import { Component } from '@angular/core';
import { Subject, ReplaySubject, scan, reduce, startWith } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
    templateUrl: './game-score.component.html',
    standalone: true,
    imports: [HistoryComponent]
})
export class GameScoreComponent {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore = 0;

  constructor() {
    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den Punktestand zu ermitteln ...
     */

    /******************************/

    // [1,2,3,4,5].reduce((acc, item) => acc + item, 0) // 15

    this.score$.pipe(
      startWith(1000),
      scan((acc, item) => acc + item, 0)
    ).subscribe(e => {
      this.currentScore = e;
    });

    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
