import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/shared/models/apiResponse';


const baseUrl = environment.apiBaseURl;

@Injectable({
    providedIn: 'root'
})
export class ClientDashboardService {

    constructor(private http: HttpClient) { }

    getUserOrder(obj: any) {
        const objData: any = {
            fromDate: obj.fromDate,
            toDate: obj.toDate,
            filter: obj.orderFilter
        }
        return this.http.post<ApiResponse>(`${baseUrl}shipping/GetUserOrders`, objData);
    }
}