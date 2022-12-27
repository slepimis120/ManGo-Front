import {Component, EventEmitter, Output} from '@angular/core';
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
  searchResults!: NominatimResponse[];

  constructor(private nominatimService: NominatimService) {
  }
  addressLookup(address : any) {
    if (address.value!.length > 3) {
      this.nominatimService.addressLookup(address.value).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
    this.onSearch.emit(this.searchResults);
  }

}