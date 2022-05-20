import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  items: MenuItem[];
  constructor() { }

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
