import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateBlog } from '../blog/blog';
import { BlogService } from '../blog/blog.service';
import { TokenStorageService } from '../tokenStorage/token-storage.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  constructor(private router: Router, private blogService: BlogService, private tokenStorage: TokenStorageService) { }

  blog = {
    title: '',
    content: ''
  }

  logout: any;

  ngOnInit(): void {
    this.logout = this.tokenStorage;
  }



  async createBlog() : Promise<void>
  {
    console.log("nekaj");
    const blog: CreateBlog = {
      title: this.blog.title,
      content: this.blog.content
    }
    try{      
      this.router.navigate(['/blogs']);
      await this.blogService.createBlog(blog);
    }catch(err){
      console.log(err);
    }
  }

}
