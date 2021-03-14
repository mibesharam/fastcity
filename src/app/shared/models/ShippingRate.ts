export interface ShippingRate {
    pickupAddr: string;
    pickupPlaceId: string;
    deliveryAddr: string;
    deliveryPlaceId: string;
    weight: number;
    length: number;
    breath: number;
    height: number;
    rate: number;
}
