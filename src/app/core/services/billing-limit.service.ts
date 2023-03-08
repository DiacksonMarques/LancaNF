import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BillingLimit } from '../models/BillingLimit';

@Injectable({
  providedIn: 'root'
})
export class BillingLimitService {

  url = `${environment.apis.apiUrl}/billing-limit`

  constructor(
    private httpClient: HttpClient
  ) { }

  getByBillingLimit(): Observable<BillingLimit> {
    return this.httpClient.get<BillingLimit>(`${this.url}`);
  }

  putBillingLimit(value: BillingLimit): Observable<BillingLimit>{
    return this.httpClient.put<BillingLimit>(`${this.url}`, value);
  }
}
