import { Injectable, ViewContainerRef } from "@angular/core";
import { LvDropdownComponent } from "src/components/lv-dropdown/lv-dropdown.component";

@Injectable({
    providedIn: 'root'
})
export class LvDropDownService {

    constructor() { }

    /**
     * @param viewContainerRef inyecta en el constructor una variable de tipo ViewContainerRef y pasala por parámetro aquí
     * @returns 
     */
    showDropdown(viewContainerRef: ViewContainerRef) {
        const componentRef = viewContainerRef.createComponent(LvDropdownComponent);
        return this;
    }
}
