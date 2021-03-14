import { TrackDtlResponse } from './trackDtl';

export interface TrackResponse {
    orderId: string;
    estimatedDate: Date;
    trackDtl: TrackDtlResponse[];
    updDt: Date;
    estimateDate: Date;
}