export interface ILvSlide {
    /**
     * Nombre de la diapositiva
     */
    nombre: string;
    /**
     * Descripción para accesibilidad
     */
    descripcion: string;
    /**
     * La url de la imagen lo que comunmente iría en el atributo src
     */
    src: string;
    /**
     * La url de las imagenes con sus diferentes formatos de tamaño, lo que comunmente iría en el atributo srcset
     */
    srcSet?: string;
}