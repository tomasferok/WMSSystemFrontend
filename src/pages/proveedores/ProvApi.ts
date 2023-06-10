import Proveedor from "./Proveedor";
const REACT_APP_API="http://localhost:8087/api/"

export async function searchProvById(id: string) {
  let url = REACT_APP_API + 'provs/' + id
  let response = await fetch(url, {
    "method": 'GET',
    "headers": {
      "Content-Type": 'application/json'
    }
  })

  return await response.json();
}

export async function searchProv(){
    let url = REACT_APP_API + 'provs'
    let response = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
  
    return await response.json();
}


export async function removeProv(id: string){
    let url = REACT_APP_API + 'provs/' + id
    await fetch(url, {
      "method": 'DELETE',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
}

export async function saveProv(prov:Proveedor){

    let url = REACT_APP_API + 'provs'
  await fetch(url, {
    "method": 'POST',
    "body": JSON.stringify(prov),
    "headers": {
      "Content-Type": 'application/json'
    }
  });
    
  
}