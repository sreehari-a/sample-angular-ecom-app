import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class LoaderService {
    loading: boolean =  false;
    loadStateChanged = new Subject<boolean>();
    setLoader(value: boolean) {
        this.loading= value;
        this.loadStateChanged.next(this.loading);
    }
}