import { post, get } from "@/utils/http";

interface BatchDeleteParams {
  order: string[];
}

enum Api {
  BatchDelete = "/batchDelete",
  CityList = "/cityList"
}

export function batchDeleteApi(order: string[]) {
  return post(Api.BatchDelete, { order } as BatchDeleteParams);
}

export function cityListApi() {
  return get(Api.CityList);
}

export type {
  BatchDeleteParams
}