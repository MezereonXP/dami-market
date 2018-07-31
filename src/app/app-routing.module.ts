import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistComponent } from "./regist/regist.component";
import { HomeComponent } from './home/home.component';

import { ShopcarComponent } from './shopcar/shopcar.component';
import { OrderComponent } from './order/order.component';
import { ShoppingComponent } from "./shopping/shopping.component";
import { InfomationComponent } from './infomation/infomation.component';
import { KillComponent } from './kill/kill.component';

import { TeamComponent } from './team/team.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login/:id',
    component: LoginComponent
  },
  {
    path: 'regist',
    component: RegistComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'shopcar',
    component: ShopcarComponent
  },
  {
    path:'order',
    component: OrderComponent
  },
  {
    path:'shopping',
    component: ShoppingComponent
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
    path: 'team',
    component: TeamComponent
  },
  {
    path: 'shopping/:id',
    component: ShoppingComponent
  },
  {
    path: 'shopcar',
    component: ShopcarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
