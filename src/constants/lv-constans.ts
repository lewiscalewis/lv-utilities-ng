import { HttpHeaders } from "@angular/common/http";

export enum RequestType {
    POST,
    GET, 
    PUT,
    DELETE
}

export enum ModalType {
    CONFIRMATION,
    ERROR,
    WARNING,
    SUCCESS,
    INFORMATION
}

export const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};