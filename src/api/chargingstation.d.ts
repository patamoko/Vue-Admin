import { RowType } from "@/types/station";

export interface ListType {
    page: number;
    pageSize: number;
    name?: string;
    id?: string;
    status?: number;
}

export interface RevenueListType {
    page: number;
    pageSize: number;
    name: string;
}

export function listApi(data: ListType): Promise<any>;
export function editApi(data: RowType): Promise<any>;
export function deleteApi(data: RowType): Promise<any>;
export function revenueChartApi(data: RowType): Promise<any>;
export function revenueListApi(data: RevenueListType): Promise<any>;