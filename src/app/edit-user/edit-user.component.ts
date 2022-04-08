import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { EditUserService } from './edit-user.service';

const baseUrl = 'http://localhost:4201';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private editUserService: EditUserService, private tokenStorage: TokenStorageService,private http: HttpClient, private router: Router) { }

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
  result: any;

  getUserForEdit()
  {
    this.result = this.tokenStorage.getUser();
    let params = new HttpParams().set('userId', this.result.id);
    console.log(params);
    this.http.get<any>(baseUrl + "/editBlog", {params}).subscribe(
      response => {
        this.user = response;
      }
    );
  }


  ngOnInit(): void {
  }

}
