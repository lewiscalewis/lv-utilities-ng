import { EventEmitter, Injectable, ViewContainerRef } from "@angular/core";
import { ModalType } from "src/constants/lv-constans";
import { LvModalComponent } from "src/components/lv-modal/lv-modal.component";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LvModalService {

    private userResponse!: EventEmitter<boolean>;

    constructor() { }

    /**
     * 
     * @param modalType Usar ModalType (ModalType.SUCCESS, ModalType.CONFIRMATION...)
     * @param header 
     * @param message 
     * @param viewContainerRef inyecta en el constructor una variable de tipo ViewContainerRef y pasala por parámetro aquí
     * @returns 
     */
    showModal(modalType: ModalType, header: string, message: string, viewContainerRef: ViewContainerRef) {
        const componentRef = viewContainerRef.createComponent(LvModalComponent);
        componentRef.instance.modalType = modalType;
        componentRef.instance.headerMessage = header;
        componentRef.instance.message = message;
        componentRef.instance.show = true;
        this.userResponse = componentRef.instance.userResponse;
        return this;
    }

    getUserResponse(){
        return this.userResponse. asObservable();
    }
}
