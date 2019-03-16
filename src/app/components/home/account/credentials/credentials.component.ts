import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'credentials',
    templateUrl: 'credentials.component.html',
    styleUrls: ['credentials.component.css']
})
export class CredentialsComponent implements OnInit {

    signIn: boolean = true;
    loginEmail: string = "";
    loginPassword: string = "";

    registerInfo: boolean = false;
    registerEmail: string = "";
    registerTitle: string = "";
    registerFirstname: string = "";
    registerLastname: string = "";
    registerPassword: string = "";
    registerNewsletter: boolean = false;

    constructor(private route: Router, private account: AccountService, private api: ApiService) { }

    ngOnInit() {
        if (this.account.getAccount == null || this.account.getAccount().emailAddress != undefined)
            this.route.navigateByUrl("/account");
    }

    navigateToForgotten() {
        this.route.navigateByUrl("account/my-account/forgotten");
    }

    showRegistrationProcess() {
        if (this.account.checkVariableNotEmpty(this.registerEmail))
            return;
        this.registerInfo = true;
    }

    async attemptLogin() {
        if (this.account.getAccount().emailAddress == undefined) {
            if (this.account.checkVariableNotEmpty(this.loginEmail) || this.account.checkVariableNotEmpty(this.loginPassword))
                return;
            let response = await this.account.attemptLogin(this.loginEmail, this.loginPassword);
            if (response == "true")
                this.route.navigateByUrl('/account');
            else
                console.log(response); //Idea would be to display the error on the login page
        }
    }

    async registerAccount() {
        if (this.account.checkVariableNotEmpty(this.registerEmail) || this.account.checkVariableNotEmpty(this.registerTitle) || this.account.checkVariableNotEmpty(this.registerFirstname)
            || this.account.checkVariableNotEmpty(this.registerLastname) || this.account.checkVariableNotEmpty(this.registerPassword))
            return;
        let response = await this.account.registerAccount(this.registerTitle, this.registerFirstname, this.registerLastname, this.registerEmail, this.registerPassword, this.registerNewsletter);
        if (response == "true")
            this.route.navigateByUrl('/account')

    }

}
