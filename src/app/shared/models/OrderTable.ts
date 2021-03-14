

export interface OrderTable {
    amount: number;
    awbNo: string;
    length: number;
    breath: number;
    height: number;
    id: number;
    insBy: number;
    insDt: Date;
    updBy: number;
    updDt: Date;
    isSameDay: boolean;
    userID: number;
    volumetricWeight: number;
    weight: number;

    p_Adrl1: string;
    p_Adrl2: string;
    p_City: string;
    p_ContactPerson: string;
    p_Country: string;
    p_O_Date: string;
    p_O_Time: string;
    p_Phone: string;
    p_PlaceID: string;
    p_State: string;
    p_Pincode: string;

    d_Adrl1: string;
    d_Adrl2: string;
    d_City: string;
    d_ContactPerson: string;
    d_Country: string;
    d_O_Date: string;
    d_O_Time: string;
    d_Phone: string;
    d_PlaceID: string;
    d_State: string;
    d_Pincode: string;

    isApproved: boolean;
    isComplete: boolean;
    remarks: string;
}
