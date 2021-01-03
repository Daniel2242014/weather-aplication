const request = require('postman-request');

const forecast = (longitud, altitud, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5e211bb1760f86379c3324133044ad42&query=' + longitud+ ',' + altitud
    request({url, json:true}, (error, {body:data}) => {
        if(error){
            callback('Error de conexion')
        }else if(data.error){
            callback('Forecast unabled')
        }else{
            const dataF = data.current.weather_descriptions.join(' ')
            callback(undefined, dataF)
        }        
    })   
}

module.exports = forecast