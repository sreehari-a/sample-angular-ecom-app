import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {stringify} from 'qs';
import { LoaderService } from "./loader-service";

@Injectable()
export class APIService {
  constructor(private http: HttpClient) {}
  createGetApi<T>(url: string, filters?: any) {
    const queryObj: any = {
      populate: '*',
      // fields: ['title'],
      // pagination: {
      //   pageSize: 10,
      //   page: 1,
      // },
      // publicationState: 'live',
      // locale: ['en'],
    }
    if(filters) {
      queryObj.filters = filters;
    }
    const query = stringify(queryObj, {
        encodeValuesOnly: true, // prettify URL
      });
    return this.http.get<T>(url+'?'+query);
  }
}