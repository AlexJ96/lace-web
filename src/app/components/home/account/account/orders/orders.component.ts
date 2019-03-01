import { Component } from '@angular/core';

@Component({
    selector: 'orders',
    templateUrl: 'orders.component.html',
    styleUrls: ['orders.component.css', '../account.component.css']
})
export class OrdersComponent {

    collapse: boolean = true;

}
