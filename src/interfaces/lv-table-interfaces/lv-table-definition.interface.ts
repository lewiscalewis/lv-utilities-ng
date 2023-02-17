import { ILvHeaderdDefinition } from "./lv-headers-definition.interface";
import { ILvFieldsDefinicion } from "./lv-fields.definition-interface";

export interface ILvTableDefinition {
    header: string[];
    fields: string[];
}