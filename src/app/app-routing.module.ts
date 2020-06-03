import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuardService } from './services/authGuard.service';
import { DisplayPostComponent } from './display-post/display-post.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'users/edit-post',
    component: EditPostComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'users/create-post',
    component: CreatePostComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'users/show-post',
    component: DisplayPostComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'users/profile',
    component: UserProfileComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'users/edit-user',
    component: EditUserComponent,
    canActivate: [AuthGuardService]
  }, {
    path: 'users/setting',
    component: SettingComponent,
    canActivate: [AuthGuardService]
  }, {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  UserComponent,
  EditPostComponent,
  CreatePostComponent,
  UserProfileComponent,
  EditUserComponent,
  DisplayPostComponent,
  SettingComponent
];