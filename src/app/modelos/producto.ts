export interface Producto {
    id: string,
    titulo: string,
    descripcion: string,
    precio: number,
    cantidad: number,
    descuento: number,
    imagenes: string
}

export class Product {
    id: number;
    titulo: string;
    precio: number;
    qty: number;
}