const express = require("express");
const AES = require("mysql-aes");
const router = express.Router();
const mysqlConnection = require('../database');
var jwt = require('jsonwebtoken');

const CLAVE ="asdAC%(=?FCACAS@@CAScas45325";
router.get("/usuarios/:token", (req, res) => {
    let token = req.params.token;
    
    jwt.verify(token, CLAVE, function (err, decoded) {
        if(!err){
            let newToken = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: decoded.data
            }, CLAVE);
            mysqlConnection.query(`SELECT * from usuarios_escuela where user_name!=${decoded.data.user_name}` , (error, rows, field) => {                
                if (!error) {
                    let response = { data: rows, token: newToken, code: 1, menssage: "Datos cargados correctamente" };
                    res.json(response);
                } else {
                    let response = { token: newToken, code: 0, menssage: "Error al intentar cargar la tabla" };
                    res.json(response);
                }
            });
            
        }else{
            console.log("error al decodificar")
        }
        
    });
    
    
});
router.post("/usuarios", (req, res) => {
    var usuario = req.body.user;
    usuario.pass = AES.encrypt(String(usuario.pass), CLAVE);
    mysqlConnection.query('INSERT INTO usuarios SET ?', usuario, function (err, result) {
        if (!err) {

            if (result.affectedRows >= 1) {
                res.json({ code: 1, message: "Usuario Agregado con exito" });
            }


        } else {
            console.log(err.errno);
        }
    });
});
router.post("/usuarios/login", (req, res) => {
    var usuario = req.body;
    usuario.pass = AES.encrypt(String(usuario.pass), CLAVE);
    
    mysqlConnection.query(`SELECT * from usuarios where user_name='${usuario.user_name}' and pass='${usuario.pass}'`, (error, rows, field) => {
        if (!error && rows.length>0) {
            userData=rows[0];
            delete userData.pass;
            
            token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: userData
            }, CLAVE);
            res.json({ user_data: userData,token,code:1,message:"Iniciaste sesión correctamente"});
        } else {
            res.json({code: 0, message: "Combinación de Usuario y contraseña incorrecto" });
        }
    });
});

module.exports = router;