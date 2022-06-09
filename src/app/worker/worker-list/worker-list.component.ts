import { DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { forkJoin, Subject } from 'rxjs';
import { Worker } from '../models/worker';
import localeDe from '@angular/common/locales/de';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit {

  private ngUnsubscribe: Subject<any> = new Subject<any>();
  cols: any[];
  loading = true;
  workers: Worker[] = [];

  constructor(
    private router: Router,
    private decimalPipe: DecimalPipe,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private titleService: Title,
    private workerService: WorkerService
  ) { }

  ngOnInit(): void {
    this.setTitle(`Workers`);
    this.initServices();
    this.initCols();
    registerLocaleData(localeDe, 'de-DE');
  }

  ngOnDestroy() {
    this.setTitle(`Workers`);
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  initServices(): void {
    forkJoin([
      this.workerService.getWorkers(),
    ]).subscribe(
      (data) => {
        this.workers = data[0];
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
      { field: 'jmbg', header: 'JMBG' },
      { field: 'coefficient', header: 'Coefficient', format: '', pipeType: 'number' },
      { field: 'nameAndSurname', header: 'Name' },
      { field: 'dateOfEmployment', header: 'Date Of Employment', format: 'dd.MM.yyyy', pipeType: 'date' },
      { field: 'status', header: 'Status' },
      { field: 'position', header: 'Position' }
    ];
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
    this.router.navigate(['workers/new']);
  }

  onRowSelect(event) {
    this.router.navigate(['workers', event.data.id]);
  }
}
