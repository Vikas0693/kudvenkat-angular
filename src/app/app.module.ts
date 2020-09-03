//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

//Our Modules
import { AppRoutingModule } from './app-routing.module';
import { EmployeeModule } from './employee/employee.module';

//Services
import { EmployeeService } from './employee/employee.service';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    //order of Routing-Module is important here
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    EmployeeModule,
    AppRoutingModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
