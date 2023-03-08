import { SwalUtils } from 'src/app/shared/utils/swal/swal-utils';
import { finalize } from 'rxjs';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  loading = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private swalUtils: SwalUtils
  ){ }


  ngOnInit(): void {
    this.loadForm();
  }

  submitLogin(): void{
    if(this.formLogin.valid){
      this.loading = true;
      this.userService.login(this.formLogin.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe(response => {
        if(response){
          localStorage.setItem('userToken', JSON.stringify(response));
          this.router.navigateByUrl('/dashboard');
          this.loading = false;
          return;
        }

        this.swalUtils.showWarning('Não foi entrado usuário ou senha!')
      })
    }
  }

  //Loading form login
  private loadForm(): void{
    this.formLogin = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
