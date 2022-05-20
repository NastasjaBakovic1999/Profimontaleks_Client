import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Position } from '../models/position';
import { Worker } from '../models/worker';
import { WorkerStatus } from '../models/workerStatus';


@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.apiUrl = `${environment.api}`;
  }

  getWorkers(): Observable<Worker[]> {
    return this.http.get<Worker[]>(`${this.apiUrl}/worker/get-workers`)
      .pipe(
        catchError(this.handleError<Worker[]>(`An error occurred while trying to retrieve the data`))
      );
  }

  getWorkerStatuses(): Observable<WorkerStatus[]> {
    return this.http.get<WorkerStatus[]>(`${this.apiUrl}/worker-status/get-worker-statuses`)
      .pipe(
        catchError(this.handleError<WorkerStatus[]>(`An error occurred while trying to retrieve the data`))
      );
  }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.apiUrl}/position/get-positions`)
    .pipe(
      catchError(this.handleError<Position[]>(`An error occurred while trying to retrieve the data`))
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
