import { HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { IApiParams } from "src/app/modules/common/interfaces/api.params";
import { IData } from "src/app/modules/common/interfaces/idata";


export abstract class AbstractUserAudit {
    uuid:string;
    abstract get(config$: BehaviorSubject<IApiParams>): Observable<any>;
    abstract fetchData(params: IApiParams): Observable<IData>;
    protected handleHttpError(error: HttpErrorResponse) {
        return throwError(() => error);
    }
}