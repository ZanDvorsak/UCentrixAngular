import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const baseUrl = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private http: HttpClient) { }

  user = {
    email: '' ,
    username: '',   
    password: '',    
    checkPassword: '',    
    firstName: '',
    lastName: '',
    website: ''
  }

   register(user: User) {
    return this.http.post(baseUrl + '/register', {
      email: user.email,
      username: user.username,
      password: user.password,
      checkPassword: user.checkPassword,
      firstName: user.firstName,
      lastName: user.lastName
    }, httpOptions).toPromise();
  }


  
}
