import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header_components/header/header.component';
import { NavbarComponent } from './components/header_components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StartComponent } from './components/header_components/mainImage/mainImage.component';
import { MainButtonComponent } from './components/header_components/main-button/main-button.component';
import { HomeComponent } from './components/unregistered_components/home/home.component';
import { FooterComponent } from './components/footer_components/footer/footer.component';
import { LoginComponent } from './components/header_components/login/login.component';
import { SignupComponent } from './components/header_components/signup/signup.component';
import { MapComponent } from './components/map_components/map/map.component';
import { MapModule } from './components/map_components/map/map.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    StartComponent,
    MainButtonComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    RouterModule,
    MapModule,
    HttpClientModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
