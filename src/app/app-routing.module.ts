import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent  } from './login/login.component';
import { RegistComponent } from "./regist/regist.component";
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: RegistComponent
  },
  {
    path: 'login/:id',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
