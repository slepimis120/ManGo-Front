import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header_components/header/header.component';
import { NavbarComponent } from './components/header_components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StartComponent } from './components/header_components/mainImage/mainImage.component';
import { MainButtonComponent } from './components/header_components/main-button/main-button.component';
import { UnregisteredMainPageComponent } from './components/unregistered_components/unregistered-main-page/unregistered-main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    StartComponent,
    MainButtonComponent,
    UnregisteredMainPageComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
