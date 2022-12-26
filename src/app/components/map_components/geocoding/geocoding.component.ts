import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {NominatimService} from '../../../services/nominatim_service';
import {NominatimResponse} from '../../../models/nominatim_response.model';

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.scss']
})
export class GeocodingComponent {

  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults: NominatimResponse[] = [];

  constructor(private nominatimService: NominatimService) {
    this.nominatimService;
  }


}