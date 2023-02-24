import { LvFormFieldDefinition } from "./lv-form-fields.interface";

export interface LvFormDefinition {
    /**Nombre del formulario; opcional */
    name?: string;
    /**Campos del formulario, deben cumplir con la interfaz LvFormFieldDefinition */
    fields: LvFormFieldDefinition[];
    /**Boolean para mostrar o no el boton de limpiar formulario */
    showResetButton: boolean;
    /**Url a donde se enviará el formulario al guardar */
    url: string;
}