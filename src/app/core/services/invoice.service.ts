import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericValue } from '../models/GenericValue';
import { Invoice } from '../models/Invoice';

//Import Json for Months
import months from 'src/assets/config/months.json'

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  url = `${environment.apis.apiUrl}/invoice`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getMonths():GenericValue[] {
    return months;
  }

  getAllInvoices(): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(`${this.url}s`);
  }

  getHistoricRelease(year: number): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(`${this.url}/historicalRelease/${year}`);
  }

  getByIdInvoice(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${this.url}/${id}`);
  }

  postInvoice(value: Invoice): Observable<Invoice>{
    return this.httpClient.post<Invoice>(`${this.url}`, value);
  }

  putInvoice(value: Invoice): Observable<Invoice>{
    return this.httpClient.put<Invoice>(`${this.url}`, value);
  }

  deleteInvoice(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/${id}`);
  }
}
