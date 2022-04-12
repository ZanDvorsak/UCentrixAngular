import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Blog } from '../blog/blog.component';
import { query } from '@angular/animations';
import { CreateBlog } from '../blog/blog';
import { TokenStorageService } from '../tokenStorage/token-storage.service';

const baseUrl = 'http://localhost:4201';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  blog = {
    title: '',
    content: ''
  }

  result: any;

  async createBlog(blog: CreateBlog) : Promise<any> {
    this.result = this.tokenStorage.getUser();
    return this.http.post(baseUrl + '/createBlog', {
      title: blog.title,      
      content: blog.content,
      userId: this.result.id
    }, httpOptions).toPromise();
  }

  async editBlog(blog: Blog) : Promise<any> {
    this.result = this.tokenStorage.getUser();
    return this.http.put(baseUrl + '/saveBlog', {
      id: blog.id,
      title: blog.title,      
      content: blog.content,
      userId: this.result.id
    }, httpOptions).toPromise();
  } 

  async deleteBlog(id:number) : Promise<any> {
    this.result = this.tokenStorage.getUser();
    console.log(id);
    return this.http.delete(baseUrl + '/deleteBlog/'+ id).toPromise();
  }
}
