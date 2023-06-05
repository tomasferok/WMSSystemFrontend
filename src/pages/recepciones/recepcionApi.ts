import ControlarRecepcionRequest from "./ControlarRecepcionRequest";
import Recepcion from "./Recepcion";

const REACT_APP_API="http://localhost:8087/api/"
export async function searchRecepcionById(id: string) {
    let url = REACT_APP_API + 'recep/' + id
    let response = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
  
    return await response.json();
  }
  
  export async function searchRecepcion(){
      let url = REACT_APP_API + 'recep'
      let response = await fetch(url, {
        "method": 'GET',
        "headers": {
          "Content-Type": 'application/json'
        }
      })
    
      return await response.json();
  }
  
  
  export async function removeRecepcion(id: string){
      let url = REACT_APP_API + 'recep/' + id
      await fetch(url, {
        "method": 'DELETE',
        "headers": {
          "Content-Type": 'application/json'
        }
      })
  }
  
  export async function saveRecep(recep:Recepcion){
  
      let url = REACT_APP_API + 'recep'
    await fetch(url, {
      "method": 'POST',
      "body": JSON.stringify(recep),
      "headers": {
        "Content-Type": 'application/json'
      }
    });
      
    
  }

  export async function controlarRecep(controlarRecep:ControlarRecepcionRequest){
  
    let url = REACT_APP_API + 'recep/controlar'
    let response= await fetch(url, {
    "method": 'POST',
    "body": JSON.stringify(controlarRecep),
    "headers": {
      "Content-Type": 'application/json'
    }
  });
  return await response.json();
  
}

export async function guardarConDiferencias(controlarRecep:ControlarRecepcionRequest){
  
  let url = REACT_APP_API + 'recep/confirmation'
  await fetch(url, {
  "method": 'POST',
  "body": JSON.stringify(controlarRecep),
  "headers": {
    "Content-Type": 'application/json'
  }
});


}