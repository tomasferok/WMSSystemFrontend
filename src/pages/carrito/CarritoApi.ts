import Product from "../products/Product";
import Carrito from "./Carrito"
const REACT_APP_API="http://localhost:8087/api/"

export async function searchProductById(id: string) {
    let url = REACT_APP_API + 'carrito/' + id
    let response = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
  
    return await response.json();
  }
  
  export async function searchCarrito(){
      let url = REACT_APP_API + 'carrito'
      let response = await fetch(url, {
        "method": 'GET',
        "headers": {
          "Content-Type": 'application/json'
        }
      })
    
      return await response.json();
  }

  export async function calcularTotal(carrito:Carrito){
    let url = REACT_APP_API + 'carrito/calcularTotal'
    let response = await fetch(url, {
      "method": 'POST',
      "body": JSON.stringify(carrito),
      "headers": {
        "Content-Type": 'application/json'
      }
    })
  
    return await response.json();
}

export async function comprar(id: string){
  let url = REACT_APP_API + 'carrito/comprar'
  let response = await fetch(url, {
    "method": 'POST',
    "body": JSON.stringify(id),
    "headers": {
      "Content-Type": 'application/json'
    }
  })

  return await response.json();
}

  
  export async function removeCarrito(id: string){
      let url = REACT_APP_API + 'carrito/' + id
      await fetch(url, {
        "method": 'DELETE',
        "headers": {
          "Content-Type": 'application/json'
        }
      })
  }
  
  export async function saveCarrito(carrito:Carrito){
  
      let url = REACT_APP_API + 'carrito'
    await fetch(url, {
      "method": 'POST',
      "body": JSON.stringify(carrito),
      "headers": {
        "Content-Type": 'application/json'
      }
    });
      
    
  }