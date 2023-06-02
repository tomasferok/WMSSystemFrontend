import Product from "../products/Product";

export default interface Recepcion{
    idRecep?: string;
    listaProds?: Product[];
    estadoRecep?:string;

}