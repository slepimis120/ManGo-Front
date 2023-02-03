import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnregisteredMapComponent } from './unregistered_map.component';

@NgModule({
  declarations: [UnregisteredMapComponent],
  imports: [CommonModule],
  exports: [UnregisteredMapComponent],
})
export class MapModule {}
