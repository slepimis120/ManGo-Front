import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AppModule } from "../../../app.module";

@NgModule({
    declarations: [MapComponent],
    exports: [MapComponent],
    imports: [CommonModule, AppModule]
})
export class MapModule {}
