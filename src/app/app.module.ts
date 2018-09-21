import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PhoneComponent } from './phones/phone.component';
import { PhoneService } from './services/phoneService.service';
import { PhoneDetailComponent } from './phones/phoneDetail.component';
import { HomeComponent } from './home/home.component';
import { FormsComponent } from './forms/forms.component';
import { FilterPipe } from './phones/phoneFilter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PhoneComponent,
    PhoneDetailComponent,
    HomeComponent,
    FormsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'phone', component: PhoneComponent},
      {path: 'phone/:id', component: PhoneDetailComponent},
      {path: 'form', component: FormsComponent},
      {path: 'home', component: HomeComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
  ]),
  ],
  providers: [PhoneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
