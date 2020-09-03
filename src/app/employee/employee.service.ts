import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { IEmployee } from './IEmployee';
import { catchError, tap } from 'rxjs/operators'

/* @Injectable({
  providedIn: 'root'
}) */
//another way of injecting is in the Root module itself and using @Injectable only
@Injectable() 
export class EmployeeService {

  baseUrl = "http://localhost:3000/employees"
  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<IEmployee[]>{
    return this.httpClient.get<IEmployee[]>(this.baseUrl)
            .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse){
    if(errorResponse.error instanceof ErrorEvent){
      console.log('Client Side Error :',errorResponse.error.message);
    }
    else{
      console.log('Server Side Error :',errorResponse.message);
    }
    return throwError('There is a problem with service. We are notified and working on it. Please try after some time.');
  }

  getEmployee(id: number): Observable<IEmployee> {
    return this.httpClient.get<IEmployee>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError));
  }
  
  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.httpClient.post<IEmployee>(this.baseUrl, employee, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    })
    .pipe(catchError(this.handleError));
  }

  updateEmployee(employee: IEmployee): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    })
    .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
        .pipe(catchError(this.handleError));
}
}
