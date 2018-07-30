import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistComponent } from './regist/regist.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataService } from "./data/data.service";
import { MatButtonModule, MatToolbarModule, MatInputModule, MatIconModule, MatGridListModule, MatListModule, MatCheckboxModule ,MatDialogModule} from "@angular/material";
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ShopcarComponent } from './shopcar/shopcar.component';
import { OrderComponent } from './order/order.component';
import { PayComponent } from './pay/pay.component';
import { KillComponent } from './kill/kill.component';
import { TeamComponent } from './team/team.component';
import { SelfcenterComponent } from './selfcenter/selfcenter.component';
import { InfomationComponent } from './infomation/infomation.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MessageComponent } from './message/message.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { Regist2Component } from './regist2/regist2.component';
import { CheckComponent } from './check/check.component';
import { ResetComponent } from './reset/reset.component';
import { ScaddressComponent } from './scaddress/scaddress.component';
import { AddressComponent } from './address/address.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistComponent,
    HomeComponent,
    ShoppingComponent,
    ShopcarComponent,
    OrderComponent,
    PayComponent,
    KillComponent,
    TeamComponent,
    SelfcenterComponent,
    InfomationComponent,
    MessageComponent,
    FavoriteComponent,
    Regist2Component,
    CheckComponent,
    ResetComponent,
    ScaddressComponent,
    AddressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    CarouselModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  entryComponents: [
    AddressComponent
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
