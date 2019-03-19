import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'account',
    templateUrl: 'account.component.html',
    styleUrls: ['account.component.css']
})
export class AccountComponent implements OnInit {

    account: any;
    mobile: boolean = false;
    pageView = 'overview' 
    accountId = '12345'

    constructor(private route: Router, private accountService: AccountService, private util: UtilService) {}

    ngOnInit() {
        if (this.accountService.getAccount() == null || this.accountService.getAccount().emailAddress == undefined)
            this.route.navigateByUrl("/account/my-account");
        this.account = this.accountService.getAccount();
    }

    navigate(route) {
       this.route.navigateByUrl("account/"+route);
    }

    editMyDetails() {
        this.route.navigateByUrl("account/my-details");
    }

    getGender() {
        return this.account.gender != null ? this.account.gender : "-"
    }

    getDateOfBirth() {
        return this.account.dateOfBirth != null ? (this.account.dateOfBirth.dayOfMonth + " " + this.util.getMonthString(this.account.dateOfBirth.month+1) + " " + this.account.dateOfBirth.year) : "-";
    }

}
