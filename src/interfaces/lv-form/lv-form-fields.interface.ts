import { Validator, ValidatorFn, Validators } from "@angular/forms";

/**Interfaz que deben cumplir obligatoriamente los campos de los LvForm */
export interface LvFormFieldDefinition {
    /**Label que se mostrará en el campo */
    label: string;
    /**Tipo del input, se atiene a los tipos que soporta un input de html */
    inputType: string;
    /**Nombre para el campo de los FormGroup de angular con el mismo nombre */
    formControlName: string;
    /**Descripcion del placeHolder */
    placeHolder?: string;
    /**Campo opcional, tenga en cuenta que si necesita acceder a eventos como blur, focus, etc necesitará asignar un id
     * ya que no podrá acceder a ellos desde el formGroup (pero si al valueChanges) por que tendrá que usar js para manipular el
     * DOM con el id
     */
    id?: string;
    //validator?: ValidatorFn;
    validators?: ValidatorFn[]

}