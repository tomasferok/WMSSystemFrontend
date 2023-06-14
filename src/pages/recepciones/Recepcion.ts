import Product from "../products/Product";
import Proveedor from "../proveedores/Proveedor";

export default interface Recepcion{
    idRecep?: string;
    listaProds?: Product[];
    estadoRecep?:string;
    proveedor?: Proveedor;

}