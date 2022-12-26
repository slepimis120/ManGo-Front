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
import { MapModule } from './components/map_components/map/map.module';
import { HttpClientModule } from '@angular/common/http';
import { GeocodingComponent } from './components/map_components/geocoding/geocoding.component';
import { MapPointFormComponent } from './components/map_components/map-point-form/map-point-form.component';
import { ResultListComponent } from './components/map_components/result-list/result-list.component';
import { NominatimService } from './services/nominatim_service';
import { AppRoutingModule } from 'src/infrastructure/app-routing.module';
import { FormsModule } from '@angular/forms';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

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
    GeocodingComponent,
    MapPointFormComponent,
    ResultListComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    RouterModule,
    MapModule,
    HttpClientModule,  
    AppRoutingModule,
    FormsModule,
    LeafletModule
  ],
  providers: [NominatimService],
  bootstrap: [AppComponent]
})
export class AppModule { }
