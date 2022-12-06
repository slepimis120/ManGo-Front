import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.css']
})
export class MainButtonComponent {
    @Input() text!: string;

    constructor() { }

    ngOnInit(): void {
    }
}
