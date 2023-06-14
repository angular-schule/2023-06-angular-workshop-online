import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


///////////////////////////

interface Customer {
  id: number;
  name: string;
  address: string;
}


function foo(arg: Customer) {}


const myCustomer: Customer = {
  id: 5,
  name: '',
  address: ''
};
