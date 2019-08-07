const express = require("express");
const AES = require("mysql-aes");
const router = express.Router();
var jwt = require('jsonwebtoken');
var EscuelasDao = require("../controller/Escuelas");
var EscuelasUsuariosDao = require("../controller/EscuelasUsuarios");


const CLAVE = "asdAC%(=?FCACAS@@CAScas45325";
router.get("/Escuelas/:token", (req, res) => {
    let token = req.params.token;
    jwt.verify(token, CLAVE, async function (err, decoded) {    
        if (!err) {
            let response = await EscuelasUsuariosDao.getEscuelasByUser(decoded.data.user_name);
            response.token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: decoded.data
            }, CLAVE);
            res.json(response);

        } else {
            res.json({
                code: 0,
                error: "Tu sesión ha caducado"

            });
        }

    });
    


});
router.post("/Escuelas", (req, res) => {
    var escuela = req.body.escuela;
    let token = req.body.token;
    
    
    jwt.verify(token, CLAVE,async function (err, decoded)  {
        if (!err) {
            
            let response= await EscuelasDao.insertarEscuela({ escuela, user_name: decoded.data.user_name});
            response.token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: decoded.data
            }, CLAVE);
            res.json(response);        
            
        } else {
            res.json({
                code: 0,
                error: "Tu sesión ha caducado"

            });
        }

    });
});
router.put("/Escuelas", (req, res) => {
    var escuela = req.body.escuela;
    let token = req.body.token;

    console.log(req.body);
    
    jwt.verify(token, CLAVE, async function (err, decoded) {
        if (!err) {

            let response = await EscuelasDao.modificaEscuela(escuela);
            response.token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: decoded.data
            }, CLAVE);
            res.json(response);

        } else {
            res.json({
                code: 0,
                error: "Tu sesión ha caducado"

            });
        }

    });
});
module.exports = router;