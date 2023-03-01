import { FormControl, Validator, ValidatorFn, Validators } from "@angular/forms";

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
    required?: boolean;

    /**El elemento form control que desea añadir junto a sus validators o custom validators (recuerda que la key del validator debe de ser customError)
     * customValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value as string;
      
        if (value.length < 5 || value.length > 10) {
          return { customError: `La longitud debe estar entre 5 y 10 caracteres (actualmente: ${value.length})` };
        }
      
        return null;
      }
    */
    control: FormControl;

}