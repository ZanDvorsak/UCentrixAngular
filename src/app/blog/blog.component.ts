import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from './blog.service';
import { TokenStorageService } from '../tokenStorage/token-storage.service';

import { HttpClient, HttpParams } from '@angular/common/http';

const baseUrl = 'http://localhost:4201';

export class Blog {
  constructor(
    public id: number,
    public title: string,
    public content: string
  ) {
  }
}



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})


export class BlogComponent implements OnInit {  
  data = {
    blogs : new Array<Blog>(),
    username: '',
    blogCount: 0
  }

  logout: any;
  

  result: any;
  constructor(private blogService: BlogService, private route: ActivatedRoute, private tokenStorage: TokenStorageService,private http: HttpClient, private router: Router) { }


  async getBlogs(){
    this.result = this.tokenStorage.getUser();
    let params = new HttpParams().set('id', this.result.id);
    
    this.http.get<any>(baseUrl + "/blogs", {params}).subscribe(
      response => {
        this.data = response;
      }
    );
  }

  async ngOnInit(): Promise<void> {
    this.logout = this.tokenStorage;
    await this.getBlogs();

  }

  async deleteBlog(id: number) {   
    const response = await this.blogService.deleteBlog(id);
    window.location.reload();
  }

}
