import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { User } from '../interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    email: '' ,
    username: '',   
    password: '',    
    checkPassword: '',    
    firstName: '',
    lastName: '',
    website: ''
  }
  isSuccessful = false;
  errorMessage = '';


  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
  }
  async registerSuccess() : Promise<void> {    
  const user : User = {
    email: this.user.email,
    username: this.user.username,
    password: this.user.password,
    checkPassword: this.user.checkPassword,
    firstName: this.user.firstName,
    lastName: this.user.lastName,  
  }
     try {
       this.router.navigate(['/login']);
       const response = await this.registerService.register(user);
       this.isSuccessful = true;
       
     }catch(err) {
       console.log(err);
       this.isSuccessful = false;
     }
     //.subscribe(
    //   data => {
    //     console.log(data);    
    //     console.log("OK")    
    //      this.router.navigate(['/login']);;  
    //   },
    //   err => {
    //     console.log(err);  
    //     console.log("Failed")     
    //   });      
  }  


}
