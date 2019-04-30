import { Observable, throwError as _observableThrow, of as _observableOf, observable } from 'rxjs';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Http, Headers, Response } from '@angular/http'
import { SwaggerException } from '@shared/service-proxies/service-proxies'
import { HttpResponseBase, HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

/**
 * get, post, delete, put, 的基类
 */
export abstract class ApiServiceBaseService {
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    constructor(protected http: HttpClient) {
        
     }

    protected get<T>(url_: string): Observable<T> {
        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };
        return this.p('get',url_,options_);
    }


    protected post<T,F>(url_:string,input:F):Observable<T>{
        const content_= JSON.stringify(input);
        let options_: any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };
        return this.p<T>('post',url_,options_);
    }

    protected put<T,F>(url_:string,input:F):Observable<T>{
        const content_= JSON.stringify(input);
        let options_: any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };
        return this.p<T>('put',url_,options_);
    }

    protected delete(url_: string): Observable<void> {
        let options_: any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };
        return this.p<void>('delete',url_,options_);
    }

    /**
     * 用来发送请求
     * @param url_ 
     * @param options_ 
     */
    private p1<T>(url_: string, options_): Observable<T> {
        return this.http.request("get",url_,options_).pipe(_observableMergeMap((response_:any)=>{
            return this.process1<T>(response_);
        })).pipe(_observableCatch((response_:any)=>{ 
            if(response_ instanceof Response){
                try {
                    return this.process1<T>(response_);
                } catch (e) {
                    return <Observable<T>><any>_observableThrow(e);
                }
            }else{
                return <Observable<T>><any>_observableThrow(response_);
            }
        }))
    }

    private p<T>(method_:string,url_:string,options_):Observable<T>{
        return this.http.request(method_,url_,options_).pipe(_observableMergeMap((response_:any)=>{
            return this.process<T>(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.process<T>(<any>response_);
                } catch (e) {
                    return <Observable<T>><any>_observableThrow(e);
                }
            } else
                return <Observable<T>><any>_observableThrow(response_);
        }));
    }

    /**
     * 处理请求返回的数据
     * @param response 
     */
    private process1<T>(response: Response):Observable<T> {
        const status=response.status;
        const _headers:any = response.headers? response.headers.toJSON():{};
        const _responseTexe=response.text();
        if (status===200){
            let result200 : any =null;
            const resultDATA200= _responseTexe === '' ? null:JSON.parse(_responseTexe,this.jsonParseReviver);
            result200=resultDATA200?resultDATA200 as T :null;
            return _observableOf(result200);
        }else if(status===401){
            return throwException('服务器错误',status,_responseTexe,_headers);
        }else if(status===403){
            return throwException('服务器错误',status,_responseTexe,_headers);
        }else if(status!==200&&status!==204){
            return throwException('意料之外的出现',status,_responseTexe,_headers);
        }
        return _observableOf(<any>null);
    }


    private process<T>(response: HttpResponseBase):Observable<T>{
        const status=response.status;
        const responseBlob=
            response instanceof HttpResponse ? response.body:
                (<any>response).error instanceof Blob ? (<any>response).error : undefined;
        
        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); } };
        
        if (status===200){
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? resultData200 as T : null;
                return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<T>(<any>null);

    }
}

/**
 * 报错处理
 * @param message 
 * @param status 
 * @param response 
 * @param headers 
 * @param result 
 */
function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}
