import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/shared/models/apiResponse';
import { OrderTable } from 'src/app/shared/models/OrderTable';

@Injectable({
  providedIn: 'root'
})
export class ActionPendingService {

  constructor(private http: HttpClient) { }

  getActionPendingOrder() {
    let obj = {
      Filter: ''
    }
    return this.http.post<ApiResponse>(`${environment.apiBaseURl}shipping/GetActionPendingOrder`, obj);
  }

  getOrderDtl(id: number, awbNo: string) {
    let obj = {
      orderNo: id,
      awbNo: awbNo
    }
    return this.http.post<ApiResponse>(`${environment.apiBaseURl}shipping/GetOrderDtl`, obj);
  }

  getAvailabelCouriersInfo(order: OrderTable) {
    let obj = {
      pickupPincode: order.p_Pincode,
      deliveryPincode: order.d_Pincode,
      weight: order.weight
    }
    return this.http.post<ApiResponse>(`${environment.apiBaseURl}shipping/GetAvailabelCourierService`, obj);
  }

  getBranches() {
    return this.http.post<ApiResponse>(`${environment.apiBaseURl}branch/GetAllBranch`, {});
  }

  submitOrderAction(obj: any) {
    let objdata = {
      ...obj
    };
    return this.http.post<ApiResponse>(`${environment.apiBaseURl}shipping/OrderActionUpdate`, objdata);
  }

}
