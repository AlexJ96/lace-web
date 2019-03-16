import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'my-details',
    templateUrl: 'my-details.component.html',
    styleUrls: ['my-details.component.css', '../account.component.css']
})
export class MyDetailsComponent implements OnInit {

    account: any;

    constructor(private route: Router, private accountService: AccountService) {}

    ngOnInit() {
        if (this.accountService.getAccount() == null || this.accountService.getAccount().emailAddress == undefined)
            this.route.navigateByUrl("/account/my-account");
        this.account = this.accountService.getAccount();
    }

    async saveAccount() {
        await this.accountService.updateAccount(this.account);
    }

}
