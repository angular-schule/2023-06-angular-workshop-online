import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

////////////////////////////

export const foo = 5;
export function bar() {}

export class Customer {

  static foo = 5;

  /*private id: number;

  constructor(idx: number) {
    this.id = idx;
  }*/


  constructor(public id: number) {}


  fooBar(arg: string): number {
    setTimeout(() => {
      console.log('Hallo', this.id);
    }, 2000);
    return 5;
  }
}

const myCustomer = new Customer(4);
const result = myCustomer.fooBar('');
console.log(result);





