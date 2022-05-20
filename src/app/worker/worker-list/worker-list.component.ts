import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { forkJoin } from 'rxjs';
import { Position } from '../models/position';
import { Worker } from '../models/worker';
import { WorkerStatus } from '../models/workerStatus';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit {

  cols: any[];
  form: FormGroup;
  loading = true;
  @ViewChild('dt') private dt: Table;
  workers: Worker[] = [];
  workerStatuses: WorkerStatus[] = [];
  positions: Position[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private titleService: Title,
    private workerService: WorkerService
  ) { }

  ngOnInit(): void {
    this.setTitle(`Workers`);
    this.initServices();
    this.initCols();
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  initServices(): void {
    forkJoin([
      this.workerService.getWorkers(),
      this.workerService.getWorkerStatuses(),
      this.workerService.getPositions(),
    ]).subscribe((data) => {
      this.workers = data[0];
      this.workerStatuses = data[1];
      this.positions = data[2];
    });
  }

  initCols() {
    this.cols = [
      { field: 'jmbg', header: 'JMBG' },
      { field: 'coefficient', header: 'Coefficient' },
      { field: 'nameAndSurname', header: 'Name' },
      { field: 'dateOfEmployment', header: 'Date Of Employment' },
      { field: 'status.description', header: 'Status' },
      { field: 'position.description', header: 'Position' }
    ];
  }

  addNew() {
    this.router.navigate(['crm/accounts/new']);
  }

  onRowSelect(event) {
    this.router.navigate(['crm/accounts', event.data.id]);
  }
}
