import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'address-book',
    templateUrl: 'address-book.component.html',
    styleUrls: ['address-book.component.css', '../account.component.css', '../my-details/my-details.component.css']
})
export class AddressBookComponent implements OnInit {

    addingAddress: boolean = false;
    addresses: any;

    constructor(private account: AccountService) {}

    async ngOnInit() {
        this.addresses = await this.account.loadAddresses();
        console.log(this.addresses);
    }
    
}
