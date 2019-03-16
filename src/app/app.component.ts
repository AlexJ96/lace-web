import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lace-Boutique-Web';


  constructor(private api: ApiService) {}
  async ngOnInit() {
    await this.api.checkTokenForRefresh();
  }

}
