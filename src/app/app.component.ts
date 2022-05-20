import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Profimontaleks';
  items: MenuItem[];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['']
      },
      {
        label: 'Workers',
        icon: 'pi pi-fw pi-users',
        routerLink: ['workers']
      },
      {
        label: 'Product Cardboards',
        icon: 'pi pi-fw pi-box',
        routerLink: ['cardboards']
      }
    ];
  }
}
