import { Router } from '@angular/router';
import { UserService } from './core/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ){ }

  //Check user is loged
  userLoged(): boolean{
    return this.userService.userIsLoged();
  }

  logout(): void{
    this.userService.logout();
    this.router.navigateByUrl('/login');
  }
}
