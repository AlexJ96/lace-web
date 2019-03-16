import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'contact-preferences',
    templateUrl: 'contact-preferences.component.html',
    styleUrls: ['contact-preferences.component.css', '../account.component.css']
})
export class ContactPreferencesComponent implements OnInit {

    account: any;

    constructor(private route: Router, private accountService: AccountService) {}

    ngOnInit() {
        if (this.accountService.getAccount() == null || this.accountService.getAccount().emailAddress == undefined)
            this.route.navigateByUrl("/account/my-account");
        this.account = this.accountService.getAccount();
    }

    toggleNewsletter() {
        this.account.newsletter = !this.account.newsletter;
        this.saveAccount();
    }

    async saveAccount() {
        await this.accountService.updateAccount(this.account);
    }

}
