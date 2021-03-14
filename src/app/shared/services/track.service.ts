import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse';

const baseUrl = environment.apiBaseURl;
@Injectable({
    providedIn: 'root'
})
export class TrackService {
    constructor(private http: HttpClient) { }


    getShipmentStatus(awbNo: string) {
        let objData = {
            awbNo
        }
        return this.http.post<ApiResponse>(`${baseUrl}Track/GetTrackStatus`, objData);
    }
}
