import Almacenamiento from "./Almacenamiento";
const REACT_APP_API="http://localhost:8087/api/"

export async function searchAlmaById(id: string) {
  let url = REACT_APP_API + 'alma/' + id
  let response = await fetch(url, {
    "method": 'GET',
    "headers": {
      "Content-Type": 'application/json'
    }
  })

  return await response.json();
}

export async function searchAlma(){
    let url = REACT_APP_API + 'alma'
    let response = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
  
    return await response.json();
}


export async function removeAlma(id: string){
    let url = REACT_APP_API + 'alma/' + id
    await fetch(url, {
      "method": 'DELETE',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
}

export async function saveAlma(alma:Almacenamiento){

    let url = REACT_APP_API + 'alma'
  await fetch(url, {
    "method": 'POST',
    "body": JSON.stringify(alma),
    "headers": {
      "Content-Type": 'application/json'
    }
  });
    
  
}