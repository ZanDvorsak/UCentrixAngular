import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../blog/blog.component';
import { BlogService } from '../blog/blog.service';
import { TokenStorageService } from '../tokenStorage/token-storage.service';
import { CreateBlogComponent } from '../create-blog/create-blog.component';

const baseUrl = 'http://localhost:4201';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  constructor(private blogService: BlogService, private routeA: ActivatedRoute, private tokenStorage: TokenStorageService,private http: HttpClient, private router: Router) { }

  blog = {
    id: 0,
    title: '',
    content: ''
  }  
  result: any;

  getBlog(postId: string) {
    this.result = this.tokenStorage.getUser();    
    let params = new HttpParams().set('userId', this.result.id).set('postId', postId);
    console.log(params);
    this.http.get<any>(baseUrl + "/editBlog", {params}).subscribe(
      response => {
        this.blog = response;
      }
    );
  }

  async editBlog() : Promise<void>
  {
    const blog: Blog = {
      id: this.blog.id,
      title: this.blog.title,
      content: this.blog.content
    }
    try{
      console.log(blog);
      this.router.navigate(['/blogs']);
      const response = await this.blogService.editBlog(blog);            
    }catch(err){
      console.log(err);
    }
  }



  ngOnInit(): void {    
    const postId = this.routeA.params.subscribe(params => {
      this.getBlog(params['postId'])
    });
  }

}
