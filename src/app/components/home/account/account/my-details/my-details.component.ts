import { Component } from '@angular/core';

@Component({
    selector: 'my-details',
    templateUrl: 'my-details.component.html',
    styleUrls: ['my-details.component.css', '../account.component.css']
})
export class MyDetailsComponent {

    male: boolean = false;
    female: boolean = false;

}
