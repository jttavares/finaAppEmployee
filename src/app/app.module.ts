import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import {getDatabase, provideDatabase } from "@angular/fire/database";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { firebaseConfig } from './appConfig';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
      NavComponent,
      HomeComponent,
      ContactComponent,
      AboutComponent,
      FooterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(()=> initializeApp( firebaseConfig)),
    provideDatabase(()=> getDatabase()),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
