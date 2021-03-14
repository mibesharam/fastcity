import { Time } from '@angular/common';

export interface DeliveryPoints {
    srl: number;
    deliveryPlaceId: string;
    deliveryAddr: string;
    deliveryNote: string;
    deliveryContactNo: string;
    deliveryContactName: string;
    deliveryDate: Date;
    deliveryTime: Time;
    deliveryPincode: string;
}