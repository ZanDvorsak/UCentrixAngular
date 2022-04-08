import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateBlog } from '../blog/blog';
import { BlogService } from '../blog/blog.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  constructor(private router: Router, private blogService: BlogService) { }

  blog = {
    title: '',
    content: ''
  }

  ngOnInit(): void {
  }
  

  async createBlog() : Promise<void>
  {
    const blog: CreateBlog = {
      title: this.blog.title,
      content: this.blog.content
    }
    try{
      const response = await this.blogService.createBlog(blog);
      this.router.navigate(['/blogs']);
    }catch(err){
      console.log(err);
    }
  }

}
