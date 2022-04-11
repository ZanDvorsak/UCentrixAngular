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
    username: ''
  }
  

  result: any;
  constructor(private blogService: BlogService, private route: ActivatedRoute, private tokenStorage: TokenStorageService,private http: HttpClient, private router: Router) { }
  logout(){
    this.router.navigate(['/login']);
    this.tokenStorage.signOut();    
  }

  getBlogs(){
    this.result = this.tokenStorage.getUser();
    let params = new HttpParams().set('id', this.result.id);
    this.http.get<any>(baseUrl + "/blogs", {params}).subscribe(
      response => {
        console.log(response);
        this.data = response;
      }
    );
  }

  ngOnInit(): void {
    console.log(this.getBlogs());
    // this.route.params.subscribe(params => {
    //   this.result = this.tokenStorage.getUser();
    //   console.log(this.result.id);
    //   this.blogService.getBlogs(this.result.id);
    // });
  }

  async deleteBlog(id: number) {   
    const response = await this.blogService.deleteBlog(id);
    window.location.reload();
  }

}
