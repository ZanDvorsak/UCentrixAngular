import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { EditUserService } from './edit-user.service';

const baseUrl = 'http://localhost:4201';

export class editUser {
  constructor(
    public jobTitle: number,
    public firstName: string,
    public lastName: string,
    public website: string,
    public phoneNumber: string,
    public age : number,
    public gender: number,
    public biography: string
  ) {
  }
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})



export class EditUserComponent implements OnInit {

  constructor(private editUserService: EditUserService, private tokenStorage: TokenStorageService,private http: HttpClient, private router: Router) { }

  jobTitle ={
    title: ''
  }
  user = {
    id: 0,
    jobTitle: this.jobTitle,
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    phoneNumber: '',
    age : 0,
    gender: 0,
    biography: ''
  }
 data = {
   user : this.user,
   jobTitles: [{
    id: 0,
    title: ''
  }]
 }
 editUser = {
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
  result: any;

  async getUserForEdit()
  {
    this.result = this.tokenStorage.getUser();
    let params = new HttpParams().set('userId', this.result.id);
    console.log(params);
    await this.http.get<any>(baseUrl + "/editUser", {params}).subscribe(
      response => {
        this.data = response;
        console.log(this.data);
      }
    );
  }

  async saveEditUser() : Promise<void>
  {
    const user: editUser = {
    jobTitle: this.editUser.jobTitle,
    firstName: this.editUser.firstName,
    lastName: this.editUser.lastName,
    website: this.editUser.website,
    phoneNumber: this.editUser.phoneNumber,
    age : this.editUser.age,
    gender: this.editUser.gender,
    biography: this.editUser.biography
  }
  try{
    console.log(user);
    this.router.navigate(['/blogs']);
    const response = await this.editUserService.editUser(user);
  }catch(err){
    console.log(err);
  }
}

  ngOnInit(): void {
    this.getUserForEdit();
  }

}
