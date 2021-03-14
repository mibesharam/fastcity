import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Addresslist } from '../models/addresslist';
import { ShippingRate } from '../models/ShippingRate';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }


  getAddressList(query: string): Observable<Addresslist[]> {
    return this.http.get<Addresslist[]>(`${environment.apiBaseURl}shipping/getaddress/${query}`);
  }

  GetShippingPrice(pickupAddr: string, pickupPlaceId: string, deliveryAddr: string, delvieryPlaceId: string, weight: number)
    : Observable<ApiResponse> {
    const objData = {
      PickupAddr: pickupAddr,
      PickupPlaceId: pickupPlaceId,
      DeliveryAddr: deliveryAddr,
      DeliveryPlaceId: delvieryPlaceId,
      Weight: weight
    };
    return this.http.post<ApiResponse>(`${environment.apiBaseURl}shipping/GetShippingRate`, objData);
  }

}
