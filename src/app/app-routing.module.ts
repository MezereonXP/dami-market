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
import { SettlementComponent } from "./settlement/settlement.component";
import { TeamComponent } from './team/team.component';
import { SearchComponent } from './search/search.component';
import { TeamgoodComponent } from './teamgood/teamgood.component';
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
    path: 'regist',
    component: RegistComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'shopcar',
    component: ShopcarComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'shopping',
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
  },
  {
    path: 'settlement',
    component: SettlementComponent
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
  },
  {
    path: 'reset',
    component: ResetComponent
  },

  {
    path: 'search/:key',
    component: SearchComponent
  },
  {
    path:'teamgood/:tgId',
    component: TeamgoodComponent
  },
  {
    path: 'kill',
    component: KillComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
