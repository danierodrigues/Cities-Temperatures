import axios from "axios"; 

var BASE_URL = 'http://localhost:4000';


/* Save a city */
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