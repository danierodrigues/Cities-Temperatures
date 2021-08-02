const axios = require('axios');
const {weatherApiKey} = require('../config/keys');


var cities = [];
const expirationTime = 5 * 60;
const lang = "pt";
module.exports = {
    async addCity(req,res){
        try{
            if(!req.body.city){
                return res.status(409).json({message:"Cidade necessária."});
            }
            
            let duplicated = cities.filter(city => city.name === req.body.city);
            if(duplicated.length !== 0){
                return res.status(409).json({message:"Cidade já guardada."});
            }


            try{
                let data = await cityRequest(req.body.city);
                if(data){
                    cities.push(data);
                }
                return res.status(200).json({message:"Cidade adicionada."});
            }catch(err){
                if(err === 404){
                    return res.status(404).json({message:"Cidade não encontrada."});
                }else{
                    return res.status(500).json({message:"Erro."});
                }
            }
            
        }catch(err){
            return res.status(200).send(err);
        } 
    },
    
    async getCities(req,res){
        let date = new Date();
        let arrCityExpired = [];
        let auxCities = [...cities];     
        
        cities.forEach((city, index) =>{
            if(city.expirationTime < date){
                arrCityExpired.push(city.name);
                auxCities.splice(city,1);
            }
        });
        cities = auxCities;

        for(const city of arrCityExpired) {
            try{
                let data = await cityRequest(city);
                if(data){
                    cities.push(data);
                }
            }catch(err){
                console.log(err);
            }
            
        }

        return res.status(200).json({"cities":cities});
    }
}


async function cityRequest(city){
    return new Promise((resolve, reject) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${weatherApiKey}&lang=${lang}`)
        .then(response => {
            let date = new Date();
            date.setSeconds( date.getSeconds() + expirationTime );
            response.data.expirationTime = date;
            resolve(response.data);
        })
        .catch(error => {
            if(error.response.status === 404){
                reject(404); 
            }else{
                reject(null);
            }          
        });
    });
}