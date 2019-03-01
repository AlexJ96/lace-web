import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'credentials',
    templateUrl: 'credentials.component.html',
    styleUrls: ['credentials.component.css']
})
export class CredentialsComponent {

    signIn: boolean = true;

    constructor(private route: Router) {}

    navigateToForgotten() {
        this.route.navigateByUrl("account/my-account/forgotten");
    }

}
