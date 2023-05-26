import ProductosEnVenta from "./ProductosEnVenta";

export default interface Ventas{
    idVenta?: string;
    productosEnVenta?: ProductosEnVenta[];
    amount?: number;
    total?: number;

     
}