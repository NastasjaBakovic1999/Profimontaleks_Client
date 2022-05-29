import { TestBed } from '@angular/core/testing';

import { ProductCardboardService } from './product-cardboard.service';

describe('ProductCardboardService', () => {
  let service: ProductCardboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCardboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
