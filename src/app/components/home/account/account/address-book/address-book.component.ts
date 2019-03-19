import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'address-book',
    templateUrl: 'address-book.component.html',
    styleUrls: ['address-book.component.css', '../account.component.css', '../my-details/my-details.component.css']
})
export class AddressBookComponent implements OnInit {

    addingAddress: boolean = false;
    newAddress: any = {
        numberStreet: "",
        town: "",
        city: "",
        country: "",
        postcode: ""
    };

    addresses: any;

    editedAddress: any = {
        numberStreet: "",
        town: "",
        city: "",
        country: "",
        postcode: ""
    };
    editingAddress: boolean = false;

    constructor(private account: AccountService) { }

    async ngOnInit() {
        this.addresses = await this.account.loadAddresses();
        console.log(this.addresses);
    }

    editAddress(address) {
        this.editedAddress = address;
        this.editingAddress = true;
    }

    async updateAddress() {
        if (this.editedAddress.numberStreet == undefined || this.editedAddress.numberStreet == "")
            return;
        if (this.editedAddress.town == undefined || this.editedAddress.town == "")
            return;
        if (this.editedAddress.city == undefined || this.editedAddress.city == "")
            return;
        if (this.editedAddress.country == undefined || this.editedAddress.country == "")
            return;
        if (this.editedAddress.postcode == undefined || this.editedAddress.postcode == "")
            return;

        this.editingAddress = false;
        await this.account.updateAddress(this.editedAddress);
        this.addresses = await this.account.loadAddresses();
    }

    async addAddress() {
        console.log(this.newAddress);
        if (this.newAddress.numberStreet == undefined || this.newAddress.numberStreet == "")
            return;
        if (this.newAddress.town == undefined || this.newAddress.town == "")
            return;
        if (this.newAddress.city == undefined || this.newAddress.city == "")
            return;
        if (this.newAddress.country == undefined || this.newAddress.country == "")
            return;
        if (this.newAddress.postcode == undefined || this.newAddress.postcode == "")
            return;

        this.addingAddress = false;
        await this.account.addAddress(this.newAddress);
        this.addresses = await this.account.loadAddresses();
    }

}
