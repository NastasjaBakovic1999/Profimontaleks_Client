import { DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin, Subject } from 'rxjs';
import { ProductCardboard } from '../models/productCardboard';
import localeDe from '@angular/common/locales/de';
import { ProductCardboardService } from '../services/product-cardboard.service';

@Component({
  selector: 'app-cardboard-list',
  templateUrl: './cardboard-list.component.html',
  styleUrls: ['./cardboard-list.component.css']
})
export class CardboardListComponent implements OnInit {

  private ngUnsubscribe: Subject<any> = new Subject<any>();
  cols: any[];
  loading = true;
  productCardboards: ProductCardboard[] = [];

  constructor(
    private router: Router,
    private decimalPipe: DecimalPipe,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private titleService: Title,
    private productCardboardService: ProductCardboardService
  ) { }

  ngOnInit(): void {
    this.setTitle(`Product Cardboards`);
    this.initServices();
    this.initCols();
    registerLocaleData(localeDe, 'de-DE');
  }

  initServices(): void {
    forkJoin([
      this.productCardboardService.getProductCardboards(),
    ]).subscribe(
      (data) => {
        this.productCardboards = data[0];
      },
      error => {
        this.messageService.add({ severity: 'error', sticky: true, detail: error.message });
      },
      () => {
        this.loading = false;
      }
    );
  }

  initCols() {
    this.cols = [
      { field: 'pccNumber', header: 'PCC Number' },
      { field: 'startDate', header: 'Start Date', format: 'dd.MM.yyyy', pipeType: 'date' },
      { field: 'endDate', header: 'End Date', format: 'dd.MM.yyyy', pipeType: 'date' },
      { field: 'product.type.description', header: 'Product' }
    ];
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  transform(data, pipe, pipeType) {
    if (data == null || data == 'undefined') return '';
    switch (pipeType) {
      case 'number': return this.decimalPipe.transform(data, pipe, 'de-DE');
      case 'date': return this.datePipe.transform(data, pipe);
    }
    return data;
  }

  addNew() {
    this.router.navigate(['cardboards/new']);
  }

  onRowSelect(event) {
    this.router.navigate(['cardboards', event.data.pccNumber]);
  }
}
