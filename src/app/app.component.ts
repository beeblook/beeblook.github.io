import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  data: any;
  constructor(private dataService: DataService) {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
    });
  }
}
