const REACT_APP_API="http://localhost:8087/api/"

export async function searchVentas(){
    let url = REACT_APP_API + 'ventas'
    let response = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Content-Type": 'application/json'
      }
    })
  
    return await response.json();
}