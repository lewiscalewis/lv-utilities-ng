import { LvObject } from "src/models/lv-object";

export class User extends LvObject {
    nombre!: string;
    descripcion!: string;
    email!: string;
    fecha_registro!: Date;

    override toString(): string {
        return `${this.id} ${this.nombre} ${this.descripcion} ${this.email} ${this.fecha_registro}`
    }
}