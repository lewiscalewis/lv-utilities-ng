import { ILvSlide } from "src/interfaces/lv-carrousel-interfaces/lv-slide.interface";

export class LvSlide implements ILvSlide {
    public nombre: string = '';
    public descripcion: string = '';
    public src: string = '';
    public srcSet?: string = '';
}