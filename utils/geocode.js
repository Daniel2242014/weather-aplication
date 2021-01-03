const request = require('postman-request');

const geoCodeByAddres = (address,callBack) => {

    /*const url = 'http://api.weatherstack.com/current?access_key=5e211bb1760f86379c3324133044ad42&query=-55.194247,-31.471503'*/
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGFuaWVsMjI0MjAxNCIsImEiOiJja2l3bGgyM3EwbDM4MnFxdHRpOXd5YjYzIn0.uiX5AyOd_nnLSyYiFK2a3Q&limit=1'
    request({url:url, json:true}, (error, {body:data}) => {
    
        if(error){
            callBack('Error de conexion')
        }else if(data.features.length===0){
            callBack('Sin resultados')
        }else{

        
            callBack(undefined,{longitud: data.features[0].center[1],
                                altitud: data.features[0].center[0],
                                location: data.features[0].place_name
                                })
        }
        
    })
}

module.exports = geoCodeByAddres

