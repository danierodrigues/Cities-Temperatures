import axios from "axios"; 

var BASE_URL = 'http://localhost:4000';


export function saveCity(body) {
    return new Promise((resolve, reject)=>{
        axios.post(BASE_URL + '/city', body)
      .then((response)=> {
        resolve(response);
      })
      .catch((error)=> {
          console.log(error);
        reject(error);
      });
    })
}

export function getCities(body) {
    return new Promise((resolve, reject)=>{
    axios.get(BASE_URL + '/city')
      .then((response)=> {
        resolve(response);
      })
      .catch((error)=> {
          console.log(error);
        reject(error);
      });
    })
}