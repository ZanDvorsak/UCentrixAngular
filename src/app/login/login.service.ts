import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces';

const baseUrl = 'http://localhost:4201';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  user = {
    email: '',
    password: ''
  }

  async login(user: User) : Promise<any> {
    return this.http.post(baseUrl + '/login', {
      email: user.email,      
      password: user.password
    }, httpOptions).toPromise();
  }
}
