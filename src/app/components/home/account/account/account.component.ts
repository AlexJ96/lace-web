import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

    constructor(private route: Router) {}

    ngOnInit() {
        // Add check if logged in if not then redirect to login section
        // this.route.navigateByUrl('account/my-account')
    }

    navigate(route) {
        if (this.mobile) {
            this.route.navigateByUrl("account/settings/"+route);
        } else {
            this.pageView = route;
        }
    }

    editMyDetails() {
        this.route.navigateByUrl("account/my-details");
    }

}
