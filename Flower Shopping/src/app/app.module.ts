import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AdminCompComponent } from './admin-comp/admin-comp.component';
import { CustCompComponent } from './cust-comp/cust-comp.component';
import { LoginCompComponent } from './login-comp/login-comp.component';
import { RouterModule, Routes } from '@angular/router'
//import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
//import { RoleGuardService as RoleGuard } from './auth/role-guard-service';
import { FormsModule } from '@angular/forms';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StockService } from './services/stock.service';
import { OrderService } from './services/order.service';
import { AlertModule } from 'ngx-bootstrap';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddstockComponent } from './addstock/addstock.component';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full'},
  { path: 'home', component: LoginCompComponent},
  { path: 'admin', component: AdminCompComponent },
  { path: 'cust', component: CustCompComponent },
  { path:'order',component:AdminCompComponent},
  { path:'addStock',component:AddstockComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AdminCompComponent,
    CustCompComponent,
    LoginCompComponent,
    EditStockComponent,
    HeaderComponent,
    SidebarComponent,
    AddstockComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [ StockService,OrderService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
