import { LoginUser, User } from './../models/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${environment.apis.apiUrl}/`

  constructor(
    private httpClient: HttpClient
  ) { }

  //Check user is loged
  userIsLoged(): boolean{
    if(localStorage.getItem('userToken')){
      return true;
    }

    return false;
  }

  getUser(): User{
    const user = localStorage.getItem('userToken') ?? ''
    return JSON.parse(user) ?? {} as User;
  }

  login(value: LoginUser): Observable<User>{
    value = {
      userName: window.btoa(value.userName),
      password: window.btoa(value.password),
    };

    return this.httpClient.post<User>(`${this.url}login`, value);
  }

  logout(): void{
    localStorage.removeItem('userToken')
  }
}
