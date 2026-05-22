export interface RowType {
    id?: string;
    name: string;
    city: string;
    fast: number;
    slow: number;
    status: number;
    address: string;
    phone: string;
    createTime?: string;
    updateTime?: string;
}

export interface StationListResponse {
    code: number;
    message: string;
    data: {
        total: number;
        list: RowType[];
    };
}

export interface StationResponse {
    code: number;
    message: string;
    data: RowType;
}