import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExpenseCategoriGrapgic } from '../models/ExpenseCategori';

@Injectable({
  providedIn: 'root'
})
export class GraphicService {

  url = `${environment.apis.apiUrl}/graphic`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getGraphicBillingAvailable(year: number): Observable<{billingLimit: number, totalPosted: number}>{
    return this.httpClient.get<any>(`${this.url}/billingAvailable/${year}`);
  }

  getGraphicInvoiceMonths(year: number): Observable<{month: string, valueMonth: number}[]>{
    return this.httpClient.get<any>(`${this.url}/invoiceMonths/${year}`);
  }

  getGraphicExpenseMonths(year: number): Observable<{month: string, valueMonth: number}[]>{
    return this.httpClient.get<any>(`${this.url}/expenseMonths/${year}`);
  }

  getGraphicExpensePerCategori(year: number): Observable<ExpenseCategoriGrapgic[]>{
    return this.httpClient.get<any>(`${this.url}/expensePerCategori/${year}`);
  }

  getGraphicSimpleSwing(year: number): Observable<{month: string, valueMonth: number}[]>{
    return this.httpClient.get<any>(`${this.url}/simpleSwing/${year}`);
  }
}
