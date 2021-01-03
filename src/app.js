const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../../WeatherApp/utils/geocode')
const forecast = require('../../WeatherApp/utils/forecast')

const app = express()


const port = process.env.PORT || 3000 //Este es el puerto que heroku usa, es una variable que el entrega, sino usa el 3000

//Definimos rutas y accesos
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Hacemos las configuracion para los template con via hbs
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Definimos carpeta publica a exponer
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{title: 'Weather',
                        descripcion: '....',
                        createBy: 'DP'}) /*Se usa para render algunos de los template de los view, solo nos importa el nombre*/
})

app.get('/help', (req,res) => {
    res.render('help',{title: 'Ayuda',
                       helpText: 'No tengo con que ayudarte',
                       createBy: 'DP'})
})

app.get('/about', (req,res) => {
    res.render('about',{title: 'Accerca de',
                        infoPag: 'que intetesante',
                        createBy: 'DP'})
})

app.get('/weather', (req,res) => {
   /* res.render('weather',{title: 'Pronostico',
                         weatherDescripcion: 'que intetesante',
                         createBy: 'DP'})*/

    if (!req.query.address){
        return res.send({error:'No address has been provied'})
    }

    geocode(req.query.address, (error, {longitud,altitud,location} = {}) => {
        if(error) return res.send({error})
        forecast(longitud, altitud, (error, response) => {
            if(error) return res.send({error})
            res.send({location: location,
                      forecast :response,
                      address: req.query.address} )
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{title: 'Pagina no encontrada',
                      errorDescripcion : 'LA no nada luego de /help, por favor vaya a esa busqueda',
                      createBy: 'DP'})
})

app.get('*', (req,res)=> {
    res.render('404',{title: 'Pagina no encontrada',
                      errorDescripcion: 'La busqueda no tiene relacion con ningun elemento publicado',
                      createBy: 'DP'})
})

app.listen(port, ()=> {
    console.log('Servidor arriba, en el puerto ' + port)
})