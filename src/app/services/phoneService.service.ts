import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostPhone} from '../models/postPhone.model';
import { IPhone } from '../models/phoneData.model';


@Injectable()

// For RxJS >6.0.0
export class PhoneService {

    constructor(private _http: HttpClient,
                private __http: Http) {
                }

    private extractData(res: Response) {
        return res.json();
    }

    getPhones(): Observable<IPhone[]> {
        return this._http.get<IPhone[]>('/api/getProducts');
    }

    getPhonesDetails(id): Observable<any[]> {
        return this._http.get<any[]>('/api/getProducts?name=' + id);

    }


    postEmployee(phoneData: PostPhone): Observable<any> {
        const body = JSON.stringify(phoneData);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this.__http.post('/api/addProduct', body, options);

    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText || 'Server error');
      }
}


