import Product from "./Product";
const REACT_APP_API="http://localhost:8087/api/"

export async function searchProductById(id: string) {
  let url = REACT_APP_API + 'productos/' + id
  let response = await fetch(url, {
    "method": 'GET',
    "headers": {
      "Content-Type": 'application/json'
    }
  })

  return await response.json();
}

export async function searchProduct(){
    let url = REACT_APP_API + 'productos'
    let response = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
  
    return await response.json();
}


export async function removeProduct(id: string){
    let url = REACT_APP_API + 'productos/' + id
    await fetch(url, {
      "method": 'DELETE',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
}

export async function saveProduct(product:Product){

    let url = REACT_APP_API + 'productos'
  await fetch(url, {
    "method": 'POST',
    "body": JSON.stringify(product),
    "headers": {
      "Content-Type": 'application/json'
    }
  });
    
  
}