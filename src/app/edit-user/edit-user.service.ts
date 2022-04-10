import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { editUser } from './edit-user.component';

const baseUrl = 'http://localhost:4201';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
  result: any;
  user = {
    id: 0,
    jobTitle: 0,
    firstName: '',
    lastName: '',
    website: '',
    phoneNumber: '',
    age : 0,
    gender: 0,
    biography: ''
  }

  async editUser(user: editUser) : Promise<any> {
    this.result = this.tokenStorage.getUser();
    return this.http.put(baseUrl + '/saveProfile', {
      id: this.result.id,
      jobTitle: user.jobTitle,
      firstName: user.firstName,
      lastName: user.lastName,
      website: user.website,
      phoneNumber: user.phoneNumber,
      age : user.age,
      gender: user.gender
    }, httpOptions).toPromise();
  }

}
