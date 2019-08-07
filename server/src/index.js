const express=require("express");

const app=express();




//Settings
app.set('port',process.env.Port || 3000);
app.set("clave","asdAC%(=?FCACAS@@CAScas45325");
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//MeddleWares
app.use(express.json());
// Rutas
// app.use(require('./routes/routes'));
app.use(require('./routes/userRoutes'));
app.use(require('./routes/escuelasRoutes'));
//Startin Server

app.listen(app.get("port"), () => {
    console.log("Server on Port", app.get("port"));
});