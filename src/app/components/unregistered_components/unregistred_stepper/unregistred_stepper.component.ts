import { Component, Input } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CdkStepper, STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { content } from '@igniteui/material-icons-extended';

@Component({
  selector: 'app-stepper',
  templateUrl: './unregistred_stepper.component.html',
  styleUrls: ['./unregistred_stepper.component.css'],
  providers: [{ provide: CdkStepper, useExisting: UnregisteredStepperComponent }],
}
)

export class UnregisteredStepperComponent extends CdkStepper{
  @Input()
  activeClass = 'active';

  footerText: string[] = ["Set route", "Find vehicle", "Book ride"]
  locationIcons: string[] = ["../../../../assets/images/icons/locationGrayIcon.png",
   "../../../../assets/images/icons/locationOrangeIcon.png",
   "../../../../assets/images/icons/locationRedIcon.png"]
  optionsIcons: string[] = ["../../../../assets/images/icons/optionGrayIcon.png",
   "../../../../assets/images/icons/optionOrangeIcon.png",
   "../../../../assets/images/icons/optionRedIcon.png"]
  carIcons: string[] = ["../../../../assets/images/icons/carGrayIcon.png",
   "../../../../assets/images/icons/carOrangeIcon.png",
   "../../../../assets/images/icons/carRedIcon.png"]


  clickReact(){
    console.log();
  }

}
