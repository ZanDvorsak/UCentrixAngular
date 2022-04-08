import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { blogs } from './Blog';

const baseUrl = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) {}


  getBlogs(){
    return this.http.get(baseUrl + '/blogs').toPromise();
  }
}
