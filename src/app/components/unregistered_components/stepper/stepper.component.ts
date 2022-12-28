import { Component, Input } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CdkStepper, STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
}
)

export class StepperComponent{
  @Input()
  activeClass = 'active';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIcon(
      `carRedIcon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/images/icons/carRedIcon.svg")
      
    );
  }

}
