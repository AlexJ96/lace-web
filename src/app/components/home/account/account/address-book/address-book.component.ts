import { Component } from '@angular/core';

@Component({
    selector: 'address-book',
    templateUrl: 'address-book.component.html',
    styleUrls: ['address-book.component.css', '../account.component.css', '../my-details/my-details.component.css']
})
export class AddressBookComponent {

    addingAddress: boolean = false;
    
}
