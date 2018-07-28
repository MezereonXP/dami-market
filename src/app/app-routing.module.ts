import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistComponent } from "./regist/regist.component";
import { HomeComponent } from './home/home.component';
import { InfomationComponent } from './infomation/infomation.component';
import { KillComponent } from './kill/kill.component';
import { SelfcenterComponent } from './selfcenter/selfcenter.component';
import { MessageComponent } from './message/message.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ScaddressComponent } from './scaddress/scaddress.component';
import { Regist2Component } from './regist2/regist2.component';
import { CheckComponent } from './check/check.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'info/:id',
    component: InfomationComponent
  },
  {
    path: 'kill',
    component: KillComponent
  },
  {
    path: 'regist',
    component: RegistComponent
  },
  {
    path: 'selfcenter',
    component: SelfcenterComponent
  },
  {
    path: 'message',
    component: MessageComponent
  },
  {
    path: 'favorite',
    component: FavoriteComponent
  },
  {
    path: 'scaddress',
    component: ScaddressComponent
  },
  {
    path: 'regist2',
    component: Regist2Component
  },
  {
    path: 'check',
    component: CheckComponent
  }
  ,
  {
    path: 'reset',
    component: ResetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
