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
import { MatButtonModule, MatToolbarModule, MatInputModule, MatIconModule, MatGridListModule, MatListModule, MatCheckboxModule } from "@angular/material";
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
    InfomationComponent
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
    MatCheckboxModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
