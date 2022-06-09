import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Position } from '../models/position';
import { Worker } from '../models/worker';
import { WorkerStatus } from '../models/workerStatus';
import { WorkerUpdateModel } from '../models/workerUpdateModel';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-worker-detail',
  templateUrl: './worker-detail.component.html',
  styleUrls: ['./worker-detail.component.css']
})
export class WorkerDetailComponent implements OnInit {

  id: any;
  isNew: boolean;
  progressBar: boolean;
  worker: Worker = new Worker();
  updateWorker = new WorkerUpdateModel();
  entityForm: FormGroup;
  statuses: WorkerStatus[] = [];
  positions: Position[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private titleService: Title,
    private workerService: WorkerService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fillData();
  }

  initForm(): void {
    this.entityForm = this.formBuilder.group({
      jmbg: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      coefficient: ['', [Validators.required, Validators.max(10), Validators.min(5)]],
      nameAndSurname: ['', Validators.required],
      dateOfEmployment: ['', Validators.required],
      statusId: ['', Validators.required],
      positionId: ['', Validators.required],
    });
  }

  fillData(): void {
    forkJoin([
      this.workerService.getWorkerStatuses(),
      this.workerService.getPositions()
    ]).subscribe(data => {
      this.statuses = data[0],
        this.positions = data[1],
        this.initData();
    });
  }

  initData(): void {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.isNew = this.id === 'new';
      if (this.isNew) {
        this.setTitle(`Create New Worker`);
        this.progressBar = false;
      } else {
        this.initObject();
      }
    });
  }

  initObject(): void {
    this.progressBar = true;
    this.workerService.getWorker(this.id).subscribe(
      response => this.worker = response,
      () => {
        this.progressBar = false;
        this.router.navigate(['/workers']);
      },
      () => {
        this.setTitle(`Worker - ${this.worker.nameAndSurname}`);
        this.patchEntityForm();
        this.progressBar = false;
      }
    );
  }

  patchEntityForm(): void {
    this.entityForm.patchValue({
      jmbg: this.worker.jmbg,
      coefficient: this.worker.coefficient,
      nameAndSurname: this.worker.nameAndSurname,
      dateOfEmployment: new Date(this.worker.dateOfEmployment),
      statusId: this.worker.workerStatusId,
      positionId: this.worker.positionId
    });
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  onSave() {
    this.progressBar = true;
    if (this.isNew) {
      this.createNew();
      this.progressBar = false;
    } else if (!isNaN(this.id)) {
      this.update();
      this.progressBar = false;
    }
  }

  createNew() {
    let newWorker = new Worker();
    newWorker = Object.assign(newWorker, this.entityForm.value);
    newWorker.workerStatusId = this.entityForm.get('statusId').value;
    newWorker.positionId = this.entityForm.get('positionId').value;

    this.workerService.createWorker(newWorker).subscribe(
      () => {},
      error => {
        this.displayErrorMessage(error.error);
        this.progressBar = false;
      },
      () => {
        this.progressBar = false;
        this.router.navigate(['/workers']);
      }
    );
  }

  update(): void {
    this.updateWorker = Object.assign(this.updateWorker, this.entityForm.value);
    this.updateWorker.id = this.worker.id;
    this.updateWorker.workerStatusId = this.entityForm.get('statusId').value;
    this.updateWorker.positionId = this.entityForm.get('positionId').value;

    this.workerService.updateWorker(this.updateWorker).subscribe(
      () => { },
      error => {
        this.displayErrorMessage(error.error);
        this.progressBar = false;
      },
      () => {
        this.progressBar = false;
        this.router.navigate(['/workers']);
      }
    );
  }

  displayErrorMessage(errorMessage): void {
    if(errorMessage.includes('Invalid entry!') &&  new Date(this.entityForm.get('dateOfEmployment').value) > new Date()){
      this.confirmationService.confirm({
        header: 'Warning',
        message: 'Date of Employment cannot be in the future!',
        acceptVisible: false,
        rejectLabel: 'Close',
        reject: () => {
        }
      });
    } else {
      this.confirmationService.confirm({
        header: 'Warning',
        message: 'Invalid entry!',
        acceptVisible: false,
        rejectLabel: 'Close',
        reject: () => {
        }
      });
    }

    if(errorMessage.includes('Already exist!')){
      this.confirmationService.confirm({
        header: 'Warning',
        message: 'The worker with the entered JMBG already exists!',
        acceptVisible: false,
        rejectLabel: 'Close',
        reject: () => {
        }
      });
    }
  }

}

