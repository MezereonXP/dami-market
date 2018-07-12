import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent  } from './login/login.component';
import { RegistComponent } from "./regist/regist.component";

const routes: Routes = [
  {
    path: '',
    component: RegistComponent
  },
  {
    path: 'login/:id',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
