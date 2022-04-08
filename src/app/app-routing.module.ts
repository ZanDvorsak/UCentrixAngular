import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateBlogComponent} from './create-blog/create-blog.component';
import { EditBlogComponent} from './edit-blog/edit-blog.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { OuthGuard } from './outh.guard';

const routes: Routes = [ { 
  path: '', redirectTo: 'login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'createBlog', component: CreateBlogComponent},
{ path: 'editBlog/:postId', component: EditBlogComponent},
{ path: 'editUser/:userId', component: EditUserComponent},
{ path: 'blogs', component: BlogComponent, canActivate: [OuthGuard]}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
