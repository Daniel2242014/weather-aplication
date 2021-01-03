


const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //Hace que no se reinice la pagina
    const locaction = searchInput.value
    document.getElementById('textoACambiar').textContent = 'Buscando'
    fetch('/weather?address='  + locaction).then( (response) => { 
        /*fetch es de la api del navegador, then para las promesas*/
        /*IMPORTANTE: Al no poner el dominio en la ruta va a usar por defecto donde esta parado, eso funciona tanto en localhost como en heroku*/ 
    response.json().then( (data)=> {
        /*Esto se ejecuta cuando tengo dispoible el json*/
        console.log(data)
       if(data.error){
           document.getElementById('textoACambiar').textContent = data.error
       } else {
            document.getElementById('textoACambiar').textContent = data.forecast + ' en '  + data.location
       }
    })
})
    
})