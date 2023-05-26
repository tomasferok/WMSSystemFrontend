import Product from "../products/Product"


export default interface Carrito{
    id?: string;
    productos?: Product[];
    amount?: number;
    total?: number;

     
}