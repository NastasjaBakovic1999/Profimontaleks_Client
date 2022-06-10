import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Phase } from '../models/phase';
import { PhaseStatus } from '../models/phaseStatus';
import { Product } from '../models/product';
import { ProductCardboard } from '../models/productCardboard';
import { ProductCardboardPhase } from '../models/productCardboardPhase';
import { ProductType } from '../models/productType';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})
export class ProductCardboardService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { 
    this.apiUrl = `${environment.api}`;
  }

  getProductCardboards(): Observable<ProductCardboard[]> {
    return this.http.get<ProductCardboard[]>(`${this.apiUrl}product-cardboards/get-cardboards`)
      .pipe(
        catchError(this.handleError<ProductCardboard[]>(`An error occurred while trying to retrieve the data`))
      );
  }

  getProductCardboard(pccNumber: number): Observable<ProductCardboard> {
    return this.http.get<ProductCardboard>(`${this.apiUrl}product-cardboards/get-cardboard/${pccNumber}`)
      .pipe(
        catchError(this.handleError<ProductCardboard>(`An error occurred while trying to retrieve the data`))
      );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}product/get-products`)
      .pipe(
        catchError(this.handleError<Product[]>(`An error occurred while trying to retrieve the data`))
      );
  }

  getPhases(): Observable<Phase[]> {
    return this.http.get<Phase[]>(`${this.apiUrl}phase/get-phases`)
      .pipe(
        catchError(this.handleError<Phase[]>(`An error occurred while trying to retrieve the data`))
      );
  }

  getPhaseStatuses(): Observable<PhaseStatus[]> {
    return this.http.get<PhaseStatus[]>(`${this.apiUrl}phase-status/get-phase-statuses`)
      .pipe(
        catchError(this.handleError<PhaseStatus[]>(`An error occurred while trying to retrieve the data`))
      );
  }

  getProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${this.apiUrl}phase-status/get-phase-statuses`)
      .pipe(
        catchError(this.handleError<ProductType[]>(`An error occurred while trying to retrieve the data`))
      );
  }

  getProductCardboardPhases(pccNumber: number): Observable<ProductCardboardPhase[]> {
    return this.http.get<ProductCardboardPhase[]>(`${this.apiUrl}cardboard/get-cardboard-phases/${pccNumber}`)
      .pipe(
        catchError(this.handleError<ProductCardboardPhase[]>(`An error occurred while trying to retrieve the data`))
      );
  }

  deletePhase(ids: number[]):Observable<any> {
    const httpParams = new HttpParams({
      fromObject: {
       ids
      }
    });

    const httpOptions = {
      headers,
      params: httpParams
    };
    
    return this.http.delete(`${this.apiUrl}cardboard/delete-cardboard-phase`, httpOptions)
    .pipe(
      catchError(this.handleError<any[]>(`An error occurred while trying to delete the data`))
    );
  }

  updatePhase(phase: ProductCardboardPhase) : Observable<any> {
    return this.http.put<ProductCardboardPhase[]>(`${this.apiUrl}cardboard/update-cardboard-phase`, phase)
    .pipe(
      catchError(this.handleError<ProductCardboardPhase[]>(`An error occurred while trying to retrieve the data`))
    );
  }

  createPhase(phase: ProductCardboardPhase) : Observable<any> {
    return this.http.post<ProductCardboardPhase[]>(`${this.apiUrl}cardboard/add-cardboard-phase`, phase)
    .pipe(
      catchError(this.handleError<ProductCardboardPhase[]>(`An error occurred while trying to retrieve the data`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log('error', `${operation} `);
      return throwError(new Error());
    };
  }

  private log(logType: string, message: string) {
    if (logType === 'error') {
      this.messageService.clear();
      this.messageService.add({ severity: 'error', sticky: true, detail: message });
    } else {
      this.messageService.add({ severity: logType, detail: message });
    }
  }
}
