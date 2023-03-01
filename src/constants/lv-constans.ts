import { HttpHeaders } from "@angular/common/http";
import { Validators } from "@angular/forms";

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

export const ANGULAR_FORM_VALIDATORS = {
    required: Validators.required,
    minLength: Validators.minLength,
    maxLength: Validators.maxLength,
    min: Validators.min,
    max: Validators.max,
    email: Validators.email,
    pattern: Validators.pattern
  };

  export enum States {
    NEW,
    MODIFIED,
    DELETED
  }

  export enum Position {
    LEFT,
    RIGHT,
    BOTTOM
  }