import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'complete',
    templateUrl: 'complete.component.html',
    styleUrls: ['complete.component.css', '../../../account/account/account.component.css']
})
export class CompleteComponent implements OnInit {

    constructor(private route: Router) { }

    async ngOnInit() {
    }

    navigate() {
        this.route.navigateByUrl("/");
    }
}
