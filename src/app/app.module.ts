import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UnregisteredHeaderComponent } from './components/unregistered_components/unregistered_header/unregistered_header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UnregisteredHomeComponent } from './components/unregistered_components/unregistred_home/unregistred_home.component';
import { FooterComponent } from './components/footer_components/footer/footer.component';
import { LoginComponent } from './components/header_components/login/login.component';
import { SignupComponent } from './components/header_components/signup/signup.component';
import { UnregisteredMapComponent} from './components/unregistered_components/unregistered_map/unregistered_map.component';
import { MapModule } from './components/unregistered_components/unregistered_map/unregistered_map.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MarkerService } from './services/marker.service';
import { UnregisteredStepperComponent } from './components/unregistered_components/unregistred_stepper/unregistred_stepper.component';
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

import { DriverMapComponent } from './components/driver_components/driver-map/driver-map.component';
import { DriverHomeComponent } from './components/driver_components/driver-home/driver-home.component';
import { PassengerHomeComponent } from './components/passenger_components/passenger-home/passenger-home.component';
import { DriverRideRequestComponent } from './components/driver_components/driver-ride-request/driver-ride-request.component';
import { PassengerMapComponent } from './components/passenger_components/passenger-map/passenger-map.component';
import { PassengerHeaderComponent } from './components/passenger_components/passenger-header/passenger-header.component';
import { PassengerCurrentRideComponent } from './components/passenger_components/passenger-current-ride/passenger-current-ride.component';
import { NavbarComponent } from './components/header_components/navbar/navbar.component';
import { PassengerRideDetailsComponent } from './components/passenger_components/passenger-ride-details/passenger-ride-details.component';
import { DriverHeaderComponent } from './components/driver_components/driver-header/driver-header.component';
import { LeftmenuComponent } from './components/registered_components/leftmenu/leftmenu.component';
import { ProfilesettingsComponent } from './components/registered_components/profilesettings/profilesettings.component';
import { AccountinformationComponent } from './components/registered_components/accountinformation/accountinformation.component';
import { StatisticsComponent } from './components/registered_components/statistics/statistics.component';
import { ReportComponent } from './components/registered_components/report/report.component';
import { Interceptor } from './components/auth/interceptor/interceptor.interceptor';
const routes: Routes = [
  { path: '', component: UnregisteredHomeComponent },
  { path: 'passenger', component: PassengerHomeComponent },
  { path: 'driver', component: DriverHomeComponent },
  { path: 'passenger/active', component:PassengerCurrentRideComponent},
  { path: '**', component: UnregisteredHomeComponent },
];



@NgModule({
  declarations: [
    
    AppComponent,
    UnregisteredHeaderComponent,
    UnregisteredHomeComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    UnregisteredStepperComponent,
    DriverMapComponent,
    DriverHomeComponent,
    PassengerHomeComponent,
    DriverRideRequestComponent,
    PassengerMapComponent,
    PassengerHeaderComponent,
    NavbarComponent,
    PassengerCurrentRideComponent,
    PassengerRideDetailsComponent,
    DriverHeaderComponent,
    LeftmenuComponent,
    ProfilesettingsComponent,
    AccountinformationComponent,
    StatisticsComponent,
    ReportComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
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
  exports: [RouterModule],
  providers: [MarkerService, UnregisteredMapComponent, {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
