import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpenseCategori } from '../models/ExpenseCategori';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoriService {

  url = `${environment.apis.apiUrl}/expense-categori`;

  constructor(
    private httClient: HttpClient
  ) { }

  getAllExpenseCategories(): Observable<ExpenseCategori[]> {
    return this.httClient.get<ExpenseCategori[]>(`${this.url}es`);
  }

  getAllFilterExpenseCategories(): Observable<ExpenseCategori[]> {
    return this.httClient.get<ExpenseCategori[]>(`${this.url}-filter`);
  }



  getByIdExpenseCategori(id: number): Observable<ExpenseCategori> {
    return this.httClient.get<ExpenseCategori>(`${this.url}/${id}`);
  }

  postExpenseCategori(value: ExpenseCategori): Observable<ExpenseCategori>{
    return this.httClient.post<ExpenseCategori>(`${this.url}`, value);
  }

  putExpenseCategori(value: ExpenseCategori): Observable<ExpenseCategori>{
    return this.httClient.put<ExpenseCategori>(`${this.url}`, value);
  }

  deleteExpenseCategori(id: number): Observable<any>{
    return this.httClient.delete<any>(`${this.url}/${id}`);
  }
}
