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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MarkerService } from './services/marker.service';
import { StepperComponent } from './components/unregistered_components/stepper/stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxStepperModule } from 'igniteui-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { LeftmenuComponent } from './components/registered_components/leftmenu/leftmenu.component';
import { ProfilesettingsComponent } from './components/registered_components/profilesettings/profilesettings.component';
import { AccountinformationComponent } from './components/registered_components/accountinformation/accountinformation.component';
import { StatisticsComponent } from './components/registered_components/statistics/statistics.component';
import { ReportComponent } from './components/registered_components/report/report.component';
import { Interceptor } from './components/auth/interceptor/interceptor.interceptor';



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
    StepperComponent,
    LeftmenuComponent,
    ProfilesettingsComponent,
    AccountinformationComponent,
    StatisticsComponent,
    ReportComponent,
  ],
  imports: [
    
    BrowserModule,
    MatToolbarModule,
    RouterModule,
    MapModule,
    HttpClientModule,
    MatStepperModule,
    BrowserAnimationsModule,
    IgxStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatIconModule,
    CdkStepperModule,
  ],
  providers: [MarkerService, MapComponent, {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
