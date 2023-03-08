import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanysService {

  url = `${environment.apis.apiUrl}/company`

  constructor(
    private httClient: HttpClient
  ) { }

  getAllCompanys(): Observable<Company[]> {
    return this.httClient.get<Company[]>(`${this.url}s`);
  }

  getByIdCompanys(id: number): Observable<Company> {
    return this.httClient.get<Company>(`${this.url}/${id}`);
  }


  postCompany(value: Company): Observable<Company>{
    return this.httClient.post<Company>(`${this.url}`, value);
  }

  putCompany(value: Company): Observable<Company>{
    return this.httClient.put<Company>(`${this.url}`, value);
  }

  deleteCompany(id: number): Observable<any>{
    return this.httClient.delete<any>(`${this.url}/${id}`);
  }
}
