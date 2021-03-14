import { Time } from '@angular/common';
import { DeliveryPoints } from './deliveryPoints';

export interface OrderRequest {
    isSchedule: boolean;
    weight: number;
    inside: string;
    rate: number;

    pickupPlaceId: string;
    pickupAddr: string;
    pickupNote: string;
    pickupContactNo: string;
    pickupContactName: string;
    pickupDate: Date;
    pickupTime: Time;
    pickupPincode: string;
    deliveryPoints: DeliveryPoints[];
}

