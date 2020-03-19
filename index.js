//importaciones
const express = require('express');
//logger
const morgan = require('morgan');

//Creacion del servidor
const app = express();

//Settings (primer parametro es el nombre de la variable, el segundo el valor)
app.set('appName', 'basic express');
app.set('port', 3000);
app.set('view engine', 'ejs');

//Middlewares (se ejecutan antes de pasar por cualquier ruta)
app.use(express.json());
app.use(morgan('dev'));

//Para todas las rutas /user, primero va a pasar por acá
// app.all('/user', (req, res, next) => {
//     console.log('Por acá pasó');
//     res.send('finish');
//     //Para no detener la ejecución y pasar a la siguiente ruta
//     next();
// });

//Routes

app.get('/', (req, res) => {
    const data = [{name: 'john'}, {name: 'joe'}, {name: 'cameron'}];
    //Pasamos los datos al index.ejs
    res.render('index.ejs', {people: data});
})

//Recibiendo una peticion GET
app.get('/user', (req, res) => {
    res.json({
        username: 'Cameron',
        lastname: 'Howe'
    });
});

//Recibiendo una peticion POST
app.post('/user', (req, res) => {
    //Respuesta a la petición
    res.send('POST REQUEST RECEIVED');
});

//Recibiendo una peticion PUT
app.put('/user/:id', (req, res) => {
    res.send('UPDATE REQUEST RECEIVED');
});

//Recibiendo una peticion DELETE
app.delete('/user/:id', (req, res) => {
    res.send('<h1>DELETE REQUEST RECEIVED</h1>');
});

//Archivos estáticos
app.use(express.static('public'));

//Servidor escuchando peticiones
app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('Server on port', app.get('port'));
});