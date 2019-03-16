import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'account-menu',
    templateUrl: 'account-menu.component.html',
    styleUrls: ['account-menu.component.css', '../../reusable/nav-bar/nav-bar.component.css']
})
export class AccountMenuComponent {

    constructor(private account: AccountService, private route: Router) {}

    async attemptLogout() {
        let response = await this.account.attemptLogout();
        if (response == "true") {
            this.route.navigateByUrl("/account/my-account")
        }
    }
}
