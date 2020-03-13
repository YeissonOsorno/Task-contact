const express = require('express');
const morgan = require('morgan'); 
const exphbs = require('express-handlebars')
const path = require('path')
const app = express();

//Settings
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views')) // Establecer ruta de las vistas
//configurar el servidor de las vistas
app.engine('.hbs',exphbs({
    defaultLayout : 'main',
    extname :'.hbs'
}))
app.set('view engine','.hbs')

// middelware, va estar en medio de las peticiones que lleguen al servidor
app.use(morgan('dev'));
app.use(express.urlencoded({extended :false}))

//Routes
app.use(require('./routes/index.routes'));

//Static files
app.use(express.static(path.join(__dirname,'public')))
module.exports = app;