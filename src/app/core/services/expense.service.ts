import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expense } from '../models/Expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  url = `${environment.apis.apiUrl}/expense`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllExpenses(): Observable<Expense[]> {
    return this.httpClient.get<Expense[]>(`${this.url}s`);
  }

  getByIdExpense(id: number): Observable<Expense> {
    return this.httpClient.get<Expense>(`${this.url}/${id}`);
  }


  postExpense(value: Expense): Observable<Expense>{
    return this.httpClient.post<Expense>(`${this.url}`, value);
  }

  putExpense(value: Expense): Observable<Expense>{
    return this.httpClient.put<Expense>(`${this.url}`, value);
  }

  deleteExpense(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/${id}`);
  }
}
