import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductCardboard } from '../models/productCardboard';

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
