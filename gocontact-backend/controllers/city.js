
var cities = [];
module.exports = {
    addCity(req,res){
        try{
            cities.push(req.body.city);
            res.status(200).send("Cidade adicionada");
        }catch(err){
            res.status(200).send(err);
        } 
    },
    
    getCities(req,res){
        res.status(200).json({"cities":cities});
    }
}
