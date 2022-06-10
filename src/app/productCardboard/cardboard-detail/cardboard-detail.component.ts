import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Phase } from '../models/phase';
import { PhaseStatus } from '../models/phaseStatus';
import { Product } from '../models/product';
import { ProductCardboard } from '../models/productCardboard';
import { ProductCardboardPhase } from '../models/productCardboardPhase';
import { ProductCardboardService } from '../services/product-cardboard.service';


@Component({
  selector: 'app-cardboard-detail',
  templateUrl: './cardboard-detail.component.html',
  styleUrls: ['./cardboard-detail.component.css']
})
export class CardboardDetailComponent implements OnInit {

  pccNumber: any;
  isNew: boolean;
  progressBar: boolean;
  productCardboard: ProductCardboard = new ProductCardboard();
  productCardboardPhases: ProductCardboardPhase[] = [];
  entityForm: FormGroup;
  phaseForm: FormGroup;
  products: Product[] = [];
  phases: Phase[] = [];
  statuses: PhaseStatus[] = [];
  selectedProduct: Product = new Product();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private productCardboardService: ProductCardboardService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fillData();
    this.onChangeProduct();
  }

  initForm(): void {
    this.entityForm = this.formBuilder.group({
      pccNumber: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      productId: ['', Validators.required],
      weight: [''],
      height: [''],
      length: [''],
      type: ['']
    });
    this.phaseForm = this.formBuilder.group({
      phaseId: ['', Validators.required],
      statusId: ['', Validators.required],
    });
  }

  fillData(): void {
    forkJoin([
      this.productCardboardService.getProducts(),
      this.productCardboardService.getPhases(),
      this.productCardboardService.getPhaseStatuses()
    ]).subscribe(data => {
      this.products = data[0],
        this.phases = data[1],
        this.statuses = data[2],
        this.initData();
    });
  }

  initData(): void {
    this.route.paramMap.subscribe(param => {
      this.pccNumber = param.get('id');
      this.isNew = this.pccNumber === 'new';
      if (this.isNew) {
        this.setTitle(`Create New Product Cardboard`);
        this.progressBar = false;
      } else {
        this.initObject();
      }
    });
  }

  initObject(): void {
    this.progressBar = true;
    forkJoin([
      this.productCardboardService.getProductCardboard(this.pccNumber),
      this.productCardboardService.getProductCardboardPhases(this.pccNumber)
    ]).subscribe(
      response => {
        this.productCardboard = response[0],
          this.productCardboardPhases = response[1]
      },
      () => {
        this.progressBar = false;
        this.router.navigate(['/cardboards']);
      },
      () => {
        this.setTitle(`Product Cardboard - ${this.productCardboard.pccNumber}`);
        this.patchEntityForm();
        this.progressBar = false;
      }
    );
  }

  patchEntityForm(): void {
    this.entityForm.patchValue({
      pccNumber: this.productCardboard.pccNumber,
      startDate: new Date(this.productCardboard.startDate),
      endDate: new Date(this.productCardboard.endDate),
      productId: this.productCardboard.productId,
    });
  }

  onChangeProduct(): void {
    this.entityForm.get('productId').valueChanges.subscribe(
      value => {
        if (value != null && value != 'undefined' && value != "" && value != " ") {
          let product = this.products.find(p => p.id == this.entityForm.get('productId').value)
          this.entityForm.get('type').setValue(product.type.description);
          this.entityForm.get('length').setValue(product.length);
          this.entityForm.get('weight').setValue(product.weight);
          this.entityForm.get('height').setValue(product.height);
        }
      }
    );
  }

  addPhase() {

  }

  editPhase(phase: ProductCardboardPhase) {
    // this.product = { ...product };
    // this.productDialog = true;
  }

  deletePhase(phase: ProductCardboardPhase) {
    this.route.paramMap.subscribe(param => {
      this.pccNumber = param.get('id');
      this.isNew = this.pccNumber === 'new';
      if (this.isNew) {
        

      } else {
        this.confirmationService.confirm({
          message: 'Are you sure you want to delete this phase?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            let ids = [phase.pccNumber, phase.phaseId]
            this.productCardboardService.deletePhase(ids).subscribe(
              () => {},
              error => {
                this.displayErrorMessage(error.error);
              },
              () =>
              {
                this.initData()
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Phase Deleted', life: 3000 });
              }
            )
          }
        });
      }
    });
  }

  displayErrorMessage(errorMessage): void {
    this.confirmationService.confirm({
      header: 'Warning',
      message: errorMessage,
      acceptVisible: false,
      rejectLabel: 'Close',
      reject: () => {
      }
    });
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }
}
 