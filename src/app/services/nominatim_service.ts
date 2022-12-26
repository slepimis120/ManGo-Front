import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NominatimResponse} from '../models/nominatim_response.model';
import {map} from 'rxjs/operators';
export const BASE_NOMINATIM_URL: string = 'nominatim.openstreetmap.org';
export const DEFAULT_VIEW_BOX: string = 'viewbox=-25.0000%2C70.0000%2C50.0000%2C40.0000';

const GEOCODING_ENDPOINT = "http://nominatim.openstreetmap.org/search",
const REVERSE_GEOCODING_ENDPOINT = "http://nominatim.openstreetmap.org/reverse"

@Injectable()
export class NominatimService {

  constructor (private http: HttpClient) {
  }


}