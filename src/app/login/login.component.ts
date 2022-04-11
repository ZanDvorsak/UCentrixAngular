import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { User } from '../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };
  errorMessage = '';
  isSuccessful = false;


  constructor(private loginService: LoginService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  async login(): Promise<void>  {
    const user : User = {
      email: this.user.email,
      password: this.user.password,
    }
    try {
      
      const response = await this.loginService.login(user);      
      this.tokenStorage.saveToken(response.token);
      this.tokenStorage.saveUser(response);
      this.router.navigate(['/blogs'], { queryParams: { id: response.id } });
      
      //console.log(user);
      //console.log(response);

      
      // this.isLoginFailed = false;
      // this.isLoggedIn = true;
      //
    }catch(err) {
      console.log(err);
      this.isSuccessful = false;
    }
        //this.tokenStorage.saveUser(data);

      // if(this.isLoggedIn) {
      //   this.router.navigate(['/blogs']);
      // }
  }
  

}
