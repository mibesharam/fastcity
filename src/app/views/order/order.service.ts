import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/shared/models/apiResponse';
import { OrderRequest } from 'src/app/shared/models/OrderRequest';

const baseUrl = environment.apiBaseURl;

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getBasePrice() {
    return this.http.get<ApiResponse>(`${baseUrl}shipping/GetBaseShippingRate`);
  }

  getOrderPrice(orderForm: OrderRequest) {
    return this.http.post<ApiResponse>(`${baseUrl}shipping/GetShippingOrderPrice`, orderForm);
  }

  getPincode(placeId: string) {
    let objdata = {
      placeId: placeId
    };
    return this.http.post<ApiResponse>(`${baseUrl}shipping/GetPincodeFromPlaceId`, objdata);

  }

  NewPickupRequest(orderForm: OrderRequest) {
    return this.http.post<ApiResponse>(`${baseUrl}shipping/SubmitShippingOrder`, orderForm);
  }

}
