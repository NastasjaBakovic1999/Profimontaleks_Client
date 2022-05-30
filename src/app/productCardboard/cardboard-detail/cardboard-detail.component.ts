import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Phase } from '../models/phase';
import { PhaseStatus } from '../models/phaseStatus';
import { Product } from '../models/product';
import { ProductCardboard } from '../models/productCardboard';
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
  entityForm: FormGroup;
  phaseForm: FormGroup;
  products: Product[] = [];
  phases: Phase[] = [];
  statuses: PhaseStatus[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private productCardboardService: ProductCardboardService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fillData();
  }

  initForm(): void {
    this.entityForm = this.formBuilder.group({
      pccNumber: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      productId: ['', Validators.required],
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
      this.pccNumber = param.get('pccNumber');
      this.isNew = this.pccNumber === 'new';
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
    forkJoin([
      this.productCardboardService.getProductCardboard(this.pccNumber),
      this.productCardboardService.getProductCardboardPhases(this.pccNumber)
    ]).subscribe(
      response => {
        this.productCardboard = response[0],
          this.productCardboard.phases = response[1]
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

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }
}
